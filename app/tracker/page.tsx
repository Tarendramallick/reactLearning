import { cookies } from 'next/headers'
import TrackerUI from './TrackerClient'

async function getAnalytics() {
  try {
    const cookieStore = await cookies() // ✅ FIXED

    const token = cookieStore.get('auth-token')?.value

    if (!token) return null

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`, {
      headers: {
        Cookie: `auth-token=${token}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) return null

    return res.json()
  } catch (err) {
    console.error('Analytics fetch error:', err)
    return null
  }
}

export default async function Page() {
  const analytics = await getAnalytics()

  return <TrackerUI initialAnalytics={analytics} />
}