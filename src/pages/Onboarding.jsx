import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from '../firebase';
import Button from '../components/Button';
import './Onboarding.css';
import mascotImg from '../assets/mascot.png'; // Import local asset

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [introStep, setIntroStep] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [selectedRole, setSelectedRole] = useState('기획'); // Default

  const introData = [
    { slogan: "AI로 만드는 나만의 경쟁력", title: "내 업무 지능(AIQ)은 몇 점?", desc: "3분 만에 진단하고 딱 맞는 커리큘럼을 받아보세요." },
    { slogan: "실무에 바로 쓰는 AI", title: "직무별 맞춤 로드맵", desc: "기획자, 개발자, 디자이너... 내 직무에 딱 맞는 AI 활용법." },
    { slogan: "함께 성장하는 커뮤니티", title: "매일 성장하는 습관", desc: "AI 트렌드와 강의를 매일매일 챙겨드립니다." }
  ];

  const handleIntroNext = () => {
    if (introStep < 2) setIntroStep(introStep + 1);
  };

  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    try {
      // 1. Anonymous Sign In
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      
      // 2. Save User Data
      await setDoc(doc(db, "users", user.uid), {
        role: role,
        joinedAt: new Date(),
        isPremium: false,
        streak: 1
      });


    } catch (error) {
      console.error("Auth Error:", error);
    }
    
    // Navigate with state
    navigate('/home', { state: { userRole: role } });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } 
  };

  return (
    <div className={`onboarding-page ${step === 0 ? 'landing-mode' : ''}`}>
      {step === 0 ? (
        // ... (Landing code same)
        <div className="landing-container fade-in">
           {/* ... keep existing landing code ... */}
           <h1 className="main-logo fade-in-down">AIQ</h1>
           <div className="landing-content">
             <div className="mascot-wrapper">
               <div className="mascot-bg-glow"></div>
               <img src={mascotImg} className={`landing-mascot slide-${introStep}`} />
             </div>
             <h3 className="landing-slogan fade-in-up">{introData[introStep].slogan}</h3>
             <div className="text-content fade-in-up">
               <h2 className="landing-title">{introData[introStep].title}</h2>
               <p className="landing-desc">{introData[introStep].desc}</p>
             </div>
             <div className="landing-dots">
               {[0, 1, 2].map(i => <div key={i} className={`landing-dot ${i === introStep ? 'active' : ''}`} onClick={() => setIntroStep(i)}/>)}
             </div>
           </div>
           <div className="landing-buttons fade-in">
             {introStep === 2 ? (
               <Button variant="primary" onClick={() => setStep(1)}>내 AI 지능(AIQ) 확인하기</Button>
             ) : (
               <Button variant="primary" onClick={handleIntroNext}>다음</Button>
             )}
             {introStep === 2 && <Button variant="secondary" onClick={() => navigate('/login')}>계정이 이미 있습니다</Button>}
           </div>
        </div>
      ) : (
        // Wizard View
        <>
          <div className="mascot-container">
            <img src={mascotImg} className="mascot-img" />
            <div className="mascot-speech">
              {step === 1 && "안녕! 난 AIQ 앵무새야! 🦜 이메일이 뭐야?"}
              {step === 2 && "반가워! 나이가 어떻게 돼?"}
              {step === 3 && "공부는 언제 주로 해?"}
              {step === 4 && "마지막이야! 어떤 일을 해?"}
            </div>
          </div>

          <div className="step-content">
            {step === 1 && (
              <div className="fade-in">
                <input type="email" placeholder="name@example.com" className="onboarding-input" />
                <Button onClick={handleNext}>코드 보내기</Button>
              </div>
            )}

            {step === 2 && (
              <div className="chips-grid fade-in">
                {['10대', '20대', '30대', '40대 이상'].map(age => (
                  <button key={age} className="chip-btn" onClick={handleNext}>{age}</button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="chips-grid fade-in">
                {['아침 ☀️', '점심 🍱', '저녁 🌙', '새벽 🦉'].map(time => (
                  <button key={time} className="chip-btn" onClick={handleNext}>{time}</button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="chips-grid fade-in">
                 {['기획', '디자인', '개발', '창업'].map(role => (
                   <button key={role} className="chip-btn" onClick={() => handleRoleSelect(role)}>{role}</button>
                 ))}
              </div>
            )}
          </div>
          
          <div className="progress-dots">
            {[1,2,3,4].map(i => (
              <div key={i} className={`dot ${i === step ? 'active' : ''}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
