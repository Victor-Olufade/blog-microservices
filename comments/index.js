import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(express.json())

app.use(cors())

const commentsAndPosts = {};

app.get('/post/:id/comments', (req, res)=>{
    const postId = req.params.id;
    return res.status(200).json(commentsAndPosts[postId])
})

app.post('/post/:id/comments', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const {content} = req.body;

    const comments = commentsAndPosts[postId] || [];
    comments.push({id: commentId, content})
    commentsAndPosts[postId] = comments;

    try {
        await axios.post('http://localhost:4005/events', {
            type: 'commentCreated',
            data: {
                id: commentId,
                content,
                postId
            }
        })
    } catch (error) {
        console.log(error);
    }
    return res.status(201).json(comments)
})

const PORT = 4001;

app.listen(PORT, ()=>{
    console.log(`comments listening on port ${PORT}`);  
})