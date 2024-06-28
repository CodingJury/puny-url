import { useEffect } from "react"
import { SnackbarVariant } from "../core/enum"
import cn from "../core/cn"

type Props = {
  message: string,
  show: boolean,
  variant: SnackbarVariant,
  onClose: () => void
}

const Snackbar = ({message, show, variant, onClose}: Props) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose])

  return (
    <>
      {show && (
        <div className={cn(
          "fixed bottom-4 right-4 text-black px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 ease-in-out",
          {"bg-green-300": variant === SnackbarVariant.SUCCESS},
          {"bg-red-300": variant === SnackbarVariant.ERROR},
          {"bg-blue-300": variant === SnackbarVariant.INFO},
          {"bg-yellow-300": variant === SnackbarVariant.WARNING}
        )}>
          {message}
        </div>
      )}
    </>
  )
}

export default Snackbar