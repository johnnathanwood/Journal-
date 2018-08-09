const journalEntry = require("./JournalLayout")
const journalData = require("./DataManager")

const journalBuilder = Object.create(null, {
    journalLister: {
        value: () => {
            return journalData.loadJournalEntry()
                .then((result) => {
                    result.reverse()
                    let string = ""
                    for (let i = 0; i < result.length; i++) {
                        const element = result[i]
                        string += journalEntry(element)
                    }
                    return string
                })
        }
    },
    nuke: {
        value: (buttonId) => {
            journalData.deleteEntry(buttonId)
        }
    },
    reloadEntries: {
        value: () => {
            document.querySelector("#journalEntry").value = ""
        }
    }
})


module.exports = journalBuilder