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

type Habits7Type = {
  id: number
  name: string
  nip: string
}

type Props = {
  open: boolean
  handleClose: () => void
  onSuccess?: () => void
  habits7?: Habits7Type | null
}

type FormType = {
  name: string
  nip: string
}

const AddHabits7Drawer = ({
  sekolah_uuid,
  open,
  handleClose,
  onSuccess,
  habits7
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
        name: habits7?.name ?? '',
        nip: habits7?.nip ?? ''
      })
    }
  }, [open, habits7, reset])

  const onSubmit = async (data: FormType) => {
    try {
      setLoading(true)

      if (habits7?.id) {
        await api.put(`/master/sekolah/${sekolah_uuid}/habits7/${habits7.id}`, data)
      } else {
        await api.post(`/master/sekolah/${sekolah_uuid}/habits7`, data)
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
          {habits7 ? 'Edit Indikator' : 'Tambah Indikator'}
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
            required: 'Nama habits7 wajib diisi'
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Nama Habits7'
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
              : habits7
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

export default AddHabits7Drawer