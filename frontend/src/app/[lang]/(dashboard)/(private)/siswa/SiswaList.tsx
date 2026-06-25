// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import SiswaListTable from './SiswaListTable'
import SiswaListCards from './SiswaListCards'

const SiswaList = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SiswaListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SiswaListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default SiswaList
