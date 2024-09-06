const path = require('node:path');
const fs = require('node:fs/promises');


const foo = async () => {
    try {
        const pathToDir = path.join(__dirname, 'baseFolder');
        await fs.mkdir(pathToDir, {recursive: true});

        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

        await Promise.all(folderNames.map(async (folder) => {
            const folderPath = path.join(pathToDir, folder);
            const ddd = await fs.mkdir(folderPath, {recursive: true});
            console.log(ddd)
            await Promise.all(fileNames.map(async (file) => {
                const filePath = path.join(folderPath, file);
                await fs.writeFile(filePath, 'Hello World!');
            }));
        }));

        const data = await fs.readdir(pathToDir);
        for (const folder of data) {
            const folderPath = path.join(pathToDir, folder);
            const stat = await fs.stat(folderPath);
            console.log(`Folder: ${folder}, isDirectory: ${stat.isDirectory()}`);

            const files = await fs.readdir(folderPath);
            for (const file of files) {
                const pathToFile = path.join(folderPath, file);
                const fileStat = await fs.stat(pathToFile);
                console.log(`File: ${file}, isFile: ${fileStat.isFile()}`);
            }
        }
    } catch (e) {
        console.error(e.message);
    }
}


void foo();


// const fs = require('node:fs/promises');
// const path = require("node:path");
//
// const homeWork = async () => {
//     const baseFolder = path.join(__dirname, 'baseFolder')
//     await fs.mkdir(baseFolder, {recursive: true});
//
//     for (let i = 1; i < 6; i++) {
//         const currentFolder = path.join(baseFolder, `folder-${i}`)
//         await fs.mkdir(currentFolder, {recursive: true});
//
//         for (let j = 1; j < 6; j++) {
//             await fs.writeFile(path.join(currentFolder, `baseFile-${j}`), 'aaaaaaaaaaaaaaaa')
//         }
//     }
//
// }
//
// void homeWork()
