import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { fetchColumns } from '../lib/supabase'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('../components/Editor'), { ssr: false })

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
    nav: ['홈', '칼럼', '소개'],
    btnWrite: '칼럼 기고',
    heroEyebrow: 'SABR 한국 챕터 공식 웹사이트',
    heroH1: '미국야구학회\n대한민국 지부',
    heroDesc: 'SABR 한국 챕터는 즐겁게 야구를 탐구하고자 하는<br>연구자와 팬들의 커뮤니티입니다.',
    hstL: ['전세계 회원', '지역 챕터', '창설 연도'],
    shHome: '최신 칼럼', shMore: '전체 보기 →', shCol: '칼럼 아카이브',
    sbRecent: '최신 칼럼', sbAbout: '소개',
    sbAboutText: 'SABR 한국 챕터는 즐겁게 야구를 탐구하고자 하는 연구자와 팬들의 커뮤니티입니다.',
    btnJoin: '챕터 소개 보기 →',
    abtEyebrow: '소개', abtH: 'SABR이란?',
    abtP1: 'SABR(Society for American Baseball Research)은 1971년 8월 10일, 뉴욕 쿠퍼스타운의 야구 명예의 전당에서 밥 데이비즈(Bob Davids)와 15명의 야구 연구자들이 모여 창설한 단체입니다. 현재 전 세계 7,500명 이상의 회원을 보유하고 있으며, 애리조나주 피닉스에 본부를 두고 있습니다.',
    abtP2: '세이버메트릭스(Sabermetrics)라는 용어도 SABR의 이름에서 비롯된 것으로 잘 알려져 있습니다. 통계뿐 아니라 야구의 역사, 전기, 문화까지 폭넓게 다루며, 야구에 관심이 있는 누구나 참여할 수 있는 열린 커뮤니티입니다.',
    abtFeats: [
      { ico: '🔬', t: '위원회', d: '야구 분야별 전문 연구 조직. 세이버메트릭스, 야구 속 여성, 선수 전기, 니그로 리그 등 25개 이상 위원회가 활동 중' },
      { ico: '🗺️', t: '챕터', d: '지역 기반 커뮤니티 조직. 한국 포함해 전 세계에 70개 이상의 챕터 운영 중' },
      { ico: '🎙️', t: '컨퍼런스', d: '연 2회 컨퍼런스 개최. 겨울 Analytics Conference와 여름 Annual Convention.' },
      { ico: '🤝', t: '네트워킹', d: '입회 심사나 면접 없는 열린 커뮤니티. 야구를 좋아한다면 누구나 멤버로 참여 가능' },
    ],
    btnMemberJoin: 'SABR 회원 가입하기',
    editBtn: '수정', shareBtn: '공유',
    confirmDelete: '이 칼럼을 삭제하시겠습니까?',
    emptyT: '아직 칼럼이 없습니다', emptyD: '첫 번째 칼럼을 기고해주세요',
    toastCopied: '링크가 복사됐습니다!',
  },
  en: {
    nav: ['Home', 'Columns', 'About'],
    btnWrite: 'Submit Column',
    heroEyebrow: 'Official Website — SABR Korea Chapter',
    heroH1: 'Korea Chapter of the\nSociety for American\nBaseball Research',
    heroDesc: 'SABR Korea Chapter is a community of researchers and fans who explore baseball with curiosity and passion.',
    hstL: ['Global Members', 'Chapters', 'Founded'],
    shHome: 'Latest Columns', shMore: 'View All →', shCol: 'Column Archive',
    sbRecent: 'Latest Columns', sbAbout: 'About',
    sbAboutText: 'SABR Korea Chapter is a community of researchers and fans who explore baseball with curiosity and passion.',
    btnJoin: 'Learn More →',
    abtEyebrow: 'About', abtH: 'What is SABR?',
    abtP1: 'SABR (Society for American Baseball Research) was founded on August 10, 1971, in Cooperstown, New York, by Bob Davids and 15 fellow baseball researchers at the Baseball Hall of Fame. Today, SABR has over 7,500 members worldwide and is headquartered in Phoenix, Arizona.',
    abtP2: "The term sabermetrics is widely known to have originated from SABR's name. Beyond statistics, SABR covers baseball history, biography, and culture — open to anyone with a love for the game.",
    abtFeats: [
      { ico: '🔬', t: 'Committees', d: 'Topic-based research groups: sabermetrics, women in baseball, biography, Negro Leagues, and more — 25+ active committees' },
      { ico: '🗺️', t: 'Chapters', d: 'Geography-based communities. 70+ chapters worldwide, including Korea' },
      { ico: '🎙️', t: 'Conferences', d: 'Two conferences per year: Analytics Conference in winter and Annual Convention in summer.' },
      { ico: '🤝', t: 'Networking', d: 'No screening or interviews. An open community — anyone who loves baseball is welcome' },
    ],
    btnMemberJoin: 'Join SABR',
    editBtn: 'Edit', shareBtn: 'Share',
    confirmDelete: 'Delete this column?',
    emptyT: 'No columns yet', emptyD: 'Be the first to submit a column',
    toastCopied: 'Link copied!',
  }
}

const HST_V = ['17,000+', '60+', '1971']

function fmtDate(d) {
  if (!d) return ''
  return d.slice(0, 10).replace(/-/g, '.')
}

function ColCard({ col, lang, onClick }) {
  const title = lang === 'ko' ? (col.title_ko || col.title_en) : (col.title_en || col.title_ko)
  return (
    <div className="aitem" onClick={onClick}>
      <div className="aitem-thumb">
        {col.thumbnail
          ? <img className="thumb-real" src={col.thumbnail} alt="" />
          : <img className="logo-placeholder" src="/logo.png" alt="" />
        }
      </div>
      <div className="aitem-body">
        <div className="aitem-title">{title}</div>
        <div className="aitem-meta">
          <strong>{col.author}</strong>
          <span className="sep">·</span>
          <span>{fmtDate(col.created_at)}</span>
        </div>
      </div>
    </div>
  )
}

function FeatCard({ col, lang, onClick }) {
  const title = lang === 'ko' ? (col.title_ko || col.title_en) : (col.title_en || col.title_ko)
  return (
    <div className="aitem featured" onClick={onClick}>
      <div className="feat-img" style={col.thumbnail
        ? { backgroundImage: `url('${col.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {}}>
        {!col.thumbnail && <img src="/logo.png" alt="" />}
        <div className="feat-img-label">
          <div className="aitem-title">{title}</div>
          <div className="aitem-meta">
            <strong>{col.author}</strong>
            <span className="sep">·</span>
            <span>{fmtDate(col.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Toast({ msg }) {
  return <div className={`toast${msg ? ' show' : ''}`}>{msg}</div>
}

export default function Home({ initialColumns }) {
  const [lang, setLangState] = useState('ko')
  const [page, setPage] = useState('home')
  const [columns, setColumns] = useState(initialColumns)
  const [openColId, setOpenColId] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [colPage, setColPage] = useState(1)
  const COL_PER_PAGE = 10
  const [progress, setProgress] = useState(0)
  const [toast, setToast] = useState('')
  const prevPageRef = useRef('home')
  const t = T[lang]

  // 언어 복원
  useEffect(() => {
    const saved = localStorage.getItem('sabr_lang')
    if (saved) setLangState(saved)
  }, [])

  // URL 라우팅
  useEffect(() => {
    const path = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const colId = path.startsWith('/col/') ? path.replace('/col/', '') : params.get('col')
    const pg = params.get('page')
    if (colId) setOpenColId(colId)
    else if (pg) setPage(pg)

    const onPop = () => {
      const p2 = window.location.pathname
      const params2 = new URLSearchParams(window.location.search)
      const cId = p2.startsWith('/col/') ? p2.replace('/col/', '') : params2.get('col')
      const pg2 = params2.get('page')
      if (cId) { setOpenColId(cId) }
      else { setOpenColId(null); setPage(pg2 || prevPageRef.current || 'home') }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // 스크롤 진행률 (아티클 뷰일 때)
  useEffect(() => {
    if (!openColId) return
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(100, scrollTop / docHeight * 100) : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [openColId])

  // 토스트 자동 제거
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 3000)
    return () => clearTimeout(timer)
  }, [toast])

  const setLang = (l) => {
    setLangState(l)
    localStorage.setItem('sabr_lang', l)
  }

  const showPage = (id) => {
    prevPageRef.current = id
    setPage(id)
    setOpenColId(null)
    if (id === 'columns') setColPage(1)
    const urls = { home: '/', columns: '?page=columns', about: '?page=about' }
    history.pushState({ page: id }, '', urls[id] || '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openArticle = (id) => {
    setOpenColId(id)
    setProgress(0)
    history.pushState({ colId: id }, '', `/col/${id}`)
    window.scrollTo(0, 0)
  }

  const closeArticle = () => {
    setOpenColId(null)
    history.pushState({}, '', page === 'columns' ? '?page=columns' : '/')
    window.scrollTo(0, 0)
  }

  const handleSave = async () => {
    try {
      const data = await fetchColumns()
      setColumns(data || [])
    } catch (e) { console.error(e) }
    setShowEditor(false)
    setEditTarget(null)
  }

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return
    try {
      await fetch(`/api/columns/${id}`, { method: 'DELETE' })
      setColumns(prev => prev.filter(c => c.id !== id))
      if (String(openColId) === String(id)) closeArticle()
    } catch (e) { console.error(e) }
  }

  const shareArticle = async (col) => {
    const title = lang === 'ko' ? (col.title_ko || col.title_en) : (col.title_en || col.title_ko)
    const url = `https://www.sabrkorea.com/col/${col.id}`
    if (navigator.share) {
      try { await navigator.share({ title, url }) } catch (e) { /* 취소 */ }
    } else {
      navigator.clipboard?.writeText(url).then(() => setToast(t.toastCopied)).catch(() => setToast(t.toastCopied))
    }
  }

  const openCol = columns.find(c => String(c.id) === String(openColId))

  // 칼럼 ID 있는데 아직 로드 안 된 경우
  if (openColId && !openCol) return null

  const NavHeader = () => (
    <header>
      <div className="hdr-main">
        <div className="logo" onClick={() => showPage('home')} style={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="SABR Korea" />
        </div>
        <nav>
          {t.nav.map((label, i) => {
            const pages = ['home', 'columns', 'about']
            return (
              <button key={i}
                className={!openColId && page === pages[i] ? 'act' : ''}
                onClick={() => showPage(pages[i])}>
                {label}
              </button>
            )
          })}
        </nav>
        <div className="hdr-right">
          <button className="btn-write" onClick={() => { setEditTarget(null); setShowEditor(true) }}>
            + {t.btnWrite}
          </button>
          <div className="lang-sw">
            <button className={`lbtn${lang === 'ko' ? ' on' : ''}`} onClick={() => setLang('ko')}>KO</button>
            <button className={`lbtn${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </div>
    </header>
  )

  // ── 아티클 뷰 ──
  if (openColId && openCol) {
    const title = lang === 'ko' ? (openCol.title_ko || openCol.title_en) : (openCol.title_en || openCol.title_ko)
    const body = lang === 'ko' ? (openCol.body_ko || openCol.body_en || '') : (openCol.body_en || openCol.body_ko || '')

    return (
      <>
        <Head>
          <title>{title} — SABR Korea</title>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={openCol.summary_ko || openCol.summary_en || ''} />
          <meta property="og:image" content={`https://www.sabrkorea.com/api/thumb?col=${openColId}`} />
          <meta property="og:url" content={`https://www.sabrkorea.com/col/${openColId}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:image" content={`https://www.sabrkorea.com/api/thumb?col=${openColId}`} />
        </Head>
        <NavHeader />
        <div className="article-page open">
          <div className="art-prog">
            <div className="art-prog-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="art-page-inner">
            {/* 상단 버튼 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <button onClick={closeArticle}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--t2)', padding: '4px 8px 4px 0', lineHeight: 1 }}>
                ←
              </button>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  className="art-edit-inline"
                  onClick={() => { closeArticle(); setEditTarget(openCol); setShowEditor(true) }}
                  style={{ background: 'none', border: '1px solid var(--border2)', color: 'var(--t2)', fontSize: '11px', padding: '4px 12px', borderRadius: '99px', cursor: 'pointer', fontFamily: 'var(--sans)' }}>
                  {t.editBtn}
                </button>
                <button
                  onClick={() => shareArticle(openCol)}
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: '1px solid var(--border2)', color: 'var(--t2)', fontSize: '11px', padding: '4px 12px', borderRadius: '99px', cursor: 'pointer', fontFamily: 'var(--sans)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  {t.shareBtn}
                </button>
              </div>
            </div>
            <h1 className="art-title">{title}</h1>
            <div className="art-meta">
              <strong>{openCol.author}</strong>
              <span>·</span>
              <span>{fmtDate(openCol.created_at)}</span>
            </div>
            <div className="art-body" dangerouslySetInnerHTML={{ __html: body }} />
          </div>
          <footer>
            <a href="https://sabr.org" target="_blank" rel="noreferrer">
              © {new Date().getFullYear()} SABR Korea Chapter &nbsp;·&nbsp; <span style={{ textDecoration: 'underline' }}>sabr.org ↗</span>
            </a>
          </footer>
        </div>
        {showEditor && (
          <Editor column={editTarget} onSave={handleSave} onClose={() => { setShowEditor(false); setEditTarget(null) }} />
        )}
        <Toast msg={toast} />
      </>
    )
  }

  // ── 메인 뷰 ──
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
      </Head>

      <NavHeader />

      {/* ── 홈 ── */}
      {page === 'home' && (
        <>
          <div className="hero-banner">
            <div className="hero-inner">
              <div>
                <p className="hero-eyebrow">{t.heroEyebrow}</p>
                <h1 className="hero-h1">
                  {t.heroH1.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </h1>
                <p className="hero-desc" dangerouslySetInnerHTML={{ __html: t.heroDesc }} />
                <div className="hero-stats">
                  {HST_V.map((val, i) => (
                    <div key={i} className="hst">
                      <div className="hst-n">{val}</div>
                      <div className="hst-l">{t.hstL[i]}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hero-img-wrap">
                <img className="hero-logo-big" src="/logo.png" alt="SABR" />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="layout">
              <main>
                <div className="sh">
                  <span className="sh-title">{t.shHome}</span>
                  <button className="sh-more" onClick={() => showPage('columns')}>{t.shMore}</button>
                </div>
                {columns.length === 0 ? (
                  <div className="empty">
                    <div className="empty-ico">⚾</div>
                    <div className="empty-t">{t.emptyT}</div>
                    <div className="empty-d">{t.emptyD}</div>
                  </div>
                ) : (
                  columns.slice(0, 7).map((col, i) => (
                    i === 0
                      ? <FeatCard key={col.id} col={col} lang={lang} onClick={() => openArticle(col.id)} />
                      : <ColCard key={col.id} col={col} lang={lang} onClick={() => openArticle(col.id)} />
                  ))
                )}
              </main>
              <aside className="sidebar">
                <div className="sb-card">
                  <div className="sb-title">{t.sbRecent}</div>
                  {columns.slice(0, 5).map(col => {
                    const title = lang === 'ko' ? (col.title_ko || col.title_en) : (col.title_en || col.title_ko)
                    return (
                      <div key={col.id} className="sb-item" onClick={() => openArticle(col.id)}>
                        <div className="sb-item-title">{title}</div>
                        <div className="sb-item-meta">{col.author} · {fmtDate(col.created_at)}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="sb-card">
                  <div style={{ textAlign: 'center' }}>
                    <img className="sb-logo" src="/logo.png" alt="SABR" />
                  </div>
                  <div className="sb-title">{t.sbAbout}</div>
                  <div className="sb-about">{t.sbAboutText}</div>
                  <button className="btn-join" onClick={() => showPage('about')}>{t.btnJoin}</button>
                </div>
              </aside>
            </div>
          </div>
        </>
      )}

      {/* ── 칼럼 ── */}
      {page === 'columns' && (
        <div className="container">
          <div className="layout">
            <main style={{ paddingTop: '2rem' }}>
              <div className="sh">
                <span className="sh-title">{t.shCol}</span>
              </div>
              {columns.length === 0 ? (
                <div className="empty">
                  <div className="empty-ico">⚾</div>
                  <div className="empty-t">{t.emptyT}</div>
                  <div className="empty-d">{t.emptyD}</div>
                </div>
              ) : (
                <>
                  {columns.slice((colPage - 1) * COL_PER_PAGE, colPage * COL_PER_PAGE).map(col => (
                    <ColCard key={col.id} col={col} lang={lang} onClick={() => openArticle(col.id)} />
                  ))}

                  {/* 페이지네이션 */}
                  {columns.length > COL_PER_PAGE && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '2rem 0 1rem' }}>
                      <button
                        onClick={() => { setColPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        disabled={colPage === 1}
                        style={{ background: 'none', border: '1px solid var(--border2)', color: 'var(--t2)', fontSize: '13px', padding: '7px 14px', borderRadius: '6px', cursor: colPage === 1 ? 'not-allowed' : 'pointer', opacity: colPage === 1 ? 0.4 : 1, fontFamily: 'var(--sans)' }}>
                        ←
                      </button>
                      {Array.from({ length: Math.ceil(columns.length / COL_PER_PAGE) }, (_, i) => i + 1).map(n => (
                        <button key={n}
                          onClick={() => { setColPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                          style={{ background: colPage === n ? 'var(--navy)' : 'none', color: colPage === n ? '#fff' : 'var(--t2)', border: '1px solid', borderColor: colPage === n ? 'var(--navy)' : 'var(--border2)', fontSize: '13px', padding: '7px 13px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'var(--sans)', minWidth: '36px' }}>
                          {n}
                        </button>
                      ))}
                      <button
                        onClick={() => { setColPage(p => Math.min(Math.ceil(columns.length / COL_PER_PAGE), p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        disabled={colPage === Math.ceil(columns.length / COL_PER_PAGE)}
                        style={{ background: 'none', border: '1px solid var(--border2)', color: 'var(--t2)', fontSize: '13px', padding: '7px 14px', borderRadius: '6px', cursor: colPage === Math.ceil(columns.length / COL_PER_PAGE) ? 'not-allowed' : 'pointer', opacity: colPage === Math.ceil(columns.length / COL_PER_PAGE) ? 0.4 : 1, fontFamily: 'var(--sans)' }}>
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
            <aside className="sidebar" />
          </div>
        </div>
      )}

      {/* ── 칼럼 탭 FAB 작성 버튼 ── */}
      {page === 'columns' && !openColId && (
        <button
          onClick={() => { setEditTarget(null); setShowEditor(true) }}
          id="fab-write"
          style={{ display: 'flex', position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200, background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', width: '56px', height: '56px', borderRadius: '50%', fontSize: '1.5rem', boxShadow: '0 4px 20px rgba(192,35,27,.4)', transition: 'transform .2s,box-shadow .2s', alignItems: 'center', justifyContent: 'center' }}
          title={t.btnWrite}>
          ✏️
        </button>
      )}

      {/* ── 소개 ── */}
      {page === 'about' && (
        <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '860px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '1.2rem' }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--red)', display: 'inline-block' }} />
            <span>{t.abtEyebrow}</span>
          </div>
          <h2 className="abt-h" style={{ marginBottom: '1.2rem' }}>{t.abtH}</h2>
          <p className="abt-lead">{t.abtP1}</p>
          <p className="abt-lead">{t.abtP2}</p>
          <a href="https://sabr.org/community/" target="_blank" rel="noreferrer" style={{ display: 'inline-block', margin: '1.5rem 0 2.5rem' }}>
            <button className="btn-submit" style={{ background: 'var(--red)', width: 'auto', padding: '12px 32px' }}>{t.btnMemberJoin}</button>
          </a>
          <div className="abt-feats">
            {t.abtFeats.map((f, i) => (
              <div key={i} className="af">
                <div className="af-ico">{f.ico}</div>
                <div className="af-t">{f.t}</div>
                <div className="af-d">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer>
        <a href="https://sabr.org" target="_blank" rel="noreferrer">
          © {new Date().getFullYear()} SABR Korea Chapter &nbsp;·&nbsp; <span style={{ textDecoration: 'underline' }}>sabr.org ↗</span>
        </a>
      </footer>

      {showEditor && (
        <Editor column={editTarget} onSave={handleSave} onClose={() => { setShowEditor(false); setEditTarget(null) }} />
      )}
      <Toast msg={toast} />
    </>
  )
}
