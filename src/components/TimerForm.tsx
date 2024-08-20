import React from 'react'

interface Props {
  title?: string,
  project?: string
}

const TimerForm = (props: Props) => {
  const submitText = props.title ? "Update" : "Create"
  return (
    <div className="grid border-[1px] border-gray-400 rounded-md h-[250px] w-[300px] shadow-sm">
      <div className="grid">
        <div className="grid pt-2 px-4">
          <label className="text-[16px]">Title</label>
          <input
            className="text-[16px] px-2 py-1 outline-none border-[1px] border-gray-400 rounded-md" 
            placeholder="title" 
            type="text" 
            defaultValue={props.title} 
          />
        </div>
        <div className="grid pt-2 px-4"> 
          <label className="text-[16px]">Project</label>
          <input
            className="text-[16px] px-2 py-1 outline-none border-[1px] border-gray-400 rounded-md" 
            type="text" 
            placeholder="project" 
            defaultValue={props.project}/>
        </div>
        <div 
          className="flex justify-center mt-4 w-full">
          <button
            className="w-[1/2] border-[1px] border-blue-400" 
            type="button"
          >
            {submitText}
          </button>
          <button type="button">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default TimerForm