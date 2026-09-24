import { useNavigate } from "react-router";

function ArmouryRow({data: { id, name ,type, condition, dangerous, note }})
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