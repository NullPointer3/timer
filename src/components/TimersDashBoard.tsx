import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import EditableTimerList from './EditableTimerList.tsx'
import ToggleableTimerForm from './ToggleableTimerForm.tsx'

interface Timer {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: null | number
}

const TimersDashBoard: React.FC = () => {
  const [timers, settimers] = useState<Timer[]>([
    {
      id: uuidv4(),
      title: "Learn Python",
      project: "Machine Learning",
      elapsed: 2321300,
      runningSince: null
    },
    {
      id: uuidv4(),
      title: "Learn React",
      project: "Web Development",
      elaspsed: 2018290,
      runningSince: Date.now()
    }
  ])
  return (
    <div className="flex justify-center items-center">
      <div className="items-center py-32">
        <EditableTimerList 
          timers={timers}
        />
        <ToggleableTimerForm 
          isOpen={true}
        />
      </div>
    </div>
  )
}

export default TimersDashBoard