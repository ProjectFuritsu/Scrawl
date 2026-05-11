import { Routes, Route } from "react-router";
import OurStory from "./Pages/OurStory";
import NotFound from "./Pages/Error/NotFound";
import CloseWalls from "./Pages/Walls/CloseWalls";
import SeasonalWalls from "./Pages/Walls/SeasonalWalls";

export const BOARDS = [
  { label: "The Classic", path: "/wall", emoji: "🧱", isOpen: true },
  { label: "Valentine's", path: "/wall/valentines", emoji: "💝", isOpen: false },
  { label: "Christmas", path: "/wall/christmas", emoji: "🎄", isOpen: false },
  { label: "Halloween", path: "/wall/halloween", emoji: "🎃", isOpen: false },
];

function BoardRoute({ board }) {
  if (!board.isOpen) return <CloseWalls board={board} />;
  return <SeasonalWalls board={board} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SeasonalWalls />} />
      <Route path="/our-story" element={<OurStory />} />

      {/* Dynamically generate a route per board */}
      {BOARDS.map((board) => (
        <Route
          key={board.path}
          path={board.path}
          element={<BoardRoute board={board} />}
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
