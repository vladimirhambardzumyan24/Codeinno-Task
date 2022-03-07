import express from "express"
import fs from "fs"
import path from "path"


const app = express()
app.use(express.json())

app.get("/restaurants-data", (req, res) => {
    fs.promises.readFile(path.resolve("restaurantData.json"), "utf8").then((resp) => {
        res.send(resp)
    })
})
app.post("/restaurant-data", (req, res) => {
    fs.promises.readFile(path.resolve("restaurantData.json"), "utf8").then((resp) => {
        let rest = JSON.parse(resp)
        let restaurant = rest.restaurants.filter(item => item.id == req.body.id.id)
        res.send(restaurant)
    })
})

app.listen(process.env.PORT || 3003)