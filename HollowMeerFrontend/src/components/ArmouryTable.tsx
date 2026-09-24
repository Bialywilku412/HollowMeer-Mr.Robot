import type { Weapon } from "../features/armoury/ArmouryPage";
import { useNavigate } from "react-router";
import "../Armoury.css"
import ArmouryRow from "./ArmouryTableRow";

type WeaponListProps = {
    weapons: Weapon[];
}

function ArmouryTable({ weapons }: WeaponListProps) {

    return (
        <table className="armoury">
            <tr className="header">
                <th>name</th>
                <th>type</th>
                <th>condition</th>
                <th>dangerous</th>
                <th>note</th>
            </tr>
            {weapons.map((data) => (
               <ArmouryRow
                    key={data.id}
                    data={data}
                /> 
            ))}
        </table>
    );
}

export default ArmouryTable;