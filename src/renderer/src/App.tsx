import { useState } from 'react'

const App = () => {
  const [result, setResult] = useState<any>(null)
  const handleSetup = async () => {
    const abc = await window.context.runFileSetup()
    setResult(abc)
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center bg-gray-600/70 flex-col gap-5">
        <input className="text-black h-10" />

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Connect</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleSetup}>
          Run file setup
        </button>
        {result}
      </div>
    </>
  )
}

export default App
