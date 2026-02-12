import PathNode from './PathNode';
import './LearningPath.css';

export default function LearningPath({ lectures, completedLectures = [], onLectureClick }) {
  // Real Progress Logic
  const getStatus = (index, lectureId) => {
    // If this lecture is in completed list -> completed
    if (completedLectures.includes(lectureId)) return 'completed';
    
    // If it's the first one, OR the previous one is completed -> current (unlock it)
    // Otherwise -> locked
    if (index === 0) return 'current';
    
    const prevLecture = lectures[index - 1];
    if (prevLecture && completedLectures.includes(prevLecture.id)) {
      return 'current';
    }
    
    return 'locked';
  };

  return (
    <div className="learning-path-container">
      {lectures.map((lecture, index) => (
        <PathNode 
          key={lecture.id}
          index={index}
          lecture={lecture}
          status={getStatus(index, lecture.id)}
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
