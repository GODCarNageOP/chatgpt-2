// IMPORT //
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import env from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';

// CONST //
const app = express()

// ENV //
env.config()

app.use(cors())
app.use(bodyParser.json())

// CONFIGURE OPEN API //
const configuration = new Configuration({
    organization: "org-S7hJVcwB16f8LDgwxy3tfP24",
    apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(configuration)


// LISTENING //
app.listen("3080", ()=> console.log("listening on port 3080"))


// DUMMY ROUTE TO TEST //
app.get("/", (req, res) => {
    res.send("Hello World!")
})

// POST ROUTE FOR MAKING REQUEST //
app.post('/', async(req, res) => {
    const {message} = req.body

    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 2048,
            temperature: .9
        })
res.json({message: response.data.choices[0].text})

    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})