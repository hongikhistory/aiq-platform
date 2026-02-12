import Badge from '../components/Badge';
import './AITrend.css';

const TRENDS = [
  {
    id: 1,
    title: 'GPT-5 루머: 지금까지 알려진 것들',
    type: 'new',
    date: '오늘',
    source: 'OpenAI 유출'
  },
  {
    id: 2,
    title: '미드저니 v7 알파 출시됨',
    type: 'update',
    date: '어제',
    source: 'Midjourney'
  },
  {
    id: 3,
    title: '클로드 3.5 오퍼스 벤치마크 공개',
    type: 'popular',
    date: '2일 전',
    source: 'Anthropic'
  }
];

export default function AITrend() {
  return (
    <div className="ai-trend-page">
      <header className="page-header">
        <h1 className="page-title">AI 트렌드</h1>
        <Badge variant="update" className="header-badge">3개 업데이트</Badge>
      </header>

      <div className="trend-list">
        {TRENDS.map(item => (
          <div key={item.id} className="trend-item">
            <div className="trend-header">
              <Badge variant={item.type}>{item.type}</Badge>
              <span className="trend-date">{item.date}</span>
            </div>
            <h3 className="trend-title">{item.title}</h3>
            <span className="trend-source">{item.source}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
