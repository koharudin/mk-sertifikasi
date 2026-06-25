
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button, CardActions, Link, Typography } from '@mui/material'

const BoxNaskah = function ({ naskah }) {
    return <Card>
        <CardContent>
            <Typography variant='h5' className='mbe-2'>
                {naskah.title}
            </Typography>
            <Typography className='mbe-4' color='text.secondary'>
                {naskah.description}
            </Typography>
            <Typography color='text.secondary'>

            </Typography>
        </CardContent>
        <CardActions className='card-actions-dense'>
            <Button
                component={Link}
                href={`/naskah/${naskah.slug}`}
            >
                Baca Selengkapnya
            </Button>
        </CardActions>
    </Card>
}

export default BoxNaskah