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
            {weaponId}
        </>
    );
}

export default ArmouryWeaponDetailPage;