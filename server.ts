import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4} from 'uuid'

interface Timer {
  id: string
  title: string
  project: string
  elapsed: number
  runningSince: number | null
}

const app = express()

const DATA_FILE = path.join(__dirname, 'data.json')

app.set('port', (process.env.PORT || 3001))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/timers', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      console.error("error reading data")
      return res.status(500).json({err: "Failed to read data from file"})
    }
    // Parse data
    let timers: Timer[];
    try{
      timers = JSON.parse(data.toString()) as Timer[]
    }
    catch(parseError){
      console.error("Error parsing the data", parseError)
      return res.status(500).json({error: "Failed to parse the data"})
    }
    res.status(200).json(timers)
  })
})

app.post('/api/timers', (req, res) => {
  const { title, project }: { title: string, project: string} = req.body
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      console.error("Error Reading data")
      return res.status(500).json({err: "Failed to read data from file"})
    }

    // Parse JSON Data
    let timers: Timer[]
    try{
      timers = JSON.parse(data.toString())
      const newTimer = {
        id: uuidv4(),
        title: title,
        project: project,
        elapsed: 0,
        runningSince: null
      }
      timers.push(newTimer)
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.setHeader('Cache-control', 'no-cache')
        res.status(200).json({message: "Post request successful"})
      })
    }catch(parseError){
      console.error('Error parsing the data', parseError)
      res.status(500).json({err: "Failed to parse the data"})
    }
  })
})

app.post('/api/timers/start', (req, res) => {
  const {id, start}: { id: string, start: number} = req.body 
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      console.error("Error reading data")
      return res.status(500).json({err: 'Failed to read the JSON file'})
    }

    // Parse JSON file
    try{
      const timers: Timer[] = JSON.parse(data.toString())
      timers.forEach(timer => (
        timer.id === id && !timer.runningSince ? {...timer, runningSince: start} : timer 
      ))
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.json({message: "Timer is Started"});
      })

    }catch(parseError){
      console.error('Error Parsing the JSON data', parseError)
      return res.status(500).json({message: "Internal Server Error"})
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at http://localhost:${app.get('port')}`)
})