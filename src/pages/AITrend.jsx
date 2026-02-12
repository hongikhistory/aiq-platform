import Badge from '../components/Badge';
import './AITrend.css';

const TRENDS = [
  {
    id: 1,
    title: 'GPT-5 루머: 지금까지 알려진 것들',
    type: 'new',
    date: '오늘',
    source: 'OpenAI 유출',
    desc: '멀티모달 기능의 비약적 향상이 예고되었습니다. 데이터 처리 속도가 2배 빨라질 것이라는 관측입니다.'
  },
  {
    id: 2,
    title: '미드저니 v7 알파 출시됨',
    type: 'update',
    date: '어제',
    source: 'Midjourney',
    desc: '더욱 정교해진 조명 효과와 텍스트 렌더링 능력을 경험해보세요.'
  },
  {
    id: 3,
    title: '클로드 3.5 오퍼스 벤치마크 공개',
    type: 'popular',
    date: '2일 전',
    source: 'Anthropic',
    desc: '코딩 능력 평가에서 GPT-4를 근소한 차이로 앞섰습니다.'
  },
  {
    id: 4,
    title: '스테이블 디퓨전 3 API 공개',
    type: 'update',
    date: '3일 전',
    source: 'Stability AI',
    desc: '타이포그래피 생성이 대폭 개선되었습니다.'
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
