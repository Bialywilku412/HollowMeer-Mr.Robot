import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Beast } from "../../types/Beast";
import "../armoury/Armoury.css";

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
    const [beast, setBeast] = useState<Beast | null>(null);
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

            setBeast({
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

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || !beast) {
        return <p>{error ?? "Beast not found."}</p>;
    }

    return(
        <>

            <div className="parchment">
                <h2>{beast.name}</h2>
                <dl className="weapon-stats">
                    <dt>Region</dt> <dd>{beast.region}</dd>
                    <dt>Description</dt> <dd>{beast.description}</dd>
                </dl>
                {beast.drawing && (
                        <img className="beast-drawing" src={beast.drawing} alt={beast.name} />
                    )}
                <div className="detail-actions">
                    <Link className="btn" to="/beastiary">Back to beastiary</Link>
                    <button className="btn btn--danger" onClick={onDelete}>delete</button>
                </div>
            </div>
        </>
    );
}

export default BeastiaryDetailPage;