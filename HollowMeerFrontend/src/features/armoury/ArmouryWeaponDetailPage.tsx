import { useParams } from "react-router";
import { weapons } from "./weapons";


function ArmouryWeaponDetailPage()
{
    const {weaponId} = useParams();
    const weapon = weapons.find((w) => w.id === Number(weaponId));

    if(!weapon) {
        return <p>Weapon not found</p>;
    }

    return(
        <>
            <div className="weapon-detail">
                <p><strong>Name:</strong>{weapon.type}</p>
                <p><strong>Type:</strong>{weapon.type}</p>
                <p><strong>Condtition:</strong>{weapon.condition}</p>
                <p><strong>Dangerous:</strong>{weapon.dangerous ? "yes" : "no"}</p>
                <p><strong>Note:</strong>{weapon.note}</p>
            </div>
        </>
    );
}

export default ArmouryWeaponDetailPage;