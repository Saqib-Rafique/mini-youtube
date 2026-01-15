import { useCallback } from "react";
import { searchVideos } from "../api/youtube";

export function useVideoSearch(dispatch, searchFn = searchVideos) {
  const runSearch = useCallback(
    async (query) => {
      dispatch({ type: "SEARCH_START", payload: { query } });
      try {
        const items = await searchFn(query);
        dispatch({ type: "SEARCH_SUCCESS", payload: { videos: items } });
        return items;
      } catch (e) {
        dispatch({
          type: "SEARCH_ERROR",
          payload: { error: e?.message || "Search failed" },
        });
        return [];
      }
    },
    [dispatch, searchFn]
  );

  return { runSearch };
}
