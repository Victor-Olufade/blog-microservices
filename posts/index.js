import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors'
import axios from 'axios'

const app = express()


app.use(express.json())

app.use(cors())

const posts = {}

app.get('/post', (req, res)=>{
    res.send(posts)
})

app.post('/events', (req, res)=>{
    console.log('Received Event', req.body.type);

    return res.send(req.body.type)
})


app.post('/post', async (req, res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id,
        title
    }

    try {
        await axios.post('http://localhost:4005/events', {
            type: 'postCreated',
            data: {
                id,
                title
            }
        })
    } catch (error) {
        console.log(error);
    }

    return res.status(201).json(posts[id])
})

const PORT = 4000;

app.listen(PORT, ()=>{
    console.log(`posts listening on port ${PORT}`);
})