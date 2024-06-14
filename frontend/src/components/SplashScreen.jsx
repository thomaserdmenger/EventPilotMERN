import { useEffect, useState } from 'react'

const SplashScreen = ({ duration = 600 }) => {
  const [splash, setSplash] = useState(true)
  const [toggle, setTogle] = useState(true)

  const active = () => {
    if (toggle) {
      setTogle(false)
    } else {
      setSplash(false)
    }
  }
  useEffect(() => {
    const remove = setTimeout(() => {
      active()
    }, duration)
    return () => {
      clearTimeout(remove)
    }
  }, [toggle])

  return (
    <>
      {splash && (
        <div className="h-svh">
          <div>
            <h1>Splash Screen</h1>
          </div>
        </div>
      )}
    </>
  )
}

export default SplashScreen
