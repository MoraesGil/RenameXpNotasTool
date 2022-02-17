var fs = require('fs');

const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

// Get path to file directory
const fileDirPath = resolve(__dirname, './');

// Get an array of the files inside the folder
const files = readdirSync(fileDirPath);

const config = {
    prefixToRemove: 'nota de ',
    fileType: '.pdf',
    sufixNewName: ' XP_Investimentos.pdf'
}

// Loop through each file that was retrieved 
files.forEach(file => {

    if (file.includes(config.fileType)) {

        const fileDateString = file.toLowerCase().replace(config.prefixToRemove, '').replace(config.fileType, '').trim();
        
        const maxLengthDateString = 10;
       
        if (fileDateString.length > maxLengthDateString) {
            console.log('already done: ', file);
            return;
        }
        const fileDateArray = fileDateString.split('-');
        const newName = `${fileDateArray[2]}-${fileDateArray[1]}-${fileDateArray[0]}${config.sufixNewName}`;
        console.log(' * renamed', file, 'to ', newName);

        rename(
            fileDirPath + `/${file}`,
            fileDirPath + `/${newName}`,
            err => err ? console.log(err) : ''
        )
    } else {
        console.log('not valid file >> ', file)
    }
});
