import { type YardDay } from "./YardDay";
import { YardSchedulingTableRow } from "./YardSchedulingTableRow";

type YardDayListProps = {
    YardDays: YardDay[]
}

export function YardSchedulingTable({ YardDays }: YardDayListProps) {
    return (
        <table>
            <tr>
                <th>Week day</th>
                <th>Date</th>
            </tr>
            {YardDays.map((YardDay) => (
                <YardSchedulingTableRow
                    key={YardDay.id}
                    data={YardDay}
                />
            ))}
        </table>
    )
}