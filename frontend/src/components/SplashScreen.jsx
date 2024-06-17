import LogoCanvas from './LogoCanvas'

const SplashScreen = () => {
  return (
    <>
      <div className="h-svh w-full pt-14 absolute z-50 bg-gradient-to-t from-blue-2 to-purple-3 flex flex-col items-center justify-around">
        <div className=" animate-bounce">
          <LogoCanvas scale={0.2} />
        </div>
        <img
          className="w-28"
          src="../../public/svg/splashLoginLogo.svg"
          alt="Logo"
        />
      </div>
    </>
  )
}

export default SplashScreen
