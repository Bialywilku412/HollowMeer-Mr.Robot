import { useNavigate } from "react-router";
import type { Weapon } from "../../types/Weapon";

type ArmouryRowProps = {
    data: Weapon
}

function ArmouryRow({data: { id, name, weaponType, weaponCondition, isDangerous }}: ArmouryRowProps)
{
    const navigate = useNavigate();

    function navigateToWeapon() {
        navigate(`/armoury/${id}`);
    }

    return(     
        <tr className="row" onClick={navigateToWeapon}>
            <td>{name}</td>
            <td>{weaponType.name}</td>
            <td>{weaponCondition.name}</td>
            <td className="dangerous" data-dangerous={isDangerous}>
                {isDangerous ? "yes" : "no"}
            </td>
        </tr>
    )
}

export default ArmouryRow