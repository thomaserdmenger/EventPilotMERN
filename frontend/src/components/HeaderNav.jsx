import { useNavigate } from 'react-router-dom'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import BookmarkButton from './BookmarkButton'

const HeaderNav = ({ pathname, user, host, eventDetails }) => {
  const navigate = useNavigate()

  return (
    <header
      className={`relative flex justify-center items-center ${
        eventDetails ? 'py-0' : 'py-6'
      }`}>
      {/* Arrow Circle Left abhängig vom Pfad => ERGÄNZEN bzw. ANPASSEN */}
      <div className="absolute top-6 left-4 cursor-pointer">
        {pathname === '/userprofileedit' && (
          <ArrowCircleDownIcon
            sx={{ transform: 'rotate(90deg)', fontSize: '2rem' }}
            onClick={() => navigate('/userprofile')}
          />
        )}
      </div>

      <div className="absolute top-6 left-4 cursor-pointer">
        {(pathname === `/hostprofile/${host?.user?._id}` ||
          pathname === `/hostprofile/rate/${host?.user?._id}`) && (
          <ArrowCircleDownIcon
            sx={{ transform: 'rotate(90deg)', fontSize: '2rem' }}
            onClick={() => navigate(-1)}
          />
        )}
      </div>

      {(pathname === '/userprofileedit' ||
        pathname === '/userprofile') && (
        <p className="text-xl px-4 font-roboto-bold text-center break-words overflow-hidden">
          {user?.user?.username ?
            user?.user?.username
          : user?.user?.firstname + ' ' + user?.user?.lastname}
        </p>
      )}

      {(pathname === `/hostprofile/${host?.user?._id}` ||
        pathname === `/hostprofile/rate/${host?.user?._id}`) && (
        <p className="text-xl px-4 font-roboto-bold text-center break-words overflow-hidden">
          {host?.user?.username ?
            host?.user?.username
          : host?.user?.firstname + ' ' + host?.user?.lastname}
        </p>
      )}

      {pathname === `/events/${eventDetails?._id}` && (
        <div className="flex justify-between w-full absolute top-6 px-4">
          <ArrowCircleDownIcon
            sx={{
              transform: 'rotate(90deg)',
              fontSize: '2rem',
              // color: "#5D3EDE",
              bgcolor: '#ECEBEB',
            }}
            className="cursor-pointer rounded-2xl"
            onClick={() => navigate(-1)}
          />
          <BookmarkButton eventId={eventDetails?._id} />
        </div>
      )}

      {pathname === `/events/add` && (
        <div className="flex gap-20 w-full absolute top-6 px-4">
          <ArrowCircleDownIcon
            sx={{
              transform: 'rotate(90deg)',
              fontSize: '2rem',
            }}
            className="cursor-pointer rounded-2xl"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-center mb-6 text-purple-1 font-roboto-bold text-xl">
            Add <span className="text-green-1">Event</span>
          </h1>
        </div>
      )}

      {pathname === `/events/edit/${eventDetails?._id}` && (
        <div className="flex gap-20 w-full absolute top-6 px-4">
          <ArrowCircleDownIcon
            sx={{
              transform: 'rotate(90deg)',
              fontSize: '2rem',
            }}
            className="cursor-pointer rounded-2xl"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-center mb-6 text-purple-1 font-roboto-bold text-xl">
            Edit <span className="text-green-1">Event</span>
          </h1>
        </div>
      )}
    </header>
  )
}

export default HeaderNav
