import { useNavigate } from "react-router";
import { type Weapon } from "./weapons";

type ArmouryRowProps = {
    data: Weapon
}

function ArmouryRow({data: { id, name ,type, condition, dangerous, note }}: ArmouryRowProps)
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
            <td>{dangerous ? "yes" : "no"}</td>
            <td>{note}</td>
        </tr>
    )
}

export default ArmouryRow