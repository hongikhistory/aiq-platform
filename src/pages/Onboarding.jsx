import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { auth, db, googleProvider } from '../firebase';
import Button from '../components/Button';
import './Onboarding.css';
import mascotImg from '../assets/mascot.png';

// Role Mapping Constants
const ROLE_MAP = {
  '기획': 'ROLE_PLAN',
  '디자인': 'ROLE_DESIGN',
  '개발': 'ROLE_DEV',
  '창업': 'ROLE_FOUNDER'
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Intro, 1: Login, 2: Time, 3: Role
  const [introStep, setIntroStep] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const introData = [
    { slogan: "AI로 만드는 나만의 경쟁력", title: "내 업무 지능(AIQ)은 몇 점?", desc: "3분 만에 진단하고 딱 맞는 커리큘럼을 받아보세요." },
    { slogan: "실무에 바로 쓰는 AI", title: "직무별 맞춤 로드맵", desc: "기획자, 개발자, 디자이너... 내 직무에 딱 맞는 AI 활용법." },
    { slogan: "함께 성장하는 커뮤니티", title: "매일 성장하는 습관", desc: "AI 트렌드와 강의를 매일매일 챙겨드립니다." }
  ];

  const handleIntroNext = () => {
    if (introStep < 2) setIntroStep(introStep + 1);
    else setStep(1); // Go to Login
  };

  const handleGoogleLogin = async () => {


    setIsLoading(true);
    try {
      console.log("Starting Google Login...");
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Login Success:", result.user.uid);
      const user = result.user;
      
      // Check if user exists
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User exists, navigating to home.");
        // Existing user -> Go to Home
        const userData = docSnap.data();
        navigate('/home', { state: { userRole: userData.role || '기획' } });
      } else {
        console.log("New user, moving to step 2.");
        // New user -> Go to Time Selection
        setStep(2);
      }
    } catch (error) {
      console.error("Login Failed Detail:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        alert("로그인 창이 닫혔습니다. 다시 시도해 주세요.");
      } else if (error.code === 'auth/configuration-not-found') {
        alert("Firebase 인증 설정이 찾을 수 없습니다. 콘솔을 확인해주세요.");
      } else {
        alert(`로그인 오류: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    // Slight delay for visual feedback
    setTimeout(() => setStep(3), 300);
  };

  const handleRoleSelect = async (roleLabel) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("로그인 정보가 없습니다. 다시 로그인해 주세요.");
        setStep(1);
        return;
      }

      const roleTag = ROLE_MAP[roleLabel];
      
      // Save User Data
      await setDoc(doc(db, "users", user.uid), {
        role: roleLabel, // Display name
        roleTag: roleTag, // System tag
        studyTime: selectedTime,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        joinedAt: new Date(),
        isPremium: false,
        streak: 1
      });

      navigate('/home', { state: { userRole: roleLabel } });

    } catch (error) {
      console.error("Save Error:", error);
      alert("정보 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render intro dots
  const renderDots = () => (
    <div className="landing-dots">
      {[0, 1, 2].map(i => (
        <div 
          key={i} 
          className={`landing-dot ${i === introStep ? 'active' : ''}`} 
          onClick={() => setIntroStep(i)}
        />
      ))}
    </div>
  );

  return (
    <div className={`onboarding-page ${step === 0 ? 'landing-mode' : ''}`}>
      {/* Step 0: Intro Carousel */}
      {step === 0 && (
        <div className="landing-container fade-in">
           <h1 className="main-logo fade-in-down">AIQ</h1>
           <div className="landing-content">
             <div className="mascot-wrapper">
               <div className="mascot-bg-glow"></div>
               <img src={mascotImg} className={`landing-mascot slide-${introStep}`} alt="Mascot" />
             </div>
             <h3 className="landing-slogan fade-in-up">{introData[introStep].slogan}</h3>
             <div className="text-content fade-in-up">
               <h2 className="landing-title">{introData[introStep].title}</h2>
               <p className="landing-desc">{introData[introStep].desc}</p>
             </div>
             {renderDots()}
           </div>
           
           <div className="landing-buttons fade-in">
             <Button variant="primary" onClick={handleIntroNext}>
               {introStep === 2 ? "시작하기" : "다음"}
             </Button>
             
             <div className="login-link-container">
               <span className="login-link-text">이미 계정이 있으신가요? </span>
               <button className="login-link-btn" onClick={() => setStep(1)}>로그인</button>
             </div>
           </div>
        </div>
      )}

      {/* Wizard Steps (1, 2, 3) */}
      {step > 0 && (
        <>
          <div className="mascot-container">
            <img src={mascotImg} className="mascot-img" alt="Mascot" />
            <div className="mascot-speech">
              {step === 1 && "반가워요! 구글로 간편하게 시작해 볼까요?"}
              {step === 2 && "주로 언제 학습하시나요? 알맞은 시간에 리마인드 해드릴게요."}
              {step === 3 && "마지막이에요! 현재 어떤 직무를 맡고 계신가요?"}
            </div>
          </div>

          <div className="step-content">
            {/* Step 1: Google Login */}
            {step === 1 && (
              <div className="fade-in login-step">
                <Button variant="google" onClick={handleGoogleLogin} disabled={isLoading}>
                  {isLoading ? '로그인 중...' : 'Google로 계속하기'}
                </Button>
                <p className="login-note">
                  계정 생성 시 <span className="link">이용약관</span> 및 <span className="link">개인정보처리방침</span>에 동의하게 됩니다.
                </p>
              </div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <div className="chips-grid fade-in">
                {['아침 ☀️', '점심 🍱', '저녁 🌙', '새벽 🦉'].map(time => (
                  <button 
                    key={time} 
                    className={`chip-btn ${selectedTime === time ? 'active' : ''}`} 
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Role Selection */}
            {step === 3 && (
              <div className="chips-grid fade-in">
                 {Object.keys(ROLE_MAP).map(role => (
                   <button 
                    key={role} 
                    className="chip-btn" 
                    onClick={() => handleRoleSelect(role)}
                    disabled={isLoading}
                   >
                     {role}
                   </button>
                 ))}
              </div>
            )}
          </div>
          
          {/* Progress Dots for Wizard */}
          {step > 0 && (
            <div className="progress-dots">
              {[1, 2, 3].map(i => (
                <div key={i} className={`dot ${i === step ? 'active' : ''}`} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
