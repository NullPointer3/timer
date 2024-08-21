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
  onFormSubmit: (attr: {id?: string, title: string, project: string}) => void
  onTrashClick: (timerId: string) => void
  onStartClick: (timerId: string) => void
  onStopClick: (timerId: string) => void 
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
      onFormSubmit={props.onFormSubmit}
      onTrashClick={props.onTrashClick}
      onStartClick={props.onStartClick}
      onStopClick={props.onStopClick}
    />
  ))
  return (
    <div className="grid space-y-8">
      {timers}
    </div>
  )
}

export default EditableTimerList