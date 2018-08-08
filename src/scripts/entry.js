"use strict"

function createEntry(title, content, date){
return `<h1>${title}</h1>
        <p>${content}</p>
        <p>${date}</p>`;
}

module.exports = createEntry;