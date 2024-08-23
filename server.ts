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
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

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
  const { id, start }: { id: string, start: string} = req.body
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      console.error("Error reading data")
      return res.status(500).json({err: 'Failed to read the JSON file'})
    }

    // Parse JSON file
    try{
      const timers: Timer[] = JSON.parse(data.toString())
      timers.forEach(timer => {
        if(timer.id === id && !timer.runningSince){
          timer.runningSince = parseInt(start)
        }
      })
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.json({message: "Timer is Started"});
      })

    }catch(parseError){
      console.error('Error Parsing the JSON data', parseError)
      return res.status(500).json({message: "Internal Server Error"})
    }
  })
})

app.post('/api/timers/stop', (req, res) => {
  const { id, stop }: { id: string, stop: string} = req.body
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      console.error("Error reading file")
      return res.status(500).json({message: "Internal Server Error"})
    }

    try{
      const timers: Timer[] = JSON.parse(data.toString())
      timers.forEach(timer => {
        if(timer.id === id && timer.runningSince !== null){
          const delta = parseInt(stop) - timer.runningSince
          timer.elapsed += delta
          timer.runningSince = null
        }
      })
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.status(200).json({message: "Timer successfully stopped"})
      })
    }catch(parseErr){
      console.error("Failed Parsing the JSON file", parseErr)
      return res.status(500).json({message: "Internal Server Error"})
    }
  })
})

app.put('/api/timers', (req, res) => {
  const { id, title, project}: {id: string, title: string, project: string} = req.body
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      console.error("Failed Reading File")
      return res.status(500).json({message: "Internal Server Error"})
    }

    try{
      const timers: Timer[] = JSON.parse(data.toString())
      timers.forEach(timer => {
        if(timer.id === id){
          timer.title = title,
          timer.project = project
        }
      })
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.status(200).json({message: "Timer Updated"})
      })
    }catch(parseError){
      console.error('Error Parsing the JSON file', parseError)
      return res.status(500).json({error: "Internal Server Error"})
    }
  })
})

app.delete('/api/timers', (req, res) => {
  const { id } : {id: string} = req.body
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      console.error("Error reading Data", err)
      return res.status(500).json({err: "Internal Server Error"})
    }

    try{
       let timers: Timer[] = JSON.parse(data.toString())

      const originalLength = timers.length

      timers = timers.filter(timer => timer.id !== id)
      if(timers.length === originalLength){
        res.status(404).json({error: "Timer not found"})
      }
      fs.writeFile(DATA_FILE, JSON.stringify(timers, null, 4), () => {
        res.status(200).json({message: "Timer is Deleted"})
      })
    }catch(parseError) {
      console.error("Error Parsing the JSON data")
      return res.status(500).json({err: "Internal Server Error"})
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at http://localhost:${app.get('port')}`)
})