import Badge from '../components/Badge';
import './AITrend.css';

const TRENDS = [
  {
    id: 1,
    title: "앤트로픽, '클로드 오퍼스 4.6' 출시",
    type: 'new',
    date: '오늘',
    source: 'AI Times',
    desc: '롱 컨텍스트와 에이전트 협업 기능을 대폭 강화한 새로운 모델이 공개되었습니다.'
  },
  {
    id: 2,
    title: "구글, 논문 일러스트 생성 AI ‘페이퍼바나나’ 공개",
    type: 'new',
    date: '1일 전',
    source: 'Google',
    desc: '환각 현상을 낮추고 미적 기준을 높인 연구용 이미지 생성 도구입니다.'
  },
  {
    id: 3,
    title: "엔비디아, 로봇 월드 모델 ‘드림도조’ 발표",
    type: 'popular',
    date: '2일 전',
    source: 'NVIDIA',
    desc: '물리적 세계를 시뮬레이션하는 로봇 학습용 월드 모델이 공개되었습니다.'
  },
  {
    id: 4,
    title: "오픈AI, 챗GPT 모델 라인업 전면 개편",
    type: 'update',
    date: '3일 전',
    source: 'OpenAI',
    desc: 'GPT-4o 제거 및 GPT-5.2 버전에 대한 새로운 방향성을 제시했습니다.'
  },
  {
    id: 5,
    title: "바이브 코딩 1년, 개발자들의 'AI 피로' 호소",
    type: 'popular',
    date: '3일 전',
    source: 'AI Times',
    desc: 'AI 코딩 도구 도입 1년 후, 생산성 향상의 이면에 감춰진 피로감이 드러나고 있습니다.'
  }
];

export default function AITrend() {
  return (
    <div className="ai-trend-page">
      <header className="trend-header-sticky glass">
        <h1 className="page-title">AI 트렌드</h1>
        <Badge variant="update" className="header-badge">LIVE</Badge>
      </header>

      <div className="timeline-container animate-pop-in">
        <div className="timeline-line"></div>
        
        {TRENDS.map((item, index) => (
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
    </div>
  );
}
