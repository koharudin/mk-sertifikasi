'use client'

import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@core/components/mui/TextField'

import api from '@/utils/axios'
import { useParams } from 'next/navigation'
import Swal from 'sweetalert2'
import StudentCards from '@/components/habits/StudentCards'

type Props = {
    params: {
        student_uuid: string
    }
}

type IndikatorType = {
    uuid: string
    name: string
}

type FormItem = {
    indikator_uuid: string
    poin: string
}

export default function Page() {
    const { student_uuid } = useParams()
    const [loading, setLoading] = useState(false)

    const [date, setDate] = useState(
        new Date().toISOString().split('T')[0]
    )

    const [indikators, setIndikators] = useState<
        IndikatorType[]
    >([])

    const [items, setItems] = useState<FormItem[]>([])

    const loadIndikator = async () => {
        try {
            const response = await api.get(
                `/student/${student_uuid}/kertaskerja-indikator`, {
                params: {
                    date: date
                }
            }
            )

            const indikatorData =
                response.data?.data ?? response.data ?? []

            setIndikators(indikatorData)

            setItems(
                indikatorData.map(
                    (item: IndikatorType) => ({
                        indikator_uuid: item.uuid,
                        skor: item.skor ?? '0'
                    })
                )
            )
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadIndikator()
    }, [date])

    const handleChangePoin = (
        indikatorUuid: string,
        skor: string
    ) => {
        setItems(prev =>
            prev.map(item =>
                item.indikator_uuid === indikatorUuid
                    ? {
                        ...item,
                        skor
                    }
                    : item
            )
        )
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)

            await api.post(
                `/student/${student_uuid}/submit-kertaskerja-indikator`,
                {
                    student_uuid:
                        student_uuid,
                    date,
                    items
                }
            )

            await Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data berhasil disimpan',
                confirmButtonText: 'OK',
                confirmButtonColor: '#7367F0'
            })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
                <Card>
                    <CardContent>

                        <div className='flex items-end gap-4'>

                            <CustomTextField
                                type='date'
                                label='Tanggal'
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />

                            <Button
                                variant='contained'

                                startIcon={
                                    <i className='tabler-device-floppy' />
                                }
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Simpan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
                <StudentCards student_uuid={student_uuid} studentData={{ name: "Koharudin" }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Card>
                    <CardContent>
                        <Typography
                            variant='h6'
                            className='mb-4'
                        >
                            Kertas Kerja Indikator
                        </Typography>

                        <table width={"100%"}>
                            <thead>
                                <tr>
                                    <th>Kategori</th>
                                    <th>Indikator</th>
                                    <th>Poin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indikators?.map(indikator => {
                                    return <tr key={indikator.uuid}>
                                        <td>
                                            <Typography>
                                                {indikator?.obj_habit?.name}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography>
                                                {indikator.name}
                                            </Typography>
                                            <hr>
                                            </hr>
                                            <Typography
                                                variant='body2'
                                                color='text.secondary'
                                                sx={{ fontStyle: 'italic' }}
                                            >
                                                {indikator.achievement_criteria}
                                            </Typography>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                select
                                                fullWidth
                                                label='Poin'
                                                value={
                                                    items.find(
                                                        x =>
                                                            x.indikator_uuid ===
                                                            indikator.uuid
                                                    )?.skor ?? '0'
                                                }
                                                onChange={e =>
                                                    handleChangePoin(
                                                        indikator.uuid,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <MenuItem value='0'>
                                                    Pilih Poin
                                                </MenuItem>

                                                <MenuItem value='1'>
                                                    1
                                                </MenuItem>

                                                <MenuItem value='2'>
                                                    2
                                                </MenuItem>

                                                <MenuItem value='3'>
                                                    3
                                                </MenuItem>

                                                <MenuItem value='4'>
                                                    4
                                                </MenuItem>

                                                <MenuItem value='5'>
                                                    5
                                                </MenuItem>
                                            </CustomTextField>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}