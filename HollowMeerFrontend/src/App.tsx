import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import { HomePage } from "./pages/Homepage";
import Armoury from "./features/armoury/ArmouryPage";
import QuestPage from "./features/Quest/QuestPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="armoury" element={<Armoury />} />
          <Route path="quest" element={<QuestPage />} />
      </Routes>
    </>
  );
}