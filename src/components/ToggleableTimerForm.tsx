import React, { useState} from 'react'
import TimerForm from './TimerForm.tsx'
import { FaPlus } from 'react-icons/fa'

const ToggleableTimerForm = () => {
  const [isOpen, setOpen] = useState<boolean>(false)

  const handleFormOpen = () => {
    setOpen(prev => !prev)
  }

  if(isOpen){
    return(
      <div className="mt-8">
        <TimerForm />
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