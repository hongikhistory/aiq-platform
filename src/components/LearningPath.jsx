import PathNode from './PathNode';
import './LearningPath.css';

export default function LearningPath({ lectures, onLectureClick }) {
  // Mock Progress Logic:
  // For demo, let's say:
  // Index 0: Completed
  // Index 1: Current
  // Index 2+: Locked
  // Real app would check user progress data.
  
  const getStatus = (index) => {
    if (index === 0) return 'completed';
    if (index === 1) return 'current';
    return 'locked';
  };

  return (
    <div className="learning-path-container">
      {lectures.map((lecture, index) => (
        <PathNode 
          key={lecture.id}
          index={index}
          lecture={lecture}
          status={getStatus(index)}
          onClick={() => onLectureClick(lecture)}
        />
      ))}
      
      {/* End of path decoration */}
      <div className="path-end">
        <div className="path-line top"></div>
        <div className="trophy-base">🏆</div>
      </div>
    </div>
  );
}
