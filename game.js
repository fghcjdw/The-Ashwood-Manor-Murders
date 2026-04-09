// ═══════════════════════════════════════════
//   THE ASHCROFT MURDER — Game Engine
// ═══════════════════════════════════════════

// ── STATE ────────────────────────────────────
const G = {
  screen: 'cutscene',
  cutscenePanel: 0,
  playerName: 'Inspector Cross',
  currentRoom: 'foyer',
  visitedRooms: new Set(),
  collectedClues: new Set(),
  collectedItems: new Set(),
  readDocs: new Set(),
  talkedTo: new Set(),
  dialogueStates: {},    // charId -> last node id
  witnessAccounts: new Set(),
  achievements: new Set(),
  hintsUsed: 0,
  startTime: null,
  totalAccusations: 0,
  examinedObjects: new Set(),

  // Inventory view tab
  invTab: 'key',

  // Current dialogue state
  currentChar: null,
  currentDialogueNode: null,

  // Examine target
  examineTarget: null,

  // Combat
  combat: {
    active: false,
    playerHP: 100,
    enemyHP: 80,
    playerMaxHP: 100,
    enemyMaxHP: 80,
    log: [],
    evidenceUsed: new Set(),
    itemsUsed: new Set(),
    evidenceAttacksCount: 0,
    dodgeNext: false,
    intimidated: false,
    enemyDesperate: false,
    enemyTurn: false,
    gameOver: false
  },

  // Ending
  endingType: null,  // 'win' | 'lose_accusation' | 'lose_combat'
  endingCharId: null
};

// ── AUDIO ─────────────────────────────────────
let audioCtx = null;
function initAudio() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    startRain();
    setInterval(maybeThunder, 8000);
  } catch(e) {}
}
function startRain() {
  if (!audioCtx) return;
  const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.08;
  const src = audioCtx.createBufferSource();
  src.buffer = buf; src.loop = true;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass'; filter.frequency.value = 1200; filter.Q.value = 0.4;
  const gain = audioCtx.createGain(); gain.gain.value = 0.5;
  src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
  src.start();
}
function maybeThunder() {
  if (!audioCtx || Math.random() > 0.45) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(40 + Math.random() * 30, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(15, audioCtx.currentTime + 1.5);
  gain.gain.setValueAtTime(0.4 + Math.random() * 0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + 2);
  flashLightning();
}
function flashLightning() {
  const el = document.getElementById('lightning');
  if (!el) return;
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 120);
  if (Math.random() > 0.5) setTimeout(() => {
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 80);
  }, 200);
}
function playClick() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.frequency.value = 600;
  g.gain.setValueAtTime(0.1, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.connect(g); g.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + 0.05);
}
function playSuccess() {
  if (!audioCtx) return;
  [440, 550, 660].forEach((f, i) => {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.frequency.value = f;
    g.gain.setValueAtTime(0.12, audioCtx.currentTime + i * 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.1 + 0.3);
    osc.connect(g); g.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + i * 0.1);
    osc.stop(audioCtx.currentTime + i * 0.1 + 0.3);
  });
}
function playHit() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'sawtooth'; osc.frequency.value = 120;
  osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.2);
  g.gain.setValueAtTime(0.3, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
  osc.connect(g); g.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + 0.25);
}

// ── TOAST ─────────────────────────────────────
let toastTimer = null;
function showToast(msg, duration = 3000) {
  const el = document.getElementById('toast');
  el.classList.remove('hidden');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.classList.add('hidden'), 400);
  }, duration);
}

// ── ACHIEVEMENTS ──────────────────────────────
function grantAchievement(id) {
  if (G.achievements.has(id)) return;
  const a = STORY.achievements.find(x => x.id === id);
  if (!a) return;
  G.achievements.add(id);
  playSuccess();
  showToast(`🏆 Achievement Unlocked: "${a.name}"`, 4000);
}
function checkAchievements() {
  const keyClues = Object.entries(STORY.clues).filter(([,v]) => v.key).map(([k]) => k);
  const allClues = Object.keys(STORY.clues);
  if (G.collectedClues.size > 0) grantAchievement('first_clue');
  if (keyClues.every(c => G.collectedClues.has(c))) grantAchievement('all_key_clues');
  if (allClues.every(c => G.collectedClues.has(c))) grantAchievement('all_clues');
  const allRooms = Object.keys(STORY.rooms);
  if (allRooms.every(r => G.visitedRooms.has(r))) grantAchievement('all_rooms');
  const allChars = Object.keys(STORY.characters);
  if (allChars.every(c => G.talkedTo.has(c))) grantAchievement('all_characters');
  const allDocs = Object.keys(STORY.documents);
  if (allDocs.every(d => G.readDocs.has(d))) grantAchievement('read_all_docs');
  if (G.visitedRooms.has('garden')) grantAchievement('garden_visit');
}

// ── COLLECT CLUE ──────────────────────────────
function collectClue(id) {
  if (G.collectedClues.has(id)) return false;
  G.collectedClues.add(id);
  checkAchievements();
  return true;
}
function collectItem(id) {
  if (G.collectedItems.has(id)) return false;
  G.collectedItems.add(id);
  return true;
}
function grantWitness(id) {
  G.witnessAccounts.add(id);
}

// ── ACCUSATION READY ──────────────────────────
function isAccusationReady() {
  const keyClues = Object.entries(STORY.clues).filter(([,v]) => v.key).map(([k]) => k);
  const found = keyClues.filter(c => G.collectedClues.has(c)).length;
  return found >= 5;
}
function keyClueCount() {
  const keyClues = Object.entries(STORY.clues).filter(([,v]) => v.key).map(([k]) => k);
  return { found: keyClues.filter(c => G.collectedClues.has(c)).length, total: keyClues.length };
}

// ── RENDER DISPATCH ───────────────────────────
function render() {
  const root = document.getElementById('game-root');
  root.innerHTML = '';
  switch (G.screen) {
    case 'cutscene':    renderCutscene(root);    break;
    case 'nameEntry':   renderNameEntry(root);   break;
    case 'menu':        renderMenu(root);         break;
    case 'explore':     renderExplore(root);      break;
    case 'dialogue':    renderDialogue(root);     break;
    case 'examine':     renderExamine(root);      break;
    case 'inventory':   renderInventory(root);    break;
    case 'accusation':  renderAccusation(root);   break;
    case 'combat':      renderCombat(root);       break;
    case 'ending':      renderEnding(root);       break;
    case 'achievements':renderAchievements(root); break;
  }
}
function go(screen, data) {
  if (data) Object.assign(G, data);
  G.screen = screen;
  render();
}

