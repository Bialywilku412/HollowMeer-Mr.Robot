import { Routes, Route } from "react-router";
import { HomePage } from "./pages/Homepage";
import Armoury from "./features/armoury/ArmouryPage";
import ArmouryWeaponDetailPage from "./features/armoury/ArmouryWeaponDetailPage";
import { Layout } from "./components/Layout";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="armoury" element={<Armoury />} />
          <Route path="armoury/:id" element={<ArmouryWeaponDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
  );
}