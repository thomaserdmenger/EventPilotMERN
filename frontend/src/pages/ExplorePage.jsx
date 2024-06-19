import { useState } from 'react'
import CustomUpload from '../components/CustomUpload'

const ExplorePage = () => {
  const [text, setText] = useState('')
  console.log(text)
  return (
    <div className="h-svh">
      <div className="pb-[4.375rem]">
        <h1>Explore</h1>
        <CustomUpload />
      </div>
    </div>
  )
}

export default ExplorePage
