
const express= require('express')
const app= express();
const port= 3000
const tasks= require('./routes/tasks.js')
require('dotenv').config();
const mongoDB= require('./db/connect.js')
const notFound= require('./middlewares/not-found')
//middlewares
app.use(express.static('./public'))
app.use(express.json())

// app.get('/hello',(req,res)=>{
//     res.send('Task Manager App')
// })

app.use('/api/v1/tasks',tasks)
app.use(notFound)

const start= async ()=>{
    try {
        await mongoDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`listening on port ${port}....`);
        })

    } catch (error) {
        console.log(error);
    }
}

start()
