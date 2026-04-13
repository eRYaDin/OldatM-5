// ─────────────────────────────────────────────
//  M-5 Resonansi Elastis Gas · script.js
// ─────────────────────────────────────────────

const VOLUMES   = [10, 20, 30, 40, 50, 60]; // mL
const TAB_NAMES = [
  '1 Piston – Tutup Tutup',
  '1 Piston – Tutup Buka',
  '2 Piston – Tutup Tutup',
  '2 Piston – Tutup Buka',
];

// Sample data: [f_Hz, y_cm] per row, grouped by volume (3 rows each)
const SAMPLE = [
  // T0: 1 Piston Tutup-Tutup
  [[11.1,0.05],[14.4,0.2],[15.1,0.1],   // V=10
   [16.3,0.4],[17.6,0.4],[18.5,0.5],    // V=20
   [17.1,0.4],[18.2,0.5],[19.3,0.6],    // V=30
   [19.4,0.8],[20.4,0.9],[21.7,0.6],    // V=40
   [23.7,0.4],[22.6,0.6],[20.6,0.6],    // V=50
   [21.4,0.3],[20.9,0.2],[22.0,0.4]],   // V=60

  // T1: 1 Piston Tutup-Buka
  [[11.4,0.05],[12.3,0.1],[13.8,0.1],
   [14.7,0.4],[15.7,0.3],[17.5,0.4],
   [17.7,0.2],[16.5,0.4],[14.7,0.9],
   [14.5,0.8],[13.1,0.7],[12.5,0.6],
   [15.5,0.3],[11.1,0.8],[12.4,0.7],
   [14.4,0.4],[11.5,0.8],[16.9,1.5]],

  // T2: 2 Piston Tutup-Tutup
  [[14.7,0.2],[15.4,0.2],[17.1,0.2],
   [17.1,1.0],[16.8,1.0],[15.7,1.0],
   [16.1,0.6],[17.4,0.4],[15.8,0.6],
   [15.8,0.8],[16.7,0.6],[14.6,1.0],
   [14.8,1.0],[15.1,0.8],[16.5,0.8],
   [21.0,0.4],[16.5,0.8],[17.3,1.0]],

  // T3: 2 Piston Tutup-Buka
  [[15.0,0.4],[16.1,0.4],[14.5,0.4],
   [14.6,0.8],[13.9,0.8],[15.0,1.0],
   [15.9,0.5],[15.3,0.5],[14.5,0.4],
   [16.0,0.4],[18.1,0.2],[17.1,0.4],
   [22.4,0.1],[15.7,0.4],[16.0,0.4],
   [22.0,0.1],[21.0,0.2],[20.7,0.2]],
];

// ── STATE ──────────────────────────────────────
let activeTab   = 0;
let calcResults = null;
let charts      = [null, null, null, null];

// rowCounter[tabIdx][volIdx] = number of rows currently rendered
const rowCounter = Array.from({ length: 4 }, () => Array(VOLUMES.length).fill(3));

// ── INIT ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildAllPanels();
  showTab(0);
});

// ── BUILD INPUT PANELS ────────────────────────
function buildAllPanels() {
  for (let t = 0; t < 4; t++) {
    const wrap = document.getElementById(`tab-panel-${t}`);
    wrap.innerHTML = '';
    for (let v = 0; v < VOLUMES.length; v++) {
      wrap.appendChild(buildVolPanel(t, v, 3));
    }
  }
}

