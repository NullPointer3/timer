import React from 'react'
import EditableTimer from './EditableTimer.tsx'

const EditableTimerList = () => {
  return (
    <div className="grid space-y-8">
      <EditableTimer
        title='Learn React'
        project='Web Domination'
        elapsed= {8986300}
        runningSince={null}
        editFormOpen={false}
      />
      <EditableTimer
        title='Learn React'
        project='Web Domination'
        elapsed={3902120}
        runningSince={null}
        editFormOpen={true}
      />
    </div>
  )
}

export default EditableTimerList