import { useNavigate } from "react-router";
import bookingImage from "./YardImages/TrainingYardTrainingsImage.jpg";
import scheduleLesonImage from "./YardImages/YardSheduleClass.jpg";
import YardQuartermasterFunctionsImage from "./YardImages/YardQuartermasterFunctionsImage.jpg";
import "./yardCss/YardMainPage.css";

export function YardPage() {

    const navigate = useNavigate();

    return (
        <div className="yard-page-container">
            <h1>Yard Page</h1>
            <p>Some things that you can do in the yard</p>

            <div className="yard-card">
                <img src={bookingImage} alt="Training Yard Booking" className="yard-image" />

                <div className="yard-card-content">
                    <h2>Training Yard Booking</h2>
                    <p>View training session and book training sessions.</p>

                    <button onClick={navigateToBooking}>Book Now</button>
                </div>
            </div>

            <br/>

            <div className="yard-card">
                <img src={scheduleLesonImage} alt="Schedule a Class" className="yard-image" />
                <div className="yard-card-content">
                    <h2>Schedule a Class</h2>
                    <p>View schedules weekly and schdule classes.</p>

                    <button onClick={navigateToScheduling}>Manage Schedule</button>
                </div>
            </div>

            <br />

            <div className="yard-card">
                <img src={YardQuartermasterFunctionsImage} alt="Quartermaster Functions" className="yard-image" />
                <div className="yard-card-content">
                    <h2>Quartermaster Functions</h2>
                    <p>Quartermaster managing yard and training sessions.</p>

                    <button onClick={navigateToQuartermasterFunctions}>Open Functions</button>
                </div>
            </div>
        </div>
    )

    function navigateToBooking() {
        navigate("/yard/YardBooking");
    }
    function navigateToScheduling() {
        navigate("/yard/YardScheduling");
    }
    function navigateToQuartermasterFunctions() {
        navigate("/yard/QuartermasterFunctions");
    }
}