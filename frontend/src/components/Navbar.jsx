import AddCircleIcon from '@mui/icons-material/AddCircle'
import CustomButton from './CustomButton'

const Navbar = () => {
  return (
    <nav className=" absolute bottom-0 h-[70px] w-full shadow-top">
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-0.5rem]">
          <CustomButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
