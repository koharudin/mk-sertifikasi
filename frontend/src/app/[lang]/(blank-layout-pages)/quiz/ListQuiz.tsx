'use client'

import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'

import Link from 'next/link'

import styles from '@core/styles/table.module.css'

import api from '@/utils/axios'

export type DataType = {
  id: number
  name: string
}

export default function ListQuiz() {
  const [data, setData] = useState<DataType[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const onLoad = async () => {
    const res = await api.get('/public/quiz')
    setData(res?.data?.data || [])
  }

  useEffect(() => {
    onLoad()
  }, [])

  // paging
  const start = page * rowsPerPage
  const end = start + rowsPerPage

  const paginatedData = data.slice(start, end)

  return (
    <Card>
      <CardHeader title='Daftar Quiz' />

      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Quiz</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={3} className='text-center'>
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>

                  <td>
                    <Button
                      component={Link}
                      variant='contained'
                      href={`/quiz/${row.id}/attempt`}
                      target='_blank'
                      size='small'
                    >
                      Start Attempt
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        component='div'
        count={data.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) => {
          setPage(newPage)
        }}
        onRowsPerPageChange={event => {
          setRowsPerPage(parseInt(event.target.value, 10))
          setPage(0)
        }}
      />
    </Card>
  )
}