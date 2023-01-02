const OpenAi = require('openai');
const { Configuration, OpenAIApi } = OpenAi;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-VuN5YzR3dwIVLveHbicx9Szz",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors());

app.post('/', async(req,res)=>{
    const {message} = req.body;
    const response =  await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt": `${message}`,
        "max_tokens": 500,
        "temperature": 0,
    });
    console.log(response.data);
    if(response.data){
        if(response.data.choices[0].text){
            res.json({
                message: response.data.choices[0].text
            });
        }
    }
});
app.listen(port,()=>{
    console.log("app listening")
})