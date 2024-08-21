import React from 'react'

interface Props {
  isRunning: boolean
  onStartClick: () => void
  onStopClick: () => void
}

const TimerActionButton = (props: Props) => {
  if(props.isRunning){
    return(
      <button 
        type='button'
        className="w-full border-[1px] border-red-500 rounded-b-md shadow-sm"
        onClick={props.onStopClick}
      >
        Stop
      </button>
    )
  }else{
    return(
      <button 
        type='button'
        className="w-full border-[1px] border-green-500 rounded-b-md shadow-sm"
        onClick={props.onStartClick}
      >
        Start
      </button>
    )
  }
}

export default TimerActionButton