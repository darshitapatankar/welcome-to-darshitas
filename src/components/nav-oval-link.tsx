export default function NavOvalLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center px-[33px] py-[13px] font-mono text-[15px] leading-none whitespace-nowrap text-white no-underline"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 122 42"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <ellipse
          cx="61"
          cy="21"
          rx="59"
          ry="19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          className="[filter:drop-shadow(0_0_8px_#fff)] transition-[filter] duration-500 ease-in-out group-hover:[filter:drop-shadow(0_0_15px_#fff)_drop-shadow(0_0_7px_#fff)]"
        />
      </svg>
      {label}
    </a>
  );
}
