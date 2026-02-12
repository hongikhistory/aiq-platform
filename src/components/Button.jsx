import clsx from "clsx";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  if (variant === 'google') {
    return (
      <button className={clsx("btn", `btn-${variant}`, className)} {...props}>
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" style={{width: 20, height: 20, marginRight: 10}} />
        {children}
      </button>
    );
  }

  return (
    <button className={clsx("btn", `btn-${variant}`, className)} {...props}>
      {children}
    </button>
  );
}
