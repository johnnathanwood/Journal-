
const journalEntry = (result) => {


    return `<fieldset class="entryField">
        <h3 class="entryTitle">${result.title}</h3>
        <p class="entryContent">${result.content}</p>
        <label>${result.date}</label>
        <button id=${result.id} class="deleteButton">Delete</button>
    </fieldset>
`
}
module.exports = journalEntry