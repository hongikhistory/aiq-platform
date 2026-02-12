import Badge from './Badge';
import './RecommendedCourse.css';

export default function RecommendedCourse({ role, course }) {
  if (!course) return null;

  const getRoleTitle = (r) => {
    const titles = {
      '기획': '기획자',
      '디자인': '디자이너',
      '개발': '개발자',
      '창업': '창업가'
    };
    return titles[r] || r;
  };

  return (
    <div className="recommended-container">
      <div className="reco-header">
        <span className="reco-label">RECOMMENDED FOR YOU</span>
        <h3 className="reco-role">{getRoleTitle(role)}를 위한 추천 코스</h3>
      </div>
      
      <div className="reco-card">
        <div className="reco-img-wrapper">
          <img src={course.image} alt={course.title} className="reco-img" />
          <Badge variant="popular" className="reco-badge">LEVEL 1</Badge>
        </div>
        <div className="reco-info">
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <button className="start-btn">시작하기</button>
        </div>
      </div>
    </div>
  );
}
