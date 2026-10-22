import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

/** Direction-bearing: mirrored in RTL through the `icon-dir` class. */
export const ArrowIcon = () => (
  <svg {...base} className="icon-dir">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ChevronIcon = () => (
  <svg {...base} className="chevron">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const CloseIcon = () => (
  <svg {...base}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const MenuIcon = () => (
  <svg {...base}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const AlertIcon = () => (
  <svg {...base} width={16} height={16}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6M12 16.5v.01" />
  </svg>
)

export const CheckIcon = () => (
  <svg {...base} width={28} height={28}>
    <circle cx="12" cy="12" r="10" />
    <path d="M7.5 12.5l3 3 6-6.5" />
  </svg>
)

export const ServiceIcon = ({ index }: { index: number }) => {
  const paths = [
    <path key="0" d="M4 18l8-14 8 14zM9 18l3-5 3 5" />,
    <g key="1">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 21h8" />
    </g>,
    <path key="2" d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />,
    <path key="3" d="M4 6h10M4 11h7M4 16h10M15 14l3 5 3-5M16 17h4" />,
  ]
  return <svg {...base} width={28} height={28}>{paths[index % paths.length]}</svg>
}
