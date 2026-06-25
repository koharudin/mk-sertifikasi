'use client'

import { Button, Card, CardActions, CardContent, CardHeader, Grid2, InputAdornment, Typography } from "@mui/material"
import Form from '@components/Form'
import Grid from '@mui/material/Grid2'
// Third-party Imports
import classnames from 'classnames'
// Styles Imports
import frontCommonStyles from './styles.module.css'
import { useState } from "react"
import FilterSearch from "./FilterSearch"
import DisplayResultSearch from "./DisplayResultSearch"
import CustomTextField from "@/@core/components/mui/TextField"
// Styles Imports
import styles from './styles.module.css'
import Link from "next/link"
import SearchBox from "./SearchBox"


export default function Cx() {
    return <>
        <section className={classnames('md:plb-[100px] plb-6', frontCommonStyles.layoutSpacing)}>

            <Grid container spacing={6}>

                <section
                    className={classnames(
                        'flex flex-col justify-center items-center gap-4 md:plb-[100px] plb-[50px]',
                        frontCommonStyles.layoutSpacing
                    )}
                >
                    <SearchBox />
                </section>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <FilterSearch></FilterSearch>
                    </Grid>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <DisplayResultSearch />
                    </Grid>
                </Grid>
            </Grid>
        </section>
    </>
}