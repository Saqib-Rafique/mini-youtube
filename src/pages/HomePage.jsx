import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import { searchVideos } from "../api/youtube";
import { useVideo } from "../context/useVideo";
import styles from "../styles/layout.module.css";

import {
    Box,
    Chip,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const SIDEBAR_ITEMS = [
    { label: "Home", icon: <HomeIcon /> },
    { label: "Trending", icon: <WhatshotIcon /> },
    { label: "Subscriptions", icon: <SubscriptionsIcon /> },
    { label: "Library", icon: <VideoLibraryIcon /> },
];

const CHIPS = ["All", "React", "JavaScript", "TypeScript", "UI", "Testing", "CSS", "Node", "Next.js"];

export default function HomePage() {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const drawerWidth = 220;

    const navigate = useNavigate();
    const { state, dispatch } = useVideo();
    const { videos, loading, error } = state;

    const [activeChip, setActiveChip] = useState("All");
    const [sidebarOpen, setSidebarOpen] = useState(true);

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

    useEffect(() => {
        if (!videos?.length) runSearch("React tutorials");
    }, [videos?.length, runSearch]);

    useEffect(() => {
        if (!activeChip) return;
        if (activeChip === "All") return;
        runSearch(activeChip);
    }, [activeChip, runSearch]);

    const topRow = useMemo(() => (videos ?? []).slice(0, 10), [videos]);
    const gridVideos = useMemo(() => (videos ?? []).slice(10), [videos]);

    const openVideo = (video) => {
        const id = video?.id?.videoId;
        if (!id) return;

        dispatch({ type: "SELECT_VIDEO", payload: { video } });
        navigate(`/watch/${id}`);
    };

    const VideoCard = ({ v, variant = "grid" }) => {
        const id = v?.id?.videoId;
        const thumb = v?.snippet?.thumbnails?.medium?.url;
        const title = v?.snippet?.title ?? "";
        const channel = v?.snippet?.channelTitle ?? "";

        const baseWidth = variant === "row" ? 300 : "auto";

        return (
            <Box
                key={id}
                sx={{
                    width: baseWidth,
                    minWidth: variant === "row" ? 300 : "auto",
                    cursor: "pointer",
                    borderRadius: 2,
                    p: 1,
                    transition: "background 0.15s ease",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                }}
                onClick={() => openVideo(v)}
            >
                {thumb ? (
                    <img
                        src={thumb}
                        alt={title}
                        style={{
                            width: "100%",
                            borderRadius: 12,
                            display: "block",
                            aspectRatio: "16 / 9",
                            objectFit: "cover",
                        }}
                    />
                ) : null}

                <Typography
                    variant="body2"
                    sx={{
                        mt: 1,
                        fontWeight: 600,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {title}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    {channel}
                </Typography>
            </Box>
        );
    };

    return (
        <>
            <SearchBar onSearch={runSearch} showMenu onToggleSidebar={toggleSidebar} />

            <Box sx={{ display: "flex" }}>
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
                                    if (!isDesktop) setSidebarOpen(false);
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        ))}
                    </List>
                </Drawer>

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
                        { }
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                                flexWrap: "wrap",
                                mb: 2,
                                position: "sticky",
                                top: { xs: 56, sm: 64 },
                                zIndex: 1,
                                background: "background.paper",
                                py: 1,
                            }}
                        >
                            {CHIPS.map((chip) => (
                                <Chip
                                    key={chip}
                                    label={chip}
                                    clickable
                                    size="small"
                                    variant={chip === activeChip ? "filled" : "outlined"}
                                    color={chip === activeChip ? "primary" : "default"}
                                    onClick={() => setActiveChip(chip)}
                                />
                            ))}
                        </Box>

                        {loading ? <Loader label="Fetching videos..." /> : null}
                        {error ? <div style={{ padding: 12, color: "crimson" }}>{error}</div> : null}

                        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                            Recommended
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
                            {topRow.map((v) => (
                                <VideoCard key={v?.id?.videoId} v={v} variant="row" />
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
                                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr" },
                                        gap: 1,
                                    }}
                                >
                                    {gridVideos.map((v) => (
                                        <VideoCard key={v?.id?.videoId} v={v} />
                                    ))}
                                </Box>
                            </>
                        ) : null}
                    </div>
                </Box>
            </Box>
        </>
    );
}
