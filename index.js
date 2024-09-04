const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const readline = require('node:readline/promises');
const EventEmitter = require('node:events');
const os = require('os');


const {foo: helperFoo} = require('./helpers/helper');

const foo = async () => {
    //Http
    const server = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            data: 'Hello World!',
        }));
    });
    server.listen(3000);

    // Path
    const pathToFile = __filename;
    console.log(pathToFile)
    console.log(path.dirname(pathToFile))
    console.log(path.extname(pathToFile))
    console.log(path.basename(pathToFile))
    console.log(path.parse(pathToFile))
    console.log(path.isAbsolute(pathToFile))
    console.log(path.isAbsolute('./Lessons/march-2024'))

    // Readline
    const rlInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const name = await rlInstance.question('Name?');
    console.log(`Your name is ${name}`)
    process.exit(0)

    // FS
    const pathToFile = path.join(__dirname, 'test.txt');
    await fsPromises.writeFile(pathToFile, 'Hello World!\n')
    const data = await fsPromises.readFile(pathToFile, 'utf-8')
    console.log(data);
    await fsPromises.appendFile(pathToFile, 'Some new data')
    await fsPromises.mkdir(path.join(__dirname, 'new-folder'), {recursive: true})
    // await fsPromises.mkdir(path.join(__dirname, 'new-folder', 'another-folder', 'another-folder'))
    // await fsPromises.mkdir(path.join(__dirname, 'new-folder', 'another-folder', 'another-folder'), {recursive: true})
    // await fsPromises.rm(path.join(__dirname, 'new-folder'), {recursive: true})

    // await fsPromises.unlink(pathToFile) // delete file
    // await fsPromises.rename(pathToFile, path.join(__dirname, 'new-folder', 'new-file.txt'))
    await fsPromises.copyFile(pathToFile, path.join(__dirname, 'new-folder', 'new-file.txt'))
    const stat = await fsPromises.stat(pathToFile)
    console.log(stat.isFile())

    // Streams
    const pathToFile = path.join(__dirname, '25900.pdf');
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(path.join(__dirname, 'new-big-file.pdf'));
    // readStream.on('data', (chunk) => {
    //     console.log('chunk', chunk.length)
    //     writeStream.write(chunk)
    // })
    readStream.pipe(writeStream);

    // Events
    const emitter = new EventEmitter();
    emitter.on('event2', () => {
        console.log('Event happened')
    })
    emitter.emit('event2')
    emitter.emit('event2')
    emitter.emit('event2')
    emitter.emit('event2')
    emitter.emit('event2')
    emitter.emit('event2')
    emitter.once('event2', (...args) => {
        console.log('________________');
        console.log('Event 1 happened');
        console.log(args)
        console.log('________________');
    })
    emitter.on('event2', (...args) => {
        console.log('Event 2 happened')
        console.log(args)
    })
    emitter.emit('event2', 'Hello', 345, 44)
    emitter.emit('event2')
    emitter.emit('event2', 555)

    // OS
    console.log(os.arch());
    console.log(os.cpus());
    console.log(os.totalmem() / 1024 / 1024 / 1024, 'gb');
    console.log(os.freemem() / 1024 / 1024 / 1024, 'gb');
    console.log(os.homedir());
    console.log(os.hostname());
    console.log(os.platform());
    console.log(os.userInfo());
}


void foo();