function buildVolPanel(t, v, numRows) {
  rowCounter[t][v] = numRows;

  const panel = document.createElement('div');
  panel.className = 'vol-panel';
  panel.id = `vp-${t}-${v}`;

  const header = document.createElement('div');
  header.className = 'vol-header open';
  header.innerHTML = `
    <span class="vol-badge">V = ${VOLUMES[v]} mL</span>
    <span class="vol-count" id="vc-${t}-${v}">${numRows} data</span>
    <span class="vol-toggle open" id="vt-${t}-${v}">▲</span>
  `;
  header.onclick = () => toggleVol(t, v);

  const body = document.createElement('div');
  body.className = 'vol-body';
  body.id = `vb-${t}-${v}`;

  const rowsWrap = document.createElement('div');
  rowsWrap.id = `rows-${t}-${v}`;
  for (let d = 0; d < numRows; d++) {
    rowsWrap.appendChild(makeDataRow(t, v, d));
  }

  const addBtn = document.createElement('button');
  addBtn.className = 'btn-add-row';
  addBtn.innerHTML = '+ Tambah Data';
  addBtn.onclick = () => addRow(t, v);

  body.appendChild(rowsWrap);
  body.appendChild(addBtn);
  panel.appendChild(header);
  panel.appendChild(body);
  return panel;
}

function makeDataRow(t, v, d) {
  const row = document.createElement('div');
  row.className = 'data-row';
  row.id = `dr-${t}-${v}-${d}`;
  row.innerHTML = `
    <span class="row-num">${d + 1}</span>
    <div class="data-input-group">
      <span class="inp-label">f (Hz)</span>
      <input type="number" step="any" id="f-${t}-${v}-${d}" placeholder="0.0">
      <span class="inp-sep"></span>
      <span class="inp-label">y (cm)</span>
      <input type="number" step="any" id="y-${t}-${v}-${d}" placeholder="0.0">
    </div>
    <button class="btn-del" onclick="delRow(${t},${v},${d})" title="Hapus baris">×</button>
  `;
  return row;
}

function addRow(t, v) {
  const d = rowCounter[t][v];
  rowCounter[t][v]++;
  document.getElementById(`rows-${t}-${v}`).appendChild(makeDataRow(t, v, d));
  updateVolCount(t, v);
}

function delRow(t, v, d) {
  const el = document.getElementById(`dr-${t}-${v}-${d}`);
  if (!el) return;
  if (rowCounter[t][v] <= 1) { showStatus('Minimal 1 data per volume'); return; }
  el.remove();
  rowCounter[t][v]--;
  // Re-number remaining rows
  const wrap = document.getElementById(`rows-${t}-${v}`);
  [...wrap.querySelectorAll('.data-row')].forEach((r, i) => {
    r.querySelector('.row-num').textContent = i + 1;
  });
  updateVolCount(t, v);
}

function updateVolCount(t, v) {
  const el = document.getElementById(`vc-${t}-${v}`);
  if (el) el.textContent = `${rowCounter[t][v]} data`;
}

function toggleVol(t, v) {
  const body   = document.getElementById(`vb-${t}-${v}`);
  const toggle = document.getElementById(`vt-${t}-${v}`);
  const header = body.previousElementSibling;
  const isOpen = !body.classList.contains('collapsed');
  body.classList.toggle('collapsed', isOpen);
  toggle.classList.toggle('open', !isOpen);
  header.classList.toggle('open', !isOpen);
  toggle.textContent = isOpen ? '▼' : '▲';
}

// ── TABS ──────────────────────────────────────
function showTab(idx) {
  activeTab = idx;
  for (let t = 0; t < 4; t++) {
    document.getElementById(`tab-panel-${t}`).style.display = t === idx ? 'block' : 'none';
  }
  document.querySelectorAll('.ptab').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });
}

// ── FILL SAMPLE DATA ──────────────────────────
function fillSample() {
  for (let t = 0; t < 4; t++) {
    let globalRow = 0;
    for (let v = 0; v < VOLUMES.length; v++) {
      const needed = 3;
      // Rebuild panel with 3 rows first
      const oldPanel = document.getElementById(`vp-${t}-${v}`);
      const newPanel = buildVolPanel(t, v, needed);
      oldPanel.replaceWith(newPanel);

      for (let d = 0; d < needed; d++) {
        const [f, y] = SAMPLE[t][globalRow++];
        const fEl = document.getElementById(`f-${t}-${v}-${d}`);
        const yEl = document.getElementById(`y-${t}-${v}-${d}`);
        if (fEl) fEl.value = f;
        if (yEl) yEl.value = y;
      }
    }
  }
  showStatus('Data contoh berhasil diisi!');
}

