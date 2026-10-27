import type { Beast } from "../../types/Beast";
import BeastRow from "./BeastiaryRow";

type BeastListProps = {
    beasts: Beast[];
}

function BeastiaryTable( {beasts} : BeastListProps) {

    return (
        <table className="armoury">
            <thead>
                <tr>
                    <th>name</th>
                    <th>region</th>
                    <th>drawing</th>
                </tr>
            </thead>
            <tbody>
                {beasts.map((data) => (
                <BeastRow
                        key={data.id}
                        data={data}
                    /> 
                ))}
            </tbody>
        </table>
    );
}

export default BeastiaryTable;