import React, { useState} from 'react'
import TimerForm from './TimerForm.tsx'
import { FaPlus } from 'react-icons/fa'

interface Props {
  onFormSubmit: (timer: {
    title: string, 
    project: string
  }) => void
}

const ToggleableTimerForm = (props: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const handleFormOpen = () => {
    setOpen(prev => !prev)
  }

  const handleFormClose = () => {
    setOpen(false)
  }

  const handleFormSubmit = (timer: {
    title: string, 
    project: string
  }) => {
    props.onFormSubmit(timer)
    setOpen(false)
  }

  if(isOpen){
    return(
      <div className="mt-8">
        <TimerForm 
          onFormSubmit={handleFormSubmit}
          onFormClose={handleFormClose}
        />
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        className="text-gray-500" 
        type="button"
        title="plus"
        onClick={handleFormOpen}
      >
        <FaPlus/>
      </button>
    </div>
  )
}

export default ToggleableTimerForm