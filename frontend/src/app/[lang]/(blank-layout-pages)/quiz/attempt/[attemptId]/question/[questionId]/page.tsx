'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'


// Type Imports
import type { DataType } from '@views/react-table/data'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import defaultData from '@views/react-table/data'
import Articles from '@/views/front-pages/help-center/Articles'
import Grid from '@mui/material/Grid2'
import { Typography } from '@mui/material'
// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import api from '@/utils/axios'


import { useRouter } from 'next/navigation'
const BasicDataTables = () => {

  const router = useRouter()

  // States
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    const run = async () => {
      try {
        const localToken = localStorage.getItem("token");
        if (!localToken) {
          const res = await api.get("/token");
          localStorage.setItem("token", res.data.token.accessToken);

        }
        // 1. start attempt
        const attemptRes = await api.get('/quiz', {
        })

        setData(attemptRes?.data?.data)

      } catch (err) {
        console.error(err)
      }
    }

    run()
  }, [])

  const attemptQuiz = async function (quizId) {
    try {
      const resp = await api.post("/quiz/" + quizId + "/attempt")
      if (resp) {
        // redirect ke halaman tertentu
        router.push(`/quiz-attempt/${resp.data.quiz_attempt_uuid}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <section className='md:plb-[100px] plb-[50px] bg-backgroundPaper'>
        <div className={frontCommonStyles.layoutSpacing}>
          <Typography variant='h4' className='text-center mbe-6'>
            Quizzes
          </Typography>
          {JSON.stringify(data)}
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Nama</td>
                <td>#</td>
              </tr>
            </thead>
            <tbody>
              {data && data.map((r, i) => (
                <tr key={i}>
                  <td>{r.title}</td>
                  <td>
                    <a className='bt btn-sm btn-primary' onClick={() => {
                      attemptQuiz(r.id)
                    }}>Attempt</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
      </section></>

  )
}

export default BasicDataTables
