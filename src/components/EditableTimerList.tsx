import React from 'react'
import EditableTimer from './EditableTimer.tsx'

interface Timer {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: null | number
}

interface Props {
  timers: Timer[]
}

const EditableTimerList = (props: Props) => {
  const timers  = props.timers.map((timer, i) => (
    <EditableTimer 
      key={i}
      id={timer.id}
      title={timer.title}
      project={timer.project}
      elapsed={timer.elapsed}
      runningSince={timer.runningSince}
    />
  ))
  return (
    <div className="grid space-y-8">
      {timers}
    </div>
  )
}

export default EditableTimerList