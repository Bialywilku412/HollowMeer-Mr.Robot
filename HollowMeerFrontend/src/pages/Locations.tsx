import { useNavigate } from "react-router";
import "./LocationsCss.css";

export function Locations() { 
    const navigate = useNavigate();

    return (
        <main className="locations-page">
        <div className="locations-grid">
            <button className="armory" onClick={navigateToArmoury}>Armoury</button>
            <button className="quests" onClick={navigateToQuests}>Quests</button>
            <button  className="archive"onClick={navigateToArchive}>Archive</button>
            <button className="yard" onClick={navigateToYard}>Yard</button>
        </div>
        </main>
    );

    function navigateToArmoury() {
        navigate("/armoury");
    }
    function navigateToQuests() {
        navigate("/quests");
    }
    function navigateToArchive() {
        navigate("/archive");
    }
    function navigateToYard() {
        navigate("/yard");
    }
}