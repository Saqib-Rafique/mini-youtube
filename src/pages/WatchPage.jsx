import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import VideoPlayer from "../components/VideoPlayer";
import VideoList from "../components/VideoList";
import Loader from "../components/Loader";

import { searchVideos } from "../api/youtube";
import { useVideo } from "../context/useVideo";
import styles from "../styles/layout.module.css";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const SIDEBAR_ITEMS = [
    { label: "Home", icon: <HomeIcon />, path: "/" },
    { label: "Trending", icon: <WhatshotIcon />, path: "/?tab=trending" },
    { label: "Subscriptions", icon: <SubscriptionsIcon />, path: "/?tab=subscriptions" },
    { label: "Library", icon: <VideoLibraryIcon />, path: "/?tab=library" },
];

export default function WatchPage() {
    const { videoId } = useParams();
    const navigate = useNavigate();

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const drawerWidth = 220;

    const { state, dispatch } = useVideo();
    const { videos, selectedVideo, loading, error } = state;

    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Desktop open, mobile closed
    useEffect(() => {
        setSidebarOpen(isDesktop);
    }, [isDesktop]);

    const toggleSidebar = () => setSidebarOpen((s) => !s);

    const runSearch = useCallback(
        async (query) => {
            dispatch({ type: "SEARCH_START", payload: { query } });
            try {
                const items = await searchVideos(query);
                dispatch({ type: "SEARCH_SUCCESS", payload: { videos: items } });
            } catch (e) {
                dispatch({
                    type: "SEARCH_ERROR",
                    payload: { error: e?.message || "Search failed" },
                });
            }
        },
        [dispatch]
    );

    // Load fallback list if page refreshed
    useEffect(() => {
        if (!videos?.length) runSearch("React tutorials");
    }, [videos?.length, runSearch]);

    // Sync selected video from URL
    useEffect(() => {
        if (!videoId || !videos?.length) return;
        const found = videos.find((v) => v?.id?.videoId === videoId);
        if (found) dispatch({ type: "SELECT_VIDEO", payload: { video: found } });
    }, [videoId, videos, dispatch]);

    return (
        <>
            {/* Header */}
            <SearchBar
                onSearch={runSearch}
                showMenu
                onToggleSidebar={toggleSidebar}
                onHomeClick={() => {
                    navigate("/");
                    if (!isDesktop) setSidebarOpen(false);
                }}
            />

            <Box sx={{ display: "flex" }}>
                {/* Sidebar */}
                <Drawer
                    variant={isDesktop ? "persistent" : "temporary"}
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            pt: 1,
                            top: { xs: 56, sm: 64 },
                            height: { xs: "calc(100% - 56px)", sm: "calc(100% - 64px)" },
                        },
                    }}
                >
                    <List>
                        {SIDEBAR_ITEMS.map((item) => (
                            <ListItemButton
                                key={item.label}
                                onClick={() => {
                                    navigate(item.path);
                                    if (!isDesktop) setSidebarOpen(false);
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Drawer>

                {/* Main Content */}
                <Box
                    sx={{
                        flex: 1,
                        transition: theme.transitions.create("margin", {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.shortest,
                        }),
                        ml: isDesktop && sidebarOpen ? `${drawerWidth}px` : 0,
                    }}
                >
                    <div className={styles.container}>
                        {loading && <Loader label="Fetching videos..." />}
                        {error && <div style={{ padding: 12, color: "crimson" }}>{error}</div>}

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
                    </div>
                </Box>
            </Box>
        </>
    );
}
