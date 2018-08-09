const FormManager = Object.create(null, {


    clearForm: {
        value: () => {
            document.querySelector("#entryTitle").value = ""
            document.querySelector("#entryContent").value = ""
        }
    },

    buildFormTemplate: {
        value: () => {
            return `
            <fieldset>
            <label for="entryTitle">Title:</label>
            <input required type="text" id="entryTitle">
            </fieldset>
            <fieldset>
            <label for="entryContent">Deep Thought</label>
            <input required type="text" id="entryContent">
            </fieldset>
            <button id="saveEntryButton">Save Journal Entry</button>      
            `
        }
    }
})
module.exports = FormManager
