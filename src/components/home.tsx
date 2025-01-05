import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className='p-8 bg-blue-200 h-screen w-screen flex flex-col items-center justify-center gap-y-2'>
      <div className='text-2xl font-bold'>Tempo + Vite + Tailwind + React</div>
      <div className='flex flex-row gap-x-2 justify-center items-center'>
        <div className='cursor-pointer bg-blue-800 text-white text-center px-4 p-2 select-none rounded-lg' onClick={(() => setCount(prev => prev + 1))}>Click</div>
        <div className='bg-gradient-to-r from-purple-400 to-purple-900 p-2 rounded-md text-white'>Count {count}</div>
      </div>
    </div>
  )
}

export default Home
