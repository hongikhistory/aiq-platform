import './PathNode.css';
import { Lock, Check, Star } from 'lucide-react';

export default function PathNode({ status, lecture, onClick, index }) {
  // status: 'completed' | 'current' | 'locked'
  
  return (
    <div className={`path-node-container ${status}`} onClick={() => status !== 'locked' && onClick()}>
      <div className="node-wrapper">
        {/* Connecting Line (Top half) */}
        <div className="path-line top"></div>
        
        {/* The Node Circle */}
        <div className={`node-circle ${status}`}>
          {status === 'completed' && <Check size={24} strokeWidth={4} />}
          {status === 'current' && <Star size={28} fill="white" stroke="none" className="pulse-icon" />}
          {status === 'locked' && <Lock size={20} />}
        </div>
        
        {/* Connecting Line (Bottom half) - hidden for last item */}
        <div className="path-line bottom"></div>
      </div>

      {/* Label / Tooltip */}
      <div className="node-info fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
        <span className="node-level">LEVEL {index + 1}</span>
        <h3 className="node-title">{lecture.title}</h3>
      </div>
    </div>
  );
}
