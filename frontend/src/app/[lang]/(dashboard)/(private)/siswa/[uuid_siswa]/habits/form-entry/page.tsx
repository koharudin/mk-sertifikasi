import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
export default function Page({params}) {
    return <Grid container spacing={6}>

        <Grid size={{ xs: 12 }}>
            Report Habits {params?.uuid_siswa}
        </Grid>
    </Grid>
}