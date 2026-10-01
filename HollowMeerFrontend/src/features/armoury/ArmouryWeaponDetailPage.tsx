import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Weapon } from "./weapons";


function ArmouryWeaponDetailPage()
{
    const {weaponId} = useParams();
    const [weapons, setWeapons] = useState<Weapon[]>([]);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);

    async function fetchWeapons() {
        try {
            const response = await fetch("/weapons.json");
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const data = await response.json();
            setWeapons(data);
        } catch (err) {
            console.error(err);
            setError("Could not load products. ");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWeapons();
    }, [])

    const weapon = weapons.find((w) => w.id === Number(weaponId));

    if (!weapon) {
        return <p>Weapon not found</p>;
    }

    if (error) {
        return <p>{error}</p>;
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
        </>
    );
}

export default ArmouryWeaponDetailPage;