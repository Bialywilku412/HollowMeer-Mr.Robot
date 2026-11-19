import type { WeaponCondition } from "./WeaponCondition"
import type { WeaponType } from "./WeaponType"

export type Weapon = {
    id: number,
    name: string,
    weaponType: WeaponType,
    weaponCondition: WeaponCondition,
    isDangerous: boolean,
    note: string
}