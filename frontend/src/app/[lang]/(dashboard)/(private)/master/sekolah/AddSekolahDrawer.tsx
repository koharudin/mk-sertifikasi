'use client'

import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { useForm, Controller } from 'react-hook-form'

import CustomTextField from '@core/components/mui/TextField'

import api from '@/utils/axios'

type SekolahType = {
  id: number
  name: string
  alamat: string
}

type Props = {
  open: boolean
  handleClose: () => void
  onSuccess?: () => void
  sekolah?: SekolahType | null
}

type FormType = {
  name: string
  alamat: string
}

const AddSekolahDrawer = ({
  open,
  handleClose,
  onSuccess,
  sekolah
}: Props) => {
  const [loading, setLoading] = useState(false)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormType>({
    defaultValues: {
      name: '',
      alamat: ''
    }
  })

  useEffect(() => {
    if (open) {
      reset({
        name: sekolah?.name ?? '',
        alamat: sekolah?.alamat ?? ''
      })
    }
  }, [open, sekolah, reset])

  const onSubmit = async (data: FormType) => {
    try {
      setLoading(true)

      if (sekolah?.id) {
        await api.put(`/master/sekolah/${sekolah.id}`, data)
      } else {
        await api.post('/master/sekolah', data)
      }

      reset()

      handleClose()

      onSuccess?.()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    reset({
      name: '',
      alamat: ''
    })

    handleClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            xs: 320,
            sm: 450
          }
        }
      }}
    >
      <div className='flex items-center justify-between p-6'>
        <Typography variant='h5'>
          {sekolah ? 'Edit Sekolah' : 'Tambah Sekolah'}
        </Typography>

        <IconButton onClick={handleReset}>
          <i className='tabler-x' />
        </IconButton>
      </div>

      <Divider />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-6 p-6'
      >
        <Controller
          name='name'
          control={control}
          rules={{
            required: 'Nama sekolah wajib diisi'
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Nama Sekolah'
              placeholder='SDN Jaka Setia IV'
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name='alamat'
          control={control}
          rules={{
            required: 'Alamat wajib diisi'
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              multiline
              rows={4}
              label='Alamat'
              placeholder='Kota Bekasi'
              error={!!errors.alamat}
              helperText={errors.alamat?.message}
            />
          )}
        />

        <div className='flex items-center gap-4'>
          <Button
            variant='contained'
            type='submit'
            disabled={loading}
            startIcon={<i className='tabler-device-floppy' />}
          >
            {loading
              ? 'Menyimpan...'
              : sekolah
                ? 'Update'
                : 'Simpan'}
          </Button>

          <Button
            variant='tonal'
            color='error'
            onClick={handleReset}
            startIcon={<i className='tabler-x' />}
          >
            Batal
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default AddSekolahDrawer