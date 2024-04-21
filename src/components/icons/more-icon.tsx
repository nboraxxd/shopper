export default function MoreIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18 4.5H6"
        className="stroke-[#1A162E] dark:stroke-white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12H6"
        className="stroke-[#1A162E] dark:stroke-white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 19H6"
        className="stroke-[#1A162E] dark:stroke-white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
