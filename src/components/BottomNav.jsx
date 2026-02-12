import { Home, Zap, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import './BottomNav.css';

export default function BottomNav() {
  const navItems = [
    { icon: Home, label: '홈', path: '/home' },
    { icon: Zap, label: 'AI 트렌드', path: '/ai-trend' },
    { icon: User, label: '내 정보', path: '/profile' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <NavLink 
          key={item.path} 
          to={item.path} 
          className={({ isActive }) => clsx('nav-item', isActive && 'active')}
        >
          <item.icon size={24} strokeWidth={2.5} />
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
