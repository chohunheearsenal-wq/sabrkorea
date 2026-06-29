import Head from 'next/head'
import { useState, useEffect } from 'react'
import { fetchColumns } from '../lib/supabase'

export async function getServerSideProps() {
  try {
    const columns = await fetchColumns()
    return { props: { initialColumns: columns || [] } }
  } catch (e) {
    return { props: { initialColumns: [] } }
  }
}

const T = {
  ko: {
    nav: ['홈','칼럼','소개'],
    heroEyebrow: 'SABR 한국 챕터 공식 웹사이트',
    heroH1: '미국야구학회\n대한민국 지부',
    heroDesc: 'SABR 한국 챕터는 즐겁게 야구를 탐구하고자 하는 연구자와 팬들의 커뮤니티입니다.',
    hstL: ['전세계 회원','지역 챕터','창설 연도'],
    latestCols: '최신 칼럼', viewAll: '전체 보기 →',
    allCols: '칼럼 아카이브',
    recentCols: '최신 칼럼',
    aboutTitle: '소개', aboutText: 'SABR 한국 챕터 소개', aboutBtn: '챕터 소개 보기 →',
    readTime: '분 읽기',
  },
  en: {
    nav: ['Home','Columns','About'],
    heroEyebrow: 'Official Website — SABR Korea Chapter',
    heroH1: 'Korea Chapter of the\nSociety for American\nBaseball Research',
    heroDesc: 'SABR Korea Chapter is a community of researchers and fans who explore baseball with curiosity and passion.',
    hstL: ['Members Worldwide','Local Chapters','Founded'],
    latestCols: 'Latest Columns', viewAll: 'View All →',
    allCols: 'Column Archive',
    recentCols: 'Latest Columns',
    aboutTitle: 'About', aboutText: 'About SABR Korea Chapter', aboutBtn: 'Learn More →',
    readTime: ' min read',
  }
}

function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  return `${dt.getFullYear()}.${String(dt.getMonth()+1).padStart(2,'0')}.${String(dt.getDate()).padStart(2,'0')}`
}

function ColCard({ col, onClick }) {
  return (
    <div className="aitem" onClick={onClick} style={{cursor:'pointer'}}>
      <div className="aitem-thumb">
        {col.thumbnail
          ? <img src={col.thumbnail} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
          : <img src="/logo.png" alt="" className="logo-placeholder" />
        }
      </div>
      <div className="aitem-body">
        <div className="aitem-title">{col.title_ko || col.title_en}</div>
        <div className="aitem-meta">
          <strong>{col.author}</strong>
          <span className="sep">·</span>
          <span>{fmtDate(col.created_at)}</span>
        </div>
      </div>
    </div>
  )
}

function FeatCard({ col, onClick }) {
  return (
    <div className="aitem featured" onClick={onClick} style={{cursor:'pointer'}}>
      <div className="feat-img" style={col.thumbnail ? {backgroundImage:`url('${col.thumbnail}')`,backgroundSize:'cover',backgroundPosition:'center'} : {}}>
        {!col.thumbnail && <img src="/logo.png" alt="" />}
        <div className="feat-img-label">
          <div className="aitem-title" style={{color:'#fff'}}>{col.title_ko || col.title_en}</div>
          <div className="aitem-meta" style={{color:'rgba(255,255,255,.7)'}}>
            <strong style={{color:'rgba(255,255,255,.9)'}}>{col.author}</strong>
            <span className="sep">·</span>
            <span>{fmtDate(col.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home({ initialColumns, _openColId = null }) {
  const [lang, setLangState] = useState('ko')
  const [page, setPage] = useState('home')
  const [columns, setColumns] = useState(initialColumns)
  const [openColId, setOpenColId] = useState(_openColId)

  const t = T[lang]

  // URL 기반 라우팅
  useEffect(() => {
    const path = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const colId = path.startsWith('/col/') ? path.replace('/col/','') : params.get('col')
    const pg = params.get('page')
    if (colId) setOpenColId(colId)
    if (pg) setPage(pg)

    const onPop = () => {
      const p2 = window.location.pathname
      const params2 = new URLSearchParams(window.location.search)
      const cId = p2.startsWith('/col/') ? p2.replace('/col/','') : params2.get('col')
      if (cId) setOpenColId(cId)
      else { setOpenColId(null); setPage(params2.get('page') || 'home') }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const showPage = (id) => {
    setPage(id)
    setOpenColId(null)
    const urls = { home: window.location.pathname, columns: '?page=columns', about: '?page=about' }
    history.pushState({page:id}, '', urls[id] || '/')
    window.scrollTo({top:0,behavior:'smooth'})
  }

  const openArticle = (id) => {
    setOpenColId(id)
    history.pushState({colId:id}, '', `/col/${id}`)
    window.scrollTo(0,0)
  }

  const closeArticle = () => {
    setOpenColId(null)
    history.pushState({}, '', '/')
    window.scrollTo(0,0)
  }

  const latest = columns.slice(0,1)
  const rest = columns.slice(1,5)
  const openCol = columns.find(c => c.id === openColId)

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SABR Korea — 미국야구학회</title>
        <meta property="og:title" content="SABR Korea — 미국야구학회" />
        <meta property="og:description" content="SABR 한국 챕터는 즐겁게 야구를 탐구하고자 하는 연구자와 팬들의 커뮤니티입니다." />
        <meta property="og:image" content="https://www.sabrkorea.com/logo.png" />
        <meta property="og:url" content="https://www.sabrkorea.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <header>
        <div className="hdr-main">
          <div className="logo" onClick={() => showPage('home')} style={{cursor:'pointer'}}>
            <img src="/logo.png" alt="SABR Korea" />
          </div>
          <nav>
            {t.nav.map((n,i) => {
              const ids = ['home','columns','about']
              return (
                <button key={i}
                  className={page === ids[i] && !openColId ? 'act' : ''}
                  onClick={() => showPage(ids[i])}
                >{n}</button>
              )
            })}
          </nav>
          <div className="hdr-right">
            <div className="lang-sw">
              <button className={`lbtn${lang==='ko'?' on':''}`} onClick={() => setLangState('ko')}>KO</button>
              <button className={`lbtn${lang==='en'?' on':''}`} onClick={() => setLangState('en')}>EN</button>
            </div>
          </div>
        </div>
      </header>

      {/* 아티클 전체화면 */}
      {openColId && (
        <ArticleView colId={openColId} columns={columns} lang={lang} onClose={closeArticle} onDelete={async () => {
          if (!confirm(lang==='ko'?'이 칼럼을 삭제하시겠습니까?':'Delete this column?')) return
          const pw = prompt(lang==='ko'?'비밀번호를 입력하세요':'Enter password')
          if (pw !== 'sabrkorea123!') { alert(lang==='ko'?'비밀번호가 올바르지 않습니다.':'Incorrect password.'); return }
          const { deleteColumn } = await import('../lib/supabase')
          const { error } = await deleteColumn(openColId)
          if (error) { alert('삭제 오류'); return }
          closeArticle()
          const { fetchColumns: fc } = await import('../lib/supabase')
          const cols = await fc()
          setColumns(cols)
        }} />
      )}

      {/* 일반 페이지 */}
      {!openColId && (
        <main id="main-wrap">
          {/* 홈 */}
          {page === 'home' && (
            <div id="pg-home">
              <div className="hero-banner">
                <div className="hero-inner">
                  <div className="hero-text">
                    <div className="hero-eyebrow">{t.heroEyebrow}</div>
                    <h1 className="hero-h1">{t.heroH1.split('\n').map((l,i) => <span key={i}>{l}<br/></span>)}</h1>
                    <p className="hero-desc" dangerouslySetInnerHTML={{__html: t.heroDesc}} />
                    <div className="hero-stats">
                      <div className="hst"><span className="hst-n">7,500+</span><span className="hst-l">{t.hstL[0]}</span></div>
                      <div className="hst"><span className="hst-n">70+</span><span className="hst-l">{t.hstL[1]}</span></div>
                      <div className="hst"><span className="hst-n">1971</span><span className="hst-l">{t.hstL[2]}</span></div>
                    </div>
                  </div>
                  <div className="hero-logo"><img src="/logo.png" alt="SABR" /></div>
                </div>
              </div>
              <div className="container home-layout">
                <div className="home-main">
                  <div className="sh">
                    <div className="sh-title">{t.latestCols}</div>
                    <button className="sh-more" onClick={() => showPage('columns')}>{t.viewAll}</button>
                  </div>
                  {columns.length === 0 && <div className="empty"><div className="empty-ico">⚾</div></div>}
                  {latest.map(col => <FeatCard key={col.id} col={col} onClick={() => openArticle(col.id)} />)}
                  {rest.map(col => <ColCard key={col.id} col={col} onClick={() => openArticle(col.id)} />)}
                </div>
                <aside className="home-aside">
                  <div className="sb-card">
                    <div className="sb-title">{t.recentCols}</div>
                    {columns.slice(0,5).map(c => (
                      <div key={c.id} className="sb-item" onClick={() => openArticle(c.id)} style={{cursor:'pointer'}}>
                        <div className="sb-item-title">{lang==='ko'?(c.title_ko||c.title_en):(c.title_en||c.title_ko)}</div>
                        <div className="sb-item-meta">{c.author} · {fmtDate(c.created_at)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="sb-card sb-about">
                    <img src="/logo.png" alt="SABR" style={{width:'56px',height:'56px',objectFit:'contain',marginBottom:'12px'}} />
                    <div className="sb-title">{t.aboutTitle}</div>
                    <p className="sb-about-text">{t.aboutText}</p>
                    <button className="btn-about" onClick={() => showPage('about')}>{t.aboutBtn}</button>
                  </div>
                </aside>
              </div>
            </div>
          )}

          {/* 칼럼 아카이브 */}
          {page === 'columns' && (
            <div id="pg-columns">
              <div className="container" style={{paddingTop:'2rem',paddingBottom:'4rem'}}>
                <div className="sh" style={{marginBottom:'1.5rem'}}>
                  <div className="sh-title">{t.allCols}</div>
                </div>
                {columns.length === 0 && <div className="empty"><div className="empty-ico">⚾</div></div>}
                {columns.map(col => <ColCard key={col.id} col={col} onClick={() => openArticle(col.id)} />)}
              </div>
            </div>
          )}

          {/* 소개 */}
          {page === 'about' && (
            <div id="pg-about">
              <div className="container abt-wrap">
                <div className="abt-hero">
                  <h2 className="abt-h">{lang==='ko'?'SABR Korea 소개':'About SABR Korea'}</h2>
                  <p className="abt-lead">{lang==='ko'?'SABR(Society for American Baseball Research)은 1971년 설립된 세계 최대 야구 연구 단체입니다. SABR Korea는 한국 야구를 사랑하는 연구자와 팬들의 커뮤니티입니다.':'SABR (Society for American Baseball Research) is the world\'s premier baseball research organization, founded in 1971. SABR Korea is a community for researchers and fans who love Korean baseball.'}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {!openColId && (
        <footer id="main-footer">
          <a href="https://sabr.org" target="_blank" rel="noopener noreferrer">© 2026 SABR Korea Chapter &nbsp;·&nbsp; <span style={{textDecoration:'underline'}}>sabr.org ↗</span></a>
        </footer>
      )}

      {/* 글쓰기 버튼 (칼럼 탭에서만) */}
      {page === 'columns' && !openColId && (
        <EditorButton lang={lang} onRefresh={async () => {
          const { fetchColumns: fc } = await import('../lib/supabase')
          const cols = await fc()
          setColumns(cols)
        }} />
      )}

      <div className="toast" id="toast"></div>
    </>
  )
}

// 아티클 읽기 컴포넌트
function ArticleView({ colId, columns, lang, onClose, onDelete }) {
  const [col, setCol] = useState(columns.find(c => c.id === colId) || null)
  const [body, setBody] = useState('')

  useEffect(() => {
    import('../lib/supabase').then(({ fetchColumn }) => {
      fetchColumn(colId).then(data => {
        if (data) {
          setCol(data)
          setBody(lang === 'ko' ? (data.body_ko || data.body_en || '') : (data.body_en || data.body_ko || ''))
        }
      })
    })
  }, [colId])

  useEffect(() => {
    if (col) {
      setBody(lang === 'ko' ? (col.body_ko || col.body_en || '') : (col.body_en || col.body_ko || ''))
    }
  }, [lang, col])

  const title = col ? (lang==='ko' ? (col.title_ko||col.title_en) : (col.title_en||col.title_ko)) : ''

  const shareArticle = async () => {
    const url = `https://www.sabrkorea.com/col/${colId}`
    if (navigator.share) {
      try { await navigator.share({ title, url }) } catch(e) {}
    } else {
      navigator.clipboard?.writeText(url).then(() => {
        const t = document.getElementById('toast')
        if (t) { t.textContent = '링크가 복사됐습니다!'; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3000) }
      })
    }
  }

  return (
    <div className="article-page open" style={{display:'block'}}>
      <div className="art-prog"><div className="art-prog-bar" id="prog-bar" /></div>
      <div className="art-page-inner" id="art-body">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.2rem',color:'var(--t2)',padding:'4px 8px 4px 0',lineHeight:1}}>←</button>
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <button onClick={shareArticle} style={{display:'flex',alignItems:'center',gap:'5px',background:'none',border:'1px solid var(--border2)',color:'var(--t2)',fontSize:'11px',padding:'4px 12px',borderRadius:'99px',cursor:'pointer'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              {lang==='ko'?'공유':'Share'}
            </button>
            <button onClick={onDelete} style={{background:'none',border:'1px solid #e53e3e',color:'#e53e3e',fontSize:'11px',padding:'4px 12px',borderRadius:'99px',cursor:'pointer'}}>
              {lang==='ko'?'삭제':'Delete'}
            </button>
          </div>
        </div>
        {col ? (
          <>
            <h1 className="art-title">{title}</h1>
            <div className="art-meta">
              <strong>{col.author}</strong>
              <span>·</span>
              <span>{col.created_at ? new Date(col.created_at).toLocaleDateString(lang==='ko'?'ko-KR':'en-US') : ''}</span>
            </div>
            <div className="art-body" dangerouslySetInnerHTML={{__html: body}} />
          </>
        ) : (
          <div style={{textAlign:'center',padding:'4rem',color:'var(--t3)'}}>⚾ 불러오는 중...</div>
        )}
      </div>
      <footer>
        <a href="https://sabr.org" target="_blank" rel="noopener noreferrer">© 2026 SABR Korea Chapter &nbsp;·&nbsp; <span style={{textDecoration:'underline'}}>sabr.org ↗</span></a>
      </footer>
    </div>
  )
}

// 에디터 버튼 (동적 로딩)
function EditorButton({ lang, onRefresh }) {
  const [showEditor, setShowEditor] = useState(false)
  const [EditorComp, setEditorComp] = useState(null)

  const openEditor = async () => {
    if (!EditorComp) {
      const mod = await import('../components/Editor')
      setEditorComp(() => mod.default)
    }
    setShowEditor(true)
  }

  return (
    <>
      <button
        onClick={openEditor}
        style={{position:'fixed',bottom:'2rem',right:'2rem',width:'52px',height:'52px',borderRadius:'50%',background:'var(--red)',border:'none',color:'#fff',fontSize:'1.3rem',cursor:'pointer',boxShadow:'0 4px 16px rgba(0,0,0,.2)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center'}}
      >✏️</button>
      {showEditor && EditorComp && (
        <EditorComp lang={lang} onClose={() => setShowEditor(false)} onSave={async () => { setShowEditor(false); await onRefresh() }} />
      )}
    </>
  )
}
