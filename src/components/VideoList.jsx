import React, { memo, useMemo } from "react";
import { List, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import VideoListItem from "./VideoListItem";

/**
 * SRP helper: consistently extract a stable id for keys.
 */
function getVideoId(video) {
    return video?.id?.videoId ?? video?.id ?? video?.etag ?? "";
}

function VideoList({ videos = [], onSelect }) {
    const hasVideos = videos.length > 0;

    const safeVideos = useMemo(() => videos.filter(Boolean), [videos]);

    if (!hasVideos) {
        return (
            <Paper sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    No results yet.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ overflow: "hidden" }}>
            <List dense sx={{ p: 0 }}>
                {safeVideos.map((video, index) => {
                    const id = getVideoId(video);

                    // Fallback key for edge cases (should not happen often)
                    const key = id || `${index}-${video?.snippet?.title ?? "video"}`;

                    return (
                        <VideoListItem
                            key={key}
                            video={video}
                            onSelect={onSelect}
                        />
                    );
                })}
            </List>
        </Paper>
    );
}

VideoList.propTypes = {
    videos: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};

export default memo(VideoList);
