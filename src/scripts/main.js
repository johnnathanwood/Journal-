const FormManager = require("./JournalForm")
const journalData = require("./DataManager")
const journalBuilder = require("./JournalList")

document.querySelector("#journalForm").innerHTML = FormManager.buildFormTemplate()

journalBuilder.journalLister().then(string => {
    document.querySelector("#journalEntry").innerHTML = string
})



document.querySelector("#saveEntryButton").addEventListener("click", () => {
    function dateFunction() {
        let d = new Date();
        let n = d.toString();
        return n
    }

    const newEntry = {
        title: document.querySelector("#entryTitle").value,
        content: document.querySelector("#entryContent").value,
        date: dateFunction()
    }

    journalData.saveJournalEntry(newEntry)

        .then(() => {
            FormManager.clearForm()
        })

        .then(
            location.reload()
        )
})


document.querySelector("#journalEntry").addEventListener("click", (event) => {
    let buttonId = event.target.id
    journalBuilder.nuke(buttonId)
    location.reload()
})


var d = Date(Date.now());
d.toString()