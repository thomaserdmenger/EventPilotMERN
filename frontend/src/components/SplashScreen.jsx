const SplashScreen = () => {
  return (
    <>
      <div className="h-svh w-full absolute z-50 bg-gradient-to-t from-blue-2 to-purple-3 flex items-center justify-center">
        <img
          className="animate-bounce"
          src="../../public/svg/splashLoginLogo.svg"
          alt="Logo"
        />
      </div>
    </>
  )
}

export default SplashScreen