// ── CUTSCENE ──────────────────────────────────
function renderCutscene(root) {
  const panel = STORY.cutscene[G.cutscenePanel];
  const total = STORY.cutscene.length;
  const isLast = G.cutscenePanel === total - 1;

  root.innerHTML = `
    <div class="screen cutscene-panel">
      <div class="cutscene-art">${panel.art}</div>
      <div class="cutscene-heading">${panel.heading}</div>
      <div class="cutscene-text">${panel.text}</div>
      <div class="cutscene-progress">
        ${Array.from({length: total}, (_, i) =>
          `<div class="cutscene-dot${i === G.cutscenePanel ? ' active' : ''}"></div>`
        ).join('')}
      </div>
      <div class="cutscene-next" id="cs-next">
        ${isLast ? 'Begin →' : 'Continue →'}
      </div>
    </div>`;

  document.getElementById('cs-next').onclick = () => {
    playClick();
    if (isLast) go('nameEntry');
    else { G.cutscenePanel++; render(); }
  };
  root.onclick = (e) => {
    if (e.target.id !== 'cs-next') return;
  };
  // Click anywhere on panel to advance
  root.querySelector('.cutscene-panel').onclick = (e) => {
    playClick();
    if (isLast) go('nameEntry');
    else { G.cutscenePanel++; render(); }
  };
}

// ── NAME ENTRY ────────────────────────────────
function renderNameEntry(root) {
  root.innerHTML = `
    <div class="screen">
      <div class="name-entry">
        <h2>Your Name, Inspector</h2>
        <p>You will be known by this name throughout the investigation.</p>
        <input class="text-input" id="name-input" type="text" 
          placeholder="Helena Cross" 
          value="${G.playerName === 'Inspector Cross' ? '' : G.playerName}" 
          maxlength="30" autocomplete="off" />
        <button class="btn btn-primary" id="name-confirm">Begin Investigation →</button>
      </div>
    </div>`;

  const input = document.getElementById('name-input');
  const btn = document.getElementById('name-confirm');
  input.focus();
  btn.onclick = () => {
    G.playerName = input.value.trim() || 'Helena Cross';
    G.startTime = Date.now();
    playClick();
    G.currentRoom = 'foyer';
    G.visitedRooms.add('foyer');
    go('explore');
  };
  input.onkeydown = (e) => { if (e.key === 'Enter') btn.click(); };
}

// ── MENU ──────────────────────────────────────
function renderMenu(root) {
  root.innerHTML = `
    <div class="screen title-screen">
      <div class="title-manor">🏚️</div>
      <div class="title-subtitle">A Mystery in One Act</div>
      <div class="title-main">The Ashcroft<br>Murder</div>
      <div class="title-divider"></div>
      <div class="menu-buttons">
        <button class="btn btn-primary" id="btn-new">New Investigation</button>
        <button class="btn" id="btn-ach">Achievements</button>
        <button class="btn" id="btn-credits">Credits</button>
      </div>
    </div>`;

  document.getElementById('btn-new').onclick = () => {
    playClick();
    resetGame();
    go('cutscene');
  };
  document.getElementById('btn-ach').onclick = () => {
    playClick();
    go('achievements');
  };
  document.getElementById('btn-credits').onclick = () => {
    playClick();
    showToast('A mystery game. Every detail is a clue. Every conversation matters.', 5000);
  };
}

function resetGame() {
  G.cutscenePanel = 0;
  G.currentRoom = 'foyer';
  G.visitedRooms = new Set();
  G.collectedClues = new Set();
  G.collectedItems = new Set();
  G.readDocs = new Set();
  G.talkedTo = new Set();
  G.dialogueStates = {};
  G.witnessAccounts = new Set();
  G.hintsUsed = 0;
  G.startTime = null;
  G.totalAccusations = 0;
  G.examinedObjects = new Set();
  G.invTab = 'key';
  G.currentChar = null;
  G.currentDialogueNode = null;
  G.examineTarget = null;
  G.endingType = null;
  G.endingCharId = null;
  G.combat = {
    active: false, playerHP: 100, enemyHP: 80,
    playerMaxHP: 100, enemyMaxHP: 80, log: [],
    evidenceUsed: new Set(), itemsUsed: new Set(),
    evidenceAttacksCount: 0, dodgeNext: false,
    intimidated: false, enemyDesperate: false,
    enemyTurn: false, gameOver: false
  };
}

