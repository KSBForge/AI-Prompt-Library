/* ------------------------------------------------------------------ */
/*  WebGL capability probe — decides whether the cinematic 3D layer    */
/*  mounts at all. Everything degrades gracefully to the 2D layer.     */
/* ------------------------------------------------------------------ */

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;

    // Software renderers (SwiftShader/llvmpipe) would stutter — skip 3D entirely.
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    if (info) {
      const renderer = gl.getParameter(info.UNMASKED_RENDERER_WEBGL);
      if (typeof renderer === "string" && /swiftshader|llvmpipe|software|basic render/i.test(renderer)) {
        return false;
      }
    }

    // Release the probe context immediately — it was only a feasibility check.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
