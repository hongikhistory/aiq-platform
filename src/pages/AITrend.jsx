import { useState, useEffect } from 'react';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';
import './AITrend.css';

import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function AITrend() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const q = query(collection(db, 'trends'), orderBy('id', 'asc'));
        const querySnapshot = await getDocs(q);
        const trendsData = querySnapshot.docs.map(doc => doc.data());
        
        if (trendsData.length > 0) {
          setTrends(trendsData);
        } else {
            // Fallback or empty state
        }
      } catch (error) {
        console.error("Error fetching trends:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrends();
  }, []);

  return (
    <div className="ai-trend-page">
      <header className="trend-header-sticky glass">
        <h1 className="page-title">AI 트렌드</h1>
        <Badge variant="update" className="header-badge">LIVE</Badge>
      </header>

      {loading ? (
        <div className="timeline-container" style={{paddingTop: '20px'}}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{marginBottom: '30px', paddingLeft: '20px'}}>
              <Skeleton type="text" width={100} style={{marginBottom: '8px'}} />
              <Skeleton type="title" width="80%" />
              <Skeleton type="text" width="60%" />
              <Skeleton type="badge" style={{marginTop: '12px'}} />
            </div>
          ))}
        </div>
      ) : (
        <div className="timeline-container animate-pop-in">
        <div className="timeline-line"></div>
        
        {trends.map((item, index) => (
          <div key={item.id} className="timeline-item" style={{animationDelay: `${index * 0.1}s`}}>
            <div className={`timeline-dot ${item.type === 'new' ? 'pulse' : ''}`}></div>
            <div className="timeline-content">
              <div className="timeline-meta">
                <span className="trend-date">{item.date}</span>
                <span className="trend-source">{item.source}</span>
              </div>
              <h3 className="trend-title">{item.title}</h3>
              <p className="trend-desc">{item.desc}</p>
              <div className="trend-badges">
                <Badge variant={item.type}>{item.type.toUpperCase()}</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
