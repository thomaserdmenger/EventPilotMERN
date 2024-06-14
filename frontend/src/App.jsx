import SplashScreen from './components/SplashScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="w-[24.375rem] my-auto bg-slate-300">
      <SplashScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<p className="h-svh">Hello World</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
