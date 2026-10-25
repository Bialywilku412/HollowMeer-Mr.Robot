import { type Weapon } from "./weapons";
import ArmouryRow from "./ArmouryTableRow";

type WeaponListProps = {
    weapons: Weapon[];
}

function ArmouryTable({ weapons }: WeaponListProps) {

    return (
        <table className="armoury">
            <thead>
                <tr>
                    <th>name</th>
                    <th>type</th>
                    <th>condition</th>
                    <th>dangerous</th>
                </tr>
            </thead>
            <tbody>
                {weapons.map((data) => (
                <ArmouryRow
                        key={data.id}
                        data={data}
                    /> 
                ))}
            </tbody>
        </table>
    );
}

export default ArmouryTable;