'use client'
import Grid from '@mui/material/Grid2'
import BoxNaskah from './BoxNaskah'


import { useEffect, useState } from 'react'

const DisplayResultSearch = function () {
    const [list, setList] = useState([])

    const onSearch = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/search-naskah`)

            if (!res.ok) {
                throw new Error('Gagal load data')
            }

            const data = await res.json()

            setList(data?.data)
        } catch (err) {
            console.error(err)
        }
    }


    useEffect(() => {
        onSearch();
    }, [])
    return <>
        <Grid container spacing={6}>
            {list.map(function (naskah, i) {
                return (
                    <Grid key={naskah.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <BoxNaskah naskah={naskah}></BoxNaskah>
                    </Grid>
                )
            })}
        </Grid>
    </>
}

export default DisplayResultSearch