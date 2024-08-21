import React, { useState } from 'react'
import TimerForm from './TimerForm.tsx'
import Timer from './Timer.tsx'

interface Props {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: number | null
  onFormSubmit: (attr: {
    id?: string, 
    title: string, 
    project: string
  }) => void
}

const EditableTimer = (props: Props) => {
  const [isEditFormOpen, setEditFormOpen] = useState<boolean>(false)

  const handleEditClick = () => {
    openForm()
  }

  const handleFormClose = () => {
    closeForm()
  }

  const handleSubmit = (timer: {id?: string, title: string, project: string}) => {
    props.onFormSubmit(timer)
    closeForm()
  }

  const openForm = () => {
    setEditFormOpen(true)
  }
  const closeForm = () => {
    setEditFormOpen(false)
  }
  if(isEditFormOpen){
    return(
      <TimerForm
        id={props.id}
        title={props.title}
        project={props.project}
        onFormSubmit={handleSubmit}
        onFormClose={handleFormClose}
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
        onEditClick={handleEditClick}
      />
    )
  }
}

export default EditableTimer