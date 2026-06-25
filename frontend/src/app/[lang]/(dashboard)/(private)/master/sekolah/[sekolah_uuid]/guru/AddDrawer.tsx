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

type GuruType = {
  id: number
  name: string
  nip: string
}

type Props = {
  open: boolean
  handleClose: () => void
  onSuccess?: () => void
  guru?: GuruType | null
}

type FormType = {
  name: string
  nip: string
}

const AddGuruDrawer = ({
  sekolah_uuid,
  open,
  handleClose,
  onSuccess,
  guru
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
      nip: ''
    }
  })

  useEffect(() => {
    if (open) {
      reset({
        name: guru?.name ?? '',
        nip: guru?.nip ?? ''
      })
    }
  }, [open, guru, reset])

  const onSubmit = async (data: FormType) => {
    try {
      setLoading(true)

      if (guru?.id) {
        await api.put(`/master/sekolah/${sekolah_uuid}/guru/${guru.id}`, data)
      } else {
        await api.post(`/master/sekolah/${sekolah_uuid}/guru`, data)
      }

      reset({
        name: '',
        nip: ''
      })

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
      nip: ''
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
          {guru ? 'Edit Guru' : 'Tambah Guru'}
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
            required: 'Nama guru wajib diisi'
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Nama Guru'
              placeholder='Budi Santoso'
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name='nip'
          control={control}
          rules={{
            required: 'NIP wajib diisi'
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='NIP'
              placeholder='198712312023011001'
              error={!!errors.nip}
              helperText={errors.nip?.message}
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
              : guru
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

export default AddGuruDrawer