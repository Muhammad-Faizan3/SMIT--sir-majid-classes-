// console.log('hello world');

// const num1 = 100;
// const num2 = 200;
// console.log(num1+num2);

import fs from 'fs'

const createFile = () => {
    console.log('createFile');
    fs.writeFileSync('name.txt','muhammad Faizan')
    
}
// createFile()


// IIFE (Immediately Invoked Function Expressions)
const readFile =(() => {
    // console.log('readFile');
  const data =  fs.readFileSync("./name.txt","utf-8")
  console.log(data);
  
    
})()