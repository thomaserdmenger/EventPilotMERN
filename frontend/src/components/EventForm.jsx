// import dayjs from "dayjs";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react'
import { backendUrl } from '../api/api'
import CustomInput from './CustomInput.jsx'
import CustomButton from './CustomButton.jsx'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import Categories from './Categories.jsx'
import { useNavigate } from 'react-router-dom'
import CustomTextArea from '../components/CustomTextArea'
import CustomUpload from './CustomUpload.jsx'
import { styled } from '@mui/material'

const EventForm = ({ eventToEdit }) => {
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()

  // states and useEffect to fill input fields if it's an edit event form:
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [categoriesArray, setCategoriesArray] = useState([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title)
      setLocation(eventToEdit.location)
      setCategoriesArray(eventToEdit.categories)
      setDescription(eventToEdit.description)
    }
  }, [eventToEdit])

  // add event fetch
  const addEvent = async e => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    formData.append('categories', categoriesArray)

    const res = await fetch(`${backendUrl}/api/v1/events`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })

    const data = await res.json()
    console.log(data.newEvent)
    if (data.errorMessage) return setErrorMessage(data.errorMessage)
    setErrorMessage('')
    navigate(`/events/${data.newEvent._id}`)
  }

  // edit event fetch
  const editEvent = async e => {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    formData.append('categories', categoriesArray)

    const res = await fetch(
      `${backendUrl}/api/v1/events/${eventToEdit._id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      },
    )
    // for (const value of formData.entries()) {
    //   console.log(value);
    // }
    const data = await res.json()

    if (data.message) return setErrorMessage(data.message)
    setErrorMessage('')
    navigate(`/events/${eventToEdit._id}`)
  }
  const CustomMobileDateTimePicker = styled(MobileDateTimePicker)(
    ({ theme }) => ({
      '& .MuiInputBase-root': {
        borderRadius: '15px',
        color: '#7254EE', // Default text color
      },
      '& .MuiInputLabel-root': {
        color: '#7254EE', // Default label color
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: '15px',
          borderColor: '#7254EE', // Default border color
        },
        '&:hover fieldset': {
          borderColor: '#7254EE', // Border color on hover
        },
        '&.Mui-focused': {
          '& fieldset': {
            borderColor: '#00ECAA', // Border color when focused
          },
          '& .MuiInputLabel-root': {
            color: '#00ECAA !important', // Label color when focused
          },
        },
      },
    }),
  )

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form
          className="flex flex-col gap-5"
          onSubmit={eventToEdit ? editEvent : addEvent}>
          <CustomInput
            type="text"
            placeholder="Title of your event"
            name="title"
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="flex items-center justify-between gap-2">
            <CustomMobileDateTimePicker
              label="From"
              name="startDate"
              // defaultValue={dayjs(new Date(eventToEdit?.startDate))} //# noch default einbauen
            />
            <div className="w-6 bg-green-1 h-1 rounded-full"></div>
            <CustomMobileDateTimePicker
              label="To"
              name="endDate"
              // defaultValue={dayjs(eventToEdit?.endDate)} //# noch default einbauen
            />
          </div>
          {/* //# Location mit externer API vorschlagen? */}
          <CustomInput
            type="text"
            label="Location"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />

          <Categories
            categoriesArray={categoriesArray}
            setCategoriesArray={setCategoriesArray}
          />

          <CustomTextArea
            placeholder="Describe your event"
            name="description"
            label={'Description'}
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
          {/* <input type="file" name="eventImage" /> */}

          <CustomUpload name={'eventImage'} />

          {/* // --> folgt noch von Icaro */}

          <CustomButton
            type="submit"
            fontSize="16px"
            width="100%"
            borderRadius="15px"
            bgcolor="#7254EE"
            bgcolorHover="#5D3EDE"
            padding="16px"
            text={eventToEdit ? 'Edit your event' : 'Add your event'}
            endIcon={<ArrowCircleRightIcon />}
          />

          {errorMessage && <p className=" text-red-800">{errorMessage}</p>}
        </form>
      </LocalizationProvider>
    </>
  )
}

export default EventForm
