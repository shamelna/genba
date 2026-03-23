// KenjiAvatar — abstract geometric avatar, no face, no gender.
// Concept: A circle with a mountain peak (sensei who has climbed before)
// in dark teal tones with gold peak.

export default function KenjiAvatar({ size = 80 }) {
  const r = size / 2;
  const pad = size * 0.14;

  // Mountain: two peaks — a larger left range and a taller right peak
  // Base runs across the bottom
  const baseY = size * 0.74;
  const baseLeft = pad;
  const baseRight = size - pad;

  // Left foothills
  const leftPeakX = size * 0.32;
  const leftPeakY = size * 0.44;

  // Main peak (right-center, taller)
  const mainPeakX = size * 0.60;
  const mainPeakY = size * 0.26;

  // Snow cap on main peak
  const snowLeftX = mainPeakX - size * 0.10;
  const snowRightX = mainPeakX + size * 0.10;
  const snowBaseY = mainPeakY + size * 0.12;

  const mountainPath = [
    `M ${baseLeft} ${baseY}`,
    `L ${leftPeakX} ${leftPeakY}`,
    `L ${size * 0.44} ${size * 0.52}`,
    `L ${mainPeakX} ${mainPeakY}`,
    `L ${baseRight} ${baseY}`,
    `Z`
  ].join(' ');

  const snowPath = [
    `M ${mainPeakX} ${mainPeakY}`,
    `L ${snowLeftX} ${snowBaseY}`,
    `L ${snowRightX} ${snowBaseY}`,
    `Z`
  ].join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kenji avatar"
    >
      {/* Background circle */}
      <circle cx={r} cy={r} r={r} fill="#0F6E56" />
      {/* Subtle inner ring */}
      <circle cx={r} cy={r} r={r - size * 0.05} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={size * 0.025} />
      {/* Mountain body */}
      <path d={mountainPath} fill="#0A4A3A" />
      {/* Snow cap on peak */}
      <path d={snowPath} fill="#FFD559" />
      {/* Subtle horizon line */}
      <line
        x1={pad}
        y1={baseY}
        x2={size - pad}
        y2={baseY}
        stroke="rgba(255,213,89,0.25)"
        strokeWidth={size * 0.025}
      />
    </svg>
  );
}
