const http = require('node:http');
const path = require('node:path');
const readline = require('node:readline/promises');

const {foo: helperFoo} = require('./helpers/helper');

const foo = async () => {
    //Http
    // const server = http.createServer((req, res) => {
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify({
    //         data: 'Hello World!',
    //     }));
    // });
    // server.listen(3000);

    // Path
    // const pathToFile = __filename;
    // console.log(pathToFile)
    // console.log(path.dirname(pathToFile))
    // console.log(path.extname(pathToFile))
    // console.log(path.basename(pathToFile))
    // console.log(path.parse(pathToFile))
    // console.log(path.isAbsolute(pathToFile))
    // console.log(path.isAbsolute('./Lessons/march-2024'))

    // Readline
    const rlInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const name = await rlInstance.question('Name?');
    console.log(`Your name is ${name}`)
    process.exit(0)

}

void foo();
