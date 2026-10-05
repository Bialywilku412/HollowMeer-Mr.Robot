import "./QuestPage.css"
export type Quest = {
    id: number;
    name: string;
    Host: string;
    description: string;
    Date: string;
}
function QuestPage()

{
    const quests: Quest[] = [
        { id: 1, name: "Quest 1", Host: "Admin", description: "Description of Quest 1", Date: "3" },
        { id: 2, name: "Quest 2", Host: "Trader", description: "Description of Quest 2", Date: "4" },
        { id: 3, name: "Quest 3", Host: "Trainer", description: "Description of Quest 3", Date: "1" },
    ];
    return (
        <div>
            <h1>Quest Page</h1>
            <p>Welcome to the Quest Page!</p>
            <div className="quest-container">
            {quests.map((quest) => (
                <div key={quest.id} className="quest-card">
                    <h2>{quest.name}</h2>
                    <p><strong>Host:</strong> {quest.Host}</p>
                    <p><strong>Description:</strong> {quest.description}</p>
                    <p><strong>Date:</strong> {quest.Date}</p>
                </div>
            ))}
            </div>
        </div>
    );
}
export default QuestPage;