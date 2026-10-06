import { useEffect, useState } from "react";
import type { Beast } from "../../types/Beast";
import BeastiaryTable from "./BeastiaryTabel";

function BeastiaryPage() {
    const [beasts, setBeasts] = useState<Beast[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchBeasts() {
        try {
            const response = await fetch("/beasts.json");
            if(!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            setBeasts(data);
        } catch (err) {
            console.error(err);
            setError("Could not load beasts");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBeasts();
    }, []);

    return(
        <>
            <BeastiaryTable
                beasts={beasts}
            />
        </>
    );
}

export default BeastiaryPage;