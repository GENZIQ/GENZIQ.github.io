import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const routes = [
    "/",
    "/about",
    "/services",
    "/products",
    "/innovation",
    "/careers",
    "/partnerships",
    "/contact",
    "/privacy",
    "/terms",
  ];

  routes.forEach((path) => {
    it(`matches a page for ${path} instead of falling back to not found`, () => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  });
});
