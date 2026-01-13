import axios from "axios";

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export async function searchVideos(query, maxResults = 12) {
  const apiKey = import.meta.env.VITE_YT_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_YT_API_KEY in .env");
  }

  const { data } = await youtube.get("/search", {
    params: {
      part: "snippet",
      q: query,
      type: "video",
      maxResults,
      key: apiKey,
    },
  });

  return data.items ?? [];
}
