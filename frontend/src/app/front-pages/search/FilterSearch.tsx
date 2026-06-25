'use client'

import { useEffect, useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const FilterSearch = function () {

    const [listKategori, setListKategori] = useState([])

    useEffect(() => {
        loadKategori()
    }, [])

    const loadKategori = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/list-filter-kategori`)

            if (!res.ok) {
                throw new Error('Gagal load data')
            }

            const data = await res.json()

            setListKategori(data?.data)
        } catch (err) {
            console.error(err)
        }
    }

    const [selectedKategori, setSelectedKategori] = useState<number[]>([])

    const handleCheckbox = (id: number) => {

        setSelectedKategori(prev => {

            if (prev.includes(id)) {
                return prev.filter(item => item !== id)
            }

            return [...prev, id]
        })
    }

    useEffect(() => {
        console.log(selectedKategori)
    }, [selectedKategori])

    return (
        <Card>

            <CardHeader title='Filter Search' />

            <CardContent>

                <Grid container spacing={6}>

                    <Grid size={{ xs: 12 }}>

                        <FormGroup>

                            {listKategori.map((item) => (

                                <FormControlLabel
                                    key={item.id}
                                    control={
                                        <Checkbox
                                            checked={selectedKategori.includes(item.id)}
                                            onChange={() => handleCheckbox(item.id)}
                                        />
                                    }
                                    label={item.name}
                                />
                            ))}

                        </FormGroup>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>
    )
}

export default FilterSearch