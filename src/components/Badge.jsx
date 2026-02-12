import clsx from 'clsx';
import './Badge.css';

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span className={clsx('badge', `badge-${variant}`, className)}>
      {children}
    </span>
  );
}
