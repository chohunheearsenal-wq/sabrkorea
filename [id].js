import { fetchColumn, fetchColumns } from '../../lib/supabase'
import Home from '../index'

export async function getServerSideProps({ params }) {
  try {
    const [col, allCols] = await Promise.all([fetchColumn(params.id), fetchColumns()])
    return { props: { initialColumns: allCols || [], openColId: params.id, column: col || null } }
  } catch (e) {
    return { props: { initialColumns: [], openColId: params.id, column: null } }
  }
}

// /col/[id] 는 홈과 동일한 컴포넌트 사용하되 OG만 다름
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { fetchColumns as fc } from '../../lib/supabase'

export default function ColPage({ initialColumns, openColId, column }) {
  const title = column?.title_ko || column?.title_en || 'SABR Korea'
  const desc = column?.summary_ko || column?.summary_en || 'SABR 한국 챕터 칼럼'

  return (
    <>
      <Head>
        <title>{title} — SABR Korea</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={`https://www.sabrkorea.com/api/thumb?col=${openColId}`} />
        <meta property="og:url" content={`https://www.sabrkorea.com/col/${openColId}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={`https://www.sabrkorea.com/api/thumb?col=${openColId}`} />
      </Head>
      <Home initialColumns={initialColumns} _openColId={openColId} />
    </>
  )
}