// ── CLEAR ALL ────────────────────────────────
function clearAll() {
  buildAllPanels();
  document.getElementById('results-section').style.display = 'none';
  calcResults = null;
  showStatus('Data dibersihkan');
}

// ── READ INPUT VALUES ────────────────────────
function readTableData(t) {
  const rows = [];
  for (let v = 0; v < VOLUMES.length; v++) {
    const wrap = document.getElementById(`rows-${t}-${v}`);
    const domRows = wrap ? [...wrap.querySelectorAll('.data-row')] : [];
    const points = [];
    domRows.forEach((_, d) => {
      const fEl = document.getElementById(`f-${t}-${v}-${d}`);
      const yEl = document.getElementById(`y-${t}-${v}-${d}`);
      if (!fEl) return;
      const f = parseFloat(fEl.value);
      const y = parseFloat(yEl?.value ?? 0);
      if (!isNaN(f) && f > 0) points.push({ f, y });
    });
    rows.push({ V_mL: VOLUMES[v], V_m3: VOLUMES[v] * 1e-6, points });
  }
  return rows;
}

// ── PHYSICS ──────────────────────────────────
function getConst() {
  return {
    m1:   parseFloat(document.getElementById('inp-m1').value),
    m2:   parseFloat(document.getElementById('inp-m2').value),
    A:    parseFloat(document.getElementById('inp-A').value),
    P:    parseFloat(document.getElementById('inp-P').value),
    glit: parseFloat(document.getElementById('inp-glit').value),
  };
}

function calcT2(f) { return 1 / (f * f); }

function calcGamma(m, V_m3, T2, A, P) {
  return (4 * Math.PI ** 2 * m * V_m3) / (A * A * T2 * P);
}

function linReg(xs, ys) {
  const n = xs.length;
  if (n < 2) return { slope: 0, intercept: ys[0] ?? 0, R2: 0 };
  const mx = xs.reduce((a, x) => a + x, 0) / n;
  const my = ys.reduce((a, y) => a + y, 0) / n;
  const num = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0);
  const den = xs.reduce((a, x) => a + (x - mx) ** 2, 0);
  const slope = den !== 0 ? num / den : 0;
  const intercept = my - slope * mx;
  const ssTot = ys.reduce((a, y) => a + (y - my) ** 2, 0);
  const ssRes = ys.reduce((a, y, i) => a + (y - (slope * xs[i] + intercept)) ** 2, 0);
  const R2 = ssTot > 0 ? 1 - ssRes / ssTot : 1;
  return { slope, intercept, R2 };
}

function processTable(t) {
  const C    = getConst();
  const m    = t < 2 ? C.m1 : C.m2;
  const raw  = readTableData(t);
  const rows = [];

  for (const { V_mL, V_m3, points } of raw) {
    if (points.length === 0) continue;

    const items = points.map(p => {
      const T  = 1 / p.f;
      const T2 = T * T;
      const g  = calcGamma(m, V_m3, T2, C.A, C.P);
      return { f: p.f, y: p.y, T, T2, g };
    });

    const N      = items.length;
    const T_avg  = items.reduce((s, i) => s + i.T,  0) / N;
    const T2_avg = items.reduce((s, i) => s + i.T2, 0) / N;
    const g_avg  = items.reduce((s, i) => s + i.g,  0) / N;

    let dg = 0;
    if (N > 1) {
      const sq = items.reduce((s, i) => s + (i.g - g_avg) ** 2, 0);
      dg = Math.sqrt(sq / (N * (N - 1)));
    }

    rows.push({ V_mL, V_m3, items, T_avg, T2_avg, g_avg, dg, N });
  }

  // Regression T² vs V
  const xs  = rows.map(r => r.V_m3);
  const ys  = rows.map(r => r.T2_avg);
  const reg = linReg(xs, ys);

  const g_total  = rows.reduce((s, r) => s + r.g_avg, 0) / rows.length;
  const g_grafik = (4 * Math.PI ** 2 * m) / (C.A * C.A * C.P * reg.slope);
  const ksr_hit  = Math.abs((g_total  - C.glit) / C.glit) * 100;
  const ksr_graf = Math.abs((g_grafik - C.glit) / C.glit) * 100;

  return { rows, reg, g_total, g_grafik, ksr_hit, ksr_graf, m };
}

