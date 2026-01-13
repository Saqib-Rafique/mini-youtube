import { useContext } from "react";
import { VideoContext } from "./VideoContext";

export function useVideo() {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("useVideo must be used inside VideoProvider");
  return ctx;
}
