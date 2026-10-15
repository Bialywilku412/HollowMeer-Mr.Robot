import { useNavigate } from "react-router";

export function Locations() { 
    const navigate = useNavigate();

    return (
        <>
            <button onClick={navigateToArmoury}>Armoury</button>
            <button onClick={navigateToQuests}>Quests</button>
            <button onClick={navigateToArchive}>Archive</button>
            <button onClick={navigateToYard}>Yard</button>
        </>
    )

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