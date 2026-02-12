import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Award, BookOpen, Crown, Edit2, X, Share2, Sun, Moon } from 'lucide-react';
import StreakWidget from '../components/StreakWidget';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';
import './Profile.css';
import { useTheme } from '../context/ThemeContext';

// Import local avatar assets
import owlImg from '../assets/avatars/planner-owl.png';
import catImg from '../assets/avatars/designer-cat.png';
import dogImg from '../assets/avatars/developer-dog.png';

const AVATARS = [
  { id: 'planner', name: '기획자 올빼미', img: owlImg },
  { id: 'designer', name: '디자이너 고양이', img: catImg },
  { id: 'developer', name: '개발자 강아지', img: dogImg }
];

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState({
    name: '김홍익',
    role: location.state?.userRole || '기획자',
    level: 3,
    xp: 450,
    nextLevelXp: 1000,
    avatar: AVATARS[0].img // Default
  });

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      navigate('/');
    }
  };

  const handleAvatarSelect = (avatarImg) => {
    setUser(prev => ({ ...prev, avatar: avatarImg }));
    setShowAvatarModal(false);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-header glass">
          <div className="header-actions">
            <Skeleton type="text" width={24} height={24} />
          </div>
          <div className="profile-info">
             <Skeleton type="avatar" style={{marginBottom: '16px'}} />
             <Skeleton type="title" width={120} />
             <Skeleton type="badge" />
          </div>
          <div className="xp-container">
            <div className="xp-info">
              <Skeleton type="text" width={40} />
              <Skeleton type="text" width={80} />
            </div>
            <Skeleton type="text" height={8} width="100%" />
          </div>
        </div>
        <div className="stats-grid">
           <Skeleton type="card" height={100} />
           <Skeleton type="card" height={100} />
           <Skeleton type="card" height={100} />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page animate-fade-in">
      {/* Profile Header */}
      <div className="profile-header glass">
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} style={{marginRight: '8px'}}>
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button className="icon-btn" onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `AIQ 프로필: ${user.name}`,
                text: `${user.name}님의 AIQ 학습 레벨은 LV.${user.level}입니다! 🚀`,
                url: window.location.href
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('프로필 링크가 복사되었습니다!');
            }
          }}>
            <Share2 size={24} />
          </button>
          <Settings size={24} className="icon-btn" />
        </div>
        <div className="profile-info">
          <div className="avatar-wrapper" onClick={() => setShowAvatarModal(true)}>
             <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
             <div className="edit-overlay">
               <Edit2 size={16} color="white" />
             </div>
             <div className="level-badge">{user.level}</div>
          </div>
          <h1 className="user-name">{user.name}</h1>
          <Badge variant="role" className="user-role-badge">{user.role}</Badge>
        </div>

        {/* XP Bar */}
        <div className="xp-container">
          <div className="xp-info">
            <span>LV.{user.level}</span>
            <span>{user.xp} / {user.nextLevelXp} XP</span>
          </div>
          <div className="xp-bar-bg">
            <div className="xp-bar-fill" style={{width: `${(user.xp / user.nextLevelXp) * 100}%`}}></div>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowAvatarModal(false)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>캐릭터 선택</h3>
              <button className="close-btn" onClick={() => setShowAvatarModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="avatar-grid">
              {AVATARS.map(av => (
                <div key={av.id} className="avatar-option" onClick={() => handleAvatarSelect(av.img)}>
                  <img src={av.img} alt={av.name} />
                  <span>{av.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-bg red">
            <Award size={24} color="#FF4757" />
          </div>
          <div className="stat-value">12</div>
          <div className="stat-label">완료 강의</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-bg blue">
            <BookOpen size={24} color="#3742fa" />
          </div>
          <div className="stat-value">45h</div>
          <div className="stat-label">학습 시간</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-bg gold">
            <Crown size={24} color="#ffa502" />
          </div>
          <div className="stat-value">Top 5%</div>
          <div className="stat-label">랭킹</div>
        </div>
      </div>

      {/* Streak Section */}
      <div className="section-container">
        <h3 className="section-title">주간 학습 활동</h3>
        <StreakWidget streak={5} />
      </div>

      {/* Menu List */}
      <div className="menu-list">
        <button className="menu-item" onClick={handleLogout}>
          <LogOut size={20} className="menu-icon" />
          <span>로그아웃</span>
        </button>
        
        {/* Admin Only: Seed DB */}
        {user.role === '기획자' && (
          <button className="menu-item" onClick={async () => {
             if(window.confirm('DB를 초기화하시겠습니까?')) {
               const { seedDatabase } = await import('../utils/seedFirestore');
               seedDatabase();
             }
          }} style={{marginTop: '20px', color: '#ff6b6b'}}>
            <Settings size={20} className="menu-icon" />
            <span>DB 초기화 (Admin)</span>
          </button>
        )}
      </div>
    </div>
  );
}
