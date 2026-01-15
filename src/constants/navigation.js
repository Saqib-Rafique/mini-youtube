import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

export const SIDEBAR_ITEMS = [
  { label: "Home", icon: HomeIcon, path: "/" },
  { label: "Trending", icon: WhatshotIcon, path: "/?tab=trending" },
  {
    label: "Subscriptions",
    icon: SubscriptionsIcon,
    path: "/?tab=subscriptions",
  },
  { label: "Library", icon: VideoLibraryIcon, path: "/?tab=library" },
];
