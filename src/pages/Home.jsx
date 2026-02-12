import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flame, Search } from 'lucide-react';
import LearningPath from '../components/LearningPath';
import LectureCard from '../components/LectureCard';
import StreakWidget from '../components/StreakWidget';
import PremiumBanner from '../components/PremiumBanner';
import RecommendedCourse from '../components/RecommendedCourse';
import { LECTURES } from '../data/lectures';
import './Home.css';

const CATEGORIES = ['전체', '기획', '디자인', '개발', '창업'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = location.state?.userRole || '기획';

  // Filter lectures locally
  const lectures = LECTURES.filter(lecture => {
    const matchesRole = activeTab === '전체' || lecture.role === activeTab;
    const matchesSearch = !searchQuery || 
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lecture.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesRole && matchesSearch;
  });

  const handleLectureClick = (id) => {
    navigate(`/lecture/${id}`);
  };

  // Best course for recommendations (client-side filter for now or separate API)
  const recommendedCourse = lectures.find(l => l.role === userRole) || lectures[0];

  return (
    <div className="home-page">
      {/* Top Bar */}
      <header className="top-bar">
        <h1 className="logo">AIQ</h1>
        <div className="streak-container">
          <Flame size={18} className="streak-icon" fill="#FF7675" stroke="none" />
          <span className="streak-count">5일째</span>
        </div>
        <div className="avatar">나</div>
      </header>

      {/* Tabs */}
      <div className="tabs-scroll">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="관심 기술, 직무 검색..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Content Area */}
      {activeTab === '전체' ? (
        // List View
        <div className="lecture-list animate-slide-up">
          <StreakWidget streak={5} />
          <PremiumBanner />
          <RecommendedCourse role={userRole} course={recommendedCourse} />
          
          <h3 className="section-title" style={{margin: '24px 0 12px 0', fontSize:'20px', fontWeight:'800'}}>전체 강의</h3>
          
          {lectures.length > 0 ? (
            lectures.map(lec => (
              <LectureCard 
                key={lec.id} 
                {...lec} 
                onClick={() => handleLectureClick(lec.id)}
              />
            ))
          ) : (
            <div className="empty-state">검색 결과가 없습니다.</div>
          )}
        </div>
      ) : (
        // Path View
        <div className="path-view-area animate-fade-in">
          <LearningPath 
            lectures={lectures} 
            onLectureClick={(lec) => handleLectureClick(lec.id)}
          />
        </div>
      )}
    </div>
  );
}
