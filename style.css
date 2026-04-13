@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&family=Permanent+Marker&display=swap');

/* ══════════════════════════════════════════
   COMIC BOOK THEME — M-5 Resonansi Elastis Gas
   ══════════════════════════════════════════ */

:root {
  --bg:       #fef9e7;
  --panel:    #fff;
  --ink:      #1a1a2e;
  --yellow:   #ffd700;
  --red:      #e63946;
  --blue:     #457b9d;
  --green:    #2dc653;
  --orange:   #f77f00;
  --pink:     #ff6b9d;
  --shadow:   4px 4px 0px var(--ink);
  --shadow-lg:6px 6px 0px var(--ink);
  --border:   3px solid var(--ink);
  --font-hero:'Bangers', cursive;
  --font-body:'Comic Neue', cursive;
  --font-marker:'Permanent Marker', cursive;
  --radius: 8px;
}

/* ── HALFTONE BACKGROUND ── */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--bg);
  background-image:
    radial-gradient(circle, #c8b8a2 1px, transparent 1px);
  background-size: 14px 14px;
  font-family: var(--font-body);
  color: var(--ink);
  min-height: 100vh;
  padding-bottom: 100px;
}

/* ── HEADER ── */
header {
  background: var(--yellow);
  border-bottom: 4px solid var(--ink);
  padding: 28px 24px 20px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

header::before {
  content: '★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★';
  position: absolute;
  top: 6px; left: 0; right: 0;
  font-size: 10px;
  color: var(--ink);
  opacity: 0.25;
  letter-spacing: 4px;
}

header::after {
  content: '';
  position: absolute;
  bottom: -8px; left: -10px; right: -10px;
  height: 10px;
  background: repeating-linear-gradient(
    90deg,
    var(--ink) 0px, var(--ink) 10px,
    transparent 10px, transparent 20px
  );
}

.badge {
  display: inline-block;
  background: var(--red);
  color: #fff;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 12px;
  border: 2px solid var(--ink);
  box-shadow: 3px 3px 0 var(--ink);
  border-radius: 4px;
  margin-bottom: 12px;
}

header h1 {
  font-family: var(--font-hero);
  font-size: clamp(36px, 8vw, 72px);
  letter-spacing: 3px;
  color: var(--ink);
  line-height: 1;
  text-shadow: 4px 4px 0 var(--red), 8px 8px 0 rgba(0,0,0,0.15);
  margin-bottom: 8px;
}

header p {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 13px;
  color: var(--ink);
  background: rgba(255,255,255,0.7);
  display: inline-block;
  padding: 3px 12px;
  border: 2px solid var(--ink);
  border-radius: 20px;
}

/* ── MAIN ── */
main {
  max-width: 960px;
  margin: 32px auto;
  padding: 0 16px;
}

/* ── SECTIONS (comic panels) ── */
.section {
  background: var(--panel);
  border: 3px solid var(--ink);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  padding: 22px 20px;
  margin-bottom: 28px;
  position: relative;
}

.section::before {
  content: '';
  position: absolute;
  top: -3px; left: 12px; right: 12px; bottom: -3px;
  border-left: 3px solid var(--ink);
  border-right: 3px solid var(--ink);
  pointer-events: none;
  z-index: -1;
}

.section-title {
  font-family: var(--font-hero);
  font-size: 26px;
  letter-spacing: 2px;
  color: var(--ink);
  border-bottom: 3px solid var(--ink);
  padding-bottom: 8px;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '▶';
  color: var(--red);
  font-size: 18px;
}

/* ── CONSTANTS GRID ── */
.constants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
}

.const-item {
  background: #f0f4ff;
  border: 2px solid var(--ink);
  border-radius: 6px;
  padding: 10px 12px;
  box-shadow: 3px 3px 0 var(--ink);
}

.const-label {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 11px;
  color: var(--blue);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.const-input {
  width: 100%;
  background: #fff;
  border: 2px solid var(--ink);
  border-radius: 4px;
  padding: 6px 8px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 14px;
  color: var(--ink);
  outline: none;
  transition: box-shadow 0.15s;
}

.const-input:focus {
  box-shadow: 3px 3px 0 var(--blue);
}

/* ── PISTON TABS ── */
.piston-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.ptab {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 8px 14px;
  border: 2.5px solid var(--ink);
  border-radius: 6px;
  background: #fff;
  color: var(--ink);
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--ink);
  transition: all 0.1s;
}

