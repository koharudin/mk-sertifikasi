'use client'

import { useEffect, useState } from 'react'

export default function QuizTimer({ start_time, duration }) {


    const [timeLeft, setTimeLeft] = useState(0)
    const [endTime,setEndTime] = useState()
    const [startTime,setStartTime] = useState()

    // format HH:mm:ss
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60

        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    useEffect(() => {

        const startTimestamp = new Date(start_time).getTime()
        setStartTime(new Date(start_time))

        // waktu selesai
        const endTimestamp = startTimestamp + (duration * 1000)
        console.log(endTimestamp);
        setEndTime(new Date(endTimestamp));
        const interval = setInterval(() => {

            const now = Date.now()

            // sisa detik
            const remaining = Math.floor((endTimestamp - now) / 1000)

            if (remaining <= 0) {
                clearInterval(interval)

                setTimeLeft(0)

                alert('Waktu habis')

                // submit quiz otomatis di sini
                return
            }

            setTimeLeft(remaining)

        }, 1000)

        return () => clearInterval(interval)

    }, [start_time,duration])

    return (
        <div className='text-2xl font-bold'>
          
            Waktu Mulai : {startTime?.toLocaleString('id-ID')}
            <br></br>
            Batas Waktu Penyelesaian {endTime?.toLocaleString('id-ID')}
            <br></br>
            Waktu Pengerjaan : {duration} seconds
            <br></br>
            {formatTime(timeLeft)}
            <br></br>
        </div>
    )
}