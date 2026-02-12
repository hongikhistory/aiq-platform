import './Skeleton.css';

export default function Skeleton({ type = 'text', width, height, style }) {
  const customStyle = {
    width,
    height,
    ...style
  };

  return <div className={`skeleton ${type}`} style={customStyle}></div>;
}
