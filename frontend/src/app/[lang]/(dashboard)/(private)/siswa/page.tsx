'use client'
// Component Imports
import api from '@/utils/axios';
import SiswaList from './SiswaList';
import { useEffect, useState } from 'react';

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/user-list` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getUserData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/user-list`)

  if (!res.ok) {
    throw new Error('Failed to fetch userData')
  }

  return res.json()
} */

const getUserData = async () => {
    const res = await api.get("master/student", {
        params: {
            use_pagination: 1
        }
    });
    return res?.data
}

const UserListApp =  () => {
    const [data, setData] = useState();
    useEffect(() => {
        const loadData = async () => {
            const data = await getUserData()
            setData(data?.data)
        }

        loadData()
    }, [])
    return <SiswaList userData={data} />
    
}

export default UserListApp