.ptab:hover {
  background: var(--yellow);
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--ink);
}

.ptab.active {
  background: var(--ink);
  color: var(--yellow);
  box-shadow: none;
  transform: translate(3px, 3px);
}

/* ── VOLUME PANELS ── */
.vol-panel {
  border: 2.5px solid var(--ink);
  border-radius: 6px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 3px 3px 0 var(--ink);
}

.vol-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: #e8f4fd;
  border-bottom: 2.5px solid var(--ink);
  cursor: pointer;
  user-select: none;
}

.vol-header.open {
  background: #dff0d8;
}

.vol-header:hover {
  filter: brightness(0.95);
}

.vol-badge {
  font-family: var(--font-hero);
  font-size: 18px;
  letter-spacing: 1px;
  color: var(--ink);
}

.vol-count {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 11px;
  background: var(--blue);
  color: #fff;
  border-radius: 20px;
  padding: 2px 9px;
  border: 1.5px solid var(--ink);
}

.vol-toggle {
  margin-left: auto;
  font-size: 14px;
  color: var(--ink);
  font-weight: 700;
}

.vol-body { padding: 12px 14px; }
.vol-body.collapsed { display: none; }

/* ── DATA ROWS ── */
.data-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px;
  border-radius: 5px;
  margin-bottom: 6px;
  background: #fafafa;
  border: 1.5px dashed #ccc;
}

.data-row:hover { border-color: var(--blue); background: #f0f4ff; }

.row-num {
  font-family: var(--font-hero);
  font-size: 18px;
  color: var(--red);
  min-width: 20px;
  text-align: center;
}

.data-input-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  flex-wrap: wrap;
}

.inp-label {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 11px;
  color: var(--ink);
  background: var(--yellow);
  border: 1.5px solid var(--ink);
  border-radius: 4px;
  padding: 2px 7px;
}

.data-input-group input[type="number"] {
  width: 100px;
  background: #fff;
  border: 2px solid var(--ink);
  border-radius: 4px;
  padding: 5px 8px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 13px;
  color: var(--ink);
  outline: none;
}

.data-input-group input:focus {
  box-shadow: 2px 2px 0 var(--blue);
}

.btn-del {
  background: var(--red);
  color: #fff;
  border: 2px solid var(--ink);
  border-radius: 4px;
  width: 28px; height: 28px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 2px 2px 0 var(--ink);
  transition: all 0.1s;
  flex-shrink: 0;
}

.btn-del:hover {
  transform: translate(-1px,-1px);
  box-shadow: 3px 3px 0 var(--ink);
}

/* ── ADD ROW BUTTON ── */
.btn-add-row {
  margin-top: 8px;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 12px;
  padding: 6px 14px;
  border: 2px solid var(--green);
  background: #e8fdf0;
  color: var(--green);
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 0 var(--green);
  transition: all 0.1s;
}

.btn-add-row:hover {
  background: var(--green);
  color: #fff;
  transform: translate(-1px,-1px);
  box-shadow: 3px 3px 0 var(--ink);
}

/* ── BUTTONS ── */
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.btn {
  font-family: var(--font-hero);
  font-size: 18px;
  letter-spacing: 1px;
  padding: 10px 22px;
  border: 3px solid var(--ink);
  border-radius: 6px;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.1s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn:hover {
  transform: translate(-2px,-2px);
  box-shadow: 6px 6px 0 var(--ink);
}

.btn:active {
  transform: translate(3px,3px);
  box-shadow: 1px 1px 0 var(--ink);
}

.btn-primary {
  background: var(--red);
  color: #fff;
}

.btn-secondary {
  background: var(--blue);
  color: #fff;
}

.btn-ghost {
  background: #fff;
  color: var(--ink);
}

/* ── SELECT ── */
.styled-sel {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 13px;
  padding: 7px 12px;
  border: 2.5px solid var(--ink);
  border-radius: 6px;
  background: #fff;
  color: var(--ink);
  box-shadow: 3px 3px 0 var(--ink);
  cursor: pointer;
  outline: none;
}

/* ── RESULT TABLE ── */
.table-scroll {
  overflow-x: auto;
  border: 2.5px solid var(--ink);
  border-radius: 6px;
  box-shadow: var(--shadow);
}

.result-tbl {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-body);
  font-size: 13px;
}

