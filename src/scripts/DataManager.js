
let journalData = {}


journalData.saveJournalEntry = (entry) => {
return fetch("http://localhost:8088/entries",{
    method: "POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(entry)
})
.then(response => response.json())
}
journalData.loadJournalEntry = () => {
    return fetch("http://localhost:8088/entries")
    .then (response => response.json())
}
journalData.deleteEntry = (lookupId) => {
    return fetch(`http://localhost:8088/entries/${lookupId}`,{
        method: "DELETE",
    })
}

module.exports = journalData