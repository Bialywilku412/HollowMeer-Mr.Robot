import type { Beast } from "../../types/Beast";
import BeastRow from "./BeastiaryRow";
type BeastListProps = {
    beasts: Beast[];
}

function BeastiaryTable( {beasts} : BeastListProps) {
        return (
        <table className="beastiary">
            <tr className="header">
                <th>name</th>
                <th>region</th>
                <th>description</th>
                <th>drawing</th>
            </tr>
            {beasts.map((data) => (
               <BeastRow
                    key={data.id}
                    data={data}
                /> 
            ))}
        </table>
    );
}

export default BeastiaryTable;