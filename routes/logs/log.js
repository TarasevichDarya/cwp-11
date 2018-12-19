const express = require('express');
const router = express.Router();
const fs = require('fs');

let LogPath = './logs.txt';
let File;

fs.open(LogPath, 'w', (err, fd) => {
    File = fd;
});

router.get('*', (req, res) => {
    fs.readFile(LogPath, (err, data) => {
        res.end(data.toString());
    })
});

function log(text) {
    fs.appendFile(File, `${(new Date()).toLocaleString()}: \r\n${text}\r\n`, (e) => { 
    	if (e) console.log(`Error append: ${e}`) 
    });
}

module.exports = { router, log };