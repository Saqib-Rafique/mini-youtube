import { CircularProgress, Stack, Typography } from "@mui/material";

export default function Loader({ label = "Loading..." }) {
    return (
        <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }} spacing={2}>
            <CircularProgress />
            <Typography variant="body2">{label}</Typography>
        </Stack>
    );
}
