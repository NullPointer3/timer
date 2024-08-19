import React from 'react'

interface Props {
  title?: string,
  project?: string
}

const TimerForm = (props: Props) => {
  const submitText = props.title ? "Update" : "Create"
  return (
    <div>
      <div>
        <div>
          <label>Title</label>
          <input placeholder="title" type="text" defaultValue={props.title} />
        </div>
        <div>
          <label>Project</label>
          <input type="text" placeholder="project" defaultValue={props.project}/>
        </div>
        <div>
          <button type="button">{submitText}</button>
          <button type="button">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default TimerForm