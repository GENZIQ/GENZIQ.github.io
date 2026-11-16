
## Project rules

- The whole site is one persistent 3D world (`src/components/universe/`) mounted client-only in `__root.tsx`; each page is a "station" in `stations.ts` and the camera flies between them on navigation. Add a new page by adding a station + its scene object, so the world stays coherent.
- Page UI talks to the 3D scene through the mutable `lab-state.ts` object (read in `useFrame`), never React state, to avoid 60fps re-renders.
- three.js colours live in the `C` palette in `Universe.tsx` and must mirror the tokens in `src/styles.css`, where all DOM colours live. No postprocessing EffectComposer: it rendered a blank canvas in testing.
