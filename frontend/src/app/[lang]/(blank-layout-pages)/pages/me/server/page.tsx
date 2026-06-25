import { authOptions } from '@/libs/auth'
import { getServerSession } from 'next-auth'
export default async function Cx() {

    const session = await getServerSession(authOptions)
    return <>
        <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
}