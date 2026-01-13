import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { VideoProvider } from "./context/VideoProvider";
import { ErrorBoundary } from "./ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <VideoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </VideoProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
