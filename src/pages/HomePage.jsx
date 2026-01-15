import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import PageContainer from "../components/PageContainer";
import VideoCard from "../components/VideoCard";

import { useVideo } from "../context/useVideo";
import { useVideoSearch } from "../hooks/useVideoSearch";
import { DRAWER_WIDTH, getStickyTopSx } from "../constants/layout";

const CHIPS = ["All", "React", "JavaScript", "TypeScript", "UI", "Testing", "CSS", "Node", "Next.js"];

export default function HomePage() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const navigate = useNavigate();

    const { state, dispatch } = useVideo();
    const { videos, loading, error } = state;

    const { runSearch } = useVideoSearch(dispatch);

    const [activeChip, setActiveChip] = useState("All");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    // initial feed
    useEffect(() => {
        if (!videos?.length) runSearch("React tutorials");
    }, [videos?.length, runSearch]);

    // chip search
    useEffect(() => {
        if (!activeChip || activeChip === "All") return;
        runSearch(activeChip);
    }, [activeChip, runSearch]);

    const topRow = useMemo(() => (videos ?? []).slice(0, 10), [videos]);
    const gridVideos = useMemo(() => (videos ?? []).slice(10), [videos]);

    const handleNavigate = (path) => {
        navigate(path);
        setActiveChip("All");
        if (!isDesktop) setSidebarOpen(false);
    };

    const openVideo = (video) => {
        const id = video?.id?.videoId;
        if (!id) return;
        dispatch({ type: "SELECT_VIDEO", payload: { video } });
        navigate(`/watch/${id}`);
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
                        {/* Chips: mobile horizontal scroll */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                mb: 2,
                                position: "sticky",
                                ...getStickyTopSx(),
                                zIndex: 1,
                                background: "background.paper",
                                py: 1,
                                overflowX: "auto",
                                whiteSpace: "nowrap",
                                scrollSnapType: "x mandatory",
                            }}
                        >
                            {CHIPS.map((chip) => (
                                <Chip
                                    key={chip}
                                    label={chip}
                                    clickable
                                    size="small"
                                    sx={{ flex: "0 0 auto" }}
                                    variant={chip === activeChip ? "filled" : "outlined"}
                                    color={chip === activeChip ? "primary" : "default"}
                                    onClick={() => setActiveChip(chip)}
                                />
                            ))}
                        </Box>

                        {loading ? <Loader label="Fetching videos..." /> : null}
                        <ErrorBanner message={error} />

                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                            Recommended
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                gap: 1.5,
                                overflowX: "auto",
                                pb: 1,
                                scrollSnapType: "x mandatory",
                            }}
                        >
                            {topRow.map((v) => (
                                <VideoCard
                                    key={v?.id?.videoId}
                                    video={v}
                                    variant="row"
                                    onClick={() => openVideo(v)}
                                />
                            ))}
                        </Box>

                        {gridVideos?.length ? (
                            <>
                                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1, fontWeight: 700 }}>
                                    More videos
                                </Typography>

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: {
                                            xs: "1fr",
                                            sm: "1fr 1fr",
                                            md: "1fr 1fr 1fr",
                                        },
                                        gap: 1,
                                    }}
                                >
                                    {gridVideos.map((v) => (
                                        <VideoCard
                                            key={v?.id?.videoId}
                                            video={v}
                                            variant="grid"
                                            onClick={() => openVideo(v)}
                                        />
                                    ))}
                                </Box>
                            </>
                        ) : null}
                    </PageContainer>
                </Box>
            </Box>
        </>
    );
}
