import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const WatchPage = lazy(() => import("./pages/WatchPage"));

export default function App() {
  return (
    <Suspense fallback={<Loader label="Loading page..." />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:videoId" element={<WatchPage />} />
      </Routes>
    </Suspense>
  );
}