.result-tbl th {
  background: var(--ink);
  color: var(--yellow);
  font-family: var(--font-hero);
  font-size: 15px;
  letter-spacing: 1px;
  padding: 10px 12px;
  text-align: center;
  white-space: nowrap;
  border: 1.5px solid #333;
}

.result-tbl td {
  padding: 7px 10px;
  border: 1.5px solid #ddd;
  text-align: center;
  font-weight: 700;
}

.result-tbl tr:nth-child(even) td { background: #fafafa; }
.result-tbl tr:hover td { background: #fff9d0; }

.td-vol {
  background: #fff0f0 !important;
  font-family: var(--font-hero);
  font-size: 16px;
  color: var(--red);
}

.td-hi {
  color: var(--green);
  font-weight: 700;
}

.td-dim { color: #888; }

/* ── SUMMARY ROW ── */
.summary-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 20px;
}

.summary-box {
  flex: 1;
  min-width: 120px;
  border: 3px solid var(--ink);
  border-radius: 8px;
  padding: 14px 16px;
  background: #fff;
  box-shadow: var(--shadow);
  text-align: center;
  position: relative;
}

.summary-box::before {
  content: '';
  position: absolute;
  top: 4px; left: 4px; right: -4px; bottom: -4px;
  background: var(--ink);
  border-radius: 8px;
  z-index: -1;
}

.sb-ksr { background: #fff0e8; }
.sb-graf { background: #e8f8ff; }
.sb-r2 { background: #f0ffe8; }

.sb-label {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #888;
  margin-bottom: 4px;
}

.sb-value {
  font-family: var(--font-hero);
  font-size: 28px;
  letter-spacing: 1px;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 4px;
}

.sb-unit {
  font-family: var(--font-body);
  font-size: 10px;
  color: #999;
}

/* ── CHARTS GRID ── */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}

.chart-card {
  border: 3px solid var(--ink);
  border-radius: 8px;
  padding: 14px;
  background: #fff;
  box-shadow: var(--shadow);
}

.chart-card-title {
  font-family: var(--font-hero);
  font-size: 17px;
  letter-spacing: 1px;
  color: var(--ink);
  margin-bottom: 10px;
  text-align: center;
  background: var(--yellow);
  border: 2px solid var(--ink);
  border-radius: 5px;
  padding: 4px 10px;
}

/* ── STATUS BAR ── */
.status-bar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--green);
  color: #fff;
  font-family: var(--font-hero);
  font-size: 18px;
  letter-spacing: 1px;
  padding: 10px 28px;
  border: 3px solid var(--ink);
  border-radius: 30px;
  box-shadow: var(--shadow-lg);
  display: none;
  z-index: 999;
  animation: pop-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes pop-in {
  from { transform: translateX(-50%) scale(0.7); opacity: 0; }
  to   { transform: translateX(-50%) scale(1); opacity: 1; }
}

/* ── SPEECH BUBBLE EFFECT ON RESULTS ── */
#results-section .section-title::after {
  content: '!';
  display: inline-block;
  background: var(--red);
  color: #fff;
  font-family: var(--font-hero);
  font-size: 16px;
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 2px solid var(--ink);
  line-height: 22px;
  text-align: center;
  margin-left: 6px;
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #f0ede0; }
::-webkit-scrollbar-thumb {
  background: var(--ink);
  border-radius: 4px;
  border: 2px solid #f0ede0;
}

/* ── RESPONSIVE ── */
@media (max-width: 600px) {
  header h1 { font-size: 40px; }
  .constants-grid { grid-template-columns: 1fr 1fr; }
  .data-input-group { gap: 4px; }
  .data-input-group input { width: 80px; }
  .btn { font-size: 15px; padding: 9px 16px; }
  .charts-grid { grid-template-columns: 1fr; }
}
