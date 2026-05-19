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
    recentCols: '최신 칼럼',
    aboutTitle: '소개',
    aboutText: 'SABR 한국 챕터 소개',
    aboutBtn: '챕터 소개 보기 →',
    readTime: '분 읽기',
    writeCol: '칼럼 작성',
    backHome: '← 홈으로',
    backCols: '← 칼럼 목록',
    noDesc: '설명 없음',
    aboutP1: 'SABR(미국야구학회)은 1971년 설립된 세계 최대 야구 연구 단체입니다. 한국 챕터는 국내 야구 연구자와 팬들이 모여 야구를 깊이 있게 탐구하는 커뮤니티입니다.',
    aboutP2: '세이버메트릭스, 역사 연구, 바이오그래피, 비즈니스 분석 등 다양한 분야에서 활동하며, 정기 모임과 세미나를 통해 야구 지식을 나눕니다.',
    joinBtn: 'SABR 가입하기',
    editBtn: '수정',
    deleteBtn: '삭제',
    confirmDelete: '이 칼럼을 삭제하시겠습니까?',
    noColumns: '아직 칼럼이 없습니다.',
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
    recentCols: 'Latest Columns',
    aboutTitle: 'About',
    aboutText: 'About SABR Korea Chapter',
    aboutBtn: 'Learn More →',
    readTime: ' min read',
    writeCol: 'Write Column',
    backHome: '← Home',
    backCols: '← Columns',
    noDesc: 'No description',
    aboutP1: 'SABR (Society for American Baseball Research) was founded in 1971 and is the world\'s largest baseball research organization. The Korea Chapter is a community of domestic baseball researchers and fans who explore baseball in depth.',
    aboutP2: 'We are active in sabermetrics, historical research, biography, and business analysis, sharing baseball knowledge through regular meetings and seminars.',
    joinBtn: 'Join SABR',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    confirmDelete: 'Are you sure you want to delete this column?',
    noColumns: 'No columns yet.',
  }
}

