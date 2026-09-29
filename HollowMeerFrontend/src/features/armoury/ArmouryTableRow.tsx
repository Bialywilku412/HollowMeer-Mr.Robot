import { useNavigate } from "react-router";
import { type Weapon } from "./weapons";

type ArmouryRowProps = {
    data: Weapon
}

function ArmouryRow({data: { id, name ,type, condition, isDangerous, note }}: ArmouryRowProps)
{
    const navigate = useNavigate();

    function navigateToWeapon() {
        navigate(`/armoury/${id}`);
    }

    return(     
        <tr className="row" onClick={navigateToWeapon}>
            <td>{name}</td>
            <td>{type}</td>
            <td>{condition}</td>
            <td>{isDangerous ? "yes" : "no"}</td>
            <td>{note}</td>
        </tr>
    )
}

export default ArmouryRow