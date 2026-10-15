export type Report = {
    questName: string,
    region: string,
    departure: Date,
    status: "Completed" | "Draft",
    action: string
}