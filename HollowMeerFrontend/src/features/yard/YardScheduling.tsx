import { useState } from "react";
import { YardSchedulingTable } from "./YardSchedulingTable";
import yardDaysData from "./YardSchedulingYearDayData.json";

export function YardScheduling() {
    const [currentWeek, setCurrentWeek] = useState(1);
    const currentWeekDays = yardDaysData.filter((day) => day.week === currentWeek);


    return (
        <div>
            <h1>Yard Schedule - Week {currentWeek}</h1>

            <div>
                <button onClick={handlePreviousWeek}>Previous Week</button>
                <button onClick={handleNextWeek}>Next Week</button>
            </div>

            <YardSchedulingTable YardDays={currentWeekDays} />
        </div>
    )

    function handleNextWeek() {
        setCurrentWeek((prevWeek) => prevWeek + 1);
    }

    function handlePreviousWeek() {
        setCurrentWeek((prevWeek) => Math.max(prevWeek - 1, 1));
    }
}