import type { Weapon } from "../features/armoury/ArmouryPage";
import "../Armoury.css"

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
            {weapons.map((weapon) => (
                <tr className="row">
                <td>{weapon.name}</td>
                <td>{weapon.type}</td>
                <td>{weapon.condition}</td>
                <td>{weapon.dangerous ? "yes" : "no"}</td>
                <td>{weapon.note}</td>
            </tr>
            ))}
        </table>
    );
}

export default ArmouryTable;