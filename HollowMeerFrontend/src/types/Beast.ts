import type { Region } from "./Region"

export type Beast = {
    id: number,
    name: string,
    region: Region,
    description: string,
    imageUrl: string | null
}