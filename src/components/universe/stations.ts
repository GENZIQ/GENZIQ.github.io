// Pure data: every page of the site is a "station" somewhere in one shared 3D space.
// The camera flies between stations when the visitor changes page.

export type StationId = "home" | "about" | "products" | "innovation" | "careers" | "contact";

export interface Station {
  id: StationId;
  index: number;
  path: "/" | "/about" | "/products" | "/innovation" | "/careers" | "/contact";
  label: string;
  codename: string;
  position: [number, number, number];
}

const HOME: Station = { id: "home", index: 1, path: "/", label: "Home", codename: "Orbit", position: [0, 0, 0] };

export const STATIONS: Station[] = [
  HOME,
  { id: "about", index: 2, path: "/about", label: "About Us", codename: "Origin", position: [16, 4, -20] },
  { id: "products", index: 3, path: "/products", label: "Products", codename: "Blueprint", position: [-14, -3, -40] },
  { id: "innovation", index: 4, path: "/innovation", label: "Innovation", codename: "Lab", position: [12, -6, -60] },
  { id: "careers", index: 5, path: "/careers", label: "Careers", codename: "Launchpad", position: [-13, 2, -80] },
  { id: "contact", index: 6, path: "/contact", label: "Contact", codename: "Beacon", position: [0, 3, -100] },
];

export function stationForPath(pathname: string): Station {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return STATIONS.find((s) => s.path === clean) ?? HOME;
}

export function getStation(id: StationId): Station {
  return STATIONS.find((s) => s.id === id) ?? HOME;
}
