"use client";

import api from "@/utils/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
// MUI Imports
import Grid from '@mui/material/Grid2'
import ListQuiz from "./ListQuiz";

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import classnames from 'classnames'
export default function Page() {

    return <section className={classnames('md:plb-[100px] plb-6', frontCommonStyles.layoutSpacing)}><Grid container spacing={6}>

        <Grid size={{ xs: 12 }}>
            <ListQuiz />
        </Grid>
    </Grid></section>
} 