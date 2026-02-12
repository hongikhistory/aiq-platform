import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import AITrend from './pages/AITrend';
import Profile from './pages/Profile';
import LectureDetail from './pages/LectureDetail';

import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Onboarding />} />
          <Route path="home" element={<Home />} />
          <Route path="lecture/:id" element={<LectureDetail />} />
          <Route path="ai-trend" element={<AITrend />} />
          <Route path="profile" element={<Profile />} />
          {/* Redirect unknown routes to home if onboarded, or handle 404. For now redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
