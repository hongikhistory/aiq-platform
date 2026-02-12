import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import './LectureDetail.css';

export default function LectureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch lecture details from our new backend
    fetch(`/api/lectures/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setLecture(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch lecture:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!lecture) return <div className="error-screen">Lecture not found.</div>;

  return (
    <div className="lecture-detail-page">
      {/* Header */}
      <header className="detail-header">
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
          <Button variant="primary">
            <CheckCircle size={20} style={{marginRight: '8px'}} />
            학습 완료 체크
          </Button>
        </div>
      </div>
    </div>
  );
}
