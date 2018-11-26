const Joi = require('joi')
const express = require('express')
const fs = require('fs')
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

app.put('/yoga/:id', (req, res) => {
    
    const id = req.params.id
    const oldPose = yogaData.find(pose => pose.id == id);
    // if (sanskrit_name) oldPose.sanskrit_name = sanskrit_name
    // if (english_name) oldPose.english_name = lucky_number
    // if (img_url) oldPose.img_url = img_url

    ["sanskrit_name", "english_name", "img_url"].forEach(key => {
        if (req.body[key]) oldPose[key] = req.body[key]
    })
    
    fs.writeFile('./data/yogaData.json', JSON.stringify(yogaData), err => console.log(err))

    res.json(yogaData)

    // if (!oldPosePose) {
    //     res.status(404).send("The yoga pose was not found.")
    // }  
    // else {
    //     res.send(yogaPose)
    // }

})

app.delete('/yoga/:id', (req, res) =>{
    let id = req.params.id
    const newYogaPoseArray = yogaData.filter(pose => {
        return pose.id != id
    })
    
    fs.writeFile('./data/yogaData.json', JSON.stringify(newYogaPoseArray), err => console.log(err))
    res.json(newYogaPoseArray)
})



app.listen(port, () => console.log(`listening on port ${port}`))