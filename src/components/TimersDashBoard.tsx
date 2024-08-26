import React, { useEffect, useState } from 'react'
import EditableTimerList from './EditableTimerList.tsx'
import ToggleableTimerForm from './ToggleableTimerForm.tsx'
import { newTimer } from '../helpers.ts'
import { 
  getTimers, 
  startTimerClient, 
  stopTimerClient,
  createTimerClient,
  deleteTimerClient,
  updateTimerClient
} from '../client.ts'

interface Timer {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: null | number
}

const TimersDashBoard = () => {
  const [timers, setTimers] = useState<Timer[]>([])

  useEffect(() => {
    getTimers((fetchedTimers) => {
      setTimers(fetchedTimers);
    });
  },[timers]);

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
    updateTimerClient(attr)
  }

  const handleTrashClick = (timerId: string) => {
    deleteTimer(timerId)
  }

  const deleteTimer = (timerId: string) => {
    setTimers(prev => (
      prev.filter(t => t.id !== timerId)
    ))
    deleteTimerClient(timerId)
    .then(() => {
      console.log("Timer successfully Deleted")
    })
    .catch(err => {
      console.error("Failed to delete Timer", err)
    })
  }

  const createTimer = (timer: {title: string, project: string}) => {
    const t = newTimer(timer)
    setTimers(prev => prev.concat(t))
    createTimerClient(t)
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
    startTimerClient({
      id: timerId,
      start: Date.now()
    }).then(() => {
      console.log('Timer started Successfully')
    }).catch(err => {
      console.error('Fail to start Timer', err)
    })
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
    stopTimerClient({
      id: timerId, 
      stop: now
    }).then(() => {
      console.log("Timer stopped")
    }).catch(err => {
      console.error("Failed to stop timer", err)
    })
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