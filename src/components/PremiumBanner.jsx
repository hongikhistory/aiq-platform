import { useState } from 'react';
import Button from './Button';
import './PremiumBanner.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PremiumBanner() {
  const [showPayment, setShowPayment] = useState(false);

  // PayPal Options (Sandbox)
  const initialOptions = {
    "client-id": "test", // "test" enables sandbox mode automatically
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="premium-banner">
      <div className="premium-content">
        <div className="premium-icon">👑</div>
        <div className="premium-text">
          <h3 className="premium-title">AIQ 프리미엄</h3>
          <p className="premium-desc">모든 강의 무제한 + 1:1 코칭</p>
        </div>
      </div>
      
      {!showPayment ? (
        <Button 
          variant="primary" 
          style={{ marginTop: '12px', background: 'white', color: '#6C5CE7', boxShadow: 'none' }}
          onClick={() => setShowPayment(true)}
        >
          프리미엄 멤버십 가입
        </Button>
      ) : (
        <div style={{ marginTop: '16px', width: '100%', minHeight: '40px' }}>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons 
              style={{ layout: "horizontal", height: 40 }} 
              createOrder={async () => {
                const response = await fetch("/api/payments/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" }
                });
                const order = await response.json();
                return order.id;
              }}
              onApprove={async (data) => {
                const response = await fetch("/api/payments/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderId: data.orderID })
                });
                const orderData = await response.json();

                alert("결제가 완료되었습니다! 프리미엄 혜택을 즐기세요. 🎉");
                setShowPayment(false);
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
}
