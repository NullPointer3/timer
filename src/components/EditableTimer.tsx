import React from 'react'
import TimerForm from './TimerForm.tsx'
import Timer from './Timer.tsx'

interface Props {
  title: string
  project: string
  elapsed: number
  runningSince: number | null
  editFormOpen: boolean
}

const EditableTimer = (props: Props) => {
  if(props.editFormOpen){
    return(
      <TimerForm 
        title={props.title}
        project={props.project}
      />
    )
  }else{
    return (
      <Timer 
        title={props.title}
        project={props.project}
        elapsed={props.elapsed}
        runningSince={props.runningSince}
      />
    )
  }
}

export default EditableTimer