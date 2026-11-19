import type { WeaponType } from "../types/WeaponType";
import { baseUrl, errorFromResponse } from "./http";

export async function getAll() : Promise<WeaponType[]> {
    const response = await fetch(`${baseUrl}/api/weaponTypes`);
    if (!response.ok) {
        throw await errorFromResponse(response);
    }
    return response.json();
}