import React from 'react'
import EditableTimerList from './EditableTimerList.tsx'
import ToggleableTimerForm from './ToggleableTimerForm.tsx'

const TimersDashBoard = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="items-center py-32">
        <EditableTimerList />
        <ToggleableTimerForm 
          isOpen={false}
        />
      </div>
    </div>
  )
}

export default TimersDashBoard