// ── CALCULATE ────────────────────────────────
function calculate() {
  calcResults = [];
  for (let t = 0; t < 4; t++) calcResults.push(processTable(t));

  document.getElementById('results-section').style.display = 'block';
  renderResultTab();
  renderAllCharts();
  showStatus('Perhitungan selesai!');
  setTimeout(() => {
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
  }, 80);
}

// ── RENDER RESULT TABLE ───────────────────────
function renderResultTab() {
  const idx = parseInt(document.getElementById('result-tab-sel').value);
  const res = calcResults?.[idx];
  if (!res) return;

  // Build table: each row = 1 data point (not averaged per volume)
  let html = `<div class="table-scroll"><table class="result-tbl">
    <thead>
      <tr>
        <th>V (mL)</th>
        <th>V (m³)</th>
        <th>#</th>
        <th>f (Hz)</th>
        <th>y (cm)</th>
        <th>T (s)</th>
        <th>T² (s²)</th>
        <th>γᵢ</th>
      </tr>
      <tr>
        <th colspan="2" style="color:var(--accent);letter-spacing:1px;">RATA-RATA PER VOLUME</th>
        <th>N</th>
        <th colspan="2">—</th>
        <th>T̄ (s)</th>
        <th>T̄² (s²)</th>
        <th>γ̄ ± Δγ</th>
      </tr>
    </thead><tbody>`;

  for (const row of res.rows) {
    // Individual data rows
    row.items.forEach((it, i) => {
      html += `<tr>
        ${i === 0 ? `<td class="td-vol" rowspan="${row.items.length}">${row.V_mL}</td>
                     <td class="td-dim" rowspan="${row.items.length}">${row.V_m3.toExponential(2)}</td>` : ''}
        <td class="td-dim">${i + 1}</td>
        <td>${it.f.toFixed(2)}</td>
        <td>${it.y.toFixed(2)}</td>
        <td>${it.T.toFixed(5)}</td>
        <td>${it.T2.toExponential(4)}</td>
        <td>${it.g.toFixed(4)}</td>
      </tr>`;
    });

    // Average row
    html += `<tr style="background:rgba(79,255,176,0.04);border-top:1px solid rgba(79,255,176,0.15);">
      <td class="td-hi" colspan="2">Rata-rata (V=${row.V_mL} mL)</td>
      <td class="td-dim">${row.N}</td>
      <td colspan="2" class="td-dim">—</td>
      <td class="td-hi">${row.T_avg.toFixed(5)}</td>
      <td class="td-hi">${row.T2_avg.toExponential(4)}</td>
      <td class="td-hi">${row.g_avg.toFixed(4)} ± ${row.dg.toFixed(4)}</td>
    </tr>`;
  }

  html += '</tbody></table></div>';
  document.getElementById('result-table-area').innerHTML = html;

  // Summary
  const C = getConst();
  document.getElementById('summary-row').innerHTML = `
    <div class="summary-box">
      <div class="sb-label">γ Hitung</div>
      <div class="sb-value">${res.g_total.toFixed(4)}</div>
      <div class="sb-unit">rata-rata semua</div>
    </div>
    <div class="summary-box sb-ksr">
      <div class="sb-label">KSR Hitung</div>
      <div class="sb-value">${res.ksr_hit.toFixed(2)}%</div>
      <div class="sb-unit">vs γ lit ${C.glit}</div>
    </div>
    <div class="summary-box sb-graf">
      <div class="sb-label">γ Grafik</div>
      <div class="sb-value">${res.g_grafik.toFixed(4)}</div>
      <div class="sb-unit">dari slope regresi</div>
    </div>
    <div class="summary-box sb-ksr">
      <div class="sb-label">KSR Grafik</div>
      <div class="sb-value">${res.ksr_graf.toFixed(2)}%</div>
      <div class="sb-unit">vs γ lit ${C.glit}</div>
    </div>
    <div class="summary-box">
      <div class="sb-label">Slope (a)</div>
      <div class="sb-value" style="font-size:13px;">${res.reg.slope.toExponential(3)}</div>
      <div class="sb-unit">T²= aV + b</div>
    </div>
    <div class="summary-box sb-r2">
      <div class="sb-label">R²</div>
      <div class="sb-value">${res.reg.R2.toFixed(4)}</div>
      <div class="sb-unit">koefisien determinasi</div>
    </div>
  `;
}

