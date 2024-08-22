import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import EditableTimerList from './EditableTimerList.tsx'
import ToggleableTimerForm from './ToggleableTimerForm.tsx'
import { newTimer } from '../helpers.ts'

interface Timer {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: null | number
}

const TimersDashBoard: React.FC = () => {
  const [timers, setTimers] = useState<Timer[]>([
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
      elapsed: 2018290,
      runningSince: Date.now()
    }
  ])

  const handleCreateFormSubmit = (timer: {
    title: string, 
    project: string
  }) => {
    createTimer(timer)
  }

  const handleEditFormSubmit = (attr: {
    id?: string, 
    title: string, 
    project: string
  }) => {
    updateTimer(attr)
  }

  const updateTimer = (attr: {
    id?: string, 
    title: string, 
    project: string
  }) => {
    setTimers(prev => (
      prev.map(timer => (
        timer.id === attr.id ? {...timer, title: attr.title, project: attr.project} : timer
      ))
    ))
  }

  const handleTrashClick = (timerId: string) => {
    deleteTimer(timerId)
  }

  const deleteTimer = (timerId: string) => {
    setTimers(prev => (
      prev.filter(t => t.id !== timerId)
    ))
  }

  const createTimer = (timer: {title: string, project: string}) => {
    const t = newTimer(timer)
    setTimers(prev => prev.concat(t))
  }

  const handleStartClick = (timerId: string) => {
    startTimer(timerId)
  }

  const startTimer = (timerId: string) => {
    setTimers(prev => (
      prev.map(timer => (
        timer.id === timerId ? {...timer, runningSince: Date.now()} : timer
      ))
    ))
  }

  const handleStopClick = (timerId: string) => {
    stopTimer(timerId)
  }

  const stopTimer = (timerId: string) => {
    const now = Date.now();
  
    setTimers(prev =>
      prev.map(timer => {
        if (timer.id === timerId && timer.runningSince) {
          const lastElapsed = now - timer.runningSince;
          return {
            ...timer,
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null, 
          };
        }
        return timer
      })
    )
  }
  return (
    <div className="flex justify-center items-center">
      <div className="items-center py-32">
        <EditableTimerList 
          timers={timers}
          onFormSubmit={handleEditFormSubmit}
          onTrashClick={handleTrashClick}
          onStartClick={handleStartClick}
          onStopClick={handleStopClick}
        />
        <ToggleableTimerForm 
          onFormSubmit={handleCreateFormSubmit}
        />
      </div>
    </div>
  )
}

export default TimersDashBoard