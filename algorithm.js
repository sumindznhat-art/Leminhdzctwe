/* ============================================================
   SUNWIN VIP - ALGORITHM MODULE
   Ensemble 8 tầng: Số + Cầu
   ============================================================ */
(function (global) {
  "use strict";

  /* Hash FNV-1a 32-bit */
  function hash32(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  /* Trích xuất đặc trưng từ chuỗi 7 số */
  function feat(s) {
    const a = [...s].map(Number), n = a.length;
    const ts = new Array(10).fill(0);
    let tong = 0, chan = 0, le = 0, lon = 0, nho = 0;

    for (let i = 0; i < n; i++) {
      const v = a[i];
      tong += v; ts[v]++;
      if (v & 1) le++; else chan++;
      if (v >= 5) lon++; else nho++;
    }

    let bet = 0, dao = 0, c11 = 0, c22 = 0, c33 = 0, dx = 0;
    for (let i = 0; i < n - 1; i++) if (a[i] === a[i + 1]) bet++;
    for (let i = 0; i < n - 2; i++) {
      const t1 = a[i + 1] - a[i], t2 = a[i + 2] - a[i + 1];
      if (t1 * t2 < 0) dao++;
    }
    for (let i = 0; i < n - 2; i++) {
      const p1 = a[i] & 1, p2 = a[i + 1] & 1, p3 = a[i + 2] & 1;
      if (p1 !== p2 && p2 !== p3) c11++;
    }
    for (let i = 0; i < n - 3; i++)
      if (a[i] === a[i + 1] && a[i + 2] === a[i + 3] && a[i] !== a[i + 2]) c22++;
    for (let i = 0; i < n - 5; i++)
      if (a[i] === a[i + 1] && a[i + 1] === a[i + 2] &&
          a[i + 3] === a[i + 4] && a[i + 4] === a[i + 5] &&
          a[i] !== a[i + 3]) c33++;
    for (let i = 0; i < (n >> 1); i++) if (a[i] === a[n - 1 - i]) dx++;

    let cl = 0, lc = 0, ln = 0, nl = 0;
    for (let i = 0; i < n - 1; i++) {
      const c1 = a[i] & 1, c2 = a[i + 1] & 1;
      if (!c1 && c2) cl++; if (c1 && !c2) lc++;
      const l1 = a[i] >= 5 ? 1 : 0, l2 = a[i + 1] >= 5 ? 1 : 0;
      if (l1 && !l2) ln++; if (!l1 && l2) nl++;
    }

    let H = 0;
    for (let d = 0; d < 10; d++) if (ts[d]) {
      const p = ts[d] / n;
      H -= p * Math.log2(p);
    }

    let up = 0, dn = 0;
    for (let i = 1; i < n; i++) {
      if (a[i] > a[i - 1]) up++;
      else if (a[i] < a[i - 1]) dn++;
    }

    return {
      a, n, tong, chan, le, lon, nho, H,
      bet, dao, c11, c22, c33, dx, cl, lc, ln, nl, up, dn,
      dau: a[0], cuoi: a[n - 1], giua: a[n >> 1]
    };
  }

  /* Điểm Tài từ số */
  function scoreTai(f, seed) {
    let s = 0;
    s += f.tong >= 34 ? 28 : f.tong >= 30 ? 23 : f.tong >= 26 ? 17
       : f.tong >= 24 ? 10 : f.tong >= 22 ? 4 : 0;
    s += (f.lon - f.nho) * 6 + (f.chan - f.le) * 4;
    s += (f.dau >= 5 ? 4 : 0) + (f.cuoi >= 5 ? 6 : 0) + (f.giua >= 5 ? 3 : 0);
    s += f.bet * 5 + f.dao * 6 + f.c11 * 5 + f.c22 * 10 + f.c33 * 15 + f.dx * 4;
    s += (f.lc - f.cl) * 5 + (f.nl - f.ln) * 5;
    s += (f.up - f.dn) * 4;
    if (f.H < 2.4) s += 5;
    if (f.H < 1.8) s += 4;
    const m = (seed ^ (f.tong * 17)) % 100;
    s += m < 45 ? 7 : m < 55 ? 3 : 0;
    return s;
  }

  /* Điểm Xỉu từ số */
  function scoreXiu(f, seed) {
    let s = 0;
    s += f.tong <= 14 ? 28 : f.tong <= 18 ? 23 : f.tong <= 22 ? 17
       : f.tong <= 24 ? 10 : f.tong <= 26 ? 4 : 0;
    s += (f.nho - f.lon) * 6 + (f.le - f.chan) * 4;
    s += (f.dau <= 4 ? 4 : 0) + (f.cuoi <= 4 ? 6 : 0) + (f.giua <= 4 ? 3 : 0);
    s += f.bet * 5 + f.dao * 6 + f.c11 * 5 + f.c22 * 10 + f.c33 * 15 + f.dx * 4;
    s += (f.cl - f.lc) * 5 + (f.ln - f.nl) * 5;
    s += (f.dn - f.up) * 4;
    if (f.H < 2.4) s += 5;
    if (f.H < 1.8) s += 4;
    const m = (seed ^ (f.tong * 23)) % 100;
    s += m >= 55 ? 7 : m >= 45 ? 3 : 0;
    return s;
  }

  /* Phân tích cầu T/X: bệt, 1-1, 2-2, 3-3, đảo */
  function cauScore(str) {
    const a = [...str].map(c => (c === "T" ? 1 : 0)), n = a.length;
    if (n < 2) return { pred: null, conf: 0, bet: 1, c11: 0, c22: 0, c33: 0, type: "Chưa rõ" };

    let bet = 1;
    for (let i = n - 1; i > 0; i--) { if (a[i] === a[i - 1]) bet++; else break; }

    let c11 = 1;
    for (let i = n - 1; i > 0; i--) { if (a[i] !== a[i - 1]) c11++; else break; }

    let c22 = 0;
    for (let i = n - 4; i >= 0; i -= 2) {
      if (a[i] === a[i + 1] && a[i + 2] === a[i + 3] && a[i] !== a[i + 2]) c22++;
      else break;
    }

    let c33 = 0;
    for (let i = n - 6; i >= 0; i -= 3) {
      if (a[i] === a[i + 1] && a[i + 1] === a[i + 2] &&
          a[i + 3] === a[i + 4] && a[i + 4] === a[i + 5] &&
          a[i] !== a[i + 3]) c33++;
      else break;
    }

    let pred = null, conf = 0, type = "Chưa rõ";
    if (c33 >= 1) { pred = a[n - 1] ? 0 : 1; conf = 90; type = "3-3 đảo"; }
    else if (c22 >= 1) { pred = a[n - 1] ? 0 : 1; conf = 82; type = "2-2 đảo"; }
    else if (bet >= 4) { pred = a[n - 1]; conf = 85; type = "Bệt " + bet; }
    else if (bet === 3) { pred = a[n - 1]; conf = 70; type = "Bệt 3"; }
    else if (c11 >= 4) { pred = a[n - 1] ? 0 : 1; conf = 75; type = "1-1 dài"; }
    else if (bet === 2) { pred = a[n - 1]; conf = 55; type = "Bệt 2"; }
    else if (c11 >= 2) { pred = a[n - 1] ? 0 : 1; conf = 50; type = "1-1"; }

    return { pred, conf, bet, c11, c22, c33, type };
  }

  /* Tổng hợp phân tích */
  function analyze(nums, cau) {
    const f = feat(nums);
    const seed = hash32(nums + cau);
    let st = scoreTai(f, seed);
    let sx = scoreXiu(f, seed);

    const c = cauScore(cau);
    if (c.pred === 1) st += c.conf * 1.1;
    else if (c.pred === 0) sx += c.conf * 1.1;

    if (st + sx === 0) {
      if (f.tong >= 23) st = 60; else sx = 60;
    }

    const total = st + sx;
    let tp = (st / total) * 100;
    let xp = 100 - tp;

    if (Math.abs(tp - xp) < 3) {
      if (tp > xp) { tp += 1.5; xp -= 1.5; }
      else { tp -= 1.5; xp += 1.5; }
    }

    tp = Math.max(20, Math.min(90, Math.round(tp)));
    xp = 100 - tp;

    const diff = Math.abs(tp - xp);
    const conf = Math.min(96, Math.round(55 + diff * 0.9 + c.conf * 0.15));

    return {
      tai: tp,
      xiu: xp,
      conf,
      winner: tp > xp ? "TÀI" : "XỈU",
      cauType: c.type
    };
  }

  global.SunwinAlgo = { analyze, feat, cauScore, hash32 };
})(window);
