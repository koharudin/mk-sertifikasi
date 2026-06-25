import api from "@/utils/axios";
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2'

interface StudentProp {
    name: string
}
interface StudentCardProps {
    student_uuid?: string
    studentData?: StudentProp
}
export default function StudentCards({ student_uuid }: StudentCardProps) {
    const [studentData, setStudentData] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const load = async function () {
            setLoading(true);
            const res = await api.get(`public/student/${student_uuid}/detail`);
            setStudentData(res?.data);
            setLoading(false);
        }
        load();
    }, [])

    return <>
        <Card>
            <CardHeader title='Profile Siswa' />

            <CardContent>
                {loading ? (
                    <>Loading...</>
                ) : (
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Box display='flex' justifyContent='center'>
                                <Avatar
                                    src={studentData?.photo}
                                    alt={studentData?.name}
                                    sx={{ width: 120, height: 120 }}
                                >
                                    {studentData?.name?.charAt(0)}
                                </Avatar>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 9 }}>
                            <Typography variant='body1'>
                                <strong>Nama:</strong> {studentData?.name}
                            </Typography>

                            <Typography variant='body1'>
                                <strong>NIS:</strong> {studentData?.nis}
                            </Typography>

                            <Typography variant='body1'>
                                <strong>Jenis Kelamin:</strong>{' '}
                                {studentData?.gender === 'L'
                                    ? 'Laki-laki'
                                    : studentData?.gender === 'P'
                                        ? 'Perempuan'
                                        : '-'}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </CardContent>
        </Card>
    </>
}