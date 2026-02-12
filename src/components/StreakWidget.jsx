import { Flame } from 'lucide-react';
import './StreakWidget.css';

export default function StreakWidget({ streak = 5 }) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const todayIndex = new Date().getDay() - 1; // 0=Mon (approx)
  
  // Mock data: assume studied Mon-Fri
  const activity = [true, true, true, true, true, false, false];

  return (
    <div className="streak-widget">
      <div className="streak-header">
        <div className="streak-number">
          <span className="count">{streak}</span>
          <Flame size={24} fill="#FF7675" stroke="none" />
        </div>
        <div className="streak-text">
          <span>일 연속 학습 중!</span>
          <span className="sub-text">3일 더하면 보너스 XP</span>
        </div>
      </div>
      
      <div className="streak-days">
        {days.map((day, i) => (
          <div key={day} className={`day-circle ${activity[i] ? 'active' : ''} ${i === todayIndex ? 'today' : ''}`}>
            {activity[i] && <Flame size={14} fill="white" stroke="none" />}
            <span className="day-label">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