// ── EXPLORE ───────────────────────────────────
function renderExplore(root) {
  const room = STORY.rooms[G.currentRoom];
  const kc = keyClueCount();
  const ready = isAccusationReady();
  const showParlour = room.id === 'foyer' && ready;

  // Build exits
  let exits = { ...room.exits };
  if (room.id === 'foyer' && ready) exits['parlour'] = 'The Parlour — Make Your Accusation';

  // First visit text (shown once)
  let firstVisitHtml = '';
  if (!G.visitedRooms.has(room.id) && room.firstVisit) {
    firstVisitHtml = `<div class="room-description" style="border-color:var(--gold-dim);color:var(--text);margin-bottom:20px;">${room.firstVisit}</div>`;
    G.visitedRooms.add(room.id);
    checkAchievements();
  }
  G.visitedRooms.add(room.id);

  // NPCs in this room
  const npcs = (room.npcs || []).map(id => STORY.characters[id]).filter(Boolean);

  // Objects
  const objs = room.objects || [];

  root.innerHTML = `
    <div class="explore-screen screen">
      <div class="room-header">
        <div class="room-title">
          <span class="room-icon">${room.icon}</span>
          ${room.name}
        </div>
        <div class="header-actions">
          <button class="btn btn-small" id="btn-inventory">📋 Evidence (${G.collectedClues.size})</button>
          ${G.hintsUsed < 3 ? `<button class="btn btn-small" id="btn-hint">💡 Hint (${3 - G.hintsUsed} left)</button>` : ''}
        </div>
      </div>

      <div class="room-main">
        <div class="room-content">
          ${firstVisitHtml}
          <div class="room-description">${room.description}</div>

          ${objs.length ? `
            <div class="room-section-title">Objects of Interest</div>
            <div class="interaction-grid">
              ${objs.map(obj => {
                const examined = G.examinedObjects.has(obj.id);
                const hasClue = obj.grantsClue && !G.collectedClues.has(obj.grantsClue);
                const hasItem = obj.grantsItem && !G.collectedItems.has(obj.grantsItem);
                return `
                  <div class="interact-card${hasClue ? ' has-clue' : ''}${hasItem ? ' has-item' : ''}" 
                       data-examine="${obj.id}">
                    <div class="interact-card-icon">${obj.icon}</div>
                    <div class="interact-card-name">${obj.name}</div>
                    <div class="interact-card-hint">${examined ? '✓ Examined' : obj.hint}</div>
                    ${(hasClue || hasItem) && !examined ? '<div class="badge"></div>' : ''}
                  </div>`;
              }).join('')}
            </div>` : ''}

          ${room.isAccusationRoom ? `
            <div class="room-section-title">Make Your Accusation</div>
            <p style="color:var(--muted);font-style:italic;margin-bottom:16px;">
              Every suspect is present. Study their faces. When you are ready, click a name.
            </p>
            <button class="btn btn-danger" id="btn-accuse" style="width:auto">⚖️ Make Your Accusation</button>` : ''}
        </div>

        <div class="room-sidebar">
          <div class="sidebar-section">
            <div class="sidebar-title">Exits</div>
            ${Object.entries(exits).map(([roomId, label]) =>
              `<button class="exit-btn" data-room="${roomId}">${label}</button>`
            ).join('')}
          </div>

          ${npcs.length ? `
            <div class="sidebar-section">
              <div class="sidebar-title">People Here</div>
              ${npcs.map(npc => `
                <div class="npc-card" data-char="${npc.id}">
                  <div class="npc-emoji">${npc.emoji}</div>
                  <div class="npc-info">
                    <div class="npc-name">${npc.name}</div>
                    <div class="npc-role">${npc.role}</div>
                    ${G.talkedTo.has(npc.id) ? '<div class="npc-talked">✓ Spoken to</div>' : ''}
                  </div>
                </div>`).join('')}
            </div>` : ''}

          <div class="sidebar-section">
            <div class="sidebar-title">Evidence</div>
            <div style="font-size:13px;color:var(--muted);">
              <span style="color:var(--gold)">${kc.found}</span> / ${kc.total} key clues
            </div>
            ${ready ? `<div class="accusation-ready" style="margin-top:8px;" id="ready-notice">
              ⚖️ Ready to accuse — visit the Parlour
            </div>` : ''}
          </div>
        </div>
      </div>

      <div class="room-footer">
        <div class="footer-left">
          <span class="clue-counter">Key Evidence: <span>${kc.found}/${kc.total}</span></span>
        </div>
        ${ready ? `<div class="accusation-ready" id="btn-go-parlour">⚖️ Go to Parlour →</div>` : ''}
      </div>
    </div>`;

  // Bind events
  root.querySelectorAll('.exit-btn').forEach(btn => {
    btn.onclick = () => {
      playClick();
      const roomId = btn.dataset.room;
      G.currentRoom = roomId;
      if (!G.visitedRooms.has(roomId)) G.visitedRooms.add(roomId);
      render();
    };
  });

  root.querySelectorAll('.interact-card').forEach(card => {
    card.onclick = () => {
      playClick();
      const objId = card.dataset.examine;
      const obj = objs.find(o => o.id === objId);
      if (obj) openExamine(obj);
    };
  });

  root.querySelectorAll('.npc-card').forEach(card => {
    card.onclick = () => {
      playClick();
      const charId = card.dataset.char;
      startDialogue(charId);
    };
  });

  const invBtn = document.getElementById('btn-inventory');
  if (invBtn) invBtn.onclick = () => { playClick(); go('inventory'); };

  const hintBtn = document.getElementById('btn-hint');
  if (hintBtn) hintBtn.onclick = () => {
    playClick();
    if (G.hintsUsed < STORY.hints.length) {
      showToast('💡 ' + STORY.hints[G.hintsUsed], 7000);
      G.hintsUsed++;
    }
  };

  const accBtn = document.getElementById('btn-accuse');
  if (accBtn) accBtn.onclick = () => { playClick(); go('accusation'); };

  const goBtn = document.getElementById('btn-go-parlour');
  if (goBtn) goBtn.onclick = () => {
    playClick();
    G.currentRoom = 'parlour';
    G.visitedRooms.add('parlour');
    render();
  };

  const readyNotice = document.getElementById('ready-notice');
  if (readyNotice) readyNotice.onclick = () => {
    playClick();
    G.currentRoom = 'parlour';
    G.visitedRooms.add('parlour');
    render();
  };
}

// ── EXAMINE ───────────────────────────────────
function openExamine(obj) {
  G.examineTarget = obj;
  G.screen = 'examine';
  render();
}

function renderExamine(root) {
  const obj = G.examineTarget;
  if (!obj) { go('explore'); return; }

  const clueName = obj.grantsClue ? STORY.clues[obj.grantsClue] : null;
  const itemData = obj.grantsItem ? STORY.items[obj.grantsItem] : null;
  const hasDoc   = obj.opensDoc   ? STORY.documents[obj.opensDoc] : null;

  // Collect clue/item automatically on examine
  let newClue = false, newItem = false;
  if (obj.grantsClue) { newClue = collectClue(obj.grantsClue); }
  if (obj.grantsItem) { newItem = collectItem(obj.grantsItem); }
  G.examinedObjects.add(obj.id);

  root.innerHTML = `
    <div class="screen" style="align-items:center;justify-content:center;">
      <div class="examine-screen">
        <div class="examine-header">
          <div class="examine-title">
            <span class="examine-icon">${obj.icon}</span>
            ${obj.name}
          </div>
          <button class="close-btn" id="examine-close">✕</button>
        </div>
        <div class="examine-body">
          <div class="examine-description">${obj.description}</div>
          ${hasDoc ? `
            <div style="margin-top:20px;">
              <button class="btn btn-small" id="btn-read-doc">📄 Read Document</button>
            </div>` : ''}
        </div>
        <div class="examine-footer">
          ${newClue && clueName ? `<span class="clue-badge">🔍 Evidence Added: ${clueName.name}</span>` : ''}
          ${clueName && !newClue ? `<span class="clue-badge">✓ Already in Evidence</span>` : ''}
          ${newItem && itemData ? `<span class="item-badge">📦 Item Obtained: ${itemData.name}</span>` : ''}
          ${itemData && !newItem ? `<span class="item-badge">✓ Already Collected</span>` : ''}
          <button class="btn btn-small btn-inline" id="examine-back">← Back</button>
        </div>
      </div>
    </div>`;

  document.getElementById('examine-close').onclick = () => { playClick(); go('explore'); };
  document.getElementById('examine-back').onclick  = () => { playClick(); go('explore'); };

  const readBtn = document.getElementById('btn-read-doc');
  if (readBtn) readBtn.onclick = () => {
    playClick();
    openDocument(obj.opensDoc);
  };

  if (newClue || newItem) playSuccess();
}

function openDocument(docId) {
  const doc = STORY.documents[docId];
  if (!doc) return;
  G.readDocs.add(docId);
  checkAchievements();

  const root = document.getElementById('game-root');
  root.innerHTML = `
    <div class="screen" style="align-items:center;justify-content:center;">
      <div class="examine-screen" style="max-width:660px;">
        <div class="examine-header">
          <div class="examine-title">
            <span class="examine-icon">${doc.icon}</span>
            ${doc.title}
          </div>
          <button class="close-btn" id="doc-close">✕</button>
        </div>
        <div class="examine-body">
          ${buildDocumentHTML(doc)}
        </div>
        <div class="examine-footer">
          <button class="btn btn-small btn-inline" id="doc-back">← Back</button>
        </div>
      </div>
    </div>`;

  document.getElementById('doc-close').onclick = () => { playClick(); go('examine'); };
  document.getElementById('doc-back').onclick  = () => { playClick(); go('examine'); };
}

function buildDocumentHTML(doc) {
  if (doc.pages) {
    return doc.pages.map(p => `
      <div class="document-paper" style="margin-bottom:16px;">
        <div class="document-date">${p.heading}</div>
        <div class="document-body">${p.body.replace(/\n/g, '<br>')}</div>
      </div>`).join('');
  }
  return `
    <div class="document-paper">
      ${doc.heading ? `<div class="document-heading">${doc.heading}</div>` : ''}
      ${doc.body ? `<div class="document-body">${doc.body.replace(/\n/g, '<br>')}</div>` : ''}
      ${doc.note ? `<div style="margin-top:12px;font-style:italic;color:#7a5a30;font-size:14px;">${doc.note}</div>` : ''}
      ${doc.signature ? `<div class="document-signature">${doc.signature}</div>` : ''}
    </div>`;
}

// ── DIALOGUE ──────────────────────────────────
function startDialogue(charId) {
  const char = STORY.characters[charId];
  if (!char) return;
  G.currentChar = charId;
  G.talkedTo.add(charId);
  G.currentDialogueNode = G.dialogueStates[charId] || char.dialogue.start;
  checkAchievements();
  go('dialogue');
}

function renderDialogue(root) {
  const char = STORY.characters[G.currentChar];
  if (!char) { go('explore'); return; }
  const node = char.dialogue.nodes[G.currentDialogueNode];
  if (!node) { go('explore'); return; }

  // Filter options based on requirements
  const validOpts = node.opts.filter(opt => {
    if (!opt.req) return true;
    // req can be a clue ID or witness account ID
    return G.collectedClues.has(opt.req) || G.witnessAccounts.has(opt.req);
  });

  root.innerHTML = `
    <div class="dialogue-screen screen">
      <div class="dialogue-portrait-area">
        <div class="dialogue-character">
          <div class="dialogue-emoji">${char.emoji}</div>
          <div class="dialogue-char-name">${char.name}</div>
          <div class="dialogue-char-role">${char.role}</div>
        </div>
      </div>
      <div class="dialogue-box">
        <div class="dialogue-npc-text">
          <div class="dialogue-npc-name">${char.name.toUpperCase()}</div>
          ${node.npc}
        </div>
        <div class="dialogue-options">
          ${validOpts.map((opt, i) =>
            `<button class="dialogue-option" data-idx="${i}">${opt.t}</button>`
          ).join('')}
          <button class="dialogue-option" id="dlg-leave" 
            style="color:var(--muted);border-style:dashed;">
            [Leave the conversation]
          </button>
        </div>
      </div>
    </div>`;

  root.querySelectorAll('.dialogue-option[data-idx]').forEach(btn => {
    btn.onclick = () => {
      playClick();
      const opt = validOpts[parseInt(btn.dataset.idx)];
      if (!opt) return;
      if (opt.g) grantWitness(opt.g);
      if (opt.n === null) {
        G.dialogueStates[G.currentChar] = char.dialogue.start;
        go('explore');
      } else {
        G.currentDialogueNode = opt.n;
        G.dialogueStates[G.currentChar] = opt.n;
        render();
      }
    };
  });

  document.getElementById('dlg-leave').onclick = () => {
    playClick();
    G.dialogueStates[G.currentChar] = char.dialogue.start;
    go('explore');
  };
}

// ── INVENTORY ─────────────────────────────────
function renderInventory(root) {
  const tabs = [
    { id: 'key',     label: 'Key Evidence' },
    { id: 'other',   label: 'Other Clues' },
    { id: 'witness', label: 'Witness Accounts' },
    { id: 'items',   label: 'Items' }
  ];

  const keyClues = Object.entries(STORY.clues)
    .filter(([id, c]) => c.key && G.collectedClues.has(id))
    .map(([id, c]) => ({ id, ...c }));

  const otherClues = Object.entries(STORY.clues)
    .filter(([id, c]) => !c.key && G.collectedClues.has(id))
    .map(([id, c]) => ({ id, ...c }));

  const witnessNames = {
    w_finch_brandy: { name: 'Finch: On the Brandy', desc: '"Lord Ashcroft always poured his own brandy. Dr. Pym poured it for him tonight."' },
    w_finch_conversation: { name: 'Finch: Overheard Conversation', desc: '"You will explain yourself to me before the week is out, Reginald."' },
    w_finch_pym_followed: { name: 'Finch: Pym Followed Victor', desc: '"Dr. Pym followed Lord Ashcroft to the study and was there for about twenty minutes."' },
    w_finch_last_with_victor: { name: 'Finch: Pym Was Last With Him', desc: '"Pym was the last person with Lord Ashcroft before his death."' },
    w_finch_accounts: { name: 'Finch: Victor\'s Suspicions', desc: '"Finch, I think someone has been taking liberties with my money."' },
    w_finch_pym_accounts: { name: 'Finch: Victor Suspected Pym', desc: '"Pym has been handling my financial affairs as a courtesy, and I begin to wonder whether courtesy is the right word."' },
    w_finch_table: { name: 'Finch: Pym Left the Table', desc: '"During the soup course, Dr. Pym excused himself for about five minutes."' },
    w_eleanor_pym_finances: { name: 'Eleanor: Pym Had Signatory Authority', desc: '"Victor gave Pym signatory authority on certain accounts years ago. I always thought it unwise."' },
    w_pym_brandy: { name: 'Pym\'s Response (Brandy)', desc: '"Victor\'s hands were shaking. I poured it as a small courtesy." (Note: he offered no prior explanation for leaving the table.)' },
    w_pym_defensive: { name: 'Pym: Defensive About Brandy', desc: 'When pressed about Victor\'s 35-year ritual, Pym became notably defensive.' },
    w_pym_medication: { name: 'Pym: Claims He Gave Digitalis', desc: '"A standard cardiac stimulant. Completely routine." (Yet the medical encyclopedia suggests the symptoms match aconitine, not heart failure.)' },
    w_pym_exposed: { name: 'Pym: Exposed on Finances', desc: 'When confronted with the Swiss account, Pym stopped answering and demanded a solicitor.' },
    w_pym_vial: { name: 'Pym: Confronted With the Vial', desc: 'On seeing the labeled vial from the garden, Pym went silent and refused to speak further.' },
    w_pym_contradiction: { name: 'Pym\'s Contradiction', desc: 'Pym gave two different accounts of Victor\'s last words in the same conversation.' },
    w_cecily_corridor: { name: 'Cecily: Saw Pym Leaving Study', desc: '"He was coming away from the study, not toward it — at around nine o\'clock."' },
    w_cecily_pym_smile: { name: 'Cecily: Pym\'s Expression', desc: '"He smiled. Something about it was finished — like a man who had completed something."' },
    w_cecily_voices: { name: 'Cecily: Two Voices', desc: '"I heard two voices through the study door. Lord Ashcroft\'s, raised."' },
    w_cecily_argument: { name: 'Cecily: "I Know What You\'ve Done"', desc: '"I know exactly what you\'ve done." — Lord Ashcroft\'s voice, through the study door, moments before he died.' },
    w_cecily_garden: { name: 'Cecily: Pym in the Garden', desc: '"About quarter to eight, before dinner — I saw Pym go through the back passage toward the kitchen garden with his medical bag."' },
    w_cecily_warning: { name: 'Cecily: Victor\'s Warning', desc: '"The most dangerous criminals are the ones who appear trustworthy." — Lord Ashcroft, two weeks ago.' },
    w_graves_pym_study: { name: 'Graves: Pym Went to the Study', desc: '"I heard him go past at about half-eight — quick, purposeful footsteps."' },
    w_graves_pym_return: { name: 'Graves: Pym Returned Slowly', desc: '"When he came back, he walked much slower. Like a man who\'s finished something."' },
    w_graves_timeline: { name: 'Graves: Timeline Confirmed', desc: 'The mantel clock chimed nine while Pym was still in the study. His return came minutes after.' },
    w_graves_accounts: { name: 'Graves: Victor Mentioned Discrepancies', desc: '"I needed a serious conversation with the man handling the money." — Lord Ashcroft to Graves, two days before he died.' },
    w_graves_figures: { name: 'Graves: "Not Quite Clever Enough"', desc: '"Someone\'s been very clever about it. But not quite clever enough." — Victor Ashcroft.' },
    w_thorne_pym_garden: { name: 'Thorne: Pym Near the Monkshood', desc: '"I saw Dr. Pym near my monkshood beds at half past eight."' },
    w_thorne_time: { name: 'Thorne: Time Confirmed (8:30)', desc: 'The church clock struck the half-hour while Pym was standing in the monkshood garden.' },
    w_thorne_passage: { name: 'Thorne: Pym Used the Back Stairs', desc: '"He went through the kitchen passage — he could reach his room unseen."' },
    w_thorne_physician: { name: 'Thorne: Only a Physician Would Know', desc: '"Someone with medical knowledge could extract aconitine in under an hour."' },
    w_thorne_footprints: { name: 'Thorne: City Man\'s Shoe', desc: '"Too large and too pointed to be mine. A man\'s dress shoe. Not made for gardens."' }
  };

  const collected = Array.from(G.witnessAccounts)
    .filter(id => witnessNames[id])
    .map(id => ({ id, ...witnessNames[id] }));

  const items = Array.from(G.collectedItems)
    .map(id => STORY.items[id] ? { id, ...STORY.items[id] } : null)
    .filter(Boolean);

  const activeTab = G.invTab;

  let bodyHtml = '';
  if (activeTab === 'key') {
    if (!keyClues.length) bodyHtml = `<div class="empty-state"><div class="empty-state-icon">🔍</div>No key evidence collected yet. Search the rooms carefully.</div>`;
    else bodyHtml = `<div class="evidence-grid">${keyClues.map(c => `
      <div class="evidence-card key-clue">
        <span class="evidence-card-tag tag-key">KEY</span>
        <div class="evidence-card-icon">${c.icon}</div>
        <div class="evidence-card-name">${c.name}</div>
        <div class="evidence-card-desc">${c.desc}</div>
      </div>`).join('')}</div>`;
  } else if (activeTab === 'other') {
    if (!otherClues.length) bodyHtml = `<div class="empty-state"><div class="empty-state-icon">📋</div>No additional clues found yet.</div>`;
    else bodyHtml = `<div class="evidence-grid">${otherClues.map(c => `
      <div class="evidence-card red-herring">
        <span class="evidence-card-tag tag-rh">NOTE</span>
        <div class="evidence-card-icon">${c.icon}</div>
        <div class="evidence-card-name">${c.name}</div>
        <div class="evidence-card-desc">${c.desc}</div>
      </div>`).join('')}</div>`;
  } else if (activeTab === 'witness') {
    if (!collected.length) bodyHtml = `<div class="empty-state"><div class="empty-state-icon">💬</div>No witness accounts recorded yet. Speak to the suspects.</div>`;
    else bodyHtml = `<div class="evidence-grid">${collected.map(w => `
      <div class="evidence-card" style="border-color:#3a6090;">
        <span class="evidence-card-tag tag-wit">WITNESS</span>
        <div class="evidence-card-icon">💬</div>
        <div class="evidence-card-name">${w.name}</div>
        <div class="evidence-card-desc">${w.desc}</div>
      </div>`).join('')}</div>`;
  } else if (activeTab === 'items') {
    if (!items.length) bodyHtml = `<div class="empty-state"><div class="empty-state-icon">📦</div>No items collected yet.</div>`;
    else bodyHtml = `<div class="evidence-grid">${items.map(it => `
      <div class="evidence-card" style="border-color:#3a6a3a;">
        <div class="evidence-card-icon">${it.icon}</div>
        <div class="evidence-card-name">${it.name}</div>
        <div class="evidence-card-desc">${it.desc}</div>
      </div>`).join('')}</div>`;
  }

  root.innerHTML = `
    <div class="screen" style="align-items:center;justify-content:center;">
      <div class="inventory-screen">
        <div class="inv-header">
          <div class="inv-title">📋 Evidence Board</div>
          <button class="close-btn" id="inv-close">✕</button>
        </div>
        <div class="inv-tabs">
          ${tabs.map(t => `<button class="inv-tab${activeTab === t.id ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
        </div>
        <div class="inv-body">${bodyHtml}</div>
      </div>
    </div>`;

  document.getElementById('inv-close').onclick = () => { playClick(); go('explore'); };
  root.querySelectorAll('.inv-tab').forEach(t => {
    t.onclick = () => { playClick(); G.invTab = t.dataset.tab; render(); };
  });
}

// ── ACCUSATION ────────────────────────────────
function renderAccusation(root) {
  const suspects = Object.values(STORY.characters);
  root.innerHTML = `
    <div class="screen" style="align-items:center;justify-content:center;">
      <div class="accusation-screen">
        <div class="accusation-header">
          <div class="accusation-title">⚖️ Make Your Accusation</div>
          <div class="accusation-sub">Choose carefully. You cannot take it back.</div>
        </div>
        <div class="accusation-warning">
          Once you make your accusation, the endgame begins. Ensure you have gathered sufficient evidence.
        </div>
        <div class="suspects-grid">
          ${suspects.map(s => `
            <div class="suspect-card" data-char="${s.id}">
              <div class="suspect-emoji">${s.emoji}</div>
              <div class="suspect-name">${s.name}</div>
              <div class="suspect-role">${s.role}</div>
            </div>`).join('')}
        </div>
        <div class="accusation-cancel">
          <button class="btn btn-small" id="accuse-cancel">← Return to Investigation</button>
        </div>
      </div>
    </div>`;

  root.querySelectorAll('.suspect-card').forEach(card => {
    card.onclick = () => {
      playClick();
      const charId = card.dataset.char;
      makeAccusation(charId);
    };
  });
  document.getElementById('accuse-cancel').onclick = () => { playClick(); go('explore'); };
}

function makeAccusation(charId) {
  G.totalAccusations++;
  if (charId === STORY.murderer) {
    // Correct! First try achievement
    if (G.totalAccusations === 1) grantAchievement('first_try');
    // Start combat
    G.combat.playerHP = 100;
    G.combat.enemyHP = 80;
    G.combat.log = [{ type: 'system', text: '"You." Dr. Pym\'s face goes very still. Then something changes in his expression — all pretense drops away. He reaches into his coat pocket.' }];
    G.combat.active = true;
    go('combat');
  } else {
    // Wrong accusation
    G.endingType = 'lose_accusation';
    G.endingCharId = charId;
    go('ending');
  }
}

// ── COMBAT ────────────────────────────────────
function renderCombat(root) {
  const c = G.combat;
  const enemy = STORY.combat.enemy;

  const playerPct = Math.max(0, (c.playerHP / c.playerMaxHP) * 100);
  const enemyPct  = Math.max(0, (c.enemyHP  / c.enemyMaxHP)  * 100);
  const playerLow = c.playerHP < 30;
  const enemyLow  = c.enemyHP  < 30;
  if (!c.enemyDesperate && enemyLow) {
    c.enemyDesperate = true;
    c.log.push({ type: 'system', text: '⚠️ Pym is desperate — his attacks grow savage!' });
  }

  // Available evidence attacks
  const availEvidence = Object.entries(STORY.combat.evidenceAttacks)
    .filter(([id]) => G.collectedClues.has(id) && !c.evidenceUsed.has(id));

  // Available items
  const availItems = Array.from(G.collectedItems)
    .filter(id => !c.itemsUsed.has(id) && STORY.items[id]?.combat)
    .map(id => ({ id, ...STORY.items[id] }));

  const recentLog = c.log.slice(-6);

  root.innerHTML = `
    <div class="combat-screen screen" style="position:relative;">
      <div class="combat-header">
        <div class="combat-title">⚔️ Confrontation — Dr. Reginald Pym</div>
      </div>
      <div class="combat-main">
        <div class="combat-fighters">
          <div class="fighter-card">
            <div class="fighter-name">
              <span>🔍 Inspector ${G.playerName}</span>
            </div>
            <div class="hp-bar-wrap">
              <div class="hp-bar${playerLow ? ' low' : ''}" style="width:${playerPct}%"></div>
            </div>
            <div class="hp-text">${c.playerHP} / ${c.playerMaxHP} HP</div>
            <div class="status-badges">
              ${c.intimidated ? '<span class="status-badge bad">😵 Rattled</span>' : ''}
              ${c.dodgeNext ? '<span class="status-badge">🛡️ Dodging</span>' : ''}
            </div>
          </div>
          <div class="fighter-card enemy">
            <div class="fighter-name">
              <span>${enemy.emoji} ${enemy.name}</span>
            </div>
            <div class="hp-bar-wrap">
              <div class="hp-bar enemy${enemyLow ? ' low' : ''}" style="width:${enemyPct}%"></div>
            </div>
            <div class="hp-text">${c.enemyHP} / ${c.enemyMaxHP} HP</div>
            <div class="status-badges">
              ${c.enemyDesperate ? '<span class="status-badge bad">⚠️ Desperate</span>' : ''}
            </div>
          </div>
        </div>
        <div class="combat-log">
          <div class="combat-log-title">Battle Log</div>
          ${recentLog.map(e => `<div class="log-entry ${e.type}">${e.text}</div>`).join('')}
        </div>
      </div>
      <div class="combat-actions" id="combat-actions">
        <div class="actions-title">Your Action</div>
        <div class="actions-grid">
          <button class="action-btn" id="act-strike">
            <div class="action-btn-icon">👊</div>
            <div class="action-btn-name">Strike</div>
            <div class="action-btn-desc">12–20 damage</div>
          </button>
          <button class="action-btn dodge" id="act-dodge">
            <div class="action-btn-icon">🛡️</div>
            <div class="action-btn-name">Dodge</div>
            <div class="action-btn-desc">Avoid next attack</div>
          </button>
          ${availEvidence.slice(0, 4).map(([id, ev]) => `
            <button class="action-btn evidence" data-ev="${id}">
              <div class="action-btn-icon">${ev.icon}</div>
              <div class="action-btn-name">${ev.name}</div>
              <div class="action-btn-desc">${ev.damage[0]}–${ev.damage[1]} dmg</div>
            </button>`).join('')}
          ${availItems.map(it => `
            <button class="action-btn item" data-item="${it.id}">
              <div class="action-btn-icon">${it.icon}</div>
              <div class="action-btn-name">${it.name}</div>
              <div class="action-btn-desc">${it.heal ? `Restore ${it.heal} HP` : `${it.damage[0]}–${it.damage[1]} dmg`}</div>
            </button>`).join('')}
        </div>
      </div>
      ${c.enemyTurn ? '<div class="enemy-turn-overlay"><div class="enemy-turn-text">Dr. Pym attacks...</div></div>' : ''}
    </div>`;

  if (c.enemyTurn || c.gameOver) return;

  document.getElementById('act-strike').onclick = () => combatAction('strike');
  document.getElementById('act-dodge').onclick  = () => combatAction('dodge');
  root.querySelectorAll('.action-btn[data-ev]').forEach(btn => {
    btn.onclick = () => combatAction('evidence', btn.dataset.ev);
  });
  root.querySelectorAll('.action-btn[data-item]').forEach(btn => {
    btn.onclick = () => combatAction('item', btn.dataset.item);
  });
}

function rng(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function combatAction(type, id) {
  playClick();
  const c = G.combat;
  let dmg = 0, msg = '';

  if (type === 'strike') {
    dmg = rng(12, 20);
    if (c.intimidated) { dmg = Math.floor(dmg * 0.6); c.intimidated = false; }
    msg = `You strike with conviction. ${dmg} damage.`;
    c.log.push({ type: 'player', text: `👊 Strike — ${dmg} damage.` });
  } else if (type === 'dodge') {
    c.dodgeNext = true;
    c.log.push({ type: 'player', text: '🛡️ You prepare to dodge his next attack.' });
    enemyTurn(); return;
  } else if (type === 'evidence') {
    const ev = STORY.combat.evidenceAttacks[id];
    c.evidenceUsed.add(id);
    c.evidenceAttacksCount++;
    if (c.evidenceAttacksCount >= 5) grantAchievement('evidence_master');
    dmg = rng(ev.damage[0], ev.damage[1]);
    if (c.intimidated) { dmg = Math.floor(dmg * 0.75); c.intimidated = false; }
    c.log.push({ type: 'player', text: `${ev.icon} ${ev.name} — ${dmg} damage! "${ev.desc}"` });
    playHit();
  } else if (type === 'item') {
    const it = STORY.items[id];
    c.itemsUsed.add(id);
    if (it.heal) {
      const healed = Math.min(it.heal, c.playerMaxHP - c.playerHP);
      c.playerHP = Math.min(c.playerMaxHP, c.playerHP + it.heal);
      c.log.push({ type: 'player', text: `${it.icon} Used ${it.name} — restored ${healed} HP.` });
      playSuccess();
    } else if (it.damage) {
      dmg = rng(it.damage[0], it.damage[1]);
      c.log.push({ type: 'player', text: `${it.icon} ${it.name} — ${dmg} damage!` });
      playHit();
    }
  }

  if (dmg > 0) {
    c.enemyHP = Math.max(0, c.enemyHP - dmg);
    playHit();
  }

  if (c.enemyHP <= 0) {
    combatVictory(); return;
  }

  enemyTurn();
}

function enemyTurn() {
  const c = G.combat;
  c.enemyTurn = true;
  render();

  setTimeout(() => {
    c.enemyTurn = false;
    const enemy = STORY.combat.enemy;

    // Pick attack
    let possibleAttacks = enemy.attacks.filter(a => !a.desperateOnly);
    if (c.enemyDesperate) possibleAttacks = enemy.attacks;
    const attack = possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];

    c.log.push({ type: 'enemy', text: `${attack.icon} ${attack.name} — "${attack.flavor}"` });

    if (attack.debuff === 'intimidate') {
      c.intimidated = true;
      c.log.push({ type: 'enemy', text: '😵 You are rattled — next attack weakened.' });
    } else {
      let dmg = rng(attack.damage[0], attack.damage[1]);
      if (c.dodgeNext) {
        c.dodgeNext = false;
        if (Math.random() < 0.8) {
          c.log.push({ type: 'system', text: '🛡️ You dodge the attack!' });
          dmg = 0;
        } else {
          c.log.push({ type: 'system', text: '⚠️ You tried to dodge but he was too fast!' });
        }
      }
      if (dmg > 0) {
        c.playerHP = Math.max(0, c.playerHP - dmg);
        c.log.push({ type: 'enemy', text: `💥 You take ${dmg} damage. HP: ${c.playerHP}/${c.playerMaxHP}` });
        playHit();
      }
    }

    if (c.playerHP <= 0) {
      combatDefeat(); return;
    }

    render();
  }, 1400);
}

function combatVictory() {
  const c = G.combat;
  c.gameOver = true;
  grantAchievement('survived');
  if (G.hintsUsed === 0) grantAchievement('no_hints');
  const elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  if (elapsed < 720) grantAchievement('speed_run'); // 12 minutes
  G.endingType = 'win';
  render();

  setTimeout(() => {
    go('ending');
  }, 1000);
}

function combatDefeat() {
  G.combat.gameOver = true;
  G.endingType = 'lose_combat';
  render();
  setTimeout(() => go('ending'), 1200);
}

// ── ENDING ────────────────────────────────────
function renderEnding(root) {
  const elapsed = G.startTime ? Math.floor((Date.now() - G.startTime) / 1000) : 0;
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  if (G.endingType === 'win') {
    root.innerHTML = `
      <div class="screen">
        <div class="ending-screen">
          <div class="ending-icon">⚖️</div>
          <div class="ending-title win">Justice for Victor</div>
          <div class="ending-text">
            Dr. Reginald Pym sinks to his knees. In the end, it is not the evidence that undoes him — it is 
            the realisation that he miscalculated. He believed Lord Ashcroft was alone. He forgot about you.
            <br><br>
            Pym is restrained until morning, when the roads clear and the police arrive. He confesses to 
            embezzling £12,000 from the Ashcroft estate over the course of a year. When Victor finally 
            found the discrepancy and arranged to confront him, Pym acted. He harvested aconitine from 
            Mrs. Thorne's monkshood garden, dissolved it in the brandy he poured for Victor, and waited 
            for it to work. He had twenty years of Victor Ashcroft's trust, and he used it to kill him.
            <br><br>
            Miss Cecily Vane is named in Victor's revised will, which was signed shortly before his death.
            Lady Eleanor and Captain Graves move to Norfolk. Mrs. Thorne destroys her monkshood bed.
            <br><br>
            And Finch, who started all of this by sending a telegram into the storm, 
            finally permits himself to sit down.
          </div>
          <div class="ending-stats">
            <div class="stat-row"><span class="stat-label">Time</span><span class="stat-value">${minutes}m ${seconds}s</span></div>
            <div class="stat-row"><span class="stat-label">Key Clues Found</span><span class="stat-value">${keyClueCount().found} / ${keyClueCount().total}</span></div>
            <div class="stat-row"><span class="stat-label">Hints Used</span><span class="stat-value">${G.hintsUsed}</span></div>
            <div class="stat-row"><span class="stat-label">Accusations Made</span><span class="stat-value">${G.totalAccusations}</span></div>
            <div class="stat-row"><span class="stat-label">Achievements</span><span class="stat-value">${G.achievements.size} / ${STORY.achievements.length}</span></div>
          </div>
          <div class="ending-buttons">
            <button class="btn btn-primary" id="end-ach">View Achievements</button>
            <button class="btn" id="end-menu">Return to Main Menu</button>
          </div>
        </div>
      </div>`;
  } else if (G.endingType === 'lose_accusation') {
    const charId = G.endingCharId;
    const wrongText = STORY.wrongAccusations[charId] || "You have accused the wrong person. The real murderer watches from the shadows.";
    const charName = STORY.characters[charId]?.name || 'Unknown';
    root.innerHTML = `
      <div class="screen">
        <div class="ending-screen">
          <div class="ending-icon">❌</div>
          <div class="ending-title lose">Wrong Accusation</div>
          <div class="ending-text">
            You accuse <strong style="color:var(--text)">${charName}</strong>.<br><br>
            ${wrongText}
            <br><br>
            <em>The murderer was Dr. Reginald Pym. He embezzled £12,000 from the Ashcroft estate. 
            When Victor found the discrepancy and arranged a confrontation, Pym poisoned him 
            with aconitine dissolved in his brandy. The evidence was there — the missing vial, 
            the bank letter, the diary, his own notes. You needed to look deeper.</em>
          </div>
          <div class="ending-buttons">
            <button class="btn btn-primary" id="end-retry">Investigate Again</button>
            <button class="btn" id="end-menu">Main Menu</button>
          </div>
        </div>
      </div>`;
  } else if (G.endingType === 'lose_combat') {
    root.innerHTML = `
      <div class="screen">
        <div class="ending-screen">
          <div class="ending-icon">💀</div>
          <div class="ending-title lose">Defeated</div>
          <div class="ending-text">
            Dr. Pym stands over you with steady hands and cold eyes. "You came close," he says.
            "Closer than I expected." He straightens his coat, picks up his bag, and walks out 
            into the storm before anyone can raise the alarm.
            <br><br>
            <em>You were right about the killer — but the confrontation came too soon. 
            Gather more evidence next time. The more clues you collect, the more powerful 
            your evidence attacks in the final battle.</em>
          </div>
          <div class="ending-buttons">
            <button class="btn btn-primary" id="end-retry">Try Again</button>
            <button class="btn" id="end-menu">Main Menu</button>
          </div>
        </div>
      </div>`;
  }

  const achBtn = document.getElementById('end-ach');
  if (achBtn) achBtn.onclick = () => { playClick(); go('achievements'); };

  const menuBtn = document.getElementById('end-menu');
  if (menuBtn) menuBtn.onclick = () => { playClick(); go('menu'); };

  const retryBtn = document.getElementById('end-retry');
  if (retryBtn) retryBtn.onclick = () => {
    playClick();
    resetGame();
    G.startTime = Date.now();
    G.currentRoom = 'foyer';
    G.visitedRooms.add('foyer');
    go('explore');
  };
}

// ── ACHIEVEMENTS ──────────────────────────────
function renderAchievements(root) {
  root.innerHTML = `
    <div class="screen" style="align-items:center;justify-content:center;">
      <div class="achievements-screen">
        <div class="ach-header">
          <div class="ach-title">🏆 Achievements</div>
          <button class="close-btn" id="ach-close">✕</button>
        </div>
        <div class="ach-list">
          ${STORY.achievements.map(a => {
            const unlocked = G.achievements.has(a.id);
            return `
              <div class="ach-item${unlocked ? ' unlocked' : ' locked'}">
                <div class="ach-icon">${a.icon}</div>
                <div>
                  <div class="ach-item-name">${a.secret && !unlocked ? '???' : a.name}</div>
                  <div class="ach-item-desc">${a.secret && !unlocked ? 'Secret achievement' : a.desc}</div>
                </div>
                ${unlocked ? '<span style="margin-left:auto;color:var(--gold);font-size:18px;">✓</span>' : ''}
              </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;

  document.getElementById('ach-close').onclick = () => {
    playClick();
    if (G.endingType === 'win') go('ending');
    else if (G.startTime) go('explore');
    else go('menu');
  };
}

// ── INIT ──────────────────────────────────────
window.addEventListener('load', () => {
  // First interaction starts audio
  document.addEventListener('click', () => {
    if (!audioCtx) initAudio();
  }, { once: true });

  render();

  // Periodic lightning
  setInterval(() => {
    if (Math.random() < 0.3) flashLightning();
  }, 12000);
});
