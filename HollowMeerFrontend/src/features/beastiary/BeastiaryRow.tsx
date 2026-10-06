import { useNavigate } from "react-router";
import type { Beast } from "../../types/Beast";

type BeastRowProps = {
    data: Beast
}

function BeastRow({data: { id, name ,region, description, drawing}}: BeastRowProps)
{
    const navigate = useNavigate();

    function navigateToWeapon() {
        navigate(`/beastiary/${id}`);
    }

    return(     
        <tr onClick={navigateToWeapon}>
            <td>{name}</td>
            <td>{region}</td>
            <td>{description}</td>
            <td >
                {drawing == null ? "no" : "yes"}
            </td>
        </tr>
    )
}

export default BeastRow