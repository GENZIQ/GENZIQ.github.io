// Pure data: every page of the site is a "station" somewhere in one shared 3D space.
// The camera flies between stations when the visitor changes page.

export type StationId =
  | "home"
  | "about"
  | "services"
  | "products"
  | "innovation"
  | "careers"
  | "partnerships"
  | "contact"
  | "privacy"
  | "terms";

export interface Station {
  id: StationId;
  index: number;
  path:
    | "/"
    | "/about"
    | "/services"
    | "/products"
    | "/innovation"
    | "/careers"
    | "/partnerships"
    | "/contact"
    | "/privacy"
    | "/terms";
  label: string;
  codename: string;
  position: [number, number, number];
}

const HOME: Station = {
  id: "home",
  index: 1,
  path: "/",
  label: "Home",
  codename: "Orbit",
  position: [0, 0, 0],
};

export const STATIONS: Station[] = [
  HOME,
  {
    id: "about",
    index: 2,
    path: "/about",
    label: "About",
    codename: "Origin",
    position: [16, 4, -20],
  },
  {
    id: "services",
    index: 3,
    path: "/services",
    label: "Services",
    codename: "Solutions",
    position: [-14, 5, -40],
  },
  {
    id: "products",
    index: 4,
    path: "/products",
    label: "Products",
    codename: "Projects",
    position: [14, -3, -60],
  },
  {
    id: "innovation",
    index: 5,
    path: "/innovation",
    label: "Innovation",
    codename: "Lab",
    position: [-12, -6, -80],
  },
  {
    id: "careers",
    index: 6,
    path: "/careers",
    label: "Careers",
    codename: "Hiring",
    position: [13, 2, -100],
  },
  {
    id: "partnerships",
    index: 7,
    path: "/partnerships",
    label: "Partnerships",
    codename: "Alliance",
    position: [-13, 4, -120],
  },
  {
    id: "contact",
    index: 8,
    path: "/contact",
    label: "Contact",
    codename: "Beacon",
    position: [0, 3, -140],
  },
];

export const LEGAL_STATIONS: Station[] = [
  {
    id: "privacy",
    index: 9,
    path: "/privacy",
    label: "Privacy Policy",
    codename: "Privacy",
    position: [0, 3, -140],
  },
  {
    id: "terms",
    index: 10,
    path: "/terms",
    label: "Terms of Service",
    codename: "Terms",
    position: [0, 3, -140],
  },
];

export function stationForPath(pathname: string): Station {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (
    STATIONS.find((s) => s.path === clean) ?? LEGAL_STATIONS.find((s) => s.path === clean) ?? HOME
  );
}

export function getStation(id: StationId): Station {
  return STATIONS.find((s) => s.id === id) ?? LEGAL_STATIONS.find((s) => s.id === id) ?? HOME;
}
