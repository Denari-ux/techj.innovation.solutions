import { useState, useEffect, useRef, useCallback } from "react";

// ─── ICONS ─────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const I = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  shop: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  dashboard: "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  bot: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 0 1 3 3v1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2v1a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-1a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2v-1a3 3 0 0 1 3-3h3V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z M9 13h.01 M15 13h.01",
  send: "M22 2L11 13 M22 2L15 22l-4-9-9-4 22-7z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  click: "M9 9l-6 6 M14.5 4l-3 3 3 3M21 12l-3 3-3-3 M14.5 20l3-3-3-3",
  cart: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  trophy: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0V2z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  x: "M18 6L6 18 M6 6l12 12",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  settings: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  award: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  trending: "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  check: "M20 6L9 17l-5-5",
  plus: "M12 5v14 M5 12h14",
  minus: "M5 12h14",
  fb: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  ig: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z",
  yt: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  google: "M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.19-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z",
  tw: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  tiktok: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.83a8.27 8.27 0 0 0 4.83 1.54V4.57a4.85 4.85 0 0 1-1.05-.12z",
};

// ─── MOCK DATA ──────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Tênis Runner Pro", price: 299.90, oldPrice: 399.90, category: "Calçados", img: "👟", rating: 4.8, sales: 1240, stock: 45 },
  { id: 2, name: "Smartwatch Elite X", price: 849.90, oldPrice: 1099.90, category: "Tecnologia", img: "⌚", rating: 4.9, sales: 876, stock: 28 },
  { id: 3, name: "Mochila Adventure", price: 189.90, oldPrice: 249.90, category: "Acessórios", img: "🎒", rating: 4.7, sales: 2100, stock: 62 },
  { id: 4, name: "Fone Bluetooth Max", price: 399.90, oldPrice: 599.90, category: "Tecnologia", img: "🎧", rating: 4.6, sales: 543, stock: 33 },
  { id: 5, name: "Câmera Instax Mini", price: 599.90, oldPrice: 749.90, category: "Tecnologia", img: "📷", rating: 4.5, sales: 320, stock: 15 },
  { id: 6, name: "Óculos Ray Style", price: 229.90, oldPrice: 289.90, category: "Acessórios", img: "🕶️", rating: 4.4, sales: 980, stock: 50 },
];

const PLATFORMS = [
  { id: "facebook", name: "Facebook", icon: "fb", color: "#1877F2", connected: true, followers: 45200, reach: 128000 },
  { id: "instagram", name: "Instagram", icon: "ig", color: "#E1306C", connected: true, followers: 89400, reach: 234000 },
  { id: "youtube", name: "YouTube", icon: "yt", color: "#FF0000", connected: true, followers: 23100, reach: 456000 },
  { id: "google", name: "Google Ads", icon: "google", color: "#4285F4", connected: false, followers: 0, reach: 0 },
  { id: "twitter", name: "X (Twitter)", icon: "tw", color: "#000000", connected: true, followers: 12800, reach: 67000 },
  { id: "tiktok", name: "TikTok", icon: "tiktok", color: "#010101", connected: false, followers: 0, reach: 0 },
];

const SALES_DATA = [
  { month: "Jan", revenue: 18400, orders: 142, clicks: 3200, views: 18900 },
  { month: "Fev", revenue: 22100, orders: 178, clicks: 4100, views: 22400 },
  { month: "Mar", revenue: 19800, orders: 156, clicks: 3750, views: 20100 },
  { month: "Abr", revenue: 31200, orders: 241, clicks: 5800, views: 31800 },
  { month: "Mai", revenue: 28900, orders: 218, clicks: 5200, views: 29700 },
  { month: "Jun", revenue: 38500, orders: 302, clicks: 7100, views: 41200 },
];

const RECENT_ORDERS = [
  { id: "#ORD-8821", customer: "Ana Oliveira", product: "Tênis Runner Pro", value: 299.90, status: "entregue", date: "26/06/2026", source: "Instagram" },
  { id: "#ORD-8820", customer: "Carlos Mendes", product: "Smartwatch Elite X", value: 849.90, status: "enviado", date: "26/06/2026", source: "Facebook" },
  { id: "#ORD-8819", customer: "Mariana Costa", product: "Mochila Adventure", value: 189.90, status: "processando", date: "25/06/2026", source: "YouTube" },
  { id: "#ORD-8818", customer: "Pedro Santos", product: "Fone Bluetooth Max", value: 399.90, status: "entregue", date: "25/06/2026", source: "Google Ads" },
  { id: "#ORD-8817", customer: "Julia Ferreira", product: "Câmera Instax Mini", value: 599.90, status: "enviado", date: "24/06/2026", source: "TikTok" },
];

const LINK_STATS = [
  { url: "loja.shop/promo-verao", platform: "Instagram", views: 8420, clicks: 2103, purchases: 187, ctr: "24.9%", conv: "8.9%" },
  { url: "loja.shop/fone-max", platform: "Facebook", views: 5621, clicks: 1298, purchases: 94, ctr: "23.1%", conv: "7.2%" },
  { url: "loja.shop/smartwatch", platform: "YouTube", views: 12300, clicks: 3450, purchases: 231, ctr: "28.0%", conv: "6.7%" },
  { url: "loja.shop/tenis-runner", platform: "Google Ads", views: 6800, clicks: 2210, purchases: 198, ctr: "32.5%", conv: "9.0%" },
];

