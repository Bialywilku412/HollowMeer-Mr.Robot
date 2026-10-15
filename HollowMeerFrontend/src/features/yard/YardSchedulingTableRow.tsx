import { useNavigate } from "react-router";
import { type YardDay } from "./YardDay";

type YardDayProps = {
    data: YardDay
}

export function YardSchedulingTableRow({ data: { id, weekDay, date, week } }: YardDayProps) {
    const navigate = useNavigate();

    function navigateToYardDay() {
        navigate(`/yard/${id}`);
    }

    return (
        <tr className="row" onClick={navigateToYardDay}>
            <td>{weekDay}</td>
            <td>{date}</td>
            <td>{week}</td>
        </tr>
    )
}