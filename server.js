
const express = require('express');
const Eliza = require('eliza-as-promised');
const app = express();
const port = 3000

 
var eliza = new Eliza(); 

app.get("/",(req, res) => {
    res.send("welcome to the API")
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

    console.log(eliza.getResponse())

})

app.listen(process.env.PORT||port, () => {
    console.log(`ELIZA Server listening on ${port}`)
})