import { Link } from "react-router";
import "./LocationsCss.css";

type MapLocation = {
    name: string,
    path: string,
    x: number,
    y: number,
    cx: number,
    cy: number,
    icon: string
}

const locations: MapLocation[] = [
    {name: "Armoury", path: "/armoury", x: 16, y: 19, cx: 28, cy: 42, icon: "/icons/armoury.svg"},
    {name: "Quests", path: "/quests", x: 88, y: 26, cx: 74, cy: 22, icon: "/icons/quest.svg"},
    {name: "Archive", path: "/archive", x: 15, y: 81, cx: 42, cy: 80, icon: "/icons/archive.svg"},
    {name: "Yard", path: "/yard", x: 70, y: 89, cx: 50, cy: 85, icon: "/icons/yard.svg"},
];

export function Locations() { 
    return (
        <main className="locations-page">
            <div className="world-map parchment">
                <svg viewBox="0 0 100 100" className="map-roads" aria-hidden="true" preserveAspectRatio="none">
                    {locations.map((location => (
                        <path
                        key={location.path}
                        d={`M 49 43 Q ${location.cx} ${location.cy} ${location.x} ${location.y}`}
                        stroke="var(--color-ink-light)"
                        strokeWidth={2}
                        strokeDasharray="8 6"
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                    />
                    )))}
                </svg>
                <div className="guild-hall">
                    <span className="seal seal--guild" aria-hidden="true"><img src="/icons/guild.svg" alt="" className="seal-icon" /></span>
                    <span className="location-name">Guild Hall</span>
                </div>
                {locations.map((location) => (
                    <Link 
                        key={location.path}
                        to={location.path}
                        className="location"
                        style={{left: `${location.x}%`, top: `${location.y}%`}}   
                    >
                        <span className="seal" aria-hidden="true"><img src={location.icon} alt="" className="seal-icon" /></span>
                        <span className="location-name">{location.name}</span>
                    </Link>
                ))}
            </div>
        </main>
    );
}