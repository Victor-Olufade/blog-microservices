import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express()

app.use(express.json())

app.use(cors())

app.post('/events',  (req, res)=>{
    const event = req.body;
    
         axios.post('http://localhost:4000/events', event)
     
         axios.post('http://localhost:4001/events', event)

         axios.post('http://localhost:4002/events', event)
   
    return res.send({status: 'OK'})
})

const PORT = 4005

app.listen(PORT, ()=>{
    console.log(`event-bus listening on ${PORT}`);
})