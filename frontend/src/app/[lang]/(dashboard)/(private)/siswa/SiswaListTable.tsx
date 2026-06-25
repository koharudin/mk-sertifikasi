'use client'

import { useEffect, useMemo, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import TablePagination from '@mui/material/TablePagination'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import type { ColumnDef } from '@tanstack/react-table'

import api from '@/utils/axios'
import tableStyles from '@core/styles/table.module.css'

type Student = {
  id: number
  nis: string
  name: string
  uuid: string
}

const columnHelper = createColumnHelper<Student>()

export default function SiswaListTable() {
  const [data, setData] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15
  })

  const [totalRows, setTotalRows] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        const res = await api.get('master/student', {
          params: {
            use_pagination: 1,
            page: pagination.pageIndex + 1,
            per_page: pagination.pageSize
          }
        })

        setData(res.data.data)
        setTotalRows(res.data.total)
        setPageCount(res.data.last_page)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [pagination.pageIndex, pagination.pageSize])

  const columns = useMemo<ColumnDef<Student>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue()
      }),

      columnHelper.accessor('nis', {
        header: 'NIS',
        cell: info => info.getValue()
      }),

      columnHelper.accessor('name', {
        header: 'Nama Siswa',
        cell: info => (
          <Typography color='text.primary'>
            {info.getValue()}
          </Typography>
        )
      }),

      columnHelper.accessor('uuid', {
        header: 'UUID',
        cell: info => (
          <Typography variant='body2'>
            {info.getValue()}
          </Typography>
        )
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,

    manualPagination: true,
    pageCount,

    state: {
      pagination
    },

    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Card>
      <CardHeader title='Daftar Siswa' />

      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='text-center py-4'
                >
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className='text-center py-4'
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        component='div'
        count={totalRows}
        page={pagination.pageIndex}
        rowsPerPage={pagination.pageSize}
        rowsPerPageOptions={[10, 15, 25, 50]}
        onPageChange={(_, page) => {
          setPagination(prev => ({
            ...prev,
            pageIndex: page
          }))
        }}
        onRowsPerPageChange={event => {
          setPagination({
            pageIndex: 0,
            pageSize: Number(event.target.value)
          })
        }}
      />
    </Card>
  )
}