import { useRouterState } from "@tanstack/react-router";

import { stationForPath } from "@/components/universe/stations";

// Warp streaks that replay on every page change while the camera flies to the next station.
export function StationHud() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const station = stationForPath(pathname);

  return (
    <div key={station.id} className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {[18, 34, 52, 67, 81].map((top, i) => (
        <span
          key={top}
          className="animate-warp absolute left-0 h-px w-full origin-center bg-iris"
          style={{ top: `${top}%`, animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}
