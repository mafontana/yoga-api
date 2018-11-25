const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const yogaData = require('./data/yogaData')

app.get('/yoga', (req, res) => {
    res.send(yogaData)
})


app.get('/yoga/:id', (req, res, next) => {
    let id = req.params.id
    var yogaPose = yogaData.find(pose => {
        return pose.id == id
    })
    if (!yogaPose) {
        res.status(404).send("The yoga pose was not found.")
    }  
    else {
        res.send(yogaPose)
    }
}) 







app.listen(port, () => console.log(`listening on port ${port}`))