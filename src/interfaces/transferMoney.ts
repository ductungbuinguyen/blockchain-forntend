import { FieldConfig, GenericFieldHTMLAttributes } from "formik";

export type IStepHistory = {
  key: TransferMoneyStep,
  data?: any
}[]

export enum TransferMoneyStep {
  SELECT_TRANSFER_TYPE = "SELECT_TRANSFER_TYPE",
  TRANSFER_TO_WALLET_SELECT_RECEIVER = "TRANSFER_TO_WALLET_SELECT_RECEIVER",
  TRANSFER_TO_WALLET_INPUT_DATA = "TRANSFER_TO_WALLET_INPUT_DATA",
  TRANSFER_TO_ADDRESS = "TRANSFER_TO_ADDRESS_INPUT_DATA",
  CONFIRM_TRANSACTION = "CONFIRM_TRANSACTION",
  TRANSACTION_RESULT = "TRANSACTION_RESULT",
}

export type FieldAttributes<T> = GenericFieldHTMLAttributes & FieldConfig<T> & {
  name: string;
};