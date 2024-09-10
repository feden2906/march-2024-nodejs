const fs = require('node:fs/promises');
const path = require('node:path');

module.exports = {
    read: async () => {
        try {
            const pathToFile = path.join(__dirname, 'db.json');
            const data = await fs.readFile(pathToFile, 'utf-8');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.log('Ошибка записи', e.message);
        }

    },

    write: async (users) => {
        try {
            const pathToFile = path.join(__dirname, 'db.json');
            await fs.writeFile(pathToFile, JSON.stringify(users));
        } catch (e) {
            console.log('Ошибка записи', e.message);
        }
    }
}

// const usersFilePath = path.join(__dirname, 'users.json');
// fs.writeFile(usersFilePath, JSON.stringify(users, null), (err) => {
//     if (err) {
//         console.log('Ошибка записи', err);
//     } else {
//         console.log('Данные успешно записаны');
//     }
// })
