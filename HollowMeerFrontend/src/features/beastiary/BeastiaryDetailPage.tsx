import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Beast } from "../../types/Beast";

type BeastResponse = {
    id: number;
    name: string;
    region: string;
    description: string
    drawing: string;
}

function BeastiaryDetailPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [beast, setBeasts] = useState<Beast | null>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);

    async function loadBeast() {
        try {
            const response = await fetch(`/beasts.json`);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data: BeastResponse[] = await response.json();
            const found = data.find((w) => w.id === Number(id));

            if (!found) {
                setError("Beast not found.");
                return;
            }

            setBeasts({
                id: found.id,
                name: found.name,
                region: found.region,
                description: found.description,
                drawing: found.drawing
            });
        } catch (err) {
            console.error(err);
            setError("Could not load this beast.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadBeast();
    }, [id]);

    async function deleteBeast(id: number) {
        try {
            const response = await fetch("/beasts.json", {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (!response.ok) {
                throw new Error(`Request failed with ${response.status}`);
            }
        } catch (err) {
            console.error(err);
            setError("Could not delete beast");
        } finally {
            setLoading(false);
        }
    }

    function onDelete() {
        if (beast) {
            deleteBeast(beast.id);
        }
        navigate("/beastiary");
    }

    if (error || !beast) {
        return <p>{error ?? "Weapon not found."}</p>;
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return(
        <>
            <div className="weapon-detail">
                <p><strong>Name: </strong>{beast.name}</p>
                <p><strong>Region: </strong>{beast.region}</p>
                <p><strong>Description: </strong>{beast.description}</p>
                {beast && (
                    <img src={beast.drawing ?? undefined} alt={beast.name} />
                )}
            </div>
            <Link to="/beastiary">Back to beastiary</Link>
            <button onClick={onDelete}>delete</button>
        </>
    );
}

export default BeastiaryDetailPage;