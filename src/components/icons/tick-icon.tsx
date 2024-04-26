export default function TickIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g stroke="none" strokeWidth="1" fill="inherit" fillRule="evenodd">
        <path
          fill="inherit"
          fillRule="nonzero"
          d="M9.707 14.293 19 5l1.414 1.414L9.707 17.121 4 11.414 5.414 10z"
        ></path>
      </g>
    </svg>
  )
}
