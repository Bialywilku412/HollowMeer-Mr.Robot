import { useEffect, useState } from "react";
import type { Beast } from "../../types/Beast";
import BeastiaryTable from "./BeastiaryTabel";
import BeastAddModal from "./BeastiaryAddModal";

function BeastiaryPage() {
    const [beasts, setBeasts] = useState<Beast[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

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

    async function AddBeast(newBeast: Omit<Beast, "id">) {
        try {
            const response = await fetch("/beasts.json", {
                method: "POST",
                body: JSON.stringify(newBeast)
            });
            if (!response.ok) {
                throw new Error(`Request failed with ${response.status}`);
            }
            setBeasts((prev) => [
                ...prev,
                { ...newBeast, id: Math.max(0, ...prev.map((beast) => beast.id)) + 1},
            ])
        } catch (err) {
            console.error(err);
            setError("Could not add beast");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBeasts();
    }, []);

    if (loading) {
        return <p>Loading beasts...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    return(
        <>
            <button onClick={() => setShowModal(true)}>Add</button>
            <BeastAddModal
                show={showModal}
                setShow={setShowModal}
                onAdd={AddBeast}
            />
            <BeastiaryTable
                beasts={beasts}
            />
        </>
    );
}

export default BeastiaryPage;