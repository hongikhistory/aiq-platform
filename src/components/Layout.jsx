import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const hideNav = location.pathname === '/'; // Hide nav on Onboarding

  return (
    <div className="layout-container">
      <main className="content">
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
