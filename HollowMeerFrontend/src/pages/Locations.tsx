import { useNavigate } from "react-router";
import "./LocationsCss.css";

export function Locations() { 
    const navigate = useNavigate();

    return (
        <div className="locations-grid">
            <button onClick={navigateToArmoury}>Armoury</button>
            <button onClick={navigateToQuests}>Quests</button>
            <button onClick={navigateToArchive}>Archive</button>
            <button onClick={navigateToYard}>Yard</button>
        </div>
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