function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`
}

function ColCard({ col, onClick }) {
  return (
    <div className="aitem" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="aitem-thumb">
        {col.thumbnail
          ? <img src={col.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    <div className="aitem featured" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="feat-img" style={col.thumbnail
        ? { backgroundImage: `url('${col.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : {}}>
        {!col.thumbnail && <img src="/logo.png" alt="" />}
        <div className="feat-img-label">
          <div className="aitem-title" style={{ color: '#fff' }}>{col.title_ko || col.title_en}</div>
          <div className="aitem-meta" style={{ color: 'rgba(255,255,255,.7)' }}>
            <strong style={{ color: 'rgba(255,255,255,.9)' }}>{col.author}</strong>
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

  // URL 기반 라우팅
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
    if (typeof localStorage !== 'undefined') localStorage.setItem('sabr_lang', l)
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('sabr_lang')
      if (saved) setLangState(saved)
    }
  }, [])

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

  // 아티클 뷰
  if (openColId && !openCol) {
    // 칼럼을 찾지 못한 경우 홈으로 복귀
    return null
  }

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
        <div className="site-wrap">
          <nav className="site-nav">
            <div className="nav-inner">
              <a className="nav-logo" onClick={() => showPage('home')} style={{ cursor: 'pointer' }}>
                <img src="/logo.png" alt="SABR Korea" />
                <span>SABR Korea</span>
              </a>
              <div className="nav-links">
                {t.nav.map((label, i) => {
                  const pages = ['home', 'columns', 'about']
                  return (
                    <a key={i} onClick={() => showPage(pages[i])} style={{ cursor: 'pointer' }}
                      className={page === pages[i] ? 'active' : ''}>{label}</a>
                  )
                })}
              </div>
              <div className="lang-switch">
                <button onClick={() => setLang('ko')} className={lang === 'ko' ? 'on' : ''}>KO</button>
                <button onClick={() => setLang('en')} className={lang === 'en' ? 'on' : ''}>EN</button>
              </div>
            </div>
          </nav>
          <main className="article-main">
            <div className="article-container">
              <button className="btn-back" onClick={closeArticle}>{t.backCols}</button>
              {openCol.thumbnail && (
                <div className="article-hero-img">
                  <img src={openCol.thumbnail} alt="" />
                </div>
              )}
              <h1 className="article-title">{lang === 'ko' ? (openCol.title_ko || openCol.title_en) : (openCol.title_en || openCol.title_ko)}</h1>
              <div className="article-meta">
                <strong>{openCol.author}</strong>
                <span className="sep">·</span>
                <span>{fmtDate(openCol.created_at)}</span>
              </div>
              <div className="article-body"
                dangerouslySetInnerHTML={{
                  __html: lang === 'ko'
                    ? (openCol.body_ko || openCol.body_en || '')
                    : (openCol.body_en || openCol.body_ko || '')
                }}
              />
              <div className="article-actions">
                <button className="btn-edit" onClick={() => { setEditTarget(openCol); setShowEditor(true) }}>{t.editBtn}</button>
                <button className="btn-delete" onClick={() => handleDelete(openCol.id)}>{t.deleteBtn}</button>
              </div>
            </div>
          </main>
          {showEditor && (
            <Editor
              column={editTarget}
              onSave={handleSave}
              onClose={() => { setShowEditor(false); setEditTarget(null) }}
            />
          )}
        </div>
      </>
    )
  }

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

      <div className="site-wrap">
        {/* 네비게이션 */}
        <nav className="site-nav">
          <div className="nav-inner">
            <a className="nav-logo" onClick={() => showPage('home')} style={{ cursor: 'pointer' }}>
              <img src="/logo.png" alt="SABR Korea" />
              <span>SABR Korea</span>
            </a>
            <div className="nav-links">
              {t.nav.map((label, i) => {
                const pages = ['home', 'columns', 'about']
                return (
                  <a key={i} onClick={() => showPage(pages[i])} style={{ cursor: 'pointer' }}
                    className={page === pages[i] ? 'active' : ''}>{label}</a>
                )
              })}
            </div>
            <div className="nav-right">
              <button className="btn-write" onClick={() => { setEditTarget(null); setShowEditor(true) }}>
                + {t.writeCol}
              </button>
              <div className="lang-switch">
                <button onClick={() => setLang('ko')} className={lang === 'ko' ? 'on' : ''}>KO</button>
                <button onClick={() => setLang('en')} className={lang === 'en' ? 'on' : ''}>EN</button>
              </div>
            </div>
          </div>
        </nav>

        <main>
          {/* 홈 페이지 */}
          {page === 'home' && (
            <>
              {/* 히어로 배너 */}
              <section className="hero-banner">
                <div className="hero-inner">
                  <p className="hero-eyebrow">{t.heroEyebrow}</p>
                  <h1 className="hero-h1">
                    {t.heroH1.split('\n').map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 && <br />}</span>)}
                  </h1>
                  <p className="hero-desc">{t.heroDesc}</p>
                  <div className="hst-row">
                    {t.hstV.map((val, i) => (
                      <div key={i} className="hst-item">
                        <div className="hst-val">{val}</div>
                        <div className="hst-label">{t.hstL[i]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 최신 칼럼 섹션 */}
              <section className="home-cols-section">
                <div className="container">
                  <div className="section-header">
                    <h2 className="section-title">{t.latestCols}</h2>
                    <a className="view-all" onClick={() => showPage('columns')} style={{ cursor: 'pointer' }}>{t.viewAll}</a>
                  </div>
                  {columns.length === 0 ? (
                    <p className="no-cols">{t.noColumns}</p>
                  ) : (
                    <div className="home-layout">
                      {latest.length > 0 && (
                        <div className="feat-col">
                          {latest.map(col => (
                            <FeatCard key={col.id} col={col} onClick={() => openArticle(col.id)} />
                          ))}
                        </div>
                      )}
                      <div className="side-cols">
                        {rest.map(col => (
                          <ColCard key={col.id} col={col} onClick={() => openArticle(col.id)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* 소개 섹션 미리보기 */}
              <section className="about-preview">
                <div className="container">
                  <h2>{t.aboutTitle}</h2>
                  <p>{t.aboutP1}</p>
                  <a className="btn-about" onClick={() => showPage('about')} style={{ cursor: 'pointer' }}>{t.aboutBtn}</a>
                </div>
              </section>
            </>
          )}

          {/* 칼럼 아카이브 */}
          {page === 'columns' && (
            <section className="columns-page">
              <div className="container">
                <h2 className="page-title">{t.allCols}</h2>
                {columns.length === 0 ? (
                  <p className="no-cols">{t.noColumns}</p>
                ) : (
                  <div className="cols-grid">
                    {columns.map(col => (
                      <ColCard key={col.id} col={col} onClick={() => openArticle(col.id)} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 소개 페이지 */}
          {page === 'about' && (
            <section className="about-page">
              <div className="container">
                <p className="about-eyebrow">SABR Korea Chapter</p>
                <h1 className="about-h1">{t.aboutTitle}</h1>
                <p className="about-p">{t.aboutP1}</p>
                <p className="about-p">{t.aboutP2}</p>
                <a href="https://sabr.org/join" target="_blank" rel="noreferrer" className="btn-join">
                  {t.joinBtn}
                </a>
              </div>
            </section>
          )}
        </main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-logo">
              <img src="/logo.png" alt="SABR Korea" />
              <span>SABR Korea</span>
            </div>
            <p className="footer-desc">{t.heroDesc}</p>
            <p className="footer-tag">© {new Date().getFullYear()} SABR Korea Chapter. All rights reserved.</p>
          </div>
        </footer>
      </div>

      {/* 칼럼 작성/수정 에디터 */}
      {showEditor && (
        <Editor
          column={editTarget}
          onSave={handleSave}
          onClose={() => { setShowEditor(false); setEditTarget(null) }}
        />
      )}
    </>
  )
}
