import React from 'react'
import TimerForm from './TimerForm.tsx'

const ToggleableTimerForm = ({ isOpen }: { isOpen: boolean}) => {
  if(isOpen){
    return(
      <TimerForm />
    )
  }
  return (
    <div>
      <button type="button">+</button>
    </div>
  )
}

export default ToggleableTimerForm