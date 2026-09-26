import ArmouryTable from "./ArmouryTable";
import { weapons } from "./weapons";

function Armoury() {
    return (
        <>
            <ArmouryTable
                weapons={weapons}
            />
        </>
    );
}
export default Armoury;