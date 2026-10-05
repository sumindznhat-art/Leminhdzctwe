/* ============================================================
   SUNWIN VIP - UI MODULE
   ============================================================ */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);

  /* ---------- Toggle panel ---------- */
  $("toggleBtn").addEventListener("click", () => {
    $("tool").classList.toggle("open");
  });
  $("closeBtn").addEventListener("click", () => {
    $("tool").classList.remove("open");
  });

  /* ---------- Drag panel ---------- */
  let drag = false, ox = 0, oy = 0;
  const dh = $("dragHandle");
  const panel = $("tool");

  const start = (x, y) => {
    drag = true;
    ox = x - panel.offsetLeft;
    oy = y - panel.offsetTop;
  };
  const move = (x, y) => {
    if (!drag) return;
    panel.style.left = (x - ox) + "px";
    panel.style.top = (y - oy) + "px";
    panel.style.right = "auto";
  };

  dh.addEventListener("mousedown", e => {
    if (e.target === $("closeBtn")) return;
    start(e.clientX, e.clientY);
  });
  dh.addEventListener("touchstart", e => {
    if (e.target === $("closeBtn")) return;
    const t = e.touches[0];
    start(t.clientX, t.clientY);
  }, { passive: true });
  document.addEventListener("mousemove", e => move(e.clientX, e.clientY));
  document.addEventListener("touchmove", e => {
    const t = e.touches[0];
    move(t.clientX, t.clientY);
  }, { passive: false });
  document.addEventListener("mouseup", () => drag = false);
  document.addEventListener("touchend", () => drag = false);

  /* ---------- Input lọc ký tự ---------- */
  $("phienInput").addEventListener("input", e => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });
  $("cauInput").addEventListener("input", e => {
    e.target.value = e.target.value.toUpperCase().replace(/[^TX]/g, "");
  });

  /* ---------- Lịch sử ---------- */
  const hist = [];
  function renderHist() {
    $("histCount").textContent = hist.length;
    if (!hist.length) {
      $("histList").innerHTML =
        '<span style="opacity:.5;font-size:8px">Chưa có</span>';
      return;
    }
    $("histList").innerHTML = hist.map(h =>
      `<span class="hi ${h.w === "TÀI" ? "tai" : "xiu"}">${h.w} ${h.c}%</span>`
    ).join("");
  }

  /* ---------- Xử lý phân tích ---------- */
  $("analyzeBtn").addEventListener("click", () => {
    const v = $("phienInput").value.trim();
    const cu = $("cauInput").value.trim();
    const msg = $("statusMsg");

    if (v.length !== 7) {
      msg.textContent = "⚠ NHẬP ĐỦ 7 SỐ";
      msg.style.color = "#ff4466";
      return;
    }
    if (cu.length < 2) {
      msg.textContent = "⚠ NHẬP CẦU T/X (VD TXTXTX)";
      msg.style.color = "#ff4466";
      return;
    }

    msg.textContent = "⚡ ĐANG PHÂN TÍCH...";
    msg.style.color = "#e3f2fd";
    $("cardTai").classList.remove("win");
    $("cardXiu").classList.remove("win");

    setTimeout(() => {
      const r = window.SunwinAlgo.analyze(v, cu);

      $("taiPct").textContent = r.tai + "%";
      $("xiuPct").textContent = r.xiu + "%";

      if (r.winner === "TÀI") $("cardTai").classList.add("win");
      else $("cardXiu").classList.add("win");

      msg.textContent = "🐻 " + r.winner + " • " + r.cauType + " • Tin cậy " + r.conf + "%";
      msg.style.color = r.winner === "TÀI" ? "#42a5f5" : "#e3f2fd";

      hist.unshift({ w: r.winner, c: r.conf });
      if (hist.length > 12) hist.pop();
      renderHist();
    }, 700);
  });

  renderHist();
})();
