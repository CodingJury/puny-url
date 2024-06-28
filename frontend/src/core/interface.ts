import { SnackbarVariant } from "./enum";

export interface ISnackBarState {
  variant: SnackbarVariant;
  message: string;
  show: boolean;
}