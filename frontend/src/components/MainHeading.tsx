import { memo } from "react"

const MainHeading = () => {
  return (
    <>
      <div className="text-center leading-normal text-6xl font-bold bg-gradient-to-r from-blue-500 via-pink-600 to-blue-500 bg-clip-text text-transparent">
        Shorten Your Loooong Url :)
      </div>
      <div className="text-center text-xl">
        TinyUrl is an efficient and easy-to-use URL shortening service that streamlines your online experience.
      </div>
    </>
  )
}

export default memo(MainHeading)