const REWARDS = [
  { platform: "Facebook", type: "Meta Business Partner", badge: "🥇", status: "conquistado", value: "R$ 500 créditos" },
  { platform: "Instagram", type: "Creator Bonus", badge: "🥈", status: "conquistado", value: "R$ 320 créditos" },
  { platform: "YouTube", type: "YouTube Monetization", badge: "🏆", status: "conquistado", value: "R$ 1.240 créditos" },
  { platform: "Google", type: "Google Partner Badge", badge: "⭐", status: "em progresso", value: "75% completo" },
  { platform: "TikTok", type: "TikTok Creator Fund", badge: "🎯", status: "pendente", value: "Conectar conta" },
];

// ─── PASSWORD STRENGTH ─────────────────────────────────────────────────
function getPasswordStrength(pw) {
  let score = 0;
  const checks = {
    length: pw.length >= 12,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /\d/.test(pw),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
    noSequence: !/(123|abc|qwerty|senha|pass)/i.test(pw),
  };
  score = Object.values(checks).filter(Boolean).length;
  if (score <= 2) return { label: "Muito Fraca", color: "#ef4444", pct: 16 };
  if (score === 3) return { label: "Fraca", color: "#f97316", pct: 33 };
  if (score === 4) return { label: "Média", color: "#eab308", pct: 50 };
  if (score === 5) return { label: "Forte", color: "#22c55e", pct: 83 };
  return { label: "Muito Forte 🔐", color: "#10b981", pct: 100 };
}

// ─── CHART ─────────────────────────────────────────────────────────────
function MiniChart({ data, color = "#6366f1" }) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 200;
    const y = 50 - (v / max) * 45;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="200" height="50" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`g${color.replace("#","")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={`0,50 ${pts} 200,50`} fill={`url(#g${color.replace("#","")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = (i / (data.length - 1)) * 200;
        const y = 50 - (v / max) * 45;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

// ─── ASSISTANT CHAT ────────────────────────────────────────────────────
function VirtualAssistant({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Olá! Sou a **Nova**, sua assistente de vendas! 🛍️\nPosso te ajudar com produtos, pedidos, rastreamento e muito mais. Como posso te ajudar hoje?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text
      }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `Você é Nova, uma assistente virtual de vendas da loja ShopNova — uma loja online moderna e premium. Seu tom é amigável, profissional e empático. 
Produtos disponíveis: Tênis Runner Pro (R$299,90), Smartwatch Elite X (R$849,90), Mochila Adventure (R$189,90), Fone Bluetooth Max (R$399,90), Câmera Instax Mini (R$599,90), Óculos Ray Style (R$229,90).
Políticas: Frete grátis acima de R$199. Troca em 30 dias. Parcelamento em até 12x sem juros. Entrega em 3-7 dias úteis.
Seja sempre prestativa, breve e objetiva. Use emojis com moderação. Responda em português brasileiro.`,
          messages: [...history, { role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data?.content?.[0]?.text || "Desculpe, não consegui processar sua mensagem.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Ops! Tive um problema técnico. Por favor, tente novamente. 🔧" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position:"fixed", bottom:"24px", right:"24px", width:"360px", height:"520px", background:"#0f0f1a", borderRadius:"20px", boxShadow:"0 20px 60px rgba(99,102,241,0.4)", display:"flex", flexDirection:"column", zIndex:1000, border:"1px solid rgba(99,102,241,0.3)", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", padding:"16px 20px", display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"22px" }}>🤖</div>
        <div>
          <div style={{ color:"#fff", fontWeight:700, fontSize:"15px" }}>Nova — Assistente Virtual</div>
          <div style={{ color:"rgba(255,255,255,0.8)", fontSize:"12px", display:"flex", alignItems:"center", gap:"4px" }}>
            <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#4ade80", display:"inline-block" }}></span>
            Online agora
          </div>
        </div>
        <button onClick={onClose} style={{ marginLeft:"auto", background:"none", border:"none", color:"rgba(255,255,255,0.8)", cursor:"pointer", padding:"4px" }}>
          <Icon d={I.x} size={18} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:"12px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth:"80%", padding:"10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.07)",
              color:"#fff", fontSize:"13.5px", lineHeight:"1.5", whiteSpace:"pre-wrap"
            }}>
              {m.text.replace(/\*\*(.*?)\*\*/g, "$1")}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex", gap:"6px", padding:"8px 14px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#6366f1", animation:`bounce 1.4s ${i*0.2}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding:"12px 16px", borderTop:"1px solid rgba(255,255,255,0.08)", display:"flex", gap:"8px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Digite sua mensagem..."
          style={{ flex:1, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:"12px", padding:"10px 14px", color:"#fff", fontSize:"13px", outline:"none" }}
        />
        <button onClick={send} disabled={loading} style={{ width:"42px", height:"42px", borderRadius:"12px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon d={I.send} size={16} color="#fff" />
        </button>
      </div>

      <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

// ─── AUTH MODAL ─────────────────────────────────────────────────────────
function AuthModal({ mode, onClose, onAuth }) {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const strength = getPasswordStrength(form.password);

  const update = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email inválido";
    if (!isLogin) {
      if (!form.name.trim()) e.name = "Nome obrigatório";
      if (form.password.length < 12) e.password = "Mínimo 12 caracteres";
      if (strength.pct < 50) e.password = "Senha muito fraca";
      if (form.password !== form.confirm) e.confirm = "Senhas não conferem";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    onAuth({ email: form.email, name: form.name || "Usuário", isAdmin: form.email.includes("admin") });
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, backdropFilter:"blur(6px)" }}>
      <div style={{ background:"#0f0f1a", borderRadius:"24px", width:"440px", maxWidth:"95vw", border:"1px solid rgba(99,102,241,0.3)", overflow:"hidden" }}>
        {/* Top bar */}
        <div style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", padding:"24px 28px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ fontSize:"26px", fontWeight:800, color:"#fff" }}>🛍️ ShopNova</div>
            <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:"8px", padding:"6px", cursor:"pointer", color:"#fff" }}><Icon d={I.x} size={18} /></button>
          </div>
          <div style={{ color:"rgba(255,255,255,0.9)", marginTop:"8px", fontSize:"15px" }}>{isLogin ? "Bem-vindo de volta! 👋" : "Crie sua conta segura 🔐"}</div>
        </div>

        <div style={{ padding:"28px" }}>
          {/* Tabs */}
          <div style={{ display:"flex", background:"rgba(255,255,255,0.05)", borderRadius:"12px", padding:"4px", marginBottom:"24px" }}>
            {["Entrar","Criar Conta"].map((t,i) => (
              <button key={t} onClick={() => { setIsLogin(i===0); setErrors({}); }} style={{
                flex:1, padding:"10px", borderRadius:"9px", border:"none", cursor:"pointer", fontWeight:600, fontSize:"14px",
                background: (isLogin === (i===0)) ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
                color: (isLogin === (i===0)) ? "#fff" : "rgba(255,255,255,0.5)",
                transition:"all 0.2s"
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {!isLogin && (
              <Field label="Nome completo" icon={I.user} value={form.name} onChange={update("name")} error={errors.name} placeholder="Seu nome" />
            )}
            <Field label="Email" icon={I.send} value={form.email} onChange={update("email")} error={errors.email} placeholder="seu@email.com" type="email" />
            <Field label="Senha" icon={I.lock} value={form.password} onChange={update("password")} error={errors.password} placeholder={isLogin ? "Sua senha" : "Mínimo 12 caracteres"} type={showPw ? "text" : "password"} extra={
              <button type="button" onClick={() => setShowPw(p=>!p)} style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,0.5)", padding:"0 4px" }}>
                <Icon d={I.eye} size={16} />
              </button>
            } />

            {!isLogin && form.password && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                  <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>Segurança da senha</span>
                  <span style={{ fontSize:"12px", color:strength.color, fontWeight:600 }}>{strength.label}</span>
                </div>
                <div style={{ height:"4px", borderRadius:"4px", background:"rgba(255,255,255,0.1)", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${strength.pct}%`, background:strength.color, transition:"all 0.3s", borderRadius:"4px" }} />
                </div>
                <div style={{ marginTop:"8px", display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {[["12+ chars",form.password.length>=12],["Maiúscula",/[A-Z]/.test(form.password)],["Número",/\d/.test(form.password)],["Símbolo",/[!@#$%^&*]/.test(form.password)]].map(([l,ok])=>(
                    <span key={l} style={{ fontSize:"11px", padding:"2px 8px", borderRadius:"20px", background: ok ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.05)", color: ok ? "#4ade80" : "rgba(255,255,255,0.3)", border:`1px solid ${ok?"rgba(34,197,94,0.3)":"rgba(255,255,255,0.1)"}` }}>{ok?"✓":""} {l}</span>
                  ))}
                </div>
              </div>
            )}

            {!isLogin && (
              <Field label="Confirmar senha" icon={I.lock} value={form.confirm} onChange={update("confirm")} error={errors.confirm} placeholder="Repita a senha" type="password" />
            )}

            <button onClick={submit} style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"12px", color:"#fff", fontWeight:700, fontSize:"15px", cursor:"pointer", marginTop:"4px", boxShadow:"0 8px 24px rgba(99,102,241,0.4)", transition:"transform 0.1s" }}>
              {isLogin ? "Entrar" : "Criar Conta Segura"} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, value, onChange, error, placeholder, type="text", extra }) {
  return (
    <div>
      <label style={{ display:"block", color:"rgba(255,255,255,0.6)", fontSize:"13px", marginBottom:"6px", fontWeight:500 }}>{label}</label>
      <div style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,0.06)", border:`1px solid ${error?"#ef4444":"rgba(255,255,255,0.12)"}`, borderRadius:"12px", overflow:"hidden" }}>
        <span style={{ padding:"0 12px", color:"rgba(255,255,255,0.3)" }}><Icon d={icon} size={15} /></span>
        <input value={value} onChange={onChange} placeholder={placeholder} type={type} style={{ flex:1, background:"none", border:"none", outline:"none", color:"#fff", padding:"12px 8px", fontSize:"14px" }} />
        {extra}
      </div>
      {error && <p style={{ margin:"4px 0 0", fontSize:"12px", color:"#ef4444" }}>{error}</p>}
    </div>
  );
}

// ─── PUBLISH MODAL ─────────────────────────────────────────────────────
function PublishModal({ product, onClose }) {
  const [selected, setSelected] = useState([]);
  const [caption, setCaption] = useState(`🔥 ${product?.name} com ${Math.round((1-product?.price/product?.oldPrice)*100)}% OFF!\n✅ De R$${product?.oldPrice?.toFixed(2)} por apenas R$${product?.price?.toFixed(2)}\n🛒 Compre agora: loja.shop/produto\n\n#promoção #shopnova #oferta`);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = id => setSelected(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);
  const connected = PLATFORMS.filter(p => p.connected);

  const publish = () => {
    if (!selected.length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2200);
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000, backdropFilter:"blur(6px)" }}>
      <div style={{ background:"#0f0f1a", borderRadius:"24px", width:"520px", maxWidth:"95vw", border:"1px solid rgba(99,102,241,0.3)", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:"18px" }}>📢 Publicar nas Redes</div>
            <div style={{ color:"rgba(255,255,255,0.8)", fontSize:"13px" }}>{product?.name}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:"8px", padding:"6px", cursor:"pointer", color:"#fff" }}><Icon d={I.x} size={18} /></button>
        </div>

        {done ? (
          <div style={{ padding:"40px", textAlign:"center" }}>
            <div style={{ fontSize:"64px", marginBottom:"16px" }}>🎉</div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:"20px" }}>Publicado com sucesso!</div>
            <div style={{ color:"rgba(255,255,255,0.6)", marginTop:"8px" }}>Publicado em {selected.length} plataforma{selected.length>1?"s":""}.</div>
            <div style={{ marginTop:"16px", display:"flex", gap:"8px", justifyContent:"center" }}>
              {selected.map(id => {
                const p = PLATFORMS.find(x=>x.id===id);
                return <span key={id} style={{ padding:"6px 14px", borderRadius:"20px", background:`${p.color}22`, color:p.color, fontWeight:600, fontSize:"13px", border:`1px solid ${p.color}44` }}>{p.name}</span>;
              })}
            </div>
            <button onClick={onClose} style={{ marginTop:"24px", padding:"12px 32px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"12px", color:"#fff", fontWeight:600, cursor:"pointer" }}>Fechar</button>
          </div>
        ) : (
          <div style={{ padding:"24px" }}>
            <div style={{ marginBottom:"20px" }}>
              <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"13px", marginBottom:"10px", fontWeight:600 }}>PLATAFORMAS CONECTADAS</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {connected.map(p => (
                  <button key={p.id} onClick={() => toggle(p.id)} style={{
                    padding:"12px 14px", borderRadius:"12px", border:`2px solid ${selected.includes(p.id) ? p.color : "rgba(255,255,255,0.1)"}`,
                    background: selected.includes(p.id) ? `${p.color}22` : "rgba(255,255,255,0.04)",
                    cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", transition:"all 0.2s"
                  }}>
                    <Icon d={I[p.icon]} size={18} color={p.color} />
                    <div style={{ textAlign:"left" }}>
                      <div style={{ color:"#fff", fontWeight:600, fontSize:"13px" }}>{p.name}</div>
                      <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"11px" }}>{p.followers.toLocaleString()} seguidores</div>
                    </div>
                    {selected.includes(p.id) && <span style={{ marginLeft:"auto", fontSize:"16px" }}>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:"20px" }}>
              <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"13px", marginBottom:"8px", fontWeight:600 }}>LEGENDA</div>
              <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={5} style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"12px", padding:"12px", color:"#fff", fontSize:"13px", resize:"vertical", outline:"none", boxSizing:"border-box" }} />
            </div>

            <button onClick={publish} disabled={!selected.length || loading} style={{ width:"100%", padding:"14px", background: selected.length ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.1)", border:"none", borderRadius:"12px", color:"#fff", fontWeight:700, fontSize:"15px", cursor: selected.length ? "pointer" : "not-allowed", transition:"all 0.2s" }}>
              {loading ? "⏳ Publicando..." : `📤 Publicar em ${selected.length} plataforma${selected.length!==1?"s":""}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [showBot, setShowBot] = useState(false);
  const [cart, setCart] = useState([]);
  const [publishProduct, setPublishProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const notify = (msg, type="success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const addCart = (p) => {
    setCart(prev => {
      const ex = prev.find(x => x.id === p.id);
      if (ex) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
    notify(`${p.name} adicionado ao carrinho! 🛒`);
  };

  const totalRevenue = SALES_DATA.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = SALES_DATA.reduce((a, b) => a + b.orders, 0);
  const totalViews = SALES_DATA.reduce((a, b) => a + b.views, 0);
  const totalClicks = SALES_DATA.reduce((a, b) => a + b.clicks, 0);

  const NAV = [
    { id:"home", label:"Início", icon:I.home },
    { id:"shop", label:"Loja", icon:I.shop },
    ...(user ? [{ id:"dashboard", label:"Dashboard", icon:I.dashboard }] : []),
  ];

  // ── HOME ──
  const HomePage = () => (
    <div>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#0f0f1a 0%,#1a0f2e 50%,#0f1a2e 100%)", padding:"80px 24px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.15) 0%, transparent 50%)" }} />
        <div style={{ position:"relative", zIndex:1, maxWidth:"700px", margin:"0 auto" }}>
          <div style={{ display:"inline-block", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:"20px", padding:"6px 16px", color:"#a5b4fc", fontSize:"13px", fontWeight:600, marginBottom:"24px" }}>
            🔥 Até 40% OFF em produtos selecionados
          </div>
          <h1 style={{ fontSize:"clamp(36px,6vw,64px)", fontWeight:900, color:"#fff", lineHeight:1.1, margin:"0 0 20px" }}>
            Compre com<br/><span style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>inteligência</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"18px", marginBottom:"36px", lineHeight:1.6 }}>
            Produtos premium com os melhores preços. Assistente virtual 24/7 para te ajudar em cada passo.
          </p>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setPage("shop")} style={{ padding:"14px 32px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"14px", color:"#fff", fontWeight:700, fontSize:"16px", cursor:"pointer", boxShadow:"0 12px 30px rgba(99,102,241,0.4)" }}>
              Ver Produtos →
            </button>
            <button onClick={() => setShowBot(true)} style={{ padding:"14px 32px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"14px", color:"#fff", fontWeight:600, fontSize:"16px", cursor:"pointer" }}>
              🤖 Falar com Nova
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:"rgba(99,102,241,0.08)", borderTop:"1px solid rgba(99,102,241,0.15)", borderBottom:"1px solid rgba(99,102,241,0.15)", padding:"20px 24px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"24px", textAlign:"center" }}>
          {[["R$ 158K+","em vendas"],["5.200+","produtos vendidos"],["98%","satisfação"],["24/7","suporte IA"]].map(([v,l])=>(
            <div key={l}>
              <div style={{ color:"#a5b4fc", fontWeight:800, fontSize:"22px" }}>{v}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"13px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"60px 24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"32px" }}>
          <h2 style={{ color:"#fff", fontSize:"28px", fontWeight:800, margin:0 }}>🔥 Mais Vendidos</h2>
          <button onClick={() => setPage("shop")} style={{ background:"none", border:"1px solid rgba(99,102,241,0.4)", borderRadius:"10px", padding:"8px 18px", color:"#a5b4fc", cursor:"pointer", fontWeight:600 }}>Ver todos →</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"20px" }}>
          {PRODUCTS.slice(0,3).map(p => <ProductCard key={p.id} p={p} onAdd={addCart} onPublish={() => setPublishProduct(p)} user={user} />)}
        </div>
      </div>

      {/* Platforms showcase */}
      <div style={{ background:"rgba(255,255,255,0.02)", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"60px 24px" }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ color:"#fff", fontSize:"28px", fontWeight:800, marginBottom:"12px" }}>Conectado a todas as plataformas</h2>
          <p style={{ color:"rgba(255,255,255,0.5)", marginBottom:"36px" }}>Gerencie suas publicações e anúncios em um só lugar</p>
          <div style={{ display:"flex", justifyContent:"center", gap:"16px", flexWrap:"wrap" }}>
            {PLATFORMS.map(p => (
              <div key={p.id} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 18px", background:"rgba(255,255,255,0.04)", border:`1px solid ${p.color}33`, borderRadius:"12px" }}>
                <Icon d={I[p.icon]} size={18} color={p.color} />
                <span style={{ color:"rgba(255,255,255,0.8)", fontSize:"13px", fontWeight:600 }}>{p.name}</span>
                {p.connected && <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#4ade80" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── SHOP ──
  const ShopPage = () => {
    const [filter, setFilter] = useState("Todos");
    const cats = ["Todos", "Tecnologia", "Calçados", "Acessórios"];
    const filtered = filter === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    return (
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"40px 24px" }}>
        <div style={{ marginBottom:"32px" }}>
          <h1 style={{ color:"#fff", fontSize:"32px", fontWeight:800, marginBottom:"8px" }}>Nossa Loja</h1>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ padding:"8px 18px", borderRadius:"20px", border:`1px solid ${filter===c?"#6366f1":"rgba(255,255,255,0.12)"}`, background: filter===c?"rgba(99,102,241,0.2)":"transparent", color: filter===c?"#a5b4fc":"rgba(255,255,255,0.5)", cursor:"pointer", fontWeight:600, fontSize:"13px" }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"20px" }}>
          {filtered.map(p => <ProductCard key={p.id} p={p} onAdd={addCart} onPublish={() => setPublishProduct(p)} user={user} />)}
        </div>
      </div>
    );
  };

  // ── DASHBOARD ──
  const DashboardPage = () => {
    const tabs = ["overview","redes","links","pedidos","premiações"];
    const tabLabels = { overview:"📊 Visão Geral", redes:"📱 Redes Sociais", links:"🔗 Links & Cliques", pedidos:"📦 Pedidos", "premiações":"🏆 Premiações" };

    return (
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"40px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"32px", flexWrap:"wrap", gap:"16px" }}>
          <div>
            <h1 style={{ color:"#fff", fontSize:"28px", fontWeight:800, margin:0 }}>Dashboard</h1>
            <p style={{ color:"rgba(255,255,255,0.5)", margin:"4px 0 0" }}>Olá, {user?.name}! Aqui está seu resumo.</p>
          </div>
          <div style={{ display:"flex", gap:"8px" }}>
            <button onClick={() => setPublishProduct(PRODUCTS[0])} style={{ padding:"10px 18px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"10px", color:"#fff", fontWeight:600, cursor:"pointer", fontSize:"13px", display:"flex", alignItems:"center", gap:"6px" }}>
              <Icon d={I.share} size={14} /> Publicar
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:"4px", background:"rgba(255,255,255,0.04)", borderRadius:"12px", padding:"4px", marginBottom:"28px", overflowX:"auto" }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding:"10px 16px", borderRadius:"9px", border:"none", cursor:"pointer", fontWeight:600, fontSize:"13px", whiteSpace:"nowrap",
              background: activeTab===t ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
              color: activeTab===t ? "#fff" : "rgba(255,255,255,0.5)", transition:"all 0.2s"
            }}>{tabLabels[t]}</button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"16px", marginBottom:"28px" }}>
              {[
                { label:"Receita Total", value:`R$ ${totalRevenue.toLocaleString("pt-BR",{minimumFractionDigits:2})}`, icon:I.trending, color:"#6366f1", data:SALES_DATA.map(x=>x.revenue), change:"+23%" },
                { label:"Pedidos", value:totalOrders.toLocaleString(), icon:I.cart, color:"#8b5cf6", data:SALES_DATA.map(x=>x.orders), change:"+18%" },
                { label:"Visualizações", value:totalViews.toLocaleString(), icon:I.eye, color:"#ec4899", data:SALES_DATA.map(x=>x.views), change:"+31%" },
                { label:"Cliques nos Links", value:totalClicks.toLocaleString(), icon:I.click, color:"#10b981", data:SALES_DATA.map(x=>x.clicks), change:"+27%" },
              ].map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"16px", padding:"20px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", right:"-10px", bottom:"-5px", opacity:0.15 }}>
                    <MiniChart data={s.data} color={s.color} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
                    <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:`${s.color}22`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon d={s.icon} size={18} color={s.color} />
                    </div>
                    <span style={{ background:"rgba(34,197,94,0.15)", color:"#4ade80", padding:"2px 8px", borderRadius:"20px", fontSize:"12px", fontWeight:600 }}>{s.change}</span>
                  </div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px", marginBottom:"4px" }}>{s.label}</div>
                  <div style={{ color:"#fff", fontWeight:800, fontSize:"22px" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", padding:"24px", marginBottom:"20px" }}>
              <h3 style={{ color:"#fff", fontWeight:700, marginBottom:"20px", margin:"0 0 20px" }}>Receita Mensal (Jan–Jun 2026)</h3>
              <div style={{ display:"flex", alignItems:"flex-end", gap:"12px", height:"120px" }}>
                {SALES_DATA.map((d, i) => {
                  const max = Math.max(...SALES_DATA.map(x=>x.revenue));
                  const h = (d.revenue / max) * 100;
                  return (
                    <div key={d.month} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
                      <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.5)" }}>R${(d.revenue/1000).toFixed(0)}k</div>
                      <div style={{ width:"100%", height:`${h}%`, background:`linear-gradient(to top, #6366f1, #8b5cf6)`, borderRadius:"6px 6px 0 0", minHeight:"8px" }} />
                      <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>{d.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === "redes" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"16px" }}>
              {PLATFORMS.map(p => (
                <div key={p.id} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${p.connected?"rgba(99,102,241,0.3)":"rgba(255,255,255,0.07)"}`, borderRadius:"16px", padding:"20px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
                    <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:`${p.color}22`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Icon d={I[p.icon]} size={22} color={p.color} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ color:"#fff", fontWeight:700 }}>{p.name}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                        <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:p.connected?"#4ade80":"#ef4444" }} />
                        <span style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px" }}>{p.connected?"Conectado":"Desconectado"}</span>
                      </div>
                    </div>
                  </div>
                  {p.connected ? (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                      <Stat label="Seguidores" value={p.followers.toLocaleString()} color="#a5b4fc" />
                      <Stat label="Alcance" value={p.reach.toLocaleString()} color="#c084fc" />
                    </div>
                  ) : (
                    <button style={{ width:"100%", padding:"10px", background:`${p.color}22`, border:`1px solid ${p.color}44`, borderRadius:"10px", color:p.color, fontWeight:600, cursor:"pointer", fontSize:"13px" }}>Conectar →</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links Tab */}
        {activeTab === "links" && (
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", overflow:"hidden" }}>
            <div style={{ padding:"20px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              <h3 style={{ color:"#fff", fontWeight:700, margin:0 }}>Performance dos Links Publicados</h3>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                    {["Link","Plataforma","Visualizações","Cliques","Compras","CTR","Conversão"].map(h=>(
                      <th key={h} style={{ padding:"12px 20px", color:"rgba(255,255,255,0.5)", fontWeight:600, fontSize:"12px", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LINK_STATS.map((l,i) => (
                    <tr key={i} style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding:"14px 20px", color:"#a5b4fc", fontWeight:600, fontSize:"13px" }}>{l.url}</td>
                      <td style={{ padding:"14px 20px" }}>
                        <span style={{ padding:"4px 10px", borderRadius:"20px", background:"rgba(99,102,241,0.15)", color:"#a5b4fc", fontSize:"12px" }}>{l.platform}</span>
                      </td>
                      <td style={{ padding:"14px 20px", color:"rgba(255,255,255,0.7)" }}>{l.views.toLocaleString()}</td>
                      <td style={{ padding:"14px 20px", color:"rgba(255,255,255,0.7)" }}>{l.clicks.toLocaleString()}</td>
                      <td style={{ padding:"14px 20px", color:"#4ade80", fontWeight:700 }}>{l.purchases}</td>
                      <td style={{ padding:"14px 20px", color:"#fbbf24" }}>{l.ctr}</td>
                      <td style={{ padding:"14px 20px", color:"#34d399" }}>{l.conv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pedidos Tab */}
        {activeTab === "pedidos" && (
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px", overflow:"hidden" }}>
            <div style={{ padding:"20px 24px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <h3 style={{ color:"#fff", fontWeight:700, margin:0 }}>Pedidos Recentes</h3>
              <span style={{ background:"rgba(99,102,241,0.15)", color:"#a5b4fc", padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:600 }}>{RECENT_ORDERS.length} pedidos</span>
            </div>
            {RECENT_ORDERS.map(o => (
              <div key={o.id} style={{ padding:"16px 24px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>
                <div style={{ minWidth:"90px" }}>
                  <div style={{ color:"#a5b4fc", fontWeight:700, fontSize:"13px" }}>{o.id}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"11px" }}>{o.date}</div>
                </div>
                <div style={{ flex:1, minWidth:"120px" }}>
                  <div style={{ color:"#fff", fontWeight:600, fontSize:"13px" }}>{o.customer}</div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px" }}>{o.product}</div>
                </div>
                <div style={{ color:"#4ade80", fontWeight:700 }}>R$ {o.value.toFixed(2)}</div>
                <span style={{ padding:"4px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:600,
                  background: o.status==="entregue"?"rgba(34,197,94,0.15)":o.status==="enviado"?"rgba(99,102,241,0.15)":"rgba(234,179,8,0.15)",
                  color: o.status==="entregue"?"#4ade80":o.status==="enviado"?"#a5b4fc":"#fbbf24"
                }}>{o.status}</span>
                <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"12px" }}>via {o.source}</span>
              </div>
            ))}
          </div>
        )}

        {/* Premiações Tab */}
        {activeTab === "premiações" && (
          <div>
            <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.1))", border:"1px solid rgba(99,102,241,0.2)", borderRadius:"16px", padding:"20px 24px", marginBottom:"20px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <span style={{ fontSize:"32px" }}>🏆</span>
                <div>
                  <div style={{ color:"#fff", fontWeight:700, fontSize:"18px" }}>Centro de Premiações</div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"13px" }}>Gerencie suas recompensas e badges nas plataformas</div>
                </div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"16px" }}>
              {REWARDS.map(r => (
                <div key={r.platform} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${r.status==="conquistado"?"rgba(99,102,241,0.3)":r.status==="em progresso"?"rgba(234,179,8,0.2)":"rgba(255,255,255,0.07)"}`, borderRadius:"16px", padding:"20px" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
                    <span style={{ fontSize:"32px" }}>{r.badge}</span>
                    <span style={{ padding:"4px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:700,
                      background: r.status==="conquistado"?"rgba(34,197,94,0.15)":r.status==="em progresso"?"rgba(234,179,8,0.15)":"rgba(239,68,68,0.15)",
                      color: r.status==="conquistado"?"#4ade80":r.status==="em progresso"?"#fbbf24":"#f87171"
                    }}>{r.status}</span>
                  </div>
                  <div style={{ color:"#fff", fontWeight:700, marginBottom:"4px" }}>{r.platform}</div>
                  <div style={{ color:"rgba(255,255,255,0.6)", fontSize:"13px", marginBottom:"8px" }}>{r.type}</div>
                  <div style={{ color:"#a5b4fc", fontWeight:600, fontSize:"14px" }}>{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a14", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {/* Notification */}
      {notification && (
        <div style={{ position:"fixed", top:"20px", right:"20px", zIndex:9999, background: notification.type==="success"?"linear-gradient(135deg,#059669,#10b981)":"linear-gradient(135deg,#dc2626,#ef4444)", color:"#fff", padding:"14px 20px", borderRadius:"14px", fontWeight:600, fontSize:"14px", boxShadow:"0 8px 30px rgba(0,0,0,0.4)", display:"flex", alignItems:"center", gap:"8px", maxWidth:"320px" }}>
          {notification.type==="success"?"✅":"❌"} {notification.msg}
        </div>
      )}

      {/* Navbar */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,10,20,0.92)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 24px" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:"64px" }}>
          <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px" }}>
            <div style={{ width:"34px", height:"34px", borderRadius:"10px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px" }}>🛍️</div>
            <span style={{ color:"#fff", fontWeight:800, fontSize:"18px" }}>ShopNova</span>
          </button>

          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} style={{ background: page===n.id ? "rgba(99,102,241,0.15)" : "none", border: "none", borderRadius:"10px", padding:"8px 14px", color: page===n.id ? "#a5b4fc" : "rgba(255,255,255,0.6)", cursor:"pointer", fontWeight:600, fontSize:"14px", display:"flex", alignItems:"center", gap:"6px" }}>
                <Icon d={n.icon} size={16} /> {n.label}
              </button>
            ))}

            {/* Cart */}
            <button style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", padding:"8px 14px", color:"#fff", cursor:"pointer", position:"relative", display:"flex", alignItems:"center", gap:"6px" }}>
              <Icon d={I.cart} size={16} />
              {cart.length > 0 && <span style={{ position:"absolute", top:"-4px", right:"-4px", width:"16px", height:"16px", borderRadius:"50%", background:"#6366f1", fontSize:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>{cart.reduce((a,b)=>a+b.qty,0)}</span>}
            </button>

            {/* Auth */}
            {user ? (
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:"14px" }}>
                  {user.name[0].toUpperCase()}
                </div>
                <button onClick={() => setUser(null)} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:"8px", padding:"6px 12px", color:"#f87171", cursor:"pointer", fontSize:"12px", fontWeight:600 }}>Sair</button>
              </div>
            ) : (
              <div style={{ display:"flex", gap:"8px" }}>
                <button onClick={() => setAuthMode("login")} style={{ background:"none", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"10px", padding:"8px 16px", color:"rgba(255,255,255,0.7)", cursor:"pointer", fontWeight:600, fontSize:"13px" }}>Entrar</button>
                <button onClick={() => setAuthMode("register")} style={{ background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"10px", padding:"8px 16px", color:"#fff", cursor:"pointer", fontWeight:600, fontSize:"13px" }}>Criar conta</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Pages */}
      {page === "home" && <HomePage />}
      {page === "shop" && <ShopPage />}
      {page === "dashboard" && user && <DashboardPage />}
      {page === "dashboard" && !user && (
        <div style={{ textAlign:"center", padding:"80px 24px" }}>
          <div style={{ fontSize:"64px", marginBottom:"16px" }}>🔒</div>
          <h2 style={{ color:"#fff", fontWeight:800 }}>Acesso Restrito</h2>
          <p style={{ color:"rgba(255,255,255,0.5)", marginBottom:"24px" }}>Faça login para acessar o Dashboard</p>
          <button onClick={() => setAuthMode("login")} style={{ padding:"14px 32px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"14px", color:"#fff", fontWeight:700, fontSize:"16px", cursor:"pointer" }}>Fazer Login</button>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"40px 24px", textAlign:"center", marginTop:"40px" }}>
        <div style={{ fontSize:"24px", marginBottom:"8px" }}>🛍️ ShopNova</div>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"13px" }}>© 2026 ShopNova. Todos os direitos reservados.</p>
        <div style={{ display:"flex", justifyContent:"center", gap:"16px", marginTop:"16px" }}>
          {PLATFORMS.filter(p=>p.connected).map(p=>(
            <span key={p.id} style={{ display:"flex", alignItems:"center", gap:"6px", color:"rgba(255,255,255,0.4)", fontSize:"12px" }}>
              <Icon d={I[p.icon]} size={14} color={p.color} />
            </span>
          ))}
        </div>
      </footer>

      {/* Bot toggle */}
      {!showBot && (
        <button onClick={() => setShowBot(true)} style={{ position:"fixed", bottom:"24px", right:"24px", width:"60px", height:"60px", borderRadius:"50%", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", boxShadow:"0 8px 30px rgba(99,102,241,0.5)", cursor:"pointer", fontSize:"28px", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center" }}>
          🤖
        </button>
      )}
      {showBot && <VirtualAssistant onClose={() => setShowBot(false)} />}

      {/* Modals */}
      {authMode && <AuthModal mode={authMode} onClose={() => setAuthMode(null)} onAuth={(u) => { setUser(u); setAuthMode(null); notify(`Bem-vindo, ${u.name}! ✨`); if(u.isAdmin) setPage("dashboard"); }} />}
      {publishProduct && <PublishModal product={publishProduct} onClose={() => setPublishProduct(null)} />}
    </div>
  );
}

function ProductCard({ p, onAdd, onPublish, user }) {
  const disc = Math.round((1 - p.price / p.oldPrice) * 100);
  return (
    <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"18px", overflow:"hidden", transition:"transform 0.2s, border-color 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.borderColor="rgba(99,102,241,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
      <div style={{ height:"160px", background:"linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.1))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"72px", position:"relative" }}>
        {p.img}
        <span style={{ position:"absolute", top:"12px", right:"12px", background:"#ef4444", color:"#fff", fontWeight:800, fontSize:"12px", padding:"3px 8px", borderRadius:"20px" }}>-{disc}%</span>
      </div>
      <div style={{ padding:"18px" }}>
        <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"11px", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{p.category}</div>
        <div style={{ color:"#fff", fontWeight:700, fontSize:"15px", marginBottom:"8px" }}>{p.name}</div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"14px" }}>
          <span style={{ color:"#fbbf24", fontSize:"13px" }}>★ {p.rating}</span>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"12px" }}>({p.sales.toLocaleString()} vendas)</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
          <span style={{ color:"#fff", fontWeight:800, fontSize:"20px" }}>R$ {p.price.toFixed(2)}</span>
          <span style={{ color:"rgba(255,255,255,0.3)", fontSize:"13px", textDecoration:"line-through" }}>R$ {p.oldPrice.toFixed(2)}</span>
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button onClick={() => onAdd(p)} style={{ flex:1, padding:"11px", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", border:"none", borderRadius:"10px", color:"#fff", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
            Comprar
          </button>
          {user && (
            <button onClick={() => onPublish(p)} style={{ padding:"11px 13px", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:"10px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Icon d={I.share} size={14} color="#a5b4fc" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:"10px", padding:"12px" }}>
      <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"11px", marginBottom:"4px" }}>{label}</div>
      <div style={{ color:color || "#fff", fontWeight:700, fontSize:"16px" }}>{value}</div>
    </div>
  );
}
