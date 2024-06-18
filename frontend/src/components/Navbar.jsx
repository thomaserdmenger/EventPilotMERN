import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import ExploreIcon from '@mui/icons-material/Explore'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
} from '@mui/material'
import { AddBox } from '@mui/icons-material'

const Navbar = () => {
  const location = useLocation()
  const [value, setValue] = useState(location.pathname)

  useEffect(() => {
    setValue(location.pathname)
  }, [location.pathname])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="fixed max-w-[30rem] bottom-0 w-full shadow-top z-10">
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 z-20">
          <NavLink to={'/events/add'}>
            <IconButton
              sx={{
                marginTop: '-1.5rem',
                padding: 0,
                width: 50,
                height: 50,
                '&:hover': {},
              }}>
              <AddBox
                sx={{
                  backgroundColor: '#7254EE',
                  width: 50,
                  height: 50,
                  padding: 0.8,
                  borderRadius: '100%',
                  color: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            </IconButton>
          </NavLink>
        </div>
        <div>
          <BottomNavigation
            sx={{ width: 'full', height: '4.375rem' }}
            value={value}
            onChange={handleChange}>
            <BottomNavigationAction
              label="Explore"
              value="/"
              icon={<ExploreIcon />}
              component={NavLink}
              to="/"
              sx={{
                color: value === '/' ? '#7254EE' : '#A6A6A6',
                '& .MuiBottomNavigationAction-label': {
                  color: value === '/' ? '#7254EE' : '#A6A6A6',
                },
                '& .MuiSvgIcon-root': {
                  color: value === '/' ? '#7254EE' : '#A6A6A6',
                },
                '&:hover, &:active': {
                  color: '#7254EE',
                  '& .MuiBottomNavigationAction-label': {
                    color: '#7254EE',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#7254EE',
                  },
                },
              }}
            />
            <BottomNavigationAction
              label="Events"
              value="/events"
              icon={<CalendarMonthIcon />}
              component={NavLink}
              to="/events"
              sx={{
                color: value === '/events' ? '#7254EE' : '#A6A6A6',
                '& .MuiBottomNavigationAction-label': {
                  color: value === '/events' ? '#7254EE' : '#A6A6A6',
                },
                '& .MuiSvgIcon-root': {
                  color: value === '/events' ? '#7254EE' : '#A6A6A6',
                },
                '&:hover, &:active': {
                  color: '#7254EE',
                  '& .MuiBottomNavigationAction-label': {
                    color: '#7254EE',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#7254EE',
                  },
                },
              }}
            />

            <BottomNavigationAction
              label="Search"
              value="/search"
              icon={<SearchIcon />}
              component={NavLink}
              to="/search"
              sx={{
                color: value === '/search' ? '#7254EE' : '#A6A6A6',
                '& .MuiBottomNavigationAction-label': {
                  color: value === '/search' ? '#7254EE' : '#A6A6A6',
                },
                '& .MuiSvgIcon-root': {
                  color: value === '/search' ? '#7254EE' : '#A6A6A6',
                },
                '&:hover, &:active': {
                  color: '#7254EE',
                  '& .MuiBottomNavigationAction-label': {
                    color: '#7254EE',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#7254EE',
                  },
                },
              }}
            />
            <BottomNavigationAction
              label="Profile"
              value="/userprofile"
              icon={<PersonIcon />}
              component={NavLink}
              to="/userprofile"
              sx={{
                color: value === '/userprofile' ? '#7254EE' : '#A6A6A6',
                '& .MuiBottomNavigationAction-label': {
                  color: value === '/userprofile' ? '#7254EE' : '#A6A6A6',
                },
                '& .MuiSvgIcon-root': {
                  color: value === '/userprofile' ? '#7254EE' : '#A6A6A6',
                },
                '&:hover, &:active': {
                  color: '#7254EE',
                  '& .MuiBottomNavigationAction-label': {
                    color: '#7254EE',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#7254EE',
                  },
                },
              }}
            />
          </BottomNavigation>
        </div>
      </div>
    </div>
  )
}

export default Navbar
