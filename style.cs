*{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',Arial,sans-serif;-webkit-tap-highlight-color:transparent}
html,body{width:100%;height:100%;overflow:hidden;background:#0a0a0a}
#game{position:fixed;inset:0;width:100vw;height:100vh;border:0;z-index:1}
#toggleBtn{position:fixed;top:14px;right:14px;z-index:99999;padding:8px 16px;border-radius:22px;border:2px solid #1e88e5;background:linear-gradient(135deg,#0d1b2a,#1b3a5c);color:#e3f2fd;font-size:12px;font-weight:bold;letter-spacing:1px;cursor:pointer;touch-action:none;box-shadow:0 0 20px rgba(30,136,229,.6);animation:glow 2s infinite}
@keyframes glow{0%,100%{box-shadow:0 0 18px rgba(30,136,229,.6)}50%{box-shadow:0 0 32px rgba(30,136,229,1)}}
#tool{position:fixed;top:60px;right:14px;z-index:99998;width:280px;padding:12px;border-radius:18px;background:linear-gradient(160deg,#0d1b2a,#102a43,#0d1b2a);border:1.5px solid rgba(30,136,229,.5);box-shadow:0 0 30px rgba(30,136,229,.5);display:none;touch-action:none;max-height:95vh;overflow-y:auto}
#tool.open{display:block}
#dragHandle{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:6px 10px;border-radius:10px;cursor:move;background:linear-gradient(90deg,rgba(30,136,229,.2),transparent);border:1px solid rgba(30,136,229,.3)}
#toolTitle{font-size:11px;font-weight:bold;color:#e3f2fd;letter-spacing:1.5px;text-shadow:0 0 10px rgba(30,136,229,.9)}
#closeBtn{width:20px;height:20px;border:0;border-radius:50%;background:linear-gradient(135deg,#1e88e5,#1565c0);color:#fff;font-size:11px;font-weight:bold;cursor:pointer}
.inp{width:100%;height:44px;border-radius:10px;border:2px solid rgba(30,136,229,.5);background:linear-gradient(180deg,#0a1420,#0d1b2a);color:#e3f2fd;font-size:20px;font-family:'Courier New',monospace;text-align:center;letter-spacing:8px;font-weight:bold;outline:none;text-shadow:0 0 12px rgba(30,136,229,.9)}
.inp+.inp{margin-top:8px}
#phienInput::placeholder{color:rgba(227,242,253,.35);letter-spacing:3px;font-size:12px}
#cauInput{letter-spacing:6px;font-size:18px}
#cauInput::placeholder{color:rgba(227,242,253,.35);letter-spacing:2px;font-size:12px}
#analyzeBtn{width:100%;margin-top:10px;padding:11px;border:0;border-radius:12px;background:linear-gradient(135deg,#1e88e5,#42a5f5,#1e88e5);background-size:200% 100%;color:#fff;font-weight:bold;font-size:13px;letter-spacing:2px;cursor:pointer;box-shadow:0 0 20px rgba(30,136,229,.7);animation:shine 2s infinite}
@keyframes shine{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
#analyzeBtn:active{transform:scale(.96)}
#resultGrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
.card{border-radius:12px;padding:10px 6px;text-align:center;transition:.3s}
.card.tai{background:linear-gradient(160deg,rgba(30,136,229,.2),rgba(30,136,229,.05));border:1.5px solid rgba(66,165,245,.7)}
.card.xiu{background:linear-gradient(160deg,rgba(227,242,253,.15),rgba(227,242,253,.03));border:1.5px solid rgba(227,242,253,.6)}
.card.win.tai{box-shadow:0 0 30px rgba(66,165,245,1),inset 0 0 20px rgba(66,165,245,.4);transform:scale(1.05)}
.card.win.xiu{box-shadow:0 0 30px rgba(227,242,253,1),inset 0 0 20px rgba(227,242,253,.4);transform:scale(1.05)}
.lbl{font-size:11px;font-weight:bold;letter-spacing:1.5px;margin-bottom:4px}
.tai .lbl{color:#42a5f5}.xiu .lbl{color:#e3f2fd}
.pct{font-size:22px;font-weight:bold;font-family:'Courier New',monospace}
.tai .pct{color:#42a5f5;text-shadow:0 0 12px rgba(66,165,245,.9)}
.xiu .pct{color:#e3f2fd;text-shadow:0 0 12px rgba(227,242,253,.9)}
#statusMsg{font-size:10px;text-align:center;color:#bbdefb;margin-top:8px;min-height:14px;font-weight:bold;letter-spacing:.5px}
#historyBox{margin-top:10px;padding:8px;border-radius:10px;background:rgba(0,0,0,.25);border:1px solid rgba(30,136,229,.2)}
#histTitle{font-size:9px;color:#bbdefb;letter-spacing:1px;margin-bottom:5px;display:flex;justify-content:space-between}
#histList{display:flex;flex-wrap:wrap;gap:3px}
.hi{padding:2px 7px;border-radius:6px;font-size:8.5px;font-weight:bold;border:1px solid}
.hi.tai{background:rgba(30,136,229,.3);color:#42a5f5;border-color:#42a5f5}
.hi.xiu{background:rgba(227,242,253,.15);color:#e3f2fd;border-color:#e3f2fd}
