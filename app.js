const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    fs.readdir('./hisaab', function (err, files) {
        if (err) {
            return next(err); // Use next to pass the error to the error handler
        }
        res.render('index', { files: files });
    });
});

app.get('/create', (req, res, next) => {
    res.render('create');
})

app.get('/edit/:filename', (req, res, next) => {
    fs.readFile(`./hisaab/${req.params.filename}`,"utf-8", function (err,filedata){
        if (err) {
            return next(err); // Use next to pass the error to the error handler
        }
        res.render('edit',{ filedata, filename: req.params.filename});
    });
    
})

app.get('/hisaab/:filename', (req, res, next) => {
  fs.readFile(`./hisaab/${req.params.filename}`,"utf-8", function (err, filedata){
    if (err) {
        return next(err); // Use next to pass the error to the error handler
    }
    res.render("hisaab", { filedata, filename: req.params.filename});
    });  
});
 

app.post('/update/:filename', (req, res, next) => {
    fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, function (err){
        if (err) {
            return next(err); // Use next to pass the error to the error handler
        }
        res.redirect('/');
    });  
})

app.post('/createhisaab', (req, res, next) => {
    var currentDate = new Date();                 //month is count to 0 for this we use +1
    var date = `${currentDate.getDate()}-${currentDate.getMonth()+1}-${currentDate.getFullYear()}`

    fs.writeFile(`./hisaab/${date}.txt`, req.body.content, function (err) {
        if (err) {
            return next(err); // Use next to pass the error to the error handler
        }
        res.redirect('/');
    });
    //console.log(currentDate);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


