import { useState, useEffect, useRef } from 'react'
import { insertColumn, updateColumn, deleteColumn, fetchColumn } from '../lib/supabase'

let quillScriptLoaded = false
function loadQuill(cb) {
  if (typeof window === 'undefined') return
  if (window.Quill) { cb(); return }
  if (quillScriptLoaded) {
    const wait = () => window.Quill ? cb() : setTimeout(wait, 50)
    wait(); return
  }
  quillScriptLoaded = true
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.quilljs.com/1.3.7/quill.snow.css'
  document.head.appendChild(link)
  const s = document.createElement('script')
  s.src = 'https://cdn.quilljs.com/1.3.7/quill.min.js'
  s.onload = cb
  document.head.appendChild(s)
}

const QUILL_OPTS = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1,2,3,false] }],
      ['bold','italic','underline','strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ]
  }
}

const PASSWORD = 'sabrkorea123!'

export default function Editor({ lang, onClose, onSave, editColId = null }) {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [author, setAuthor] = useState('')
  const [titleKo, setTitleKo] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbPreview, setThumbPreview] = useState(null)
  const [editorTab, setEditorTab] = useState('ko')
  const [quillReady, setQuillReady] = useState(false)
  const quillKoRef = useRef(null)
  const quillEnRef = useRef(null)
  const quillKoInst = useRef(null)
  const quillEnInst = useRef(null)
  const contentLoaded = useRef(false)

  const isEdit = !!editColId

  // 1단계: 인증 후 Quill 로드
  useEffect(() => {
    if (!authed) return
    loadQuill(() => setQuillReady(true))
  }, [authed])

  // 2단계: Quill 인스턴스 생성만
  useEffect(() => {
    if (!quillReady) return
    const timer = setTimeout(() => {
      if (!quillKoInst.current && quillKoRef.current) {
        quillKoInst.current = new window.Quill(quillKoRef.current, {
          ...QUILL_OPTS, placeholder: '본문을 입력하세요...'
        })
      }
      if (!quillEnInst.current && quillEnRef.current) {
        quillEnInst.current = new window.Quill(quillEnRef.current, {
          ...QUILL_OPTS, placeholder: 'Write content here...'
        })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [quillReady])

  // 3단계: 수정 모드 데이터 로드 — 인스턴스 생성과 분리
  useEffect(() => {
    if (!quillReady || !isEdit || contentLoaded.current) return
    contentLoaded.current = true
    setLoading(true)

    const tryLoad = () => {
      if (!quillKoInst.current || !quillEnInst.current) {
        setTimeout(tryLoad, 50)
        return
      }
      fetchColumn(editColId).then(col => {
        if (!col) { setLoading(false); return }
        setAuthor(col.author || '')
        setTitleKo(col.title_ko || '')
        setTitleEn(col.title_en || '')
        if (col.thumbnail) {
          setThumbnail(col.thumbnail)
          setThumbPreview(col.thumbnail)
        }
        if (col.body_ko) quillKoInst.current.clipboard.dangerouslyPasteHTML(col.body_ko)
        if (col.body_en) quillEnInst.current.clipboard.dangerouslyPasteHTML(col.body_en)
        setLoading(false)
      })
    }
    setTimeout(tryLoad, 150)
  }, [quillReady, editColId])

  const confirmPw = () => {
    if (pw === PASSWORD) { setAuthed(true); setPwErr(false) }
    else setPwErr(true)
  }

  const handleThumb = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const img = new Image()
    const reader = new FileReader()
    reader.onload = (ev) => {
      img.onload = () => {
        const MAX = 1200
        let w = img.width, h = img.height
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX }
          else { w = Math.round(w * MAX / h); h = MAX }
        }
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        const b64 = canvas.toDataURL('image/jpeg', 0.88)
        setThumbnail(b64)
        setThumbPreview(b64)
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!author || !titleKo) { alert('저자와 제목(한국어)을 입력하세요.'); return }
    setSaving(true)
    const payload = {
      title_ko: titleKo,
      title_en: titleEn || titleKo,
      body_ko: quillKoInst.current ? quillKoInst.current.root.innerHTML : '',
      body_en: quillEnInst.current ? quillEnInst.current.root.innerHTML : '',
      author,
      thumbnail: thumbnail || null,
    }
    try {
      if (isEdit) {
        const { error } = await updateColumn(editColId, payload)
        if (error) throw error
      } else {
        payload.category = 'general'
        payload.created_at = new Date().toISOString()
        const { error } = await insertColumn(payload)
        if (error) throw error
      }
      await onSave()
    } catch (e) {
      alert('저장 오류: ' + (e.message || JSON.stringify(e)))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('이 칼럼을 삭제하시겠습니까?')) return
    const { error } = await deleteColumn(editColId)
    if (error) { alert('삭제 오류'); return }
    await onSave()
  }

  if (!authed) {
    return (
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:700,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{background:'#fff',borderRadius:'8px',padding:'2rem',width:'320px',boxShadow:'0 8px 32px rgba(0,0,0,.2)'}}>
          <h3 style={{marginBottom:'1rem',fontFamily:'var(--sans)',fontSize:'1.1rem'}}>비밀번호를 입력하세요</h3>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&confirmPw()}
            style={{width:'100%',border:'1px solid #ddd',borderRadius:'4px',padding:'8px 12px',fontSize:'14px',boxSizing:'border-box',marginBottom:'8px'}}
            placeholder="••••••••" autoFocus />
          {pwErr && <p style={{color:'red',fontSize:'12px',margin:'0 0 8px'}}>비밀번호가 올바르지 않습니다.</p>}
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={confirmPw} style={{flex:1,background:'var(--navy)',color:'#fff',border:'none',borderRadius:'4px',padding:'8px',cursor:'pointer',fontSize:'14px'}}>확인</button>
            <button onClick={onClose} style={{flex:1,background:'#f0f0f0',border:'none',borderRadius:'4px',padding:'8px',cursor:'pointer',fontSize:'14px'}}>취소</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{position:'fixed',inset:0,background:'var(--bg1,#f8f8f6)',zIndex:995,display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 1.75rem',height:'56px',borderBottom:'1px solid var(--border,#e8e4dc)',background:'#fff',flexShrink:0}}>
        <span style={{fontWeight:700,fontSize:'13px'}}>{isEdit ? '칼럼 수정' : '칼럼 기고'}</span>
        <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <div style={{display:'flex',gap:'4px'}}>
            <button onClick={()=>setEditorTab('ko')} style={{padding:'4px 12px',borderRadius:'4px',border:'none',background:editorTab==='ko'?'var(--navy,#1a3353)':'#f0f0f0',color:editorTab==='ko'?'#fff':'var(--t2,#4a5568)',cursor:'pointer',fontSize:'12px',fontWeight:600}}>KO</button>
            <button onClick={()=>setEditorTab('en')} style={{padding:'4px 12px',borderRadius:'4px',border:'none',background:editorTab==='en'?'var(--navy,#1a3353)':'#f0f0f0',color:editorTab==='en'?'#fff':'var(--t2,#4a5568)',cursor:'pointer',fontSize:'12px',fontWeight:600}}>EN</button>
          </div>
          <button onClick={onClose} style={{background:'none',border:'1px solid var(--border2,#d4cfc6)',borderRadius:'99px',padding:'5px 14px',cursor:'pointer',fontSize:'12px',color:'var(--t2,#4a5568)'}}>취소</button>
          {isEdit && <button onClick={handleDelete} style={{background:'none',border:'1px solid #e53e3e',borderRadius:'99px',padding:'5px 14px',cursor:'pointer',fontSize:'12px',color:'#e53e3e'}}>삭제</button>}
          <button onClick={handleSave} disabled={saving||loading} style={{background:'var(--navy,#1a3353)',color:'#fff',border:'none',borderRadius:'99px',padding:'6px 18px',cursor:'pointer',fontSize:'12px',fontWeight:600,opacity:(saving||loading)?0.6:1}}>
            {loading ? '불러오는 중...' : saving ? '저장 중...' : '게재하기'}
          </button>
        </div>
      </div>

      <div style={{display:'flex',gap:'8px',padding:'.75rem 1.75rem',borderBottom:'1px solid var(--border,#e8e4dc)',background:'#fff',flexShrink:0,flexWrap:'wrap',alignItems:'center'}}>
        <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="저자 이름"
          style={{border:'1px solid var(--border2,#d4cfc6)',borderRadius:'6px',padding:'6px 12px',fontSize:'13px',background:'#f8f8f6',minWidth:'160px'}} />
        <label style={{display:'flex',alignItems:'center',gap:'6px',cursor:'pointer',border:'1px dashed var(--border2,#d4cfc6)',borderRadius:'6px',padding:'6px 12px',fontSize:'13px',color:'var(--t2,#4a5568)',background:'#f8f8f6'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          대표 이미지
          <input type="file" accept="image/*" onChange={handleThumb} style={{display:'none'}} />
        </label>
        {thumbPreview && (
          <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
            <img src={thumbPreview} style={{width:'48px',height:'36px',objectFit:'cover',borderRadius:'4px',border:'1px solid var(--border,#e8e4dc)'}} alt="" />
            <button onClick={()=>{setThumbnail(null);setThumbPreview(null)}} style={{background:'none',border:'none',cursor:'pointer',color:'var(--t3,#9aa5b4)',fontSize:'16px'}}>✕</button>
          </div>
        )}
      </div>

      <div style={{flex:1,overflowY:'auto',background:'#f8f8f6'}}>
        {loading && (
          <div style={{textAlign:'center',padding:'2rem',color:'var(--t3,#9aa5b4)'}}>불러오는 중...</div>
        )}
        <div style={{maxWidth:'820px',margin:'2rem auto',background:'#fff',borderRadius:'8px',boxShadow:'0 2px 16px rgba(0,0,0,.06)',minHeight:'calc(100vh - 200px)'}}>
          <div style={{padding:'2.5rem 3rem 0'}}>
            <input
              value={editorTab==='ko' ? titleKo : titleEn}
              onChange={e => editorTab==='ko' ? setTitleKo(e.target.value) : setTitleEn(e.target.value)}
              placeholder={editorTab==='ko' ? '제목을 입력하세요' : 'Enter title'}
              style={{width:'100%',border:'none',borderBottom:'2px solid var(--border,#e8e4dc)',outline:'none',fontFamily:'var(--sans)',fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:700,color:'var(--t1,#1a202c)',padding:'.5rem 0 1rem',background:'transparent',boxSizing:'border-box'}}
            />
          </div>
          <div style={{padding:'0 3rem 3rem'}}>
            <div ref={quillKoRef} style={{display:editorTab==='ko'?'block':'none'}} />
            <div ref={quillEnRef} style={{display:editorTab==='en'?'block':'none'}} />
          </div>
        </div>
      </div>
    </div>
  )
}
