import {
    AppBar,
    Box,
    IconButton,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function SearchBar({
    initialQuery = "",
    onSearch,
    showMenu = false,
    onToggleSidebar,
    onHomeClick,
}) {
    const [query, setQuery] = useState(initialQuery);
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const validate = (value) => {
        if (!value.trim()) return "Please enter a search query.";
        if (value.trim().length < 2) return "Query is too short.";
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const msg = validate(query);
        setError(msg);
        if (msg) return;
        onSearch(query.trim());
    };

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: "background.paper",
            }}
        >
            <Toolbar component="form" onSubmit={handleSubmit} sx={{ gap: 2 }}>
                {showMenu && (
                    <IconButton
                        edge="start"
                        aria-label="toggle sidebar"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleSidebar?.();
                        }}
                        sx={{ mr: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography
                    variant="h6"
                    sx={{
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    onClick={onHomeClick}
                >
                    MiniTube
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: { xs: "100%", sm: 520, md: 620 },
                        maxWidth: "100%",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 999,
                        px: 1,
                        backgroundColor: "background.paper",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                        "&:focus-within": {
                            borderColor: "primary.main",
                            boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.15)",
                        },
                        marginLeft: { xs: 0, md: "auto" },
                        marginRight: { xs: 0, md: "auto" },
                    }}
                >
                    <TextField
                        inputRef={inputRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (error) setError("");
                        }}
                        placeholder="Search"
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            sx: { px: 1, py: 0.8 },
                        }}
                        sx={{ flex: 1, minWidth: 0 }}
                    />

                    <IconButton type="submit" aria-label="search" sx={{ ml: 0.5 }}>
                        <SearchIcon />
                    </IconButton>
                </Box>

            </Toolbar>

            {error ? (
                <Box sx={{ px: 2, pb: 1, color: "error.main", fontSize: 13 }}>
                    {error}
                </Box>
            ) : null}
        </AppBar>
    );
}

SearchBar.propTypes = {
    initialQuery: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    showMenu: PropTypes.bool,
    onToggleSidebar: PropTypes.func,
    onHomeClick: PropTypes.func,
};
