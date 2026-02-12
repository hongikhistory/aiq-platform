import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { LECTURES } from '../data/lectures';
import './LectureDetail.css';

export default function LectureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Derive state directly from data
  const lecture = LECTURES.find(l => l.id == id);
  
  if (!lecture) return <div className="error-screen">Lecture not found.</div>;

  const handleComplete = () => {
    if (isCompleted) return;
    
    setIsCompleted(true);
    
    // Confetti Effect based on button position if possible, but center is safer due to canvas
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4757', '#3742fa', '#ffa502']
    });

    // Optional: Add a delay before showing success message or navigating
  };

  return (
    <div className="lecture-detail-page animate-fade-in">
      {/* Header */}
      <header className="detail-header glass">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="header-title">강의 시청</h1>
      </header>

      {/* Video Player */}
      <div className="video-container">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${lecture.videoId}?autoplay=1`} 
          title={lecture.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Content Info */}
      <div className="detail-content">
        <div className="detail-tags">
          <Badge variant="role">{lecture.role}</Badge>
          <Badge variant="stack">{lecture.level}</Badge>
        </div>
        
        <h2 className="detail-title">{lecture.title}</h2>
        <p className="detail-desc">{lecture.description}</p>
        
        <div className="action-area">
          <Button 
            variant={isCompleted ? "secondary" : "primary"} 
            onClick={handleComplete}
            style={{ 
              background: isCompleted ? '#2ecc71' : 'var(--primary)',
              transition: 'background 0.3s'
            }}
          >
            <CheckCircle size={20} style={{marginRight: '8px'}} />
            {isCompleted ? '학습 완료됨!' : '학습 완료 체크'}
          </Button>
        </div>
      </div>
    </div>
  );
}

