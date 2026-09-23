import ArmouryTable from "../../components/ArmouryTable";
export type Weapon = {
    name: string;
    type: string;
    condition: string
    dangerous: boolean;
    note: string;

}
function Armoury() {
    const weapons: Weapon[] = [
        { name: "excalibur", type: "sword", condition: "bad", dangerous: true, note: "aaaa"},
        { name: "excalibur", type: "sword", condition: "bad", dangerous: true, note: "aaaa"},
        { name: "excalibur", type: "sword", condition: "bad", dangerous: true, note: "aaaa"},
        { name: "excalibur", type: "sword", condition: "bad", dangerous: true, note: "aaaa"},
    ];

    return (
        <>
            <ArmouryTable
                weapons={weapons}
            />
        </>
    );
}
export default Armoury;