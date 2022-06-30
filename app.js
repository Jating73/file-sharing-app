require("dotenv").config()
const multer = require("multer")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const File = require("./models/File")
const dbConfig = require('./database/dbHandler');

let port = process.env.PORT || 5000;

const express = require("express")
const app = express();

app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: "uploads/" })

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/upload", upload.single("file"), async (req, res) => {
    const fileData = {
        path: req.file.path,
        original_name: req.file.originalname,
    }
    if (req.body.password != null && req.body.password !== "") {
        fileData.password = await bcrypt.hash(req.body.password, 10)
    }

    const file = await File.create(fileData)

    res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` })
});


app.route("/file/:id").get(handleDownload).post(handleDownload)

async function handleDownload(req, res) {
    const file = await File.findById(req.params.id)

    if (file.password != null) {
        if (req.body.password == null) {
            res.render("download")
            return
        }

        if (!(await bcrypt.compare(req.body.password, file.password))) {
            res.render("download", { error: true })
            return
        }
    }

    file.download_count++
    await file.save();

    res.download(file.path, file.original_name)
}


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})