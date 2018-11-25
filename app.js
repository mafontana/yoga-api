const express = require('express')
const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
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

app.post('/yoga', (req, res) => {
    const poseIds = yogaData.map(pose=> pose.id);
    const pose = {
        id: poseIds.length + 1,
        "sanskrit_name": req.body.sanskrit_name,
        "english_name": req.body.english_name,
        "img_url": req.body.img_url
    }
    yogaData.push(pose)
    res.send(yogaData)
})





app.listen(port, () => console.log(`listening on port ${port}`))