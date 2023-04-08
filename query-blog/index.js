import express from "express";
import cors from 'cors';

const app = express()

app.use(express.json())

app.use(cors())

const posts = {}

app.get('/posts', (req, res)=>{
    return res.send(posts)
})

app.post('/events', (req, res)=>{
    const {type, data} = req.body;
    if(type === 'postCreated'){
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }

    if(type === 'commentCreated'){
        const {postId, id, content} = data;
        const post = posts[postId]

        post?.comments?.push({id, content})
    }

    console.log(posts);

    return res.send('processed')

})

const PORT = 4002

app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`);
})