// ── CHARTS ───────────────────────────────────
function renderAllCharts() {
  for (let i = 0; i < 4; i++) {
    if (charts[i]) { charts[i].destroy(); charts[i] = null; }
    renderChart(i);
  }
}

function renderChart(idx) {
  const res = calcResults[idx];
  if (!res || res.rows.length === 0) return;

  const xs = res.rows.map(r => r.V_m3);
  const ys = res.rows.map(r => r.T2_avg);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const { slope: a, intercept: b, R2 } = res.reg;

  const ctx = document.getElementById(`chart${idx}`).getContext('2d');
  charts[idx] = new Chart(ctx, {
    data: {
      datasets: [
        {
          type: 'scatter',
          label: 'T̄² rata-rata',
          data: xs.map((x, i) => ({ x, y: ys[i] })),
          backgroundColor: '#4fffb0',
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          type: 'line',
          label: `y=${a.toExponential(2)}x+${b.toExponential(2)}, R²=${R2.toFixed(3)}`,
          data: [{ x: xMin, y: a * xMin + b }, { x: xMax, y: a * xMax + b }],
          borderColor: '#4fc3ff',
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#8892a4', font: { size: 9 }, boxWidth: 12 } },
      },
      scales: {
        x: {
          type: 'linear',
          title: { display: true, text: 'V (m³)', color: '#555f75', font: { size: 10 } },
          ticks: { color: '#555f75', font: { size: 9 } },
          grid:  { color: '#1a1e28' },
        },
        y: {
          title: { display: true, text: 'T² (s²)', color: '#555f75', font: { size: 10 } },
          ticks: { color: '#555f75', font: { size: 9 } },
          grid:  { color: '#1a1e28' },
        },
      },
    },
  });
}

// ── EXPORT EXCEL ─────────────────────────────
function exportExcel() {
  if (!calcResults) { alert('Hitung dulu!'); return; }
  const C  = getConst();
  const wb = XLSX.utils.book_new();

  for (let t = 0; t < 4; t++) {
    const res  = calcResults[t];
    const data = [];

    data.push([TAB_NAMES[t]]);
    data.push([`m = ${res.m} kg`, `A = ${C.A} m²`, `P = ${C.P} Pa`, `γ lit = ${C.glit}`]);
    data.push([]);

    // Header
    data.push(['V (mL)', 'V (m³)', 'Data ke-', 'f (Hz)', 'y (cm)', 'T (s)', 'T² (s²)', 'γᵢ']);

    for (const row of res.rows) {
      row.items.forEach((it, i) => {
        data.push([
          i === 0 ? row.V_mL : '',
          i === 0 ? row.V_m3 : '',
          i + 1,
          it.f, it.y,
          it.T.toFixed(6),
          it.T2.toExponential(6),
          it.g.toFixed(5),
        ]);
      });
      data.push([
        `Rata² V=${row.V_mL} mL`, '', `N=${row.N}`, '', '',
        row.T_avg.toFixed(6),
        row.T2_avg.toExponential(6),
        `${row.g_avg.toFixed(5)} ± ${row.dg.toFixed(5)}`,
      ]);
      data.push([]);
    }

    data.push(['RINGKASAN']);
    data.push(['γ Hitung (rata²)',  res.g_total.toFixed(5)]);
    data.push(['KSR Hitung',        `${res.ksr_hit.toFixed(3)}%`]);
    data.push(['Slope (a)',          res.reg.slope.toExponential(5)]);
    data.push(['Intercept (b)',      res.reg.intercept.toExponential(5)]);
    data.push(['R²',                 res.reg.R2.toFixed(5)]);
    data.push(['γ Grafik',           res.g_grafik.toFixed(5)]);
    data.push(['KSR Grafik',        `${res.ksr_graf.toFixed(3)}%`]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, TAB_NAMES[t].replace(/[\s–]+/g, '_').substring(0, 28));
  }

  XLSX.writeFile(wb, 'Pengolahan_Data_M5.xlsx');
  showStatus('Excel berhasil didownload!');
}

// ── EXPORT IMAGE ──────────────────────────────
function exportImage() {
  if (!calcResults) { alert('Hitung dulu!'); return; }
  const C  = getConst();
  const W  = 1200, H = 720;
  const oc = document.createElement('canvas');
  oc.width = W; oc.height = H;
  const ctx = oc.getContext('2d');

  ctx.fillStyle = '#13161d';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#4fffb0';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('M-5 Resonansi Elastis Gas – Grafik T² vs V', 20, 26);
  ctx.fillStyle = '#555f75';
  ctx.font = '11px monospace';
  ctx.fillText(`m₁=${C.m1} kg  m₂=${C.m2} kg  A=${C.A} m²  P=${C.P} Pa  γ lit=${C.glit}`, 20, 46);

  const positions = [[0,60,580,310],[600,60,580,310],[0,390,580,310],[600,390,580,310]];
  const names = TAB_NAMES;

  for (let i = 0; i < 4; i++) {
    const [x, y, w, h] = positions[i];
    ctx.fillStyle = '#1a1e28';
    ctx.fillRect(x + 10, y, w - 20, h);
    ctx.strokeStyle = '#252a38';
    ctx.strokeRect(x + 10, y, w - 20, h);

    ctx.fillStyle = '#8892a4';
    ctx.font = '10px monospace';
    ctx.fillText(names[i], x + 18, y + 16);

    const chartCanvas = document.getElementById(`chart${i}`);
    if (chartCanvas) ctx.drawImage(chartCanvas, x + 10, y + 22, w - 20, h - 34);

    const res = calcResults[i];
    ctx.fillStyle = '#4fc3ff';
    ctx.font = '9px monospace';
    ctx.fillText(
      `a=${res.reg.slope.toExponential(3)}  R²=${res.reg.R2.toFixed(3)}  γ=${res.g_grafik.toFixed(3)}  KSR=${res.ksr_graf.toFixed(1)}%`,
      x + 18, y + h - 6
    );
  }

  const link = document.createElement('a');
  link.download = 'Grafik_M5_ResonansiGas.png';
  link.href = oc.toDataURL('image/png');
  link.click();
  showStatus('Gambar berhasil didownload!');
}

// ── STATUS ───────────────────────────────────
function showStatus(msg) {
  const bar = document.getElementById('status-bar');
  bar.textContent = '✓ ' + msg;
  bar.style.display = 'block';
  clearTimeout(bar._timer);
  bar._timer = setTimeout(() => { bar.style.display = 'none'; }, 3000);
}
