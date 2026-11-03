import type { Weapon } from "../types/weapons";
import { baseUrl, errorFromResponse } from "./http";

type WeaponResponse = {
    id: number;
    name: string;
    type: string;
    condition: string;
    isDangerous: boolean;
    note: string;
}

function toWeapon(raw: WeaponResponse) : Weapon {
    return {
        id: raw.id,
        name: raw.name,
        type: raw.type,
        condition: raw.condition,
        isDangerous: raw.isDangerous,
        note: raw.note
    }
}

export async function getAll(): Promise<Weapon[]> {
    const response = await fetch(`${baseUrl}/api/weapons`);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: WeaponResponse[] = await response.json();
    return raw.map(toWeapon);
}

export async function getById(id: number) : Promise<Weapon> {
    const response = await fetch(`${baseUrl}/api/weapons/${id}`);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: WeaponResponse = await response.json();
    return toWeapon(raw);
}

export async function deleteById(id: number) : Promise<void> {
    const response = await fetch(`${baseUrl}/api/weapons/${id}`, {
        method: "DELETE"
    });
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
}