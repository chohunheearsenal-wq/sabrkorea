// 페이지 로드 즉시 모든 섹션 숨김
document.addEventListener('DOMContentLoaded',function(){
  ['pg-home','pg-columns','pg-about'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.style.display='none';
  });
});
</script>
<header>
  <div class="hdr-main">
    <div class="logo" onclick="showPage('home')">
      <img id="logo-img" src="" alt="SABR Logo">
    </div>
    <nav>
      <button class="act" id="nav-home" onclick="showPage('home')"></button>
      <button id="nav-columns" onclick="showPage('columns')"></button>
      <button id="nav-about" onclick="showPage('about')"></button>
    </nav>
    <div class="hdr-right">
      <div class="lang-sw">
        <button class="lbtn on" id="lb-ko" onclick="setLang('ko')">KO</button>
        <button class="lbtn" id="lb-en" onclick="setLang('en')">EN</button>
      </div>
    </div>
  </div>
</header>

<!-- HOME -->
<div id="pg-home" class="page">
  <div class="hero-banner">
    <div class="hero-inner">
      <div class="hero-text">
        <div class="hero-eyebrow" id="hero-eyebrow"></div>
        <h1 class="hero-h1" id="hero-h1"></h1>
        <p class="hero-desc" id="hero-desc"></p>
        <div class="hero-stats">
          <div class="hst"><div class="hst-n">7,500+</div><div class="hst-l" id="hst-l1"></div></div>
          <div class="hst"><div class="hst-n">70+</div><div class="hst-l" id="hst-l2"></div></div>
          <div class="hst"><div class="hst-n">1971</div><div class="hst-l" id="hst-l3"></div></div>
        </div>
      </div>
      <div class="hero-img-wrap">
        <img class="hero-logo-big" id="hero-logo" src="" alt="SABR">
      </div>
    </div>
  </div>
  <div class="container">
    <div class="layout">
      <main>
        <div class="sh">
          <div class="sh-title" id="sh-home"></div>
          <button class="sh-more" id="sh-more" onclick="showPage('columns')"></button>
        </div>
        <div id="list-home"><div class="loading">⚾ 불러오는 중...</div></div>
      </main>
      <aside class="sidebar">
        <div class="sb-card">
          <div class="sb-title" id="sb-recent-title"></div>
          <div class="sb-list" id="sb-recent"></div>
        </div>
        <div class="sb-card">
          <div style="text-align:center"><img class="sb-logo" id="sb-logo" src="" alt="SABR"></div>
          <div class="sb-title" id="sb-about-title"></div>
          <div class="sb-about" id="sb-about-text"></div>
          <button class="btn-join" id="btn-join" onclick="showPage('about')"></button>
        </div>
      </aside>
    </div>
  </div>
</div>
</div>

<!-- COLUMNS -->
<div id="pg-columns" class="page">
  <div class="container">
    <div class="layout">
      <main style="padding-top:2rem">
        <div class="sh">
          <div class="sh-title" id="sh-col"></div>
        </div>
        <div id="list-all"><div class="loading">⚾ 불러오는 중...</div></div>
      </main>
      <aside class="sidebar">
      </aside>
    </div>
  </div>
</div>

<!-- ABOUT -->
<div id="pg-about" class="page">
  <div class="container" style="padding-top:3rem;padding-bottom:4rem;max-width:860px">
    <div style="display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--red);margin-bottom:1.2rem">
      <span style="width:20px;height:1px;background:var(--red);display:inline-block"></span>
      <span id="abt-eyebrow"></span>
    </div>
    <h2 class="abt-h" id="abt-h" style="margin-bottom:1.2rem"></h2>
    <p class="abt-lead" id="abt-p1"></p>
    <p class="abt-lead" id="abt-p2"></p>
    <a href="https://sabr.org/community/" target="_blank" style="display:inline-block;margin:1.5rem 0 2.5rem">
      <button class="btn-submit" id="btn-member-join" style="background:var(--red);width:auto;padding:12px 32px"></button>
    </a>
    <div class="abt-feats">
      <div class="af"><div class="af-ico">🔬</div><div class="af-t" id="af1-t"></div><div class="af-d" id="af1-d"></div></div>
      <div class="af"><div class="af-ico">🗺️</div><div class="af-t" id="af2-t"></div><div class="af-d" id="af2-d"></div></div>
      <div class="af"><div class="af-ico">🎙️</div><div class="af-t" id="af3-t"></div><div class="af-d" id="af3-d"></div></div>
      <div class="af"><div class="af-ico">🤝</div><div class="af-t" id="af4-t"></div><div class="af-d" id="af4-d"></div></div>
    </div>

  </div>
</div>


<footer>
  <a href="https://sabr.org" target="_blank">© 2026 SABR Korea Chapter &nbsp;·&nbsp; <span style="text-decoration:underline">sabr.org ↗</span></a>
</footer>

<!-- FLOATING WRITE BUTTON (칼럼 탭에서만) -->
<button id="fab-write" onclick="openEditor()" style="
  display:none;position:fixed;bottom:2rem;right:2rem;z-index:200;
  background:var(--red);color:#fff;border:none;cursor:pointer;
  width:56px;height:56px;border-radius:50%;font-size:1.5rem;
  box-shadow:0 4px 20px rgba(192,35,27,.4);
  transition:transform .2s,box-shadow .2s;
  display:none;align-items:center;justify-content:center;
" title="칼럼 기고">✏️</button>

<!-- ARTICLE FULL PAGE -->
<div class="article-page" id="article-page">
  <div class="art-prog"><div class="art-prog-bar" id="prog-bar"></div></div>

  <div class="art-page-inner" id="art-body" onscroll="updateProgress()"></div>
  <footer>
    <a href="https://sabr.org" target="_blank">© 2026 SABR Korea Chapter &nbsp;·&nbsp; <span style="text-decoration:underline">sabr.org ↗</span></a>
  </footer>
</div>

<!-- EDITOR PAGE (fullscreen) -->
<div class="editor-page" id="editor-page">
  <div class="editor-hdr">
    <div style="display:flex;align-items:center;gap:12px">
      <div class="editor-hdr-title" id="editor-hdr-title">칼럼 기고</div>
      <span class="editor-autosave" id="editor-autosave"></span>
    </div>
    <div class="editor-hdr-actions">
      <div class="lang-tabs">
        <button class="lang-tab on" id="etab-ko" onclick="switchEditorLang('ko')">KO</button>
        <button class="lang-tab" id="etab-en" onclick="switchEditorLang('en')">EN</button>
      </div>
      <button class="btn-cancel" id="btn-cancel" onclick="closeEditor()"></button>
      <button class="btn-delete" id="btn-delete" onclick="deleteColumn()" style="display:none;background:none;border:1px solid #e53e3e;color:#e53e3e;font-size:13px;padding:7px 16px;border-radius:99px;cursor:pointer;transition:all .15s;font-family:var(--sans)">삭제</button>
      <button class="btn-publish" id="btn-publish" onclick="publishColumn()"></button>
    </div>
  </div>
  <!-- 저자 / 읽기 시간 -->
  <div class="editor-meta">
    <input type="text" id="e-author" placeholder="저자 이름">
    
  </div>
  <!-- 대표 이미지 -->
  <div class="thumb-upload-zone">
    <label class="thumb-upload-btn" id="thumb-label">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
      <span>대표 이미지 추가</span>
      <input type="file" id="e-thumbnail" accept="image/*" style="display:none" onchange="previewThumb(this)">
    </label>
    <div class="thumb-upload-preview" id="thumb-preview">
      <img id="thumb-img" src="" alt="">
      <button class="thumb-remove-btn" onclick="clearThumb()" title="제거">✕</button>
      <span class="thumb-upload-info" id="thumb-info"></span>
    </div>
  </div>
  <!-- KO editor -->
  <div id="editor-ko" class="editor-body">
    <div class="editor-doc">
      <div class="editor-title-wrap">
        <textarea id="e-title-ko" class="editor-title-input" placeholder="제목을 입력하세요" rows="2" oninput="autoResize(this)"></textarea>
      </div>

      <div class="editor-quill-wrap">
        <div id="quill-ko"></div>
      </div>
      <div class="editor-wordcount" id="wordcount-ko">0자</div>
    </div>
  </div>
  <!-- EN editor -->
  <div id="editor-en" class="editor-body" style="display:none">
    <div class="editor-doc">
      <div class="editor-title-wrap">
        <textarea id="e-title-en" class="editor-title-input" placeholder="Enter title" rows="2" oninput="autoResize(this)"></textarea>
      </div>

      <div class="editor-quill-wrap">
        <div id="quill-en"></div>
      </div>
      <div class="editor-wordcount" id="wordcount-en">0 chars</div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>
<div class="ql-img-toolbar" id="ql-img-toolbar">
  <button onclick="imgAlign('img-left')" title="왼쪽 정렬" id="btn-img-left"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="10" height="10" rx="1"/><rect x="2" y="16" width="20" height="2" rx="1"/><rect x="2" y="20" width="14" height="2" rx="1"/></svg></button>
  <button onclick="imgAlign('img-center')" title="가운데 정렬" id="btn-img-center"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="4" width="10" height="10" rx="1"/><rect x="2" y="16" width="20" height="2" rx="1"/><rect x="5" y="20" width="14" height="2" rx="1"/></svg></button>
  <button onclick="imgAlign('img-right')" title="오른쪽 정렬" id="btn-img-right"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="12" y="4" width="10" height="10" rx="1"/><rect x="2" y="16" width="20" height="2" rx="1"/><rect x="8" y="20" width="14" height="2" rx="1"/></svg></button>
  <button onclick="imgAlign('img-full')" title="전체 너비" id="btn-img-full"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="4" width="20" height="10" rx="1"/><rect x="2" y="16" width="20" height="2" rx="1"/><rect x="2" y="20" width="20" height="2" rx="1"/></svg></button>
  <div class="sep"></div>
  <button onclick="imgDelete()" title="삭제" style="color:#f38ba8">✕</button>
</div>

<script>
// ── CONFIG ──
const ADMIN_PW = 'sabrkorea123!';

// ── SUPABASE ──
// ── SUPABASE REST API (SDK 없이 직접 fetch) ──
const SB_URL = 'https://suwyafmirxnmtaonxlqo.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1d3lhZm1pcnhubXRhb254bHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTA3ODYsImV4cCI6MjA5Mzk4Njc4Nn0.I0CCH7oP-6BvNS1XTDk0G2tRbLooKGh7vyy8ziP6P5c';
const SB_H = { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' };
const db = {
  from: (table) => ({
    select: (cols='*') => ({
      order: (col, opts={}) => ({
        _run: () => fetch(`${SB_URL}/rest/v1/${table}?select=${cols}&order=${col}.${opts.ascending?'asc':'desc'}`, {headers:SB_H}).then(r=>r.json()).then(data=>({data,error:null})).catch(e=>({data:null,error:e})),
        then(res,rej){return this._run().then(res,rej);}
      }),
      eq: (col,val) => ({
        single: () => fetch(`${SB_URL}/rest/v1/${table}?select=${cols}&${col}=eq.${encodeURIComponent(val)}`, {headers:{...SB_H,'Accept':'application/vnd.pgrst.object+json'}}).then(r=>r.json()).then(data=>({data,error:null})).catch(e=>({data:null,error:e})),
        then(res,rej){return fetch(`${SB_URL}/rest/v1/${table}?select=${cols}&${col}=eq.${encodeURIComponent(val)}`,{headers:SB_H}).then(r=>r.json()).then(data=>({data,error:null})).then(res,rej);}
      }),
    }),
    insert: (payload) => ({select:()=>fetch(`${SB_URL}/rest/v1/${table}`,{method:'POST',headers:SB_H,body:JSON.stringify(payload)}).then(r=>r.json()).then(data=>({data,error:null})).catch(e=>({data:null,error:e}))}),
    update: (payload) => ({eq:(col,val)=>({select:()=>fetch(`${SB_URL}/rest/v1/${table}?${col}=eq.${encodeURIComponent(val)}`,{method:'PATCH',headers:SB_H,body:JSON.stringify(payload)}).then(r=>r.json()).then(data=>({data,error:null})).catch(e=>({data:null,error:e}))})}),
    delete: () => ({eq:(col,val)=>fetch(`${SB_URL}/rest/v1/${table}?${col}=eq.${encodeURIComponent(val)}`,{method:'DELETE',headers:SB_H}).then(r=>({error:r.ok?null:new Error(r.status)})).catch(e=>({error:e}))})
  })
};

// ── LOGO ──
const LOGO_SRC = '/logo.png';
['logo-img','hero-logo','sb-logo'].forEach(id=>{const el=document.getElementById(id);if(el)el.src=LOGO_SRC;});


// ── PASSWORD CHECK ──
function checkPassword(action) {
  const pw = prompt(action === 'ko' ? '비밀번호를 입력하세요:' : 'Enter password:');
  if (pw === null) return false;
  if (pw !== ADMIN_PW) {
    showToast(lang === 'ko' ? '비밀번호가 틀렸습니다.' : 'Incorrect password.');
    return false;
  }
  return true;
}


// ── THUMBNAIL ──
let thumbnailBase64 = null;

function previewThumb(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) { showToast('이미지는 10MB 이하만 가능합니다.'); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // canvas로 리사이즈 + 압축 (최대 800px, quality 0.75)
      const MAX = 1200;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      thumbnailBase64 = canvas.toDataURL('image/jpeg', 0.88);
      document.getElementById('thumb-img').src = thumbnailBase64;
      document.getElementById('thumb-preview').style.display = 'flex'; document.getElementById('thumb-preview').style.flexDirection = 'row';
      document.getElementById('thumb-label').style.display = 'none';
      console.log('[SABR] thumbnail size (chars):', thumbnailBase64.length);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function clearThumb() {
  thumbnailBase64 = null;
  document.getElementById('e-thumbnail').value = '';
  document.getElementById('thumb-preview').style.display = 'none';
  document.getElementById('thumb-label').style.display = 'flex';
}

// ── STATE ──
let lang = 'ko';
let allColumns = [];
let quillKo, quillEn, editorLang = 'ko';
let editingColumnId = null;
let currentArticleId = null;  // 현재 열린 칼럼 ID

// ── QUILL INIT ──
// Quill을 동적으로 로드 (에디터 열 때만)
let quillLoaded = false;
function loadQuillThenInit(callback) {
  if (quillLoaded) { callback(); return; }
  const script = document.createElement('script');
  script.src = 'https://cdn.quilljs.com/1.3.7/quill.min.js';
  script.onload = () => { quillLoaded = true; callback(); };
  document.head.appendChild(script);
}

function initQuill() {
  const opts = {
    theme: 'snow',
    placeholder: '',
    modules: {
      toolbar: [
        ['bold','italic','underline','strike'],
        [{color:[]},{background:[]}],
        [{header:[1,2,3,false]}],
        [{size:['small',false,'large','huge']}],
        ['blockquote','code-block'],
        [{list:'ordered'},{list:'bullet'},{indent:'-1'},{indent:'+1'}],
        [{align:[]}],
        ['link','image'],
        ['clean']
      ]
    }
  };
  quillKo = new Quill('#quill-ko', {...opts, placeholder:'본문을 입력하세요...'});
  quillEn = new Quill('#quill-en', {...opts, placeholder:'Write your column here...'});
  quillKo.on('text-change', () => updateWordCount(quillKo, 'wordcount-ko'));
  quillEn.on('text-change', () => updateWordCount(quillEn, 'wordcount-en'));
  attachImgClickHandlers(quillKo);
  attachImgClickHandlers(quillEn);

  // 이미지 핸들러
  function imageHandler(quillInstance) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        showToast('이미지는 5MB 이하만 가능합니다.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const range = quillInstance.getSelection(true);
        quillInstance.insertEmbed(range.index, 'image', e.target.result);
        quillInstance.setSelection(range.index + 1);
      };
      reader.readAsDataURL(file);
    };
  }

  quillKo.getModule('toolbar').addHandler('image', () => imageHandler(quillKo));
  quillEn.getModule('toolbar').addHandler('image', () => imageHandler(quillEn));
}
// Quill은 에디터 열릴 때 초기화

// ── TRANSLATIONS ──
const T = {
  ko:{
    nav:['홈','칼럼','소개'],
    btnWrite:'칼럼 기고',
    heroEyebrow:'SABR 한국 챕터 공식 웹사이트',
    heroH1:'미국야구학회\n대한민국 지부',
    heroDesc:'SABR 한국 챕터는 즐겁게 야구를 탐구하고자 하는<br>연구자와 팬들의 커뮤니티입니다.',
    hstL:['전세계 회원','지역 챕터','창설 연도'],
    shHome:'최신 칼럼', shMore:'전체 보기 →', shCol:'칼럼 아카이브',
    sbRecent:'최신 칼럼', sbAbout:'소개',
    sbAboutText:'SABR 한국 챕터는 즐겁게 야구를 탐구하고자 하는 연구자와 팬들의 커뮤니티입니다.',
    btnJoin:'챕터 소개 보기 →',
    abtEyebrow:'소개', abtH:'SABR이란?',
    abtP1:'SABR(Society for American Baseball Research)은 1971년 8월 10일, 뉴욕 쿠퍼스타운의 야구 명예의 전당에서 밥 데이비즈(Bob Davids)와 15명의 야구 연구자들이 모여 창설한 단체입니다. 현재 전 세계 7,500명 이상의 회원을 보유하고 있으며, 애리조나주 피닉스에 본부를 두고 있습니다.',
    abtP2:'세이버메트릭스(Sabermetrics)라는 용어도 SABR의 이름에서 비롯된 것으로 잘 알려져 있습니다. 통계뿐 아니라 야구의 역사, 전기, 문화까지 폭넓게 다루며, 야구에 관심이 있는 누구나 참여할 수 있는 열린 커뮤니티입니다.',
    abtFeats:[['위원회','야구 분야별 전문 연구 조직. 세이버메트릭스, 야구 속 여성, 선수 전기, 니그로 리그 등 25개 이상 위원회가 활동 중'],['챕터','지역 기반 커뮤니티 조직. 한국 포함해 전 세계에 70개 이상의 챕터 운영 중'],['컨퍼런스','연 2회 컨퍼런스 개최. 겨울 Analytics Conference와 여름 Annual Convention.'],['네트워킹','입회 심사나 면접 없는 열린 커뮤니티. 야구를 좋아한다면 누구나 멤버로 참여 가능']],
    btnMemberJoin:'SABR 회원 가입하기',
    drwRead:'칼럼 읽기',
    catLabels:{sabermetrics:'세이버메트릭스',analysis:'경기 분석',history:'역사',prospect:'유망주'},
    readTime:'분 읽기',
    editorTitle:'칼럼 기고', btnCancel:'취소', btnPublish:'게재하기',
    toastOk:'✓ 칼럼이 게재됐습니다!', toastErr:'제목과 본문은 필수입니다.', toastSaving:'저장 중...',
    emptyT:'아직 칼럼이 없습니다', emptyD:'첫 번째 칼럼을 기고해주세요',
    loadErr:'칼럼을 불러오지 못했습니다',
  },
  en:{
    nav:['Home','Columns','About'],
    btnWrite:'Submit Column',
    heroEyebrow:'Official Website — SABR Korea Chapter',
    heroH1:'Korea Chapter of the\nSociety for American\nBaseball Research',
    heroDesc:'SABR Korea Chapter is a community of researchers and fans who explore baseball with curiosity and passion.',
    hstL:['Global Members','Chapters','Founded'],
    shHome:'Latest Columns', shMore:'View All →', shCol:'Column Archive',
    sbRecent:'Latest Columns', sbAbout:'About',
    sbAboutText:'SABR Korea Chapter is a community of researchers and fans who explore baseball with curiosity and passion.',
    btnJoin:'Learn More →',
    abtEyebrow:'About', abtH:'What is SABR?',
    abtP1:'SABR (Society for American Baseball Research) was founded on August 10, 1971, in Cooperstown, New York, by Bob Davids and 15 fellow baseball researchers at the Baseball Hall of Fame. Today, SABR has over 7,500 members worldwide and is headquartered in Phoenix, Arizona.',
    abtP2:'The term sabermetrics is widely known to have originated from SABR\'s name. Beyond statistics, SABR covers baseball history, biography, and culture — open to anyone with a love for the game.',
    abtFeats:[['Committees','Topic-based research groups: sabermetrics, women in baseball, biography, Negro Leagues, and more — 25+ active committees'],['Chapters','Geography-based communities. 70+ chapters worldwide, including Korea'],['Conferences','Two conferences per year: Analytics Conference in winter and Annual Convention in summer.'],['Networking','No screening or interviews. An open community — anyone who loves baseball is welcome']],
    btnMemberJoin:'Join SABR',
    drwRead:'Read Column',
    catLabels:{sabermetrics:'Sabermetrics',analysis:'Game Analysis',history:'History',prospect:'Prospects'},
    readTime:' min read',
    editorTitle:'Submit Column', btnCancel:'Cancel', btnPublish:'Publish',
    toastOk:'✓ Column published!', toastErr:'Title and content are required.', toastSaving:'Saving...',
    emptyT:'No columns yet', emptyD:'Be the first to submit a column',
    loadErr:'Failed to load columns',
  }
};

// ── HELPERS ──
function setEl(id,v){const e=document.getElementById(id);if(e)e.textContent=v;}
function setHTML(id,v){const e=document.getElementById(id);if(e)e.innerHTML=v;}
function catClass(c){return'ct-'+(c||'default');}
function catLabel(c){return T[lang].catLabels[c]||c||'';}
function fmtDate(d){return d?d.slice(0,10).replace(/-/g,'.'):''}

// ── SUPABASE DATA ──
async function fetchColumns() {
  try {
    const { data, error } = await db.from('columns').select('*').order('created_at', { ascending: false })._run();
    if (error) throw error;
    return data || [];
  } catch(e) {
    console.error('Fetch error:', e);
    return [];
  }
}

// ── RENDER ──
function makeCard(col, idx, featured) {
  const title = lang === 'ko' ? (col.title_ko || col.title_en) : (col.title_en || col.title_ko);
  if (featured && idx === 0) {
    return `<div class="aitem featured" onclick="openArticle('${col.id}')">
      <div class="feat-img" style="${col.thumbnail ? `background-image:url('${col.thumbnail}');background-size:cover;background-position:center;` : ''}">${col.thumbnail ? `<img src="${col.thumbnail}" alt="" style="display:none">` : `<img src="${LOGO_SRC}" alt="">`}<div class="feat-img-label">
        <div class="aitem-title">${title}</div>
        <div class="aitem-meta"><strong>${col.author}</strong><span class="sep">·</span><span>${fmtDate(col.created_at)}</span><span class="sep">·</span></div>
      </div></div>
    </div>`;
  }
  return `<div class="aitem" onclick="openArticle('${col.id}')">
    <div class="aitem-thumb">${col.thumbnail ? `<img class="thumb-real" src="${col.thumbnail}" alt="">` : `<img class="logo-placeholder" src="${LOGO_SRC}" alt="">`}</div>
    <div class="aitem-body">
      <div class="aitem-title">${title}</div>
      <div class="aitem-meta"><strong>${col.author}</strong><span class="sep">·</span><span>${fmtDate(col.created_at)}</span><span class="sep">·</span></div>
    </div>
  </div>`;
}

function skeletonCards(n=2) {
  return Array(n).fill(`<div class="skeleton-card">
    <div class="skeleton skeleton-thumb"></div>
    <div class="skeleton-body">
      <div class="skeleton skeleton-line w80"></div>
      <div class="skeleton skeleton-line w60"></div>
      <div class="skeleton skeleton-line w40"></div>
    </div>
  </div>`).join('');
}

function renderHome() {
  const t = T[lang];
  const cols = allColumns;
  if (!cols.length) {
    setHTML('list-home', `<div class="empty"><div class="empty-ico">⚾</div><div class="empty-t">${t.emptyT}</div><div class="empty-d">${t.emptyD}</div></div>`);
  } else {
    setHTML('list-home', cols.slice(0, 7).map((c, i) => makeCard(c, i, true)).join(''));
  }
  setHTML('sb-recent', cols.slice(0, 5).map(c => {
    const title = lang === 'ko' ? (c.title_ko || c.title_en) : (c.title_en || c.title_ko);
    return `<div class="sb-item" onclick="openArticle('${c.id}')"><div class="sb-item-title">${title}</div><div class="sb-item-meta">${c.author} · ${fmtDate(c.created_at)}</div></div>`;
  }).join(''));
}

function renderAll() {
  const t = T[lang];
  const cols = allColumns;
  if (!cols.length) {
    setHTML('list-all', `<div class="empty"><div class="empty-ico">⚾</div><div class="empty-t">${t.emptyT}</div><div class="empty-d">${t.emptyD}</div></div>`);
  } else {
    setHTML('list-all', cols.map((c, i) => makeCard(c, i, false)).join(''));
  }
}

// ── LANG ──
function setLang(l) {
  lang = l;
  document.getElementById('lb-ko').classList.toggle('on', l==='ko');
  document.getElementById('lb-en').classList.toggle('on', l==='en');
  const t = T[l];
  const navIds = ['nav-home','nav-columns','nav-about'];
  navIds.forEach((id,i) => setEl(id, t.nav[i]));
  setEl('hero-eyebrow', t.heroEyebrow);
  setEl('hero-h1', t.heroH1);
  setHTML('hero-desc', t.heroDesc);
  t.hstL.forEach((lb,i) => setEl('hst-l'+(i+1), lb));
  setEl('sh-home', t.shHome); setEl('sh-more', t.shMore); setEl('sh-col', t.shCol);
  setEl('sb-recent-title', t.sbRecent); setEl('sb-about-title', t.sbAbout);
  setEl('sb-about-text', t.sbAboutText); setEl('btn-join', t.btnJoin);
  setEl('abt-eyebrow', t.abtEyebrow); setEl('abt-h', t.abtH);
  setEl('abt-p1', t.abtP1); setEl('abt-p2', t.abtP2);
  t.abtFeats.forEach(([title,desc],i)=>{setEl('af'+(i+1)+'-t',title);setEl('af'+(i+1)+'-d',desc);});
  setEl('btn-member-join', t.btnMemberJoin);
  setEl('drw-read-title', t.drwRead);
  setEl('editor-hdr-title', t.editorTitle);
  setEl('btn-cancel', t.btnCancel); setEl('btn-publish', t.btnPublish);
  renderHome(); renderAll();
  // 칼럼이 열려 있으면 언어에 맞게 내용 갱신
  if (currentArticleId) {
    refreshArticle(currentArticleId);
    const label = document.getElementById('share-btn-label');
    if (label) label.textContent = lang === 'ko' ? '공유' : 'Share';
  }
}

// ── PAGES ──
function showPage(id) {
  window._prevPage = id;
  // article-page 항상 숨기기
  const artPage = document.getElementById('article-page');
  if(artPage){ artPage.classList.remove('open'); artPage.style.display = 'none'; }
  ['home','columns','about'].forEach(p => {
    const el = document.getElementById('pg-'+p);
    if(el) {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
      el.style.position = 'absolute';
      el.style.pointerEvents = 'none';
    }
  });
  const active = document.getElementById('pg-'+id);
  if(active) {
    active.style.display = 'block';
    active.style.visibility = 'visible';
    active.style.position = 'relative';
    active.style.pointerEvents = 'auto';
  }
  ['nav-home','nav-columns','nav-about'].forEach((nid,i) => {
    document.getElementById(nid).classList.toggle('act', ['home','columns','about'][i]===id);
  });
  if(id==='columns') renderAll();
  const fab = document.getElementById('fab-write');
  if(fab) fab.style.display = id==='columns' ? 'flex' : 'none';
  // 일반 페이지 footer 표시
  const mf = document.querySelector('body > footer');
  if(mf) mf.style.display = 'block';
  window.scrollTo({top:0,behavior:'smooth'});

  // URL 업데이트
  const urlMap = {
    home:    window.location.pathname,
    columns: '?page=columns',
    about:   '?page=about'
  };
  history.pushState({page: id}, '', urlMap[id] || window.location.pathname);
}

// ── ARTICLE READER ──
// ── 칼럼 언어 전환 시 내용만 갱신 ──
function refreshArticle(id) {
  const col = allColumns.find(c => c.id === id);
  if (!col) return;
  const title = lang==='ko' ? (col.title_ko||col.title_en) : (col.title_en||col.title_ko);
  const body  = lang==='ko' ? (col.body_ko||col.body_en)   : (col.body_en||col.body_ko);
  setHTML('art-body', `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
      <button onclick="closeArticle()" style="background:none;border:none;cursor:pointer;font-size:1.2rem;color:var(--t2);padding:4px 8px 4px 0;line-height:1">←</button>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="art-edit-inline" onclick="closeArticle();openEditor('${col.id}')" style="background:none;border:1px solid var(--border2);color:var(--t2);font-size:11px;padding:4px 12px;border-radius:99px;cursor:pointer;font-family:var(--sans)">${lang==='ko'?'수정':'Edit'}</button>
        <button onclick="shareArticle('${col.id}')" style="display:flex;align-items:center;gap:5px;background:none;border:1px solid var(--border2);color:var(--t2);font-size:11px;padding:4px 12px;border-radius:99px;cursor:pointer;font-family:var(--sans)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          ${lang==='ko'?'공유':'Share'}
        </button>
      </div>
    </div>
    <div class="art-title">${title}</div>
    <div class="art-meta">
      <strong>${col.author}</strong><span>·</span><span>${fmtDate(col.created_at)}</span><span>·</span>
    </div>
    <div class="art-body">${body}</div>`);
}

function openArticle(id) {
  const col = allColumns.find(c => c.id === id);
  if (!col) return;
  currentArticleId = id;

  const title = lang==='ko' ? (col.title_ko||col.title_en) : (col.title_en||col.title_ko);
  const body = lang==='ko' ? (col.body_ko||col.body_en) : (col.body_en||col.body_ko);
  setHTML('art-body', `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
      <button onclick="closeArticle()" style="background:none;border:none;cursor:pointer;font-size:1.2rem;color:var(--t2);padding:4px 8px 4px 0;line-height:1">←</button>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="art-edit-inline" onclick="closeArticle();openEditor('${col.id}')" style="background:none;border:1px solid var(--border2);color:var(--t2);font-size:11px;padding:4px 12px;border-radius:99px;cursor:pointer;font-family:var(--sans)">${lang==='ko'?'수정':'Edit'}</button>
        <button onclick="shareArticle('${col.id}')" style="display:flex;align-items:center;gap:5px;background:none;border:1px solid var(--border2);color:var(--t2);font-size:11px;padding:4px 12px;border-radius:99px;cursor:pointer;font-family:var(--sans)">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          ${lang==='ko'?'공유':'Share'}
        </button>
      </div>
    </div>
    <div class="art-title">${title}</div>
    <div class="art-meta">
      <strong>${col.author}</strong><span>·</span><span>${fmtDate(col.created_at)}</span><span>·</span>
    </div>
    <div class="art-body">${body}</div>`);
  // URL 업데이트 (공유 가능한 링크)
  history.pushState({colId: id}, '', '/col/' + id);
  window.scrollTo(0, 0);
  document.getElementById('prog-bar').style.width = '0%';
  const artPage = document.getElementById('article-page');
  artPage.style.display = 'block';
  artPage.classList.add('open');
  // 모든 일반 페이지 숨기기
  ['pg-home','pg-columns','pg-about'].forEach(id => {
    const el = document.getElementById(id);
    if(el){ el.style.display='none'; el.style.visibility='hidden'; el.style.position='absolute'; }
  });
  document.getElementById('fab-write').style.display = 'none';
  // 일반 페이지 footer 숨기기
  const mf = document.querySelector('body > footer');
  if(mf) mf.style.display = 'none';
  // 스크롤 진행 업데이트 (window 기준)
  if(window._artScrollHandler) window.removeEventListener('scroll', window._artScrollHandler);
  window._artScrollHandler = () => updateProgress();
  window.addEventListener('scroll', window._artScrollHandler);
}
function closeArticle() {
  currentArticleId = null;
  history.pushState({}, '', '/');
  const shareBtn = document.getElementById('art-share-btn');
  if (shareBtn) shareBtn.style.display = 'none';
  const artPage = document.getElementById('article-page');
  artPage.classList.remove('open');
  artPage.style.display = 'none';
  if(window._artScrollHandler) {
    window.removeEventListener('scroll', window._artScrollHandler);
    window._artScrollHandler = null;
  }
  // 일반 footer 복원
  const mf = document.querySelector('body > footer');
  if(mf) mf.style.display = 'block';
  // 이전 페이지 복원
  const prevPage = window._prevPage || 'home';
  showPage(prevPage);
}
function updateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight * 100) : 0;
  document.getElementById('prog-bar').style.width = Math.min(100, pct) + '%';
}
function closeAll() {}

// ── EDITOR ──
async function openEditor(colId) {
  if (!checkPassword(lang)) return;
  editingColumnId = colId || null;

  // 항상 먼저 초기화
  clearEditor();
  document.getElementById('editor-page').classList.add('open');
  document.body.style.overflow = 'hidden';

  const t = T[lang];
  setEl('editor-hdr-title', editingColumnId ? (lang==='ko' ? '칼럼 수정' : 'Edit Column') : t.editorTitle);
  document.getElementById('btn-delete').style.display = editingColumnId ? 'inline-block' : 'none';

  loadQuillThenInit(async () => {
    if (!quillKo) {
      initQuill();
    }
    if (editingColumnId) await fillQuillContent();
  });
}

async function fillQuillContent() {
  // DB에서 직접 최신 데이터 fetch (캐시 문제 방지)
  let col;
  try {
    const { data } = await db.from('columns').select('*').eq('id', editingColumnId).single();
    col = data;
  } catch(e) {
    col = allColumns.find(c => c.id === editingColumnId);
  }
  if (!col) return;

  // 텍스트 필드 채우기
  document.getElementById('e-author').value = col.author || '';
  document.getElementById('e-title-ko').value = col.title_ko || '';
  document.getElementById('e-title-en').value = col.title_en || '';

  // Quill 본문 채우기
  if (quillKo) {
    if (col.body_ko) quillKo.clipboard.dangerouslyPasteHTML(col.body_ko);
    else quillKo.setContents([]);
  }
  if (quillEn) {
    if (col.body_en) quillEn.clipboard.dangerouslyPasteHTML(col.body_en);
    else quillEn.setContents([]);
  }

  // 썸네일 복원
  if (col.thumbnail) {
    thumbnailBase64 = col.thumbnail;
    document.getElementById('thumb-img').src = col.thumbnail;
    document.getElementById('thumb-preview').style.display = 'flex'; document.getElementById('thumb-preview').style.flexDirection = 'row';
    document.getElementById('thumb-label').style.display = 'none';
  }
}
function closeEditor() {
  document.getElementById('editor-page').classList.remove('open');
  document.body.style.overflow = '';
  editingColumnId = null;
  clearEditor();
}
function clearEditor() {
  document.getElementById('e-author').value = '';
  document.getElementById('e-title-ko').value = '';
  document.getElementById('e-title-en').value = '';
  if(quillKo) quillKo.setContents([]);
  if(quillEn) quillEn.setContents([]);
  clearThumb();
}
function switchEditorLang(l) {
  editorLang = l;
  document.getElementById('etab-ko').classList.toggle('on', l==='ko');
  document.getElementById('etab-en').classList.toggle('on', l==='en');
  document.getElementById('editor-ko').style.display = l==='ko' ? 'block' : 'none';
  document.getElementById('editor-en').style.display = l==='en' ? 'block' : 'none';
}

async function deleteColumn() {
  if (!confirm(lang==='ko' ? '이 칼럼을 삭제하시겠습니까?' : 'Delete this column?')) return;
  const btn = document.getElementById('btn-delete');
  btn.disabled = true;
  try {
    const { error } = await db.from('columns').delete().eq('id', editingColumnId);
    if (error) throw error;
    editingColumnId = null;
    // 스켈레톤 미리 표시
  const _homeList = document.getElementById('list-home');
  if (_homeList) _homeList.innerHTML = skeletonCards(2);
  const _colList = document.getElementById('list-all');
  if (_colList) _colList.innerHTML = skeletonCards(3);
  allColumns = await fetchColumns();
    renderHome(); renderAll();
    document.getElementById('editor-page').classList.remove('open');
    document.body.style.overflow = '';
    clearEditor();
    showToast(lang==='ko' ? '✓ 칼럼이 삭제됐습니다.' : '✓ Column deleted.');
  } catch(e) {
    showToast('삭제 오류: ' + e.message);
  } finally {
    btn.disabled = false;
  }
}

async function publishColumn() {
  const author = document.getElementById('e-author').value.trim();
  const titleKo = document.getElementById('e-title-ko').value.trim();
  const titleEn = document.getElementById('e-title-en').value.trim();
  const bodyKo = quillKo ? quillKo.root.innerHTML : '';
  const bodyEn = quillEn ? quillEn.root.innerHTML : '';

  if (!author || !titleKo) { showToast(T[lang].toastErr); return; }

  const btn = document.getElementById('btn-publish');
  btn.disabled = true;
  btn.textContent = T[lang].toastSaving;

  const payload = {
    title_ko: titleKo,
    title_en: titleEn || titleKo,
    body_ko: bodyKo,
    body_en: bodyEn || bodyKo,

    author,

    thumbnail: thumbnailBase64 || null
  };

  try {
    const isEdit = !!editingColumnId;
    let result;

    console.log('[SABR] payload:', JSON.stringify({
      isEdit,
      editingColumnId,
      title_ko: payload.title_ko,
      body_ko_length: payload.body_ko?.length,
      thumbnail_length: payload.thumbnail?.length || 0,
      thumbnail_exists: !!payload.thumbnail
    }));

    if (isEdit) {
      result = await db.from('columns').update(payload).eq('id', editingColumnId).select();
    } else {
      payload.category = 'general';
      result = await db.from('columns').insert(payload).select();
    }

    console.log('[SABR] result:', JSON.stringify({ error: result.error, dataLength: result.data?.length }));
    if (result.error) throw result.error;

    // 성공
    const successMsg = isEdit
      ? (lang === 'ko' ? '✓ 칼럼이 수정됐습니다!' : '✓ Column updated!')
      : T[lang].toastOk;

    editingColumnId = null;
    allColumns = await fetchColumns();
    // 저장 후 썸네일 검증
    const saved = allColumns[0];
    console.log('[SABR] after fetch - first col thumbnail length:', saved?.thumbnail?.length || 0);
    renderHome();
    renderAll();
    document.getElementById('editor-page').classList.remove('open');
    document.body.style.overflow = '';
    clearEditor();
    showToast(successMsg);

  } catch(e) {
    console.error('Save error:', e);
    showToast('저장 오류: ' + (e.message || JSON.stringify(e)));
  } finally {
    btn.disabled = false;
    btn.textContent = T[lang].btnPublish;
  }
}


// ── 이미지 정렬 툴바 ──
let _selectedImg = null;

function showImgToolbar(img) {
  _selectedImg = img;
  document.querySelectorAll('.ql-editor img').forEach(i => i.classList.remove('img-selected'));
  img.classList.add('img-selected');

  const toolbar = document.getElementById('ql-img-toolbar');
  const rect = img.getBoundingClientRect();
  toolbar.style.display = 'flex';
  toolbar.style.top = (rect.top + window.scrollY - 44) + 'px';
  toolbar.style.left = (rect.left + rect.width / 2) + 'px';

  // 현재 정렬 active 표시
  ['img-left','img-center','img-right','img-full'].forEach(cls => {
    const btn = document.getElementById('btn-' + cls);
    if (btn) btn.classList.toggle('active', img.classList.contains(cls));
  });
}

function hideImgToolbar() {
  document.getElementById('ql-img-toolbar').style.display = 'none';
  if (_selectedImg) { _selectedImg.classList.remove('img-selected'); _selectedImg = null; }
}

function imgAlign(cls) {
  if (!_selectedImg) return;
  _selectedImg.classList.remove('img-left','img-center','img-right','img-full');
  _selectedImg.classList.add(cls);
  showImgToolbar(_selectedImg); // active 상태 갱신
}

function imgDelete() {
  if (!_selectedImg) return;
  _selectedImg.closest('p,span,div')?.remove() || _selectedImg.remove();
  hideImgToolbar();
}

function attachImgClickHandlers(quillInstance) {
  quillInstance.root.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      showImgToolbar(e.target);
    } else {
      hideImgToolbar();
    }
  });
}

document.addEventListener('click', (e) => {
  const toolbar = document.getElementById('ql-img-toolbar');
  if (toolbar && !toolbar.contains(e.target) && e.target.tagName !== 'IMG') {
    hideImgToolbar();
  }
});

// ── AUTO RESIZE TEXTAREA ──
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// ── WORD COUNT ──
function updateWordCount(quillInstance, elId) {
  if (!quillInstance) return;
  const text = quillInstance.getText().trim();
  const count = text.replace(/\s+/g, '').length;
  const el = document.getElementById(elId);
  if (el) el.textContent = count.toLocaleString() + (elId.includes('ko') ? '자' : ' chars');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}


// 브라우저 뒤로가기/앞으로가기 지원
window.addEventListener('popstate', (e) => {
  const _ppath = window.location.pathname;
  const _p = new URLSearchParams(window.location.search);
  const colId = _ppath.startsWith('/col/') ? _ppath.replace('/col/', '') : _p.get('col');
  const pageId = _p.get('page');
  if (colId) {
    openArticle(colId);
  } else if (pageId) {
    showPage(pageId);
  } else {
    const artPage = document.getElementById('article-page');
    if (artPage && artPage.classList.contains('open')) {
      currentArticleId = null;
      artPage.classList.remove('open');
      artPage.style.display = 'none';
      if(window._artScrollHandler) {
        window.removeEventListener('scroll', window._artScrollHandler);
        window._artScrollHandler = null;
      }
      const mf = document.querySelector('body > footer');
      if(mf) mf.style.display = 'block';
      showPage(window._prevPage || 'home');
    }
  }
});


// ── 공유 ──
function shareCurrentArticle() {
  const btn = document.getElementById('art-share-btn');
  if (btn && btn.dataset.colId) shareArticle(btn.dataset.colId);
}

async function shareArticle(colId) {
  const col = allColumns.find(c => c.id === colId);
  if (!col) return;
  const title = lang==='ko' ? (col.title_ko||col.title_en) : (col.title_en||col.title_ko);
  const desc  = lang==='ko' ? (col.summary_ko||col.summary_en||'') : (col.summary_en||col.summary_ko||'');
  const url   = 'https://www.sabrkorea.com/col/' + colId;

  if (navigator.share) {
    // 모바일: 카카오톡·문자·메모 등 앱 선택창
    try {
      await navigator.share({ title, text: desc, url });
    } catch(e) { /* 취소 */ }
  } else {
    // PC: 링크 복사
    copyLink();
  }
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard?.writeText(url).then(() => {
    showToast(lang==='ko' ? '링크가 복사됐습니다!' : 'Link copied!');
  }).catch(() => {
    const el = document.createElement('input');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(lang==='ko' ? '링크가 복사됐습니다!' : 'Link copied!');
  });
}

// ── KEYBOARD ──
document.addEventListener('keydown', e => { if(e.key==='Escape') closeAll(); });

// ── FIX: PASTE SCROLL BUG ──
// When pasting inside editor-page, prevent window from jumping to top
document.addEventListener('paste', (e) => {
  const editorPage = document.getElementById('editor-page');
  if (editorPage && editorPage.classList.contains('open')) {
    const origScrollTo = window.scrollTo.bind(window);
    window.scrollTo = () => {};
    setTimeout(() => { window.scrollTo = origScrollTo; }, 300);
  }
}, true);

// ── INIT ──
(async () => {
  // URL에서 칼럼 ID 또는 페이지 감지
  const _path = window.location.pathname;
  const _params = new URLSearchParams(window.location.search);
  const _urlCol = _path.startsWith('/col/') ? _path.replace('/col/', '') : _params.get('col');
  const _urlPage = _params.get('page');

  allColumns = await fetchColumns();
  showPage(_urlPage || 'home');
  setLang('ko');

  if (_urlCol) openArticle(_urlCol);
})();