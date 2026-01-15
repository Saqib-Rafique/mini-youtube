import PropTypes from "prop-types";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { SIDEBAR_ITEMS } from "../constants/navigation";
import { DRAWER_WIDTH, getAppBarOffsetSx } from "../constants/layout";

export default function Sidebar({ open, variant, onClose, onNavigate }) {
    return (
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    pt: 1,
                    ...getAppBarOffsetSx(),
                },
            }}
        >
            <List>
                {SIDEBAR_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <ListItemButton
                            key={item.label}
                            onClick={() => onNavigate(item.path)}
                        >
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Drawer>
    );
}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(["persistent", "temporary"]).isRequired,
    onClose: PropTypes.func.isRequired,
    onNavigate: PropTypes.func.isRequired,
};
