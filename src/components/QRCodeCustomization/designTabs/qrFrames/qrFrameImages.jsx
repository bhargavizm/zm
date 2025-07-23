

export const eyeFrames = {
  square: (x, y, size, color) => (
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
  ),
  circle: (x, y, size, color) => (
    <circle
      cx={x + size / 2}
      cy={y + size / 2}
      r={size / 2}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
  ),
  rounded: (x, y, size, color) => (
    <rect
      x={x}
      y={y}
      rx={size / 4}
      ry={size / 4}
      width={size}
      height={size}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
  ),
  doubleBorder: (x, y, size, color) => (
  <>
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill="white"
      stroke={color}
      strokeWidth="2"
    />
    <rect
      x={x + 4}
      y={y + 4}
      width={size - 8}
      height={size - 8}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
  </>
),
dashed: (x, y, size, color) => (
  <rect
    x={x}
    y={y}
    width={size}
    height={size}
    fill="white"
    stroke={color}
    strokeWidth="3"
    strokeDasharray="5,2"
  />
),
 inset: (x, y, size, color) => (
  <rect
    x={x + 4}
    y={y + 4}
    width={size - 8}
    height={size - 8}
    fill="white"
    stroke={color}
    strokeWidth="3"
  />
),
hexagon: (x, y, size, color) => {
  const s = size / 2;
  const cx = x + s;
  const cy = y + s;
  const r = s * 0.9;
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
  return (
    <polygon points={points} fill="white" stroke={color} strokeWidth="3" />
  );
},
octagon: (x, y, size, color) => {
  const offset = size * 0.3;
  const points = [
    [x + offset, y],
    [x + size - offset, y],
    [x + size, y + offset],
    [x + size, y + size - offset],
    [x + size - offset, y + size],
    [x + offset, y + size],
    [x, y + size - offset],
    [x, y + offset],
  ].map(p => p.join(',')).join(' ');
  return (
    <polygon points={points} fill="white" stroke={color} strokeWidth="3" />
  );
},
diamond: (x, y, size, color) => {
  const s = size;
  const cx = x + s / 2;
  const cy = y + s / 2;
  return (
    <polygon
      points={`${cx},${y} ${x + s},${cy} ${cx},${y + s} ${x},${cy}`}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
  );
},
crossBox: (x, y, size, color) => (
  <>
    <rect
      x={x}
      y={y}
      width={size}
      height={size}
      fill="white"
      stroke={color}
      strokeWidth="3"
    />
    {/* Outer decoration only */}
    <rect
      x={x - 2}
      y={y - 2}
      width={size + 4}
      height={size + 4}
      fill="none"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="4,2"
    />
  </>
),

notched: (x, y, size, color) => (
  <rect
    x={x + size * 0.1}
    y={y + size * 0.1}
    width={size * 0.8}
    height={size * 0.8}
    fill="white"
    stroke={color}
    strokeWidth="3"
    rx={4}
  />
),
softCircle: (x, y, size, color) => (
  <circle
    cx={x + size / 2}
    cy={y + size / 2}
    r={size / 2}
    fill="white"
    stroke={color}
    strokeWidth="4"
  />
),


};

export const eyeballFrames = {
  circle: (x, y, size, color) => (
    <circle cx={x + size / 2} cy={y + size / 2} r={size / 2} fill={color} />
  ),

  square: (x, y, size, color) => (
    <rect x={x} y={y} width={size} height={size} fill={color} />
  ),

  diamond: (x, y, size, color) => (
    <polygon
      fill={color}
      points={`
        ${x + size / 2},${y}
        ${x + size},${y + size / 2}
        ${x + size / 2},${y + size}
        ${x},${y + size / 2}
      `}
    />
  ),

  rounded: (x, y, size, color) => (
    <rect
      x={x}
      y={y}
      rx={size * 0.2}
      ry={size * 0.2}
      width={size}
      height={size}
      fill={color}
    />
  ),

  oval: (x, y, size, color) => (
    <ellipse
      cx={x + size / 2}
      cy={y + size / 2}
      rx={size * 0.5}
      ry={size * 0.35}
      fill={color}
    />
  ),

  hexagon: (x, y, size, color) => {
    const dx = size * 0.25;
    const dy = size * 0.5;
    const cx = x + size / 2;
    const cy = y + size / 2;
    return (
      <polygon
        fill={color}
        points={`
          ${cx - dx},${cy - dy}
          ${cx + dx},${cy - dy}
          ${cx + size / 2},${cy}
          ${cx + dx},${cy + dy}
          ${cx - dx},${cy + dy}
          ${cx - size / 2},${cy}
        `}
      />
    );
  },

  cog: (x, y, size, color) => (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const dx = Math.cos(angle) * size * 0.4;
        const dy = Math.sin(angle) * size * 0.4;
        return (
          <rect
            key={i}
            x={size / 2 + dx - 1.5}
            y={size / 2 + dy - 1.5}
            width={3}
            height={3}
            fill="white"
          />
        );
      })}
    </g>
  ),

  star: (x, y, size, color) => {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const spikes = 5;
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    const step = Math.PI / spikes;
    const path = [];

    for (let i = 0; i < 2 * spikes; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = i * step - Math.PI / 2;
      path.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }

    return <polygon fill={color} points={path.join(' ')} />;
  },

  heart: (x, y, size, color) => (
    <path
      fill={color}
      d={`
        M${x + size / 2},${y + size * 0.9}
        C${x + size * 1.2},${y + size * 0.5} ${x + size * 0.9},${y}
        ${x + size / 2},${y + size * 0.3}
        C${x + size * 0.1},${y} ${x - size * 0.2},${y + size * 0.5}
        ${x + size / 2},${y + size * 0.9}
      `}
    />
  ),

  shield: (x, y, size, color) => (
    <path
      fill={color}
      d={`
        M${x + size / 2},${y}
        L${x + size},${y + size * 0.3}
        L${x + size * 0.8},${y + size}
        L${x + size * 0.2},${y + size}
        L${x},${y + size * 0.3}
        Z
      `}
    />
  ),

  blob: (x, y, size, color) => (
    <path
      fill={color}
      d={`
        M${x + size / 2},${y}
        C${x + size * 0.9},${y + size * 0.1}
         ${x + size * 0.9},${y + size * 0.9}
         ${x + size / 2},${y + size}
        C${x + size * 0.1},${y + size * 0.9}
         ${x + size * 0.1},${y + size * 0.1}
         ${x + size / 2},${y}
        Z
      `}
    />
  ),
   leaf: (x, y, size, color) => (
    <path
      fill={color}
      d={`
        M${x + size / 2},${y}
        C${x + size * 0.8},${y + size * 0.2}
         ${x + size * 0.8},${y + size * 0.8}
         ${x + size / 2},${y + size}
        C${x + size * 0.2},${y + size * 0.8}
         ${x + size * 0.2},${y + size * 0.2}
         ${x + size / 2},${y}
        Z
      `}
    />
  ),

  octagon: (x, y, size, color) => {
    const offset = size * 0.25;
    return (
      <polygon
        fill={color}
        points={`
          ${x + offset},${y}
          ${x + size - offset},${y}
          ${x + size},${y + offset}
          ${x + size},${y + size - offset}
          ${x + size - offset},${y + size}
          ${x + offset},${y + size}
          ${x},${y + size - offset}
          ${x},${y + offset}
        `}
      />
    );
  },

  clover: (x, y, size, color) => {
    const cx = x + size / 2;
    const cy = y + size / 2;
    const r = size * 0.25;
    return (
      <g fill={color}>
        <circle cx={cx - r} cy={cy - r} r={r} />
        <circle cx={cx + r} cy={cy - r} r={r} />
        <circle cx={cx - r} cy={cy + r} r={r} />
        <circle cx={cx + r} cy={cy + r} r={r} />
      </g>
    );
  },
};

export const bodyFrames = {
  heart: `
    M 0 -4
    C 0 -6, 3 -6, 3 -4
    C 3 -2, 0 0, 0 2
    C 0 0, -3 -2, -3 -4
    C -3 -6, 0 -6, 0 -4
    Z
  `,

  leaf: `
    M 0 -4
    C 2 -2, 2 2, 0 4
    C -2 2, -2 -2, 0 -4
    Z
  `,

  diamond: `
    M 0 -4
    L 4 0
    L 0 4
    L -4 0
    Z
  `,
  circle: "M 0 -4 A 4 4 0 0 1 0 4 A 4 4 0 0 1 0 -4 Z",
  square: "M -4 -4 L 4 -4 L 4 4 L -4 4 Z",

  // Rounded Square
  roundedSquare: "M -4 -4 Q 4 -4 4 -4 Q 4 4 4 4 Q -4 4 -4 4 Q -4 -4 -4 -4 Z",

  // Star
  star:
    "M0,-4 L1.18,-1.3 L4,0 L1.18,1.3 L0,4 L-1.18,1.3 L-4,0 L-1.18,-1.3 Z",

  // Teardrop
  teardrop:
    "M 0 -4 C 2 -4, 4 -2, 0 4 C -4 -2, -2 -4, 0 -4 Z",

  // Clover
  clover:
    "M0,-2.5 C1,-4,3,-2,0,0 C3,2,1,4,0,2.5 C-1,4,-3,2,0,0 C-3,-2,-1,-4,0,-2.5 Z",

  // Hexagon
  hexagon:
    "M 0 -4 L 3.464 -2 L 3.464 2 L 0 4 L -3.464 2 L -3.464 -2 Z",

  // Cross
  cross:
    "M -1 -4 L 1 -4 L 1 -1 L 4 -1 L 4 1 L 1 1 L 1 4 L -1 4 L -1 1 L -4 1 L -4 -1 L -1 -1 Z",

  // Blob
  blob:
    "M0,-4 C3,-4 4,-2 4,0 C4,2 3,4 0,4 C-3,4 -4,2 -4,0 C-4,-2 -3,-4 0,-4 Z"
};

