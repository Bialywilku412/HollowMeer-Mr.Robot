import type { Weapon } from "../types/Weapon";
import { baseUrl, errorFromResponse } from "./http";

type WeaponResponse = {
    id: number;
    name: string;
    weaponType: { id: number; name: string };
    weaponCondition: { id: number; name: string };
    isDangerous: boolean;
    note: string
}

export type WeaponData = {
    name: string;
    weaponTypeId: number;
    weaponConditionId: number;
    isDangerous: boolean;
    note: string;
}

function toWeapon(raw: WeaponResponse): Weapon {
    return {
        id: raw.id,
        name: raw.name,
        weaponType: raw.weaponType,
        weaponCondition: raw.weaponCondition,
        isDangerous: raw.isDangerous,
        note: raw.note
    };
}

function toRequestBody(data: WeaponData) {
    return {
        name: data.name,
        weaponTypeId: data.weaponTypeId,
        weaponConditionId: data.weaponConditionId,
        isDangerous: data.isDangerous,
        note: data.note
    }
}

export async function getAll(search?: string): Promise<Weapon[]> {
    const url = search
        ? `${baseUrl}/api/weapons?search=${encodeURIComponent(search)}`
        : `${baseUrl}/api/weapons`;
    const response = await fetch(url);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: WeaponResponse[] = await response.json();
    return raw.map(toWeapon);
}

export async function getById(id: number): Promise<Weapon> {
    const response = await fetch(`${baseUrl}/api/weapons/${id}`);
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: WeaponResponse = await response.json();
    return toWeapon(raw);
}

export async function update(id: number, data: WeaponData): Promise<Weapon> {
    const response = await fetch(`${baseUrl}/api/weapons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRequestBody(data)),
    });
    if (!response.ok) {
        throw await errorFromResponse(response);
    }
    const raw: WeaponResponse = await response.json();
    return toWeapon(raw);
}

export async function remove(id: number): Promise<void> {
    const response = await fetch(`${baseUrl}/api/weapons/${id}`, {
        method: "DELETE"
    });
    if(!response.ok) {
        throw await errorFromResponse(response);
    }
}

export async function create(data: WeaponData) : Promise<Weapon> {
    const response = await fetch(`${baseUrl}/api/weapons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRequestBody(data)),
    });
    if(!response.ok) {
        throw await errorFromResponse(response);
    }

    const raw: WeaponResponse = await response.json();
    return toWeapon(raw);
}