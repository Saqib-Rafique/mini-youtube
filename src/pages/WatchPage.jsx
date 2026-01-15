import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "../components/VideoPlayer";
import VideoList from "../components/VideoList";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import PageContainer from "../components/PageContainer";

import { useVideo } from "../context/useVideo";
import { useVideoSearch } from "../hooks/useVideoSearch";
import { DRAWER_WIDTH } from "../constants/layout";

function getVideoId(v) {
    return v?.id?.videoId ?? v?.id ?? "";
}

export default function WatchPage() {
    const { videoId } = useParams();
    const navigate = useNavigate();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    const { state, dispatch } = useVideo();
    const { videos = [], selectedVideo, loading, error, query } = state;

    const { runSearch } = useVideoSearch(dispatch);

    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    // Normalize current list
    const safeVideos = useMemo(() => videos.filter(Boolean), [videos]);

    /**
     * 1) If we don't have any videos, fetch using last query or a safe default.
     */
    useEffect(() => {
        if (safeVideos.length > 0) return;
        runSearch(query?.trim() ? query : "React tutorials");
    }, [safeVideos.length, runSearch, query]);

    /**
     * 2) Ensure selectedVideo is set correctly for the route videoId.
     *    - Try to find exact match by id
     *    - Otherwise fallback to first video (so player always shows something)
     */
    useEffect(() => {
        if (safeVideos.length === 0) return;

        const found = videoId
            ? safeVideos.find((v) => getVideoId(v) === videoId)
            : null;

        const nextSelected = found ?? safeVideos[0];

        // Prevent unnecessary dispatch loops
        const currentId = getVideoId(selectedVideo);
        const nextId = getVideoId(nextSelected);

        if (!currentId || currentId !== nextId) {
            dispatch({ type: "SELECT_VIDEO", payload: { video: nextSelected } });
        }
    }, [videoId, safeVideos, dispatch, selectedVideo]);

    const handleNavigate = (path) => {
        navigate(path);
        if (!isDesktop) setSidebarOpen(false);
    };

    return (
        <>
            <SearchBar
                onSearch={runSearch}
                showMenu
                onToggleSidebar={() => setSidebarOpen((s) => !s)}
                onHomeClick={() => handleNavigate("/")}
            />

            <Box sx={{ display: "flex" }}>
                <Sidebar
                    open={sidebarOpen}
                    variant={isDesktop ? "persistent" : "temporary"}
                    onClose={() => setSidebarOpen(false)}
                    onNavigate={handleNavigate}
                />

                <Box
                    sx={{
                        flex: 1,
                        transition: theme.transitions.create("margin", {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.shortest,
                        }),
                        ml: isDesktop && sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
                    }}
                >
                    <PageContainer>
                        {loading ? <Loader label="Fetching videos..." /> : null}
                        <ErrorBanner message={error} />

                        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <VideoPlayer video={selectedVideo} />
                            </Box>

                            <Box sx={{ width: { xs: "100%", md: 380 }, flexShrink: 0 }}>
                                <VideoList
                                    videos={videos}
                                    onSelect={(video) => {
                                        dispatch({ type: "SELECT_VIDEO", payload: { video } });
                                        navigate(`/watch/${video?.id?.videoId}`);
                                    }}
                                />
                            </Box>
                        </Box>
                    </PageContainer>
                </Box>
            </Box>
        </>
    );
}
