export type StationId = "home" | "about" | "services" | "products" | "innovation" | "careers" | "partnerships" | "contact";

export interface Station {
  id: StationId;
  index: number;
  path: "/" | "/about" | "/services" | "/products" | "/innovation" | "/careers" | "/partnerships" | "/contact";
  label: string;
  codename: string;
  position: [number, number, number];
}

const HOME: Station = { id: "home", index: 1, path: "/", label: "Home", codename: "Orbit", position: [0, 0, 0] };

export const STATIONS: Station[] = [
  HOME,
  { id: "about", index: 2, path: "/about", label: "About", codename: "Origin", position: [16, 4, -20] },
  { id: "services", index: 3, path: "/services", label: "Services", codename: "Workshop", position: [4, -4, -38] },
  { id: "products", index: 4, path: "/products", label: "Products", codename: "Blueprint", position: [-14, -3, -56] },
  { id: "innovation", index: 5, path: "/innovation", label: "Innovation", codename: "Lab", position: [12, -6, -74] },
  { id: "careers", index: 6, path: "/careers", label: "Careers", codename: "Launchpad", position: [-13, 2, -92] },
  { id: "partnerships", index: 7, path: "/partnerships", label: "Partnerships", codename: "Alliance", position: [8, 5, -110] },
  { id: "contact", index: 8, path: "/contact", label: "Contact", codename: "Beacon", position: [0, 3, -128] },
];

export function stationForPath(pathname: string): Station {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return STATIONS.find((s) => s.path === clean) ?? HOME;
}

export function getStation(id: StationId): Station {
  return STATIONS.find((s) => s.id === id) ?? HOME;
}
