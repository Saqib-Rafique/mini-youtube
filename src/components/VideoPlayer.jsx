import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function VideoPlayer({ video }) {
    if (!video) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6">No video selected</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Search something and select a video from the list.
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    const videoId = video?.id?.videoId;
    const title = video?.snippet?.title ?? "";
    const channelTitle = video?.snippet?.channelTitle ?? "";
    const description = video?.snippet?.description ?? "";

    return (
        <Card>
            <CardContent>
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                    <iframe
                        title={title}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        frameBorder="0"
                        allowFullScreen
                    />
                </div>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    {title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {channelTitle}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

VideoPlayer.propTypes = {
    video: PropTypes.object,
};
