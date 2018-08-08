const FormManager = require("./JournalForm")
const saveJournalEntry = require("./DataManager")

document.querySelector("#journalForm").innerHTML = FormManager.renderEntryForm()

document.querySelector("#saveEntryButton").addEventListener("click", () => {

    // document.querySelector("#entryTitle").value
    // document.querySelector("#entryContent").value

    const newEntry = {
        title: document.querySelector("#entryTitle").value,
        content: document.querySelector("#entryContent").value,
        date: Date.now()

    }

    saveJournalEntry (newEntry)
    .then(() => {
        FormManager.clearForm()
    })
})
