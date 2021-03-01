
const express = require('express');
const Eliza = require('eliza-as-promised');
const app = express();
const port = 3000

 
var eliza = new Eliza(); 

app.get("/",(req, res) => {
    res.send(
        "welcome to the ELIZA API\n. The API has one route */any_prompt* "
    )
})

app.get('/:prompt', (req, res) => {
    
    const prompt = req.params.prompt;

    eliza.getResponse(prompt).then((response) => {
        if (response.reply) {
            // console.log('>> ' + response.reply);
            
            res.json({"response":response})
        }
        if (response.final) {
            // console.log('>>> ' + response.final);
            res.json({"response":response.final})
        }
    });
})

app.listen(process.env.PORT||port, () => {
    console.log(`ELIZA Server listening on ${port}`)
})