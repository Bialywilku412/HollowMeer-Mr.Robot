import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Weapon } from "./weapons";

type WeaponResponse = {
    id: number;
    name: string;
    type: string;
    condition: string
    isDangerous: boolean;
    note: string;
}

function ArmouryWeaponDetailPage()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);

    async function loadWeapon() {
        try {
            const response = await fetch(`/weapons.json`);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data: WeaponResponse[] = await response.json();
            const found = data.find((w) => w.id === Number(id));

            if (!found) {
                setError("Weapon not found.");
                return;
            }

            setWeapon({
                id: found.id,
                name: found.name,
                type: found.type,
                condition: found.condition,
                isDangerous: found.isDangerous,
                note: found.note,
            });
        } catch (err) {
            console.error(err);
            setError("Could not load this weapon.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadWeapon();
    }, [id]);

    async function deleteWeapon(id: number) {
        try {
            const response = await fetch("/weapons.json", {
                method: "DELETE",
                body: JSON.stringify({ id })
            });
            if (!response.ok) {
                throw new Error(`Request failed with ${response.status}`);
            }
        } catch (err) {
            console.error(err);
            setError("Couldn't delete weapon");
        } finally {
            setLoading(false);
        }
    }

    function onDelete() {
        if (weapon) {
            deleteWeapon(weapon.id);
        }
        navigate("/armoury");
    }

    if (error || !weapon) {
        return <p>{error ?? "Weapon not found."}</p>;
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return(
        <>
            <div className="weapon-detail">
                <p><strong>Name:</strong>{weapon.name}</p>
                <p><strong>Type:</strong>{weapon.type}</p>
                <p><strong>Condtition:</strong>{weapon.condition}</p>
                <p><strong>Dangerous:</strong>{weapon.isDangerous ? "yes" : "no"}</p>
                <p><strong>Note:</strong>{weapon.note}</p>
            </div>
            <Link to="/armoury">Back to weapons</Link>
            <button onClick={onDelete}>delete</button>
        </>
    );
}

export default ArmouryWeaponDetailPage;