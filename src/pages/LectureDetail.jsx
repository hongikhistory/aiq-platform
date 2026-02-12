import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle, CheckCircle, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { LECTURES } from '../data/lectures';
import './LectureDetail.css';

export default function LectureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // State
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Lecture & Check Completion
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Lecture
        const lectureRef = doc(db, 'lectures', id);
        const lectureSnap = await getDoc(lectureRef);
        
        if (lectureSnap.exists() && lectureSnap.data().title) {
          const lectureData = lectureSnap.data();
          setLecture(lectureData);
          
          // Check completion logic...
          const user = auth.currentUser;
          if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              if (userData.completedLectures?.includes(parseInt(id))) {
                setIsCompleted(true);
              }
            }
          }
        } else {
             console.warn("Lecture not found in DB or invalid, using fallback");
             // Fallback to local data
             const localLecture = LECTURES.find(l => l.id == id);
             if (localLecture) {
               setLecture(localLecture);
               
               // Check completion even for local data
               const user = auth.currentUser;
               if (user) {
                 const userRef = doc(db, "users", user.uid);
                 const userSnap = await getDoc(userRef);
                 if (userSnap.exists()) {
                    const userData = userSnap.data();
                    if (userData.completedLectures?.includes(parseInt(id))) {
                      setIsCompleted(true);
                    }
                 }
               }
             }
        }
      } catch (error) {
        console.error("Error fetching lecture:", error);
        // Fallback on error
        const localLecture = LECTURES.find(l => l.id == id);
        if (localLecture) setLecture(localLecture);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!lecture) return <div className="error-screen">Lecture not found.</div>;

  const handleComplete = async () => {
    if (isCompleted) return;
    
    setIsCompleted(true);
    
    // Confetti Effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4757', '#3742fa', '#ffa502']
    });

    // Update Firestore
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          completedLectures: arrayUnion(parseInt(id))
        });
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    }
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

          {isCompleted && (
            <Button
              variant="outline"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `AIQ: ${lecture.title} 완료!`,
                    text: `AIQ에서 ${lecture.title} 강의를 마스터했습니다! 🚀`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('링크가 복사되었습니다!');
                }
              }}
              style={{ marginLeft: '12px' }}
            >
              <Share2 size={20} style={{marginRight: '8px'}} />
              자랑하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

