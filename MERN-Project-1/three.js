const fs = require('fs');
const { text } = require('stream/consumers');
// To Create the files
fs.createWriteStream('./dummy.txt',text);
// To Write the content
fs.appendFileSync('./dummy.txt','Hello Praveen Kumar yadav')
// To append the content by creating text
fs.appendFileSync('./one.txt','my name is k.praveen kumar yadav');
// To Read the files
let boom=fs.readFileSync('./one.js',{encoding:'utf-8'});
console.log(boom)
// To remove the files
fs.unlinkSync('./one.txt');
// To create files
fs.createWriteStream('./one.txt',text)

// To create file
fs.mkdirSync('files')
// to remove file
fs.rmdirSync('./files');
