import { ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function VideoListItem({ video, onSelect }) {
    const thumb = video?.snippet?.thumbnails?.medium?.url;
    const title = video?.snippet?.title ?? "";
    const channel = video?.snippet?.channelTitle ?? "";

    return (
        <ListItemButton onClick={() => onSelect(video)} alignItems="flex-start">
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                {thumb ? (
                    <img src={thumb} alt={title} width="120" height="67" style={{ objectFit: "cover", borderRadius: 8 }} />
                ) : null}

                <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                        {title}
                    </Typography>
                    <ListItemText
                        primary={channel}
                        primaryTypographyProps={{ variant: "caption", color: "text.secondary", noWrap: true }}
                    />
                </Stack>
            </Stack>
        </ListItemButton>
    );
}

VideoListItem.propTypes = {
    video: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
};
