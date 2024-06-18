import { useState } from 'react'
import CustomTextArea from '../components/CustomTextArea'

const ExplorePage = () => {
  const [text, setText] = useState('')
  console.log(text)
  return (
    <div className="h-svh">
      <div className="pb-[4.375rem]">
        <h1>Explore</h1>
        <CustomTextArea
          label={'Test Label'}
          onChange={e => setText(e.target.value)}
          value={text}
        />
      </div>
    </div>
  )
}

export default ExplorePage
