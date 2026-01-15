import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export default function VideoCard({ video, variant = "grid", onClick }) {
    const thumb = video?.snippet?.thumbnails?.medium?.url;
    const title = video?.snippet?.title ?? "";
    const channel = video?.snippet?.channelTitle ?? "";

    const width = variant === "row" ? { xs: 260, sm: 300 } : "auto";

    return (
        <Box
            sx={{
                width,
                minWidth: variant === "row" ? width : "auto",
                cursor: "pointer",
                borderRadius: 2,
                p: 1,
                transition: "background 0.15s ease",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                scrollSnapAlign: variant === "row" ? "start" : "unset",
            }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") onClick?.();
            }}
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
}

VideoCard.propTypes = {
    video: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(["row", "grid"]),
    onClick: PropTypes.func,
};
