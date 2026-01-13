import { List, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import VideoListItem from "./VideoListItem";

export default function VideoList({ videos, onSelect }) {
    if (!videos?.length) {
        return (
            <Paper sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    No results yet.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper>
            <List dense>
                {videos.map((video) => (
                    <VideoListItem
                        key={video?.id?.videoId}
                        video={video}
                        onSelect={onSelect}
                    />
                ))}
            </List>
        </Paper>
    );
}

VideoList.propTypes = {
    videos: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};
