'use client'

import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'

type StudentType = {
    id: number
    uuid: string
    name: string
    alamat: string
    created_at: string
    updated_at: string
}

type Props = {
    open: boolean
    handleClose: () => void
    data: StudentType | null
    loading?: boolean
}

const DetailStudentDrawer = ({
    open,
    handleClose,
    data,
    loading
}: Props) => {
    return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            xs: 320,
            sm: 500
          }
        }
      }}
    >
      <div className='flex items-center justify-between p-6'>
        <Typography variant='h5'>
          Detail Student
        </Typography>

        <IconButton onClick={handleClose}>
          <i className='tabler-x' />
        </IconButton>
      </div>

      <Divider />

      <div className='p-6'>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <div className='mb-6'>
              <Typography variant='caption'>
                ID
              </Typography>

              <Typography>
                {data?.id}
              </Typography>
            </div>

            <div className='mb-6'>
              <Typography variant='caption'>
                Nama Student
              </Typography>

              <Typography>
                {data?.name}
              </Typography>
            </div>

            <div className='mb-6'>
              <Typography variant='caption'>
                Alamat
              </Typography>

              <Typography>
                {data?.alamat}
              </Typography>
            </div>

            <div className='mb-6'>
              <Typography variant='caption'>
                UUID
              </Typography>

              <Typography>
                {data?.uuid}
              </Typography>
            </div>

            <div className='mb-6'>
              <Typography variant='caption'>
                Status
              </Typography>

              <div>
                <Chip
                  label='Aktif'
                  color='success'
                  size='small'
                />
              </div>
            </div>

            <div className='mb-6'>
              <Typography variant='caption'>
                Dibuat
              </Typography>

              <Typography>
                {data?.created_at}
              </Typography>
            </div>

            <div>
              <Typography variant='caption'>
                Diupdate
              </Typography>

              <Typography>
                {data?.updated_at}
              </Typography>
            </div>
          </>
        )}
      </div>
    </Drawer>

    )
}

export default DetailStudentDrawer