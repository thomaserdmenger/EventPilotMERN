import AddBoxIcon from '@mui/icons-material/AddBox'
import ExploreIcon from '@mui/icons-material/Explore'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CustomButton from './CustomButton'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className=" absolute bottom-0 h-[70px] w-full shadow-top">
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <NavLink>
            <ExploreIcon />
          </NavLink>
          <NavLink>
            <CalendarMonthIcon />
          </NavLink>
          <div>
            <CustomButton
              height={62}
              width={60}
              text={
                <AddCircleIcon
                  sx={{ width: 45, height: 45, opacity: '30%' }}
                />
              }
              borderRadius={'100%'}
              bgcolor={'#7254EE'}
              bgcolorHover={'#5D3EDE'}
            />
          </div>
          <NavLink>
            <SearchIcon />
          </NavLink>
          <NavLink>
            <PersonIcon />
          </NavLink>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
