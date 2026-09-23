/* ------------------------------------------------------------------ */
/*  Shared scroll-state bridge between the DOM world (Hero component)  */
/*  and the WebGL render loop (HeroScene3D). Kept dependency-free so    */
/*  the heavy three.js bundle stays lazy-loaded.                        */
/* ------------------------------------------------------------------ */

export const heroScrollState = { progress: 0 };

export function setHeroScrollProgress(p: number) {
  heroScrollState.progress = p;
}
