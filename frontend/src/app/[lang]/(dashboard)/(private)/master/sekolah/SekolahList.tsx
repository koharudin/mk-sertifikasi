// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import SekolahListTable from './SekolahListTable'
import SekolahListCards from './SekolahListCards'

const SekolahList = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SekolahListCards />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <SekolahListTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default SekolahList
