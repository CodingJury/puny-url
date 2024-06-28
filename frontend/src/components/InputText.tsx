import { ExpireValueType } from "../core/type"

type Props = {
  inputValue: string,
  setInputValue: (netValue: string) => void
  expireValue: ExpireValueType
  setExpireValue: (newExpireValue: ExpireValueType) => void
  btnClick: () => void
}

const InputText = (props: Props) => {
  const {inputValue, setInputValue, expireValue, setExpireValue, btnClick} = props;
  return (
    <label htmlFor="input-url" className="w-full h-16 rounded-full bg-custom-bg-header flex p-2 justify-between border-2 border-custom-text focus-within:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
      <div className="grid place-items-center ml-2">
        <svg xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-link"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" /></svg>
      </div>
      <input id="input-url" className="h-full mx-2 text-custom-text text-lg rounded-lg w-full p-2 bg-custom-bg-header border-custom-bg-header placeholder-custom-text outline-none" type="text" placeholder="Enter your long url" value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoComplete="off"/>
      <select className="text-custom-text text-lg bg-custom-bg-header outline-none border-b-2" onChange={(e) => setExpireValue(e.target.value as ExpireValueType)} defaultValue={expireValue}>
        <option value="1-minute">1 Minute</option>
        <option value="1-hour">1 Hour</option>
        <option value="6-hours">6 Hours</option>
        <option value="1-day">1 Day</option>
        <option value="1-month">1 Month</option>
      </select>
      <button className="ml-2 w-36 h-full font-semibold px-2 bg-blue-600 rounded-full" onClick={btnClick}>SHORT&nbsp;URL</button>
    </label>
  )
}

export default InputText