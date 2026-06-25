// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import ListTable from './ListTable'
import ListCards from './ListCards'

const List = ({ sekolah_uuid }) => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <ListCards />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <ListTable sekolah_uuid={sekolah_uuid} />
        </Grid>
      </Grid>
    </>
  )
}

export default List
