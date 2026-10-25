import { useNavigate } from "react-router";
import type { Beast } from "../../types/Beast";

type BeastRowProps = {
    data: Beast
}

function BeastRow({data: { id, name ,region, drawing}}: BeastRowProps)
{
    const navigate = useNavigate();

    function navigateToBeast() {
        navigate(`/beastiary/${id}`);
    }
    
    return(     
        <tr className="row" onClick={navigateToBeast}>
            <td>{name}</td>
            <td>{region}</td>
            <td >
                {drawing ? "no" : "yes"}
            </td>
        </tr>
    )
}

export default BeastRow