import React, { useState } from 'react'
import TimerForm from './TimerForm.tsx'
import Timer from './Timer.tsx'

interface Props {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: number | null
  
}

const EditableTimer = (props: Props) => {
  const [isEditFormOpen, setEditFormOpen] = useState<boolean>(false)
  if(isEditFormOpen){
    return(
      <TimerForm
        id={props.id}
        title={props.title}
        project={props.project}
      />
    )
  }else{
    return (
      <Timer 
        id={props.id}
        title={props.title}
        project={props.project}
        elapsed={props.elapsed}
        runningSince={props.runningSince}
      />
    )
  }
}

export default EditableTimer