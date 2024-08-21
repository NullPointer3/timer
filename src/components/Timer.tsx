import React from 'react'
import { renderElapsedString } from '../helpers.ts'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface Props {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: number | null
}

const Timer = (props: Props) => {
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
          className="text-gray-400 text-xl ">
          <FaEdit/>
        </span>
        <span 
          className="text-gray-400 text-xl cursor-pointer">
          <FaTrash/>
        </span>
      </div>
      <button 
        type="button" 
        className="w-full border-[1px] border-green-500 rounded-b-md shadow-sm">
        Start
      </button>
    </div>
  )
}

export default Timer