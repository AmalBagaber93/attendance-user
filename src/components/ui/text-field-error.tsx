import { Merge, FieldError, FieldErrorsImpl } from "react-hook-form";

export type TextFieldErrorProps =
  | string
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | undefined;

export default function TextFieldError({
  children,
}: {
  children?: TextFieldErrorProps;
}) {
  return children ? (
    <div
      style={{
        color: "red",
        // position: "absolute",
        // top: "-16px",
        fontSize: "0.8em",
      }}
    >
      {children as string}
    </div>
  ) : null;
}
