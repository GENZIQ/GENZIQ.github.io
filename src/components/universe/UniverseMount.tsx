import { lazy, Suspense, useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

import { stationForPath } from "./stations";

const UniverseCanvas = lazy(() => import("./UniverseCanvas"));

export function UniverseMount() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const station = stationForPath(pathname);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  if (!clientReady) return null;

  return (
    <Suspense fallback={null}>
      <UniverseCanvas stationId={station.id} />
    </Suspense>
  );
}
