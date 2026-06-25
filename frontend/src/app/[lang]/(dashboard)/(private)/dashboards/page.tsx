"use client";

// MUI Imports
import api from '@/utils/axios'
import { Card, CardContent, CardHeader } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useEffect } from 'react';

export default function Page() {
    const loadMe = async function(){
        const res = await api.get("me");
        debugger 
    }
    useEffect(()=>{
        loadMe();
    },[])
    return <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <Card>
                <CardHeader title="Dashboard">

                </CardHeader>
                <CardContent>
                    1
                    <br></br>2
                    <br></br>
                    1
                    <br></br>2
                    <br></br>
                    1
                    <br></br>2
                    <br></br>
                    1
                    <br></br>2
                    <br></br>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
}