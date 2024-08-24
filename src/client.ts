interface Timer {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: number | null
}

interface ApiResponse<T> {
  data: T
  error?: string
}

export const getTimers = (success: (timers: Timer[]) => void)=> {
  return fetch('http://localhost:3001/api/timers', {
    headers: {
      "Accept": "application/json"
    },
  }).then(checkStatus)
    .then(timers_1 => {
      success(timers_1)
    })
    .catch(err => {
      console.error("Failed Fetching Data", err)
    })
}

export const startTimerClient = (data: { id: string, start: number }) => {
  return fetch('http://localhost:3001/api/timers/start', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then(checkStatus)
    .catch(err => {
      console.error("Failed To Start Timer", err)
    })
}

export const stopTimerClient = (data: { id: string, stop: number}) => {
  return fetch('http://localhost:3001/api/timers/stop', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }).then(checkStatus)
    .catch(err => {
      console.error("Failed to stop Timer", err)
    })
}

export const createTimerClient = (data: Timer): Promise<Timer[]> => {
  return fetch('http://localhost:3001/api/timers', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(checkStatus)
}

export const deleteTimerClient = (data: string) => {
  return fetch('http://localhost:3001/api/timers', {
    method: 'delete',
    body: JSON.stringify(data),
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json"
    }
  }).then(checkStatus)
}

const checkStatus = async (response: Response): Promise<any> => {
  if(!response.ok){
    const errorText = response.text()
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
  }
  return await response.json()
}