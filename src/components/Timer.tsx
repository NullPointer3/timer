import React from 'react'
import { renderElapsedString } from '../helpers.ts'
import { FaEdit, FaTrash } from 'react-icons/fa'

interface Props {
  title: string
  project: string
  elapsed: number
  runningSince: number | null
}

const Timer = (props: Props) => {
  const elapsedString = renderElapsedString(props.elapsed, props.runningSince)
  return (
    <div className="">
      <div>
        <p>
          {props.title}
        </p>
        <p>
          {props.project}
        </p>
        <div>
          <h2>{elapsedString}</h2>
        </div>
        <div>
          <span>
            <FaEdit/>
          </span>
          <span>
            <FaTrash/>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Timer