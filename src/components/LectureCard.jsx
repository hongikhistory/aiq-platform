import Badge from './Badge';
import './LectureCard.css';

export default function LectureCard({ title, description, tags = [], image, level, role, stack, onClick }) {
  const getLevelBadge = (lvl) => {
    if (lvl === 'LV_BASIC') return <Badge variant="success">입문</Badge>;
    if (lvl === 'LV_INTERMEDIATE') return <Badge variant="popular">활용</Badge>;
    if (lvl === 'LV_ADVANCED') return <Badge variant="new">심화</Badge>;
    return <Badge variant="default">{lvl}</Badge>;
  };

  return (
    <div className="lecture-card" onClick={onClick}>
      <div className="card-image-wrapper">
        <img src={image} alt={title} className="card-image" />
        <div className="card-badges">
          {getLevelBadge(level)}
          {role && <Badge variant="default">{role}</Badge>}
        </div>
      </div>
      <div className="card-content">
        <div className="card-meta">
          {stack && <span className="stack-text">{stack}</span>}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>
        <div className="card-tags">
          {tags.map((tag, i) => (
            <span key={i} className="text-tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
