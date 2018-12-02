const express = require('express')
const app = express()
const port = 3000
const limelight = require('./limelight')

app.get('/songs/:songs', (req, res) => {
    const data = []
    limelight(req.params.songs.replace(/%20/g,' ')).then(function (result) {
        data.push(...result)
        res.send({data:data})
    })
})

app.get('/',(req,res)=>{
    res.send({
        success:true
    })
})


app.listen(port)