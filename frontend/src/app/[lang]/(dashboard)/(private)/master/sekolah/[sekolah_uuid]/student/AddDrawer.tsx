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

type StudentType = {
  id: number
  name: string
  nis: string
}

type Props = {
  open: boolean
  handleClose: () => void
  onSuccess?: () => void
  student?: StudentType | null
}

type FormType = {
  name: string
  nis: string
}

const AddStudentDrawer = ({
  sekolah_uuid,
  open,
  handleClose,
  onSuccess,
  student
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
      nis: ''
    }
  })

  useEffect(() => {
    if (open) {
      reset({
        name: student?.name ?? '',
        nis: student?.nis ?? ''
      })
    }
  }, [open, student, reset])

  const onSubmit = async (data: FormType) => {
    try {
      setLoading(true)

      if (student?.id) {
        await api.put(`/master/sekolah/${sekolah_uuid}/student/${student.id}`, data)
      } else {
        await api.post(`/master/sekolah/${sekolah_uuid}/student`, data)
      }

      reset({
        name: '',
        nis: ''
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
      nis: ''
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
          {student ? 'Edit Student' : 'Tambah Student'}
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
            required: 'Nama student wajib diisi'
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='Nama Student'
              placeholder='Budi Santoso'
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name='nis'
          control={control}
          rules={{
            required: 'NIS wajib diisi'
          }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              fullWidth
              label='NIS'
              placeholder='198712312023011001'
              error={!!errors.nis}
              helperText={errors.nis?.message}
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
              : student
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

export default AddStudentDrawer