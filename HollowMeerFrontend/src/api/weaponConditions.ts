import type { WeaponCondition } from "../types/WeaponCondition";
import { baseUrl, errorFromResponse } from "./http";

export async function getAll() : Promise<WeaponCondition[]> {
    const response = await fetch(`${baseUrl}/api/weaponConditions`);
    if (!response.ok) {
        throw await errorFromResponse(response);
    }
    return response.json();
}