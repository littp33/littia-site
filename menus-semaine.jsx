import { useState, useRef, useEffect } from "react";

const MEAL_PHOTOS = {
  "Salade de tomates": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  "Pâtes au basilic": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
  "Tartine provençale": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
  "Sole grillée": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80",
  "Jambon-fromage": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
  "Cassoulet": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80",
  "Quiche lorraine": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",
  "Poulet rôti": "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&q=80",
  "Salade niçoise": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  "Spaghetti bolognaise": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80",
  "Soupe de légumes": "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
  "Steak frites": "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=400&q=80",
};

const RECIPES = {
  "Quiche lorraine": {
    time: "45 min",
    difficulty: "Facile",
    servings: 4,
    ingredients: ["1 pâte brisée", "200g lardons", "3 œufs", "20cl crème fraîche", "100g gruyère râpé", "Sel, poivre, noix de muscade"],
    steps: ["Préchauffer le four à 200°C.", "Foncer un moule avec la pâte brisée.", "Faire revenir les lardons à la poêle.", "Battre les œufs avec la crème, sel, poivre et muscade.", "Disposer les lardons sur la pâte, verser l'appareil.", "Parsemer de gruyère. Cuire 30 min."],
  },
  "Poulet rôti": {
    time: "1h20",
    difficulty: "Facile",
    servings: 4,
    ingredients: ["1 poulet entier 1.5kg", "4 gousses d'ail", "1 citron", "Herbes de Provence", "Huile d'olive", "Sel, poivre"],
    steps: ["Préchauffer le four à 220°C.", "Frotter le poulet d'huile, sel, poivre et herbes.", "Glisser ail et citron à l'intérieur.", "Enfourner 1h10 en arrosant toutes les 20 min.", "Laisser reposer 10 min avant de servir."],
  },
  "Salade niçoise": {
    time: "20 min",
    difficulty: "Très facile",
    servings: 2,
    ingredients: ["200g thon en boîte", "4 tomates", "2 œufs durs", "Haricots verts cuits", "Olives noires", "Anchois", "Vinaigrette"],
    steps: ["Cuire les œufs 10 min.", "Disposer salade, tomates, haricots verts.", "Ajouter thon émietté, olives, anchois.", "Couper les œufs en quartiers.", "Assaisonner de vinaigrette."],
  },
  "Pâtes au basilic": {
    time: "20 min",
    difficulty: "Très facile",
    servings: 4,
    ingredients: ["400g pâtes", "1 bouquet basilic frais", "4 c.s. huile d'olive", "2 gousses d'ail", "Parmesan", "Sel, poivre"],
    steps: ["Cuire les pâtes al dente.", "Mixer basilic, ail, huile en pesto.", "Égoutter les pâtes en gardant un peu d'eau.", "Mélanger avec le pesto.", "Servir avec parmesan râpé."],
  },
  "Spaghetti bolognaise": {
    time: "1h",
    difficulty: "Facile",
    servings: 4,
    ingredients: ["400g spaghetti", "500g viande hachée", "2 boîtes tomates pelées", "1 oignon", "2 gousses d'ail", "Vin rouge", "Herbes"],
    steps: ["Faire revenir oignon et ail.", "Ajouter la viande, bien saisir.", "Déglacer au vin rouge.", "Ajouter tomates, herbes, mijoter 40 min.", "Cuire spaghetti al dente et servir."],
  },
};

const DAYS = [
  { short: "Lun", full: "Lundi", today: false },
  { short: "Mar", full: "Mardi", today: false },
  { short: "Mer", full: "Mercredi", today: false },
  { short: "Jeu", full: "Jeudi", today: true },
  { short: "Ven", full: "Vendredi", today: false },
  { short: "Sam", full: "Samedi", today: false },
  { short: "Dim", full: "Dimanche", today: false },
];

const DEFAULT_MENUS = {
  Lundi: { lunch: "Salade de tomates", dinner: "Pâtes au basilic" },
  Mardi: { lunch: "Tartine provençale", dinner: "Sole grillée" },
  Mercredi: { lunch: "Jambon-fromage", dinner: "Cassoulet" },
  Jeudi: { lunch: "Quiche lorraine", dinner: "Poulet rôti" },
  Vendredi: { lunch: "Salade niçoise", dinner: "Spaghetti bolognaise" },
  Samedi: { lunch: "Soupe de légumes", dinner: "Steak frites" },
  Dimanche: { lunch: "Salade de tomates", dinner: "Poulet rôti" },
};

const FRIDGE_ITEMS_DEFAULT = [
  { id: 1, name: "Lait demi-écrémé", expiry: "2026-05-23", emoji: "🥛", qty: "1L" },
  { id: 2, name: "Œufs frais", expiry: "2026-05-28", emoji: "🥚", qty: "6" },
  { id: 3, name: "Beurre", expiry: "2026-06-10", emoji: "🧈", qty: "250g" },
  { id: 4, name: "Gruyère râpé", expiry: "2026-05-24", emoji: "🧀", qty: "100g" },
  { id: 5, name: "Yaourts nature", expiry: "2026-05-27", emoji: "🫙", qty: "4" },
];

function getDaysUntilExpiry(dateStr) {
  const today = new Date("2026-05-21");
  const exp = new Date(dateStr);
  return Math.round((exp - today) / (1000 * 60 * 60 * 24));
}

export default function App() {
  const [activeTab, setActiveTab] = useState("menus");
  const [mealType, setMealType] = useState("lunch");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [fridgeItems, setFridgeItems] = useState(FRIDGE_ITEMS_DEFAULT);
  const [cameraActive, setCameraActive] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(null);
  const [showAddFridge, setShowAddFridge] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", expiry: "", qty: "", emoji: "🥦" });
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const todayMeals = DEFAULT_MENUS["Jeudi"];

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch {
      alert("Caméra non disponible dans cet environnement.");
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }

  function takePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    setPhotoTaken(canvas.toDataURL("image/jpeg"));
    stopCamera();
  }

  return (
    <div style={{
      fontFamily: "'Lora', Georgia, serif",
      background: "#F7F5F0",
      minHeight: "100vh",
      maxWidth: 430,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; }
        .tab-btn { transition: all 0.2s ease; }
        .tab-btn:hover { transform: translateY(-1px); }
        .meal-card { transition: all 0.2s ease; cursor: pointer; }
        .meal-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .meal-card:active { transform: scale(0.98); }
        .pill-btn { transition: all 0.2s ease; cursor: pointer; }
        .pill-btn:hover { opacity: 0.85; }
        .cam-btn { transition: all 0.2s ease; cursor: pointer; }
        .cam-btn:hover { transform: scale(1.05); }
        .cam-btn:active { transform: scale(0.95); }
        .fridge-row { transition: background 0.15s; }
        .fridge-row:hover { background: rgba(0,0,0,0.03); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        .fade-up { animation: fadeUp 0.35s ease forwards; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#F7F5F0", padding: "52px 20px 16px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, color: "#8B7355", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>PLANIFICATION</div>
            <h1 style={{ fontSize: 28, fontWeight: 600, color: "#2C2416", lineHeight: 1.1 }}>
              Menus de <em style={{ color: "#7A9E6E", fontStyle: "italic" }}>la semaine</em>
            </h1>
            <div style={{ fontSize: 12, color: "#9E8C74", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>Jeudi 21 mai 2026</div>
          </div>
          <div style={{ width: 40, height: 40, background: "#FFF8E8", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", position: "relative" }}>
            🔔
            <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: "#E8734A", borderRadius: "50%", border: "2px solid #FFF8E8" }}></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "12px 20px 0", gap: 8, background: "#F7F5F0" }}>
        {[
          { id: "menus", label: "🗓 Menus" },
          { id: "frigo", label: "❄️ Frigo" },
          { id: "recettes", label: "📖 Recettes" },
        ].map(tab => (
          <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)} style={{
            padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
            background: activeTab === tab.id ? "#2C2416" : "rgba(0,0,0,0.06)",
            color: activeTab === tab.id ? "#FFF" : "#6B5B45",
            transition: "all 0.2s",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── MENUS TAB ── */}
      {activeTab === "menus" && (
        <div className="fade-up" style={{ padding: "16px 20px 100px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
            <button className="pill-btn" style={{
              padding: "10px 20px", borderRadius: 24, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #F5E6C8, #EDD9A3)",
              color: "#5A4020", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              boxShadow: "0 2px 12px rgba(180,140,60,0.2)",
            }}>✨ Générer avec l'IA</button>
          </div>

          {/* Lunch/Dinner toggle */}
          <div style={{ display: "flex", background: "rgba(0,0,0,0.05)", borderRadius: 14, padding: 4, marginBottom: 20 }}>
            {[{ id: "lunch", label: "☀️ Déjeuner" }, { id: "dinner", label: "🌙 Dîner" }].map(t => (
              <button key={t.id} onClick={() => setMealType(t.id)} style={{
                flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                background: mealType === t.id ? "#FFF" : "transparent",
                color: mealType === t.id ? "#2C2416" : "#9E8C74",
                boxShadow: mealType === t.id ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.2s",
              }}>{t.label}</button>
            ))}
          </div>

          {/* Day rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DAYS.map(day => {
              const menu = DEFAULT_MENUS[day.full];
              const mealName = mealType === "lunch" ? menu.lunch : menu.dinner;
              const photo = MEAL_PHOTOS[mealName];
              return (
                <div key={day.short} className="meal-card" onClick={() => setSelectedMeal({ day: day.full, mealName, type: mealType })}
                  style={{
                    background: day.today ? "#FFF" : "#FFF",
                    borderRadius: 16,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    boxShadow: day.today ? "0 4px 20px rgba(122,158,110,0.2)" : "0 2px 10px rgba(0,0,0,0.06)",
                    border: day.today ? "2px solid #7A9E6E" : "2px solid transparent",
                  }}>
                  {/* Photo */}
                  <div style={{ width: 80, height: 80, flexShrink: 0, overflow: "hidden" }}>
                    <img src={photo} alt={mealName} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML = "<div style='width:100%;height:100%;background:#F0EAE0;display:flex;align-items:center;justify-content:center;font-size:28px'>🍽️</div>"; }} />
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, padding: "12px 14px 12px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: "#2C2416" }}>{day.short}</span>
                      {day.today && <span style={{ fontSize: 10, background: "#7A9E6E", color: "#FFF", padding: "2px 8px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Aujourd'hui</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "#9E8C74", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>
                      {mealType === "lunch" ? "Déjeuner" : "Dîner"}
                    </div>
                    <div style={{ fontSize: 16, color: "#2C2416", fontWeight: 600, fontFamily: "'Lora', serif" }}>{mealName}</div>
                  </div>
                  <div style={{ paddingRight: 14, color: "#C4B49A", fontSize: 18 }}>›</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── FRIGO TAB ── */}
      {activeTab === "frigo" && (
        <div className="fade-up" style={{ padding: "16px 20px 100px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2C2416" }}>Mon frigo</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="cam-btn" onClick={startCamera} style={{
                width: 40, height: 40, borderRadius: 12, border: "none", cursor: "pointer",
                background: "#2C2416", color: "#FFF", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              }} title="Scanner avec l'appareil photo">📷</button>
              <button className="cam-btn" onClick={() => setShowAddFridge(!showAddFridge)} style={{
                width: 40, height: 40, borderRadius: 12, border: "none", cursor: "pointer",
                background: "#7A9E6E", color: "#FFF", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
              }}>+</button>
            </div>
          </div>

          {/* Camera view */}
          {cameraActive && (
            <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16, position: "relative", background: "#000" }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%", display: "block", borderRadius: 16 }} />
              <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16 }}>
                <button onClick={takePhoto} style={{
                  width: 60, height: 60, borderRadius: "50%", background: "#FFF", border: "4px solid rgba(255,255,255,0.5)",
                  cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                }} />
                <button onClick={stopCamera} style={{
                  padding: "10px 16px", borderRadius: 20, background: "rgba(0,0,0,0.5)", color: "#FFF",
                  border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>✕ Annuler</button>
              </div>
            </div>
          )}

          {photoTaken && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#7A9E6E", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>
                ✅ Photo prise — identification en cours…
              </div>
              <img src={photoTaken} alt="scan" style={{ width: "100%", borderRadius: 12, maxHeight: 180, objectFit: "cover" }} />
              <button onClick={() => setPhotoTaken(null)} style={{
                marginTop: 8, padding: "8px 16px", borderRadius: 20, background: "#EEE", border: "none",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              }}>Supprimer</button>
            </div>
          )}

          {/* Add item form */}
          {showAddFridge && (
            <div style={{ background: "#FFF", borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#2C2416", marginBottom: 12 }}>Ajouter un aliment</div>
              {[
                { label: "Nom", key: "name", placeholder: "ex: Tomates cerises" },
                { label: "Quantité", key: "qty", placeholder: "ex: 500g" },
                { label: "Date d'expiration", key: "expiry", placeholder: "AAAA-MM-JJ", type: "date" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "#9E8C74", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{f.label}</div>
                  <input type={f.type || "text"} placeholder={f.placeholder} value={newItem[f.key]}
                    onChange={e => setNewItem(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{
                      width: "100%", padding: "9px 12px", borderRadius: 10, border: "1px solid #E0D8CC",
                      background: "#F7F5F0", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#2C2416", outline: "none",
                    }} />
                </div>
              ))}
              <button onClick={() => {
                if (newItem.name) {
                  setFridgeItems(p => [...p, { id: Date.now(), ...newItem }]);
                  setNewItem({ name: "", expiry: "", qty: "", emoji: "🥦" });
                  setShowAddFridge(false);
                }
              }} style={{
                width: "100%", padding: "11px", borderRadius: 12, border: "none", cursor: "pointer",
                background: "#2C2416", color: "#FFF", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
              }}>Ajouter ✓</button>
            </div>
          )}

          {/* Fridge items */}
          <div style={{ background: "#FFF", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            {fridgeItems.map((item, i) => {
              const days = getDaysUntilExpiry(item.expiry);
              const urgent = days <= 2;
              const soon = days <= 5;
              return (
                <div key={item.id} className="fridge-row" style={{
                  display: "flex", alignItems: "center", padding: "14px 16px", gap: 14,
                  borderBottom: i < fridgeItems.length - 1 ? "1px solid #F0EAE0" : "none",
                }}>
                  <div style={{ fontSize: 28 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "#2C2416", fontSize: 15, fontFamily: "'DM Sans', sans-serif" }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#9E8C74", fontFamily: "'DM Sans', sans-serif" }}>{item.qty}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{
                      fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                      color: urgent ? "#E8734A" : soon ? "#D4A62A" : "#7A9E6E",
                      background: urgent ? "#FEF0EB" : soon ? "#FEF8E7" : "#EDF5EA",
                      padding: "3px 9px", borderRadius: 8,
                    }}>
                      {urgent ? `⚠️ ${days}j` : soon ? `⏰ ${days}j` : `✅ ${days}j`}
                    </div>
                    <div style={{ fontSize: 11, color: "#C4B49A", marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>{item.expiry}</div>
                  </div>
                  <button onClick={() => setFridgeItems(p => p.filter(x => x.id !== item.id))} style={{
                    background: "none", border: "none", cursor: "pointer", color: "#D0C4B4", fontSize: 18, padding: "0 4px",
                  }}>×</button>
                </div>
              );
            })}
          </div>

          {/* Camera hint */}
          <div style={{
            marginTop: 16, padding: "14px 16px", borderRadius: 14,
            background: "linear-gradient(135deg, #F0EAE0, #E8DFD0)",
            border: "1px dashed #C4B49A",
          }}>
            <div style={{ fontSize: 13, color: "#5A4020", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              📷 <strong>Astuce :</strong> Appuyez sur l'icône caméra pour scanner vos produits et identifier automatiquement leur date d'expiration.
            </div>
          </div>
        </div>
      )}

      {/* ── RECETTES TAB ── */}
      {activeTab === "recettes" && (
        <div className="fade-up" style={{ padding: "16px 20px 100px" }}>

          {/* Today's meals featured */}
          <div style={{
            background: "linear-gradient(135deg, #2C2416, #4A3828)",
            borderRadius: 20, padding: "20px", marginBottom: 20, color: "#FFF",
          }}>
            <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>
              AUJOURD'HUI — JEUDI
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Lora', serif", marginBottom: 16 }}>
              Recettes du jour
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "Déjeuner", name: todayMeals.lunch, icon: "☀️" },
                { label: "Dîner", name: todayMeals.dinner, icon: "🌙" },
              ].map(m => (
                <button key={m.name} onClick={() => setSelectedRecipe(RECIPES[m.name] ? m.name : null)} style={{
                  flex: 1, borderRadius: 14, overflow: "hidden", border: "none", cursor: "pointer",
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
                  textAlign: "left", padding: 0,
                }}>
                  <img src={MEAL_PHOTOS[m.name]} alt={m.name} style={{ width: "100%", height: 90, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "10px 10px 12px" }}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>{m.icon} {m.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#FFF", fontFamily: "'Lora', serif", lineHeight: 1.3 }}>{m.name}</div>
                    {RECIPES[m.name] && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>Voir la recette →</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* All recipes */}
          <div style={{ fontSize: 12, color: "#9E8C74", fontFamily: "'DM Sans', sans-serif", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            Toutes les recettes de la semaine
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(RECIPES).map(([name, recipe]) => (
              <div key={name} className="meal-card" onClick={() => setSelectedRecipe(name)}
                style={{
                  background: "#FFF", borderRadius: 16, overflow: "hidden",
                  display: "flex", alignItems: "center", gap: 0,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  border: (name === todayMeals.lunch || name === todayMeals.dinner) ? "2px solid #7A9E6E" : "2px solid transparent",
                }}>
                <img src={MEAL_PHOTOS[name]} alt={name} style={{ width: 80, height: 80, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1, padding: "12px 14px" }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#2C2416", fontFamily: "'Lora', serif", marginBottom: 4 }}>{name}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 11, color: "#9E8C74", fontFamily: "'DM Sans', sans-serif" }}>⏱ {recipe.time}</span>
                    <span style={{ fontSize: 11, color: "#9E8C74", fontFamily: "'DM Sans', sans-serif" }}>👤 {recipe.servings} pers.</span>
                    <span style={{ fontSize: 11, color: "#7A9E6E", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{recipe.difficulty}</span>
                  </div>
                </div>
                {(name === todayMeals.lunch || name === todayMeals.dinner) && (
                  <div style={{ paddingRight: 12 }}>
                    <span style={{ fontSize: 10, background: "#7A9E6E", color: "#FFF", padding: "3px 8px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif" }}>Aujourd'hui</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MEAL DETAIL MODAL ── */}
      {selectedMeal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50, display: "flex", alignItems: "flex-end" }} onClick={() => setSelectedMeal(null)}>
          <div className="fade-up" style={{ background: "#FFF", borderRadius: "24px 24px 0 0", width: "100%", maxHeight: "85vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>
            <img src={MEAL_PHOTOS[selectedMeal.mealName]} alt={selectedMeal.mealName} style={{ width: "100%", height: 220, objectFit: "cover" }} />
            <div style={{ padding: "20px 20px 40px" }}>
              <div style={{ fontSize: 11, color: "#9E8C74", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                {selectedMeal.day} — {selectedMeal.type === "lunch" ? "Déjeuner" : "Dîner"}
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 600, color: "#2C2416", marginBottom: 16 }}>{selectedMeal.mealName}</h2>
              {RECIPES[selectedMeal.mealName] && (
                <button onClick={() => { setSelectedRecipe(selectedMeal.mealName); setSelectedMeal(null); setActiveTab("recettes"); }} style={{
                  padding: "12px 24px", borderRadius: 14, background: "#2C2416", color: "#FFF",
                  border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                }}>📖 Voir la recette</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── RECIPE DETAIL MODAL ── */}
      {selectedRecipe && RECIPES[selectedRecipe] && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50, display: "flex", alignItems: "flex-end" }} onClick={() => setSelectedRecipe(null)}>
          <div className="fade-up" style={{ background: "#FFF", borderRadius: "24px 24px 0 0", width: "100%", maxHeight: "90vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ position: "relative" }}>
              <img src={MEAL_PHOTOS[selectedRecipe]} alt={selectedRecipe} style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <button onClick={() => setSelectedRecipe(null)} style={{
                position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%",
                background: "rgba(0,0,0,0.5)", color: "#FFF", border: "none", cursor: "pointer", fontSize: 18,
              }}>×</button>
            </div>
            <div style={{ padding: "20px 20px 40px" }}>
              <h2 style={{ fontSize: 24, fontWeight: 600, color: "#2C2416", marginBottom: 8 }}>{selectedRecipe}</h2>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                {[
                  { label: RECIPES[selectedRecipe].time, icon: "⏱" },
                  { label: `${RECIPES[selectedRecipe].servings} pers.`, icon: "👤" },
                  { label: RECIPES[selectedRecipe].difficulty, icon: "📊" },
                ].map(info => (
                  <div key={info.label} style={{ background: "#F7F5F0", padding: "8px 12px", borderRadius: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 16 }}>{info.icon}</div>
                    <div style={{ fontSize: 12, color: "#5A4020", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{info.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 14, fontWeight: 600, color: "#2C2416", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>🥘 Ingrédients</div>
              <div style={{ background: "#F7F5F0", borderRadius: 14, padding: "12px 16px", marginBottom: 20 }}>
                {RECIPES[selectedRecipe].ingredients.map((ing, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < RECIPES[selectedRecipe].ingredients.length - 1 ? "1px solid #EDE8E0" : "none" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7A9E6E", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#2C2416", fontFamily: "'DM Sans', sans-serif" }}>{ing}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 14, fontWeight: 600, color: "#2C2416", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>👨‍🍳 Préparation</div>
              {RECIPES[selectedRecipe].steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#2C2416", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: 14, color: "#4A3828", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, paddingTop: 4 }}>{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430,
        background: "rgba(247,245,240,0.95)", backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0,0,0,0.08)", padding: "8px 0 24px",
        display: "flex", justifyContent: "space-around",
      }}>
        {[
          { id: "menus", icon: "🗓", label: "Menus" },
          { id: "frigo", icon: "❄️", label: "Frigo" },
          { id: "recettes", icon: "📖", label: "Recettes" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, padding: "4px 20px",
          }}>
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{
              fontSize: 11, fontFamily: "'DM Sans', sans-serif",
              color: activeTab === tab.id ? "#2C2416" : "#9E8C74",
              fontWeight: activeTab === tab.id ? 600 : 400,
            }}>{tab.label}</span>
            {activeTab === tab.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#7A9E6E" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
