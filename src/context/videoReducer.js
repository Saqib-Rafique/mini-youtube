export const initialState = {
  query: "",
  videos: [],
  selectedVideo: null,
  loading: false,
  error: null,
};

export function videoReducer(state, action) {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        loading: true,
        error: null,
        query: action.payload.query,
      };

    case "SEARCH_SUCCESS":
      return {
        ...state,
        loading: false,
        videos: action.payload.videos,
        selectedVideo: action.payload.videos?.[0] ?? null,
      };

    case "SEARCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case "SELECT_VIDEO":
      return {
        ...state,
        selectedVideo: action.payload.video,
      };

    default:
      return state;
  }
}
