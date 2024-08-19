import { v4 as uuidv4 } from 'uuid'

export const newTimer = (attr: {title: string, project: string}) => {
  const timer = {
    id: uuidv4(),
    titile: attr.title || 'Title',
    project: attr.project || 'Project',
    elapsed: 0 
  }
  return timer
}

export const renderElapsedString = (elapsed: number, runningSince: number | null) => {
  let totalElapsed = elapsed
  if(runningSince) {
    totalElapsed += Date.now() - runningSince
  }
  return millisecondsToHuman(totalElapsed)
}

const millisecondsToHuman = (ms: number) => {
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / 1000 / 60) % 60)
  const hours = Math.floor(ms / 1000 / 60 / 60)

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
}

const pad = (numberString: string, size: number) => {
  let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded
}