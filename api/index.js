const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer')
const path = require('path')

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connection à mongoDB réussi')).catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination:(req, file, callBack) => {
        callBack(null, "images")
    },filename:(req, file, callBack) => {
        callBack(null, req.body.name);
    }
});

const upload = multer({storage:storage})
app.post('/api/upload', upload.single('file'), (req,res) => {
    res.status(200).json("File has been uploaded");
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.listen(process.env.PORT, () => {
    console.log(`Backend is running on port ${process.env.PORT}`);
})