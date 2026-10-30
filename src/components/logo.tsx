export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="hyd-tech-hole">
          <ellipse cx="50" cy="50" rx="26" ry="52.5" />
        </clipPath>
      </defs>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 0H100V100H0Z M24 50A26 52.5 0 1 1 76 50A26 52.5 0 1 1 24 50Z"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="28"
        ry="14"
        fill="currentColor"
        clipPath="url(#hyd-tech-hole)"
      />
    </svg>
  );
}
