import Head from 'next/head'
import { useState, useEffect } from 'react'
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
    heroEyebrow: 'SABR 한국 챕터 공식 웹사이트',
    heroH1: '미국야구학회\n대한민국 지부',
    heroDesc: 'SABR 한국 챕터는 즐겁게 야구를 탐구하고자 하는 연구자와 팬들의 커뮤니티입니다.',
    hstL: ['전세계 회원', '지역 챕터', '창설 연도'],
    hstV: ['17,000+', '60+', '1971'],
    latestCols: '최신 칼럼',
    viewAll: '전체 보기 →',
    allCols: '칼럼 아카이브',
    writeCol: '칼럼 작성',
    backCols: '← 칼럼 목록',
    editBtn: '수정',
    deleteBtn: '삭제',
    confirmDelete: '이 칼럼을 삭제하시겠습니까?',
    noColumns: '아직 칼럼이 없습니다.',
    sbAboutTitle: '챕터 소개',
    sbAboutText: 'SABR 한국 챕터는 국내 야구 연구자와 팬들이 모여 야구를 깊이 탐구하는 커뮤니티입니다.',
    joinBtn: 'SABR 가입하기',
    sbRecentTitle: '최신 칼럼',
    abtEyebrow: 'SABR Korea Chapter',
    abtH: '미국야구학회 한국 지부',
    abtP1: 'SABR(미국야구학회)은 1971년 설립된 세계 최대 야구 연구 단체입니다. 한국 챕터는 국내 야구 연구자와 팬들이 모여 야구를 깊이 있게 탐구하는 커뮤니티입니다.',
    abtP2: '세이버메트릭스, 역사 연구, 바이오그래피, 비즈니스 분석 등 다양한 분야에서 활동하며, 정기 모임과 세미나를 통해 야구 지식을 나눕니다.',
    abtFeats: [
      ['⚾ 세이버메트릭스', '데이터 기반 야구 분석'],
      ['📜 역사 연구', 'KBO·NPB 역사 탐구'],
      ['📊 통계 분석', '경기 데이터 심층 연구'],
      ['🤝 커뮤니티', '연구자·팬 네트워크'],
    ],
  },
  en: {
    nav: ['Home', 'Columns', 'About'],
    heroEyebrow: 'Official Website — SABR Korea Chapter',
    heroH1: 'Korea Chapter of the\nSociety for American\nBaseball Research',
    heroDesc: 'SABR Korea Chapter is a community of researchers and fans who explore baseball with curiosity and passion.',
    hstL: ['Members Worldwide', 'Local Chapters', 'Founded'],
    hstV: ['17,000+', '60+', '1971'],
    latestCols: 'Latest Columns',
    viewAll: 'View All →',
    allCols: 'Column Archive',
    writeCol: 'Write Column',
    backCols: '← Columns',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    confirmDelete: 'Delete this column?',
    noColumns: 'No columns yet.',
    sbAboutTitle: 'About',
    sbAboutText: 'SABR Korea Chapter is a community of researchers and fans who explore baseball in depth.',
    joinBtn: 'Join SABR',
    sbRecentTitle: 'Recent Columns',
    abtEyebrow: 'SABR Korea Chapter',
    abtH: 'Korea Chapter of SABR',
    abtP1: 'SABR (Society for American Baseball Research) was founded in 1971 and is the world\'s largest baseball research organization.',
    abtP2: 'We are active in sabermetrics, historical research, biography, and business analysis, sharing baseball knowledge through regular meetings and seminars.',
    abtFeats: [
      ['⚾ Sabermetrics', 'Data-driven baseball analysis'],
      ['📜 History', 'KBO & NPB historical research'],
      ['📊 Statistics', 'Deep game data analysis'],
      ['🤝 Community', 'Researcher & fan network'],
    ],
  }
}

