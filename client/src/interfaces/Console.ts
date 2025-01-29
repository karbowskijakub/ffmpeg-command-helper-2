import { Form } from "./Form";

export interface ConsoleProps {
  setWatchedFields: (fields: Form) => void;
}
export interface CommandFieldProps {
  watchedFields: Partial<Form>;
}
