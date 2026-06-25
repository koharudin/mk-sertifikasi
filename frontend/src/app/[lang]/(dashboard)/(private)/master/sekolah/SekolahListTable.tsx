'use client'

import { useEffect, useMemo, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Swal from 'sweetalert2'

import CustomTextField from '@core/components/mui/TextField'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState
} from '@tanstack/react-table'

import tableStyles from '@core/styles/table.module.css'
import api from '@/utils/axios'
import AddSekolahDrawer from './AddSekolahDrawer'
import DetailSekolahDrawer from './DetailSekolahDrawer'
import { routeModule } from 'next/dist/build/templates/pages'
import { useParams, useRouter } from 'next/navigation'
import { Tooltip } from '@mui/material'

type SekolahType = {
  id: number
  uuid: string
  name: string
  alamat: string
  created_at: string
  updated_at: string
}

const columnHelper = createColumnHelper<SekolahType>()

const SekolahListTable = () => {
  const [data, setData] = useState<SekolahType[]>([])
  const [selectedSekolah, setSelectedSekolah] =
    useState<SekolahType | null>(null)


  const [detailOpen, setDetailOpen] = useState(false)

  const [detailData, setDetailData] =
    useState<SekolahType | null>(null)

  const [detailLoading, setDetailLoading] =
    useState(false)

  const [loading, setLoading] = useState(false)
  const [addSekolahOpen, setAddSekolahOpen] = useState(false)

  const [search, setSearch] = useState('')

  const [totalRows, setTotalRows] = useState(0)
  const [lastPage, setLastPage] = useState(1)
  const router = useRouter()
  const { lang } = useParams()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: 'Hapus Data?',
      text: `Sekolah "${name}" akan dihapus.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
      reverseButtons: true
    })

    if (!result.isConfirmed) return

    try {
      await api.delete(`/master/sekolah/${id}`)

      await Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil dihapus',
        timer: 1500,
        showConfirmButton: false
      })

      getSekolah()
    } catch (error: any) {
      console.error(error)

      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text:
          error?.response?.data?.message ??
          'Terjadi kesalahan saat menghapus data'
      })
    }
  }

  const handleDetail = async (id: number) => {
    try {
      setDetailLoading(true)

      const response = await api.get(
        `/master/sekolah/${id}`
      )

      setDetailData(response.data)

      setDetailOpen(true)
    } catch (error) {
      console.error(error)
    } finally {
      setDetailLoading(false)
    }
  }


  const getSekolah = async () => {
    try {
      setLoading(true)

      const response = await api.get('/master/sekolah', {
        params: {
          page: pagination.pageIndex + 1,
          per_page: pagination.pageSize,
          use_pagination: 1,
          search
        }
      })

      setData(response.data.data ?? [])
      setTotalRows(response.data.total ?? 0)
      setLastPage(response.data.last_page ?? 1)
    } catch (error) {
      console.error(error)
      setData([])
      setTotalRows(0)
      setLastPage(1)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSekolah()
  }, [pagination.pageIndex, pagination.pageSize])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPagination(prev => ({
        ...prev,
        pageIndex: 0
      }))
    }, 500)

    return () => clearTimeout(timeout)
  }, [search])

  const columns = useMemo<ColumnDef<SekolahType>[]>(
    () => [
      columnHelper.accessor('id', {
        header: 'ID'
      }),

      columnHelper.accessor('name', {
        header: 'Nama Sekolah',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.name}
          </Typography>
        )
      }),

      columnHelper.accessor('alamat', {
        header: 'Alamat'
      }),

      {
        id: 'status',
        header: 'Status',
        cell: () => (
          <Chip
            label='Aktif'
            size='small'
            color='success'
            variant='tonal'
          />
        )
      },

      {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Tooltip title='Guru'>
              <IconButton
                color='info'
                onClick={() => router.push(`/${lang}/master/sekolah/${row.original.uuid}/guru`)}
              >
                <i className='tabler-school' />
              </IconButton>
            </Tooltip>
            {/* Murid */}
            <Tooltip title='Murid'>
              <IconButton
                color='success'
                onClick={() =>
                  router.push(
                    `/${lang}/master/sekolah/${row.original.uuid}/student`
                  )
                }
              >
                <i className='tabler-users-group' />
              </IconButton>
            </Tooltip>

            <Tooltip title='7Habits'>
              <IconButton
                color='info'
                onClick={() => router.push(`/${lang}/master/sekolah/${row.original.uuid}/7habits`)}
              >
                <i className='tabler-list-numbers' />
              </IconButton>
            </Tooltip>
            
            <Tooltip title='Detail'>
              <IconButton
                color='primary'
                onClick={() =>
                  handleDetail(row.original.id)
                }
              >
                <i className='tabler-eye' />
              </IconButton></Tooltip>
            <Tooltip title='Ubah'>
              <IconButton
                onClick={() => {
                  setSelectedSekolah(row.original)
                  setAddSekolahOpen(true)
                }}
              >
                <i className='tabler-edit' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Hapus'>
              <IconButton
                color='error'
                onClick={() =>
                  handleDelete(
                    row.original.id,
                    row.original.name
                  )
                }
              >
                <i className='tabler-trash' />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,

    state: {
      pagination
    },

    manualPagination: true,

    pageCount: lastPage,

    onPaginationChange: setPagination,

    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <Card>
        <CardHeader title='Data Sekolah' />

        <div className='flex flex-col md:flex-row justify-between items-center gap-4 p-6'>
          <CustomTextField
            placeholder='Cari sekolah...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='w-full md:w-96'
          />

          <button
            className='flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white'
            onClick={() => {
              setSelectedSekolah(null)
              setAddSekolahOpen(true)
            }}
          >
            <i className='tabler-plus' />
            Tambah Sekolah
          </button>
        </div>

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
                    className='text-center py-10'
                  >
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className='text-center py-10'
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

        <Box
          sx={{
            p: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant='body2'>
            Menampilkan {totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1}
            {' - '}
            {Math.min(
              (pagination.pageIndex + 1) * pagination.pageSize,
              totalRows
            )}
            {' dari '}
            {totalRows} data
          </Typography>

          <div className='flex items-center gap-4'>
            <CustomTextField
              select
              size='small'
              value={pagination.pageSize}
              sx={{ minWidth: 90 }}
              onChange={event => {
                setPagination({
                  pageIndex: 0,
                  pageSize: Number(event.target.value)
                })
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </CustomTextField>

            <Stack>
              <Pagination
                color='primary'
                shape='rounded'
                page={pagination.pageIndex + 1}
                count={lastPage}
                showFirstButton
                showLastButton
                onChange={(_, page) => {
                  setPagination(prev => ({
                    ...prev,
                    pageIndex: page - 1
                  }))
                }}
              />
            </Stack>
          </div>
        </Box>
      </Card>
      <AddSekolahDrawer
        open={addSekolahOpen}
        sekolah={selectedSekolah}
        handleClose={() => {
          setAddSekolahOpen(false)
          setSelectedSekolah(null)
        }}
        onSuccess={() => {
          getSekolah()

          setAddSekolahOpen(false)
          setSelectedSekolah(null)
        }}
      />

      <DetailSekolahDrawer
        open={detailOpen}
        data={detailData}
        loading={detailLoading}
        handleClose={() => {
          setDetailOpen(false)
          setDetailData(null)
        }}
      /></>
  )
}

export default SekolahListTable