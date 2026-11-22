/** Fixed decorative layers behind the page (CSS orbs, grid, WebGL canvas, noise, cursor glow). */
export default function Background() {
  return (
    <>
      <div className="bg-orbs" aria-hidden="true">
        <span></span>
        <span></span>
      </div>
      <div className="bg-grid" aria-hidden="true"></div>
      <canvas id="webgl" aria-hidden="true"></canvas>
      <div className="noise" aria-hidden="true"></div>
      <div className="cursor-glow" aria-hidden="true"></div>
    </>
  );
}

/** Preloader: rendered on the homepage only, so inner pages appear instantly. */
export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <svg className="loader-mark">
          <use href="#i-logo" />
        </svg>
        <div className="loader-bar">
          <i></i>
        </div>
        <div className="loader-txt">
          INITIALIZING <span className="lp">0</span>%
        </div>
      </div>
    </div>
  );
}
