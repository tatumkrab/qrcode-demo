const express = require('express');
const bodyParser = require("body-parser");
const qr = require('qr-image');
const ejs = require('ejs')
const fs = require('fs');

const app = express();

// Set view engine
app.set('view engine', 'ejs')

// Set static folder
app.use(express.static('./public'))

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res, next) => {
    res.render('index')
})

app.post('/qrcode', (req, res, next) => {
    // Get the text to generate QR code
    let qr_txt = req.body.qr_text;
    
    // Generate QR Code from text
    var qr_png = qr.imageSync(qr_txt,{ type: 'png'})

    // Generate a random file name 
    let qr_code_file_name = new Date().getTime() + '.png';

    fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {
        if(err){
            console.log(err);
        }
        
    })

    // Send the link of generated QR code
    res.send({
        'qr_img': "qr/" + qr_code_file_name
    });

});

app.listen('3000', () => console.log('Server started at port 300'))