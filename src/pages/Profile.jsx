import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Award, BookOpen, Crown } from 'lucide-react';
import StreakWidget from '../components/StreakWidget';
import Badge from '../components/Badge';
import './Profile.css';

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  // Mock User Data (Replace with Firebase Auth later)
  const user = {
    name: '김홍익',
    role: location.state?.userRole || '기획자',
    level: 3,
    xp: 450,
    nextLevelXp: 1000,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      navigate('/');
    }
  };

  return (
    <div className="profile-page animate-fade-in">
      {/* Profile Header */}
      <div className="profile-header glass">
        <div className="header-actions">
          <Settings size={24} className="icon-btn" />
        </div>
        <div className="profile-info">
          <div className="avatar-wrapper">
             <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
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
      </div>
    </div>
  );
}
