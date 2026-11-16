import type { Region } from "../types/Region";
import { baseUrl, errorFromResponse } from "./http";

export async function getAll() : Promise<Region[]> {
    const response = await fetch(`${baseUrl}/api/regions`);
    if (!response.ok) {
        throw await errorFromResponse(response);
    }
    return response.json();
}