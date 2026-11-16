import { lazy, Suspense, useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { stationForPath } from "./stations";

// three.js touches window on import, so the scene is only loaded in the browser.
const Universe = lazy(() => import("./Universe"));

export function UniverseMount() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const station = stationForPath(pathname);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-void" aria-hidden />
      {mounted && (
        <Suspense fallback={null}>
          <Universe stationId={station.id} />
        </Suspense>
      )}
    </>
  );
}
