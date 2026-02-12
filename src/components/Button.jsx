import clsx from "clsx";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  return (
    <button className={clsx("btn", `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  );
}