function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`
}

function ColCard({ col, onClick }) {
  return (
    <div className="aitem" onClick={onClick}>
      <div className="aitem-thumb">
        {col.thumbnail
          ? <img src={col.thumbnail} alt="" className="thumb-real" />
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
    <div className="aitem featured" onClick={onClick}>
      <div className="feat-img" style={col.thumbnail
        ? { backgroundImage: `url('${col.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {}}>
        {!col.thumbnail && <img src="/logo.png" alt="" />}
        <div className="feat-img-label">
          <div className="aitem-title">{col.title_ko || col.title_en}</div>
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

export default function Home({ initialColumns, _openColId = null }) {
  const [lang, setLangState] = useState('ko')
  const [page, setPage] = useState('home')
  const [columns, setColumns] = useState(initialColumns)
  const [openColId, setOpenColId] = useState(_openColId)
  const [showEditor, setShowEditor] = useState(false)
  const [editTarget, setEditTarget] = useState(null)

  const t = T[lang]

  useEffect(() => {
    const saved = localStorage.getItem('sabr_lang')
    if (saved) setLangState(saved)
  }, [])

  useEffect(() => {
    const path = window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const colId = path.startsWith('/col/') ? path.replace('/col/', '') : params.get('col')
    const pg = params.get('page')
    if (colId) setOpenColId(colId)
    if (pg) setPage(pg)

    const onPop = () => {
      const p2 = window.location.pathname
      const params2 = new URLSearchParams(window.location.search)
      const cId = p2.startsWith('/col/') ? p2.replace('/col/', '') : params2.get('col')
      if (cId) setOpenColId(cId)
      else { setOpenColId(null); setPage(params2.get('page') || 'home') }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const setLang = (l) => {
    setLangState(l)
    localStorage.setItem('sabr_lang', l)
  }

  const showPage = (id) => {
    setPage(id)
    setOpenColId(null)
    const urls = { home: '/', columns: '?page=columns', about: '?page=about' }
    history.pushState({ page: id }, '', urls[id] || '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openArticle = (id) => {
    setOpenColId(id)
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
    } catch (e) {
      console.error(e)
    }
    setShowEditor(false)
    setEditTarget(null)
  }

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) return
    try {
      await fetch(`/api/columns/${id}`, { method: 'DELETE' })
      setColumns(prev => prev.filter(c => c.id !== id))
      if (String(openColId) === String(id)) closeArticle()
    } catch (e) {
      console.error(e)
    }
  }

  const latest = columns.slice(0, 1)
  const rest = columns.slice(1, 5)
  const openCol = columns.find(c => String(c.id) === String(openColId))

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
                className={(!openColId && page === pages[i]) ? 'act' : ''}
                onClick={() => showPage(pages[i])}>
                {label}
              </button>
            )
          })}
        </nav>
        <div className="hdr-right">
          <button className="btn-write" onClick={() => { setEditTarget(null); setShowEditor(true) }}>
            + {t.writeCol}
          </button>
          <div className="lang-sw">
            <button className={`lbtn${lang === 'ko' ? ' on' : ''}`} onClick={() => setLang('ko')}>KO</button>
            <button className={`lbtn${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
          </div>
        </div>
      </div>
    </header>
  )

  // 칼럼 ID는 있는데 columns 배열에 없는 경우 (로딩 전 등)
  if (openColId && !openCol) return null

  // 아티클 뷰
  if (openColId && openCol) {
    return (
      <>
        <Head>
          <title>{openCol.title_ko || openCol.title_en} — SABR Korea</title>
          <meta property="og:title" content={openCol.title_ko || openCol.title_en} />
          <meta property="og:description" content={openCol.summary_ko || openCol.summary_en || ''} />
          <meta property="og:image" content={`https://www.sabrkorea.com/api/thumb?col=${openColId}`} />
          <meta property="og:url" content={`https://www.sabrkorea.com/col/${openColId}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={openCol.title_ko || openCol.title_en} />
          <meta name="twitter:image" content={`https://www.sabrkorea.com/api/thumb?col=${openColId}`} />
        </Head>
        <NavHeader />
        <div className="article-page open">
          <div className="art-page-inner">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <button className="art-page-back" onClick={closeArticle}>{t.backCols}</button>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="art-page-edit"
                  onClick={() => { setEditTarget(openCol); setShowEditor(true) }}>
                  {t.editBtn}
                </button>
                <button className="art-page-edit"
                  style={{ color: 'var(--red)', borderColor: 'var(--red)' }}
                  onClick={() => handleDelete(openCol.id)}>
                  {t.deleteBtn}
                </button>
              </div>
            </div>
            {openCol.thumbnail && (
              <img src={openCol.thumbnail} alt=""
                style={{ width: '100%', borderRadius: '6px', marginBottom: '1.5rem', maxHeight: '400px', objectFit: 'cover' }} />
            )}
            <h1 className="art-title">
              {lang === 'ko' ? (openCol.title_ko || openCol.title_en) : (openCol.title_en || openCol.title_ko)}
            </h1>
            <div className="art-meta">
              <strong>{openCol.author}</strong>
              <span className="sep">·</span>
              <span>{fmtDate(openCol.created_at)}</span>
            </div>
            <div className="art-body"
              dangerouslySetInnerHTML={{
                __html: lang === 'ko'
                  ? (openCol.body_ko || openCol.body_en || '')
                  : (openCol.body_en || openCol.body_ko || '')
              }}
            />
          </div>
        </div>
        <footer>
          <a href="https://sabr.org" target="_blank" rel="noreferrer">SABR Korea</a>
          <span style={{ margin: '0 8px', color: 'var(--border2)' }}>·</span>
          <span style={{ fontSize: '13px', color: 'var(--t3)' }}>
            © {new Date().getFullYear()} SABR Korea Chapter. All rights reserved.
          </span>
        </footer>
        {showEditor && (
          <Editor column={editTarget} onSave={handleSave}
            onClose={() => { setShowEditor(false); setEditTarget(null) }} />
        )}
      </>
    )
  }

  // 메인 뷰
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

      {/* 홈 */}
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
                <p className="hero-desc">{t.heroDesc}</p>
                <div className="hero-stats">
                  {t.hstV.map((val, i) => (
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
                  <span className="sh-title">{t.latestCols}</span>
                  <button className="sh-more" onClick={() => showPage('columns')}>{t.viewAll}</button>
                </div>
                {columns.length === 0 ? (
                  <div className="empty">
                    <div className="empty-ico">⚾</div>
                    <div className="empty-t">{t.noColumns}</div>
                  </div>
                ) : (
                  <>
                    {latest.map(col => (
                      <FeatCard key={col.id} col={col} onClick={() => openArticle(col.id)} />
                    ))}
                    {rest.map(col => (
                      <ColCard key={col.id} col={col} onClick={() => openArticle(col.id)} />
                    ))}
                  </>
                )}
              </main>
              <aside className="sidebar">
                <div className="sb-card">
                  <div className="sb-title">{t.sbRecentTitle}</div>
                  {columns.slice(0, 4).map(col => (
                    <div key={col.id} className="sb-item" onClick={() => openArticle(col.id)}>
                      <div className="sb-item-title">{col.title_ko || col.title_en}</div>
                      <div className="sb-item-meta">{col.author} · {fmtDate(col.created_at)}</div>
                    </div>
                  ))}
                </div>
                <div className="sb-card">
                  <div className="sb-title">{t.sbAboutTitle}</div>
                  <img className="sb-logo" src="/logo.png" alt="SABR" />
                  <p className="sb-about">{t.sbAboutText}</p>
                  <button className="btn-join" onClick={() => showPage('about')}>{t.joinBtn}</button>
                </div>
              </aside>
            </div>
          </div>
        </>
      )}

      {/* 칼럼 아카이브 */}
      {page === 'columns' && (
        <div className="container">
          <div className="layout">
            <main>
              <div className="sh">
                <span className="sh-title">{t.allCols}</span>
              </div>
              {columns.length === 0 ? (
                <div className="empty">
                  <div className="empty-ico">⚾</div>
                  <div className="empty-t">{t.noColumns}</div>
                </div>
              ) : (
                columns.map(col => (
                  <ColCard key={col.id} col={col} onClick={() => openArticle(col.id)} />
                ))
              )}
            </main>
            <aside className="sidebar">
              <div className="sb-card">
                <div className="sb-title">{t.sbAboutTitle}</div>
                <img className="sb-logo" src="/logo.png" alt="SABR" />
                <p className="sb-about">{t.sbAboutText}</p>
                <button className="btn-join" onClick={() => showPage('about')}>{t.joinBtn}</button>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* 소개 */}
      {page === 'about' && (
        <div className="container">
          <div className="layout">
            <main>
              <p className="hero-eyebrow" style={{ color: 'var(--t3)', marginTop: '2rem' }}>{t.abtEyebrow}</p>
              <h1 className="abt-h">{t.abtH}</h1>
              <p className="abt-lead">{t.abtP1}</p>
              <p className="abt-lead" style={{ marginTop: '1rem' }}>{t.abtP2}</p>
              <div className="abt-feats" style={{ marginTop: '2rem' }}>
                {t.abtFeats.map(([title, desc], i) => (
                  <div key={i} className="af">
                    <div className="af-ico">{title.split(' ')[0]}</div>
                    <div className="af-t">{title.split(' ').slice(1).join(' ')}</div>
                    <div className="af-d">{desc}</div>
                  </div>
                ))}
              </div>
            </main>
            <aside className="sidebar">
              <div className="sb-card">
                <div className="sb-title">{t.sbAboutTitle}</div>
                <img className="sb-logo" src="/logo.png" alt="SABR" />
                <p className="sb-about">{t.sbAboutText}</p>
                <a href="https://sabr.org/join" target="_blank" rel="noreferrer" className="btn-join">
                  {t.joinBtn}
                </a>
              </div>
            </aside>
          </div>
        </div>
      )}

      <footer>
        <a href="https://sabr.org" target="_blank" rel="noreferrer">SABR Korea</a>
        <span style={{ margin: '0 8px', color: 'var(--border2)' }}>·</span>
        <span style={{ fontSize: '13px', color: 'var(--t3)' }}>
          © {new Date().getFullYear()} SABR Korea Chapter. All rights reserved.
        </span>
      </footer>

      {showEditor && (
        <Editor column={editTarget} onSave={handleSave}
          onClose={() => { setShowEditor(false); setEditTarget(null) }} />
      )}
    </>
  )
}
