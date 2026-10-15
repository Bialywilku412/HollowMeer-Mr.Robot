import { useParams } from "react-router";
import yardDaysData from "./YardSchedulingYearDayData.json";

export function YardScheduleDayDetailPage() {
    const { id } = useParams();
    const day = yardDaysData.find((d) => d.id === Number(id));

    return (
         <div>
            <h1>Yard Day Detail</h1>
            <p>ID: {day.id}</p>
            <p>Week Day: {day.weekDay}</p>
            <p>Date: {day.date}</p>
            <p>Week: {day.week}</p>
        </div>
    )
}