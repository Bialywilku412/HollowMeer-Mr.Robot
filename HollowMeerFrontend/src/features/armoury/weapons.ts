export type Weapon = {
    id: number;
    name: string;
    type: string;
    condition: string
    isDangerous: boolean;
    note: string;
}

export const weapons: Weapon[] = [
    { id: 1, name: "excalibur12", type: "sword", condition: "bad", isDangerous: true, note: "aaaa" },
    { id: 2, name: "excaliburasd", type: "sword", condition: "bad", isDangerous: true, note: "aaaa" },
    { id: 3, name: "excaliburczx", type: "sword", condition: "bad", isDangerous: true, note: "aaaa" },
    { id: 4, name: "excaliburasdqw", type: "sword", condition: "bad", isDangerous: true, note: "aaaa" },
];
