/**
 * An abstract graticule for the About section.
 *
 * It reads as international trade — meridians, a grid, two routes between
 * unlabelled nodes — without asserting anything. The company has not supplied
 * office locations or trade lanes, so nothing here is labelled or placed on a
 * real map. Swap this for a located map only once those facts exist.
 */
export default function TradeGraticule() {
  return (
    <figure className="about__map">
      <svg
        viewBox="0 0 400 300"
        role="img"
        aria-label="Abstract graticule representing international trade in precious metals"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="arcFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A99567" stopOpacity="0" />
            <stop offset="50%" stopColor="#A99567" stopOpacity=".85" />
            <stop offset="100%" stopColor="#A99567" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* meridians and parallels */}
        <g stroke="currentColor" fill="none" strokeWidth=".6" opacity=".22">
          <circle cx="200" cy="150" r="112" />
          <ellipse cx="200" cy="150" rx="112" ry="38" />
          <ellipse cx="200" cy="150" rx="112" ry="74" />
          <ellipse cx="200" cy="150" rx="38" ry="112" />
          <ellipse cx="200" cy="150" rx="74" ry="112" />
          <line x1="88" y1="150" x2="312" y2="150" />
          <line x1="200" y1="38" x2="200" y2="262" />
        </g>

        {/* survey grid */}
        <g stroke="currentColor" fill="none" strokeWidth=".5" opacity=".1">
          <line x1="20" y1="40" x2="380" y2="40" />
          <line x1="20" y1="260" x2="380" y2="260" />
          <line x1="40" y1="20" x2="40" y2="280" />
          <line x1="360" y1="20" x2="360" y2="280" />
        </g>

        {/* routes */}
        <g fill="none" stroke="url(#arcFade)" strokeWidth="1.1">
          <path d="M118 196 Q200 92 286 132" />
          <path d="M142 108 Q210 210 300 186" />
        </g>
        <g fill="#A99567">
          <circle cx="118" cy="196" r="2.6" />
          <circle cx="286" cy="132" r="2.6" />
          <circle cx="142" cy="108" r="2.2" />
          <circle cx="300" cy="186" r="2.2" />
        </g>
      </svg>
      <figcaption className="about__map-label">
        Domestic and international trade
      </figcaption>
    </figure>
  );
}
