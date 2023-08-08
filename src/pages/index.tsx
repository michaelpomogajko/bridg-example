import { Inter } from 'next/font/google'
import axios from 'axios'
import useSWR from 'swr';
import prisma from 'bridg';
import { useAsync } from '@/hooks/useAsync';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data = [] } = useSWR('/api/posts', (url) => axios.get(url).then((res) => res.data));
  const bridgData = useAsync(() => prisma.post.findMany(), []) as any[] | undefined;

  if (!data) return <div>Loading...</div>
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 text-white ${inter.className}`}
    >
      <h2>api data</h2>
      {data.map((post: any) => <h1 key={post.id}>{post.title}</h1>)}

      <h2>bridg data</h2>
      {bridgData? bridgData.map((post: any) => <h1 key={post.id}>{post.title}</h1>): 'no bridg data'}
    </main>
  )
}
