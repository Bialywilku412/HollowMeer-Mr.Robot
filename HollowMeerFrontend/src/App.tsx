import { Routes, Route } from "react-router";
import { HomePage } from "./pages/Homepage";
import Armoury from "./features/armoury/ArmouryPage";
import ArmouryWeaponDetailPage from "./features/armoury/ArmouryWeaponDetailPage";
import { Layout } from "./components/Layout";
import { NotFoundPage } from "./components/NotFoundPage";
import BeastiaryPage from "./features/beastiary/BeastiaryPage";
import BeastiaryDetailPage from "./features/beastiary/BeastiaryDetailPage";
import { QuestPage } from "./features/Quest/QuestPage";
import { YardPage } from "./features/yard/YardPage";
import { YardScheduling } from "./features/yard/YardScheduling";
import { YardScheduleDayDetailPage } from "./features/yard/YardScheduleDayDetailPage";
import { QuartermasterFunctions } from "./features/yard/QuartermasterFunctions";
import { YardBooking } from "./features/yard/YardBooking";
import Archive from "./features/archive/ArchivePage";


export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="armoury" element={<Armoury />} />
          <Route path="archive" element={<Archive />} />
          <Route path="armoury/:id" element={<ArmouryWeaponDetailPage />} />
          <Route path="beastiary" element={<BeastiaryPage />}/>
          <Route path="beastiary/:id" element={<BeastiaryDetailPage />} />
          <Route path="quests" element ={<QuestPage />} />
          
          <Route path="yard" element={<YardPage />} />
          <Route path="yard/YardScheduling" element={<YardScheduling />} />
          <Route path="yard/QuartermasterFunctions" element={<QuartermasterFunctions />} />
          <Route path="yard/YardBooking" element={<YardBooking />} />
          <Route path="yard/:id" element={<YardScheduleDayDetailPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
  );
}