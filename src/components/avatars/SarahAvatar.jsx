// SarahAvatar — abstract geometric avatar, no face, no gender.
// Concept: A circle with an upward-pointing chevron (leader striving upward)
// in amber/gold tones.

export default function SarahAvatar({ size = 80 }) {
  const r = size / 2;
  // Chevron points: bottom-left, tip (top-center), bottom-right, inner-right, inner-tip, inner-left
  const pad = size * 0.18;
  const tipX = r;
  const tipY = size * 0.22;
  const leftX = pad;
  const rightX = size - pad;
  const baseY = size * 0.70;
  const innerPad = size * 0.10;
  const innerTipY = tipY + innerPad * 1.4;
  const innerLeftX = leftX + innerPad;
  const innerRightX = rightX - innerPad;
  const innerBaseY = baseY - innerPad * 0.6;

  const chevronPath = [
    `M ${leftX} ${baseY}`,
    `L ${tipX} ${tipY}`,
    `L ${rightX} ${baseY}`,
    `L ${innerRightX} ${innerBaseY}`,
    `L ${tipX} ${innerTipY}`,
    `L ${innerLeftX} ${innerBaseY}`,
    `Z`
  ].join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sarah avatar"
    >
      {/* Background circle */}
      <circle cx={r} cy={r} r={r} fill="#F59E0B" />
      {/* Subtle inner ring */}
      <circle cx={r} cy={r} r={r - size * 0.05} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={size * 0.025} />
      {/* Chevron shape */}
      <path d={chevronPath} fill="#1C2B3A" />
    </svg>
  );
}
