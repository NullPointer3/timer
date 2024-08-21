import React, { useEffect, useState } from 'react'
import { renderElapsedString } from '../helpers.ts'
import { FaEdit, FaTrash } from 'react-icons/fa'
import TimerActionButton from './TimerActionButton.tsx'

interface Props {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: number | null
  onEditClick: () => void
  onTrashClick: (timerId: string) => void
  onStartClick: (timerId: string) => void
  onStopClick: (timerId: string) => void
}

const Timer = (props: Props) => {

  const [seconds, setSeconds] = useState(props.elapsed)

  const handleTrashClick = () => {
    props.onTrashClick(props.id)
  }

  const handleStartClick = () => {
    props.onStartClick(props.id)
  }

  const handleStopClick = () => {
    props.onStopClick(props.id)
  }

  useEffect(() => {
    const interval = setTimeout(() =>{
      setSeconds(prev => prev + 1)
    },1000)

    return () => clearInterval(interval)
  },[seconds])

  const elapsedString = renderElapsedString(props.elapsed, props.runningSince)
  return (
    <div 
      className="grid border-[1px] border-gray-400 rounded-md h-[250px] w-[300px] shadow-sm">
      <div 
        className="text-lg text-gray-500 p-4">
        <p>
          {props.title}
        </p>
        <p>
          {props.project}
        </p>
      </div>
      <div 
        className="flex justify-center items-center">
        <h2 
          className=" text-3xl font-semibold">
          {elapsedString}
        </h2>
      </div>
      <div 
        className="flex justify-end items-end space-x-2 p-4">
        <span 
          className="text-gray-400 text-xl "
          onClick={props.onEditClick}
        >
          <FaEdit/>
        </span>
        <span 
          className="text-gray-400 text-xl cursor-pointer"
          onClick={handleTrashClick}
        >
          <FaTrash/>
        </span>
      </div>
      <TimerActionButton 
        isRunning={!!props.runningSince}
        onStartClick={handleStartClick}
        onStopClick={handleStopClick}
      />
    </div>
  )
}

export default Timer