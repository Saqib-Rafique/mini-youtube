import React from "react";
import { Alert, Button, Stack } from "@mui/material";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: "" };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, message: error?.message || "Something went wrong." };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught:", error, info);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Stack sx={{ p: 3 }} spacing={2}>
                    <Alert severity="error">{this.state.message}</Alert>
                    <Button variant="contained" onClick={this.handleReload}>
                        Reload
                    </Button>
                </Stack>
            );
        }

        return this.props.children;
    }
}
