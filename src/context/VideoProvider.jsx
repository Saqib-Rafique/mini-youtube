import React, { useMemo, useReducer } from "react";
import { VideoContext } from "./VideoContext";
import { initialState, videoReducer } from "./videoReducer";

export function VideoProvider({ children }) {
    const [state, dispatch] = useReducer(videoReducer, initialState);
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}
