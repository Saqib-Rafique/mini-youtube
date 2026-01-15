import PropTypes from "prop-types";
import { Alert } from "@mui/material";

export default function ErrorBanner({ message }) {
    if (!message) return null;
    return <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>;
}

ErrorBanner.propTypes = {
    message: PropTypes.string,
};
