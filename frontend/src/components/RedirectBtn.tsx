type Props = {
  redirectUrl: string
  target: "_blank" | "_parent" | "_self" | "_top"
}

const RedirectBtn = (props: Props) => {
  const {redirectUrl, target = "_self"} = props;
  return (
    <a className='grid place-items-center size-9 rounded-full bg-white/10 hover:bg-white/30 active:bg-white/60' href={redirectUrl} target={target}>
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-external-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
    </a>
  )
}

export default RedirectBtn