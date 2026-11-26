import type { Beast } from "../types/Beast";
import { baseUrl, errorFromResponse } from "./http";

type BeastResponse = {
    id: number;
    name: string;
    region: { id: number; name: string };
    description: string;
    imageUrl: string
}

export type BeastData = {
    name: string;
    regionId: number;
    description: string;
    imageUrl: string;
}

function toBeast(raw: BeastResponse): Beast {
    return {
        id: raw.id,
        name: raw.name,
        region: raw.region,
        description: raw.description,
        imageUrl: raw.imageUrl
    };
}

function toRequestBody(data: BeastData) {
    return {
        name: data.name,
        regionId: data.regionId,
        description: data.description,
        imageUrl: data.imageUrl
    }
}

export async function getAll(search?: string): Promise<Beast[]> {
    const url = search
        ? `${baseUrl}/api/beasts?search=${encodeURIComponent(search)}`
        : `${baseUrl}/api/beasts`;
    const response = await fetch(url);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: BeastResponse[] = await response.json();
    return raw.map(toBeast);
}

export async function getById(id: number): Promise<Beast> {
    const response = await fetch(`${baseUrl}/api/beasts/${id}`);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: BeastResponse = await response.json();
    return toBeast(raw);
}

export async function update(id: number, data: BeastData): Promise<Beast> {
    const response = await fetch(`${baseUrl}/api/beasts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRequestBody(data)),
    });
    if (!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: BeastResponse = await response.json();
    return toBeast(raw);
}

export async function remove(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/api/beasts/${id}`, {
        method: "DELETE"
    });
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
}

export async function create(data: BeastData) : Promise<Beast> {
    const response = await fetch(`${baseUrl}/api/beasts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRequestBody(data)),
    });
    if(!response.ok) {
        throw await errorFromResponse(response);
    }

    const raw: BeastResponse = await response.json();
    return toBeast(raw);
}