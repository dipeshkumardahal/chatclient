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
const response = openai.listEngines();


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