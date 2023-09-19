export function Cube() {
  return (
    <svg width='100%' height='100%'>
      <pattern
        id='pattern-cubes'
        x='0'
        y='63'
        patternUnits='userSpaceOnUse'
        width='63'
        height='100'
        viewBox='0 0 10 16'
      >
        <g id='cube'>
          <path fill='orange' d='M0 0l5 3v5l-5 -3z' />
          <path fill='#ffdb99' d='M10 0l-5 3v5l5 -3' />
        </g>
        <use x='5' y='8' xlinkHref='#cube' />
        <use x='-5' y='8' xlinkHref='#cube' />
      </pattern>
      <rect x='0' y='0' width='100%' height='100%' fill='url(#pattern-cubes)' />
    </svg>
  )
}
