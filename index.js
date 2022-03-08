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
        let restaurant = rest.filter(item => item.id == req.body.id)
        res.send(restaurant)
    })
})

app.post("/add-feedback", (req, res) => {
    fs.promises.readFile(path.resolve("restaurantData.json"), "utf8").then((resp) => {
        let rest = JSON.parse(resp)
        let restaurants = rest.map((item) => {
            if (item.id == req.body.id) {
                item.reviews = [
                    ...item.reviews,
                    { comments: req.body.comments }
                ]
            }
            return item
        })
        fs.promises.writeFile(path.resolve("restaurantData.json"), JSON.stringify(restaurants, undefined, 2)).then(() => {
            res.send("ok")
        })
    })
})


app.listen(process.env.PORT || 3003)