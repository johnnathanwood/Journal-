(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

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
},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){

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
},{}],4:[function(require,module,exports){
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
},{"./DataManager":1,"./JournalLayout":3}],5:[function(require,module,exports){
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
},{"./DataManager":1,"./JournalForm":2,"./JournalList":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGFNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9Kb3VybmFsRm9ybS5qcyIsIi4uL3NjcmlwdHMvSm91cm5hbExheW91dC5qcyIsIi4uL3NjcmlwdHMvSm91cm5hbExpc3QuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5sZXQgam91cm5hbERhdGEgPSB7fVxuXG5cbmpvdXJuYWxEYXRhLnNhdmVKb3VybmFsRW50cnkgPSAoZW50cnkpID0+IHtcbnJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzXCIse1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczp7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6XCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVudHJ5KVxufSlcbi50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbn1cbmpvdXJuYWxEYXRhLmxvYWRKb3VybmFsRW50cnkgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcbiAgICAudGhlbiAocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxufVxuam91cm5hbERhdGEuZGVsZXRlRW50cnkgPSAobG9va3VwSWQpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzLyR7bG9va3VwSWR9YCx7XG4gICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGpvdXJuYWxEYXRhIiwiY29uc3QgRm9ybU1hbmFnZXIgPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcblxuXG4gICAgY2xlYXJGb3JtOiB7XG4gICAgICAgIHZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5VGl0bGVcIikudmFsdWUgPSBcIlwiXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5Q29udGVudFwiKS52YWx1ZSA9IFwiXCJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBidWlsZEZvcm1UZW1wbGF0ZToge1xuICAgICAgICB2YWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbnRyeVRpdGxlXCI+VGl0bGU6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCB0eXBlPVwidGV4dFwiIGlkPVwiZW50cnlUaXRsZVwiPlxuICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbnRyeUNvbnRlbnRcIj5EZWVwIFRob3VnaHQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbnRyeUNvbnRlbnRcIj5cbiAgICAgICAgICAgIDwvZmllbGRzZXQ+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZUVudHJ5QnV0dG9uXCI+U2F2ZSBKb3VybmFsIEVudHJ5PC9idXR0b24+ICAgICAgXG4gICAgICAgICAgICBgXG4gICAgICAgIH1cbiAgICB9XG59KVxubW9kdWxlLmV4cG9ydHMgPSBGb3JtTWFuYWdlclxuIiwiXG5jb25zdCBqb3VybmFsRW50cnkgPSAocmVzdWx0KSA9PiB7XG5cblxuICAgIHJldHVybiBgPGZpZWxkc2V0IGNsYXNzPVwiZW50cnlGaWVsZFwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJlbnRyeVRpdGxlXCI+JHtyZXN1bHQudGl0bGV9PC9oMz5cbiAgICAgICAgPHAgY2xhc3M9XCJlbnRyeUNvbnRlbnRcIj4ke3Jlc3VsdC5jb250ZW50fTwvcD5cbiAgICAgICAgPGxhYmVsPiR7cmVzdWx0LmRhdGV9PC9sYWJlbD5cbiAgICAgICAgPGJ1dHRvbiBpZD0ke3Jlc3VsdC5pZH0gY2xhc3M9XCJkZWxldGVCdXR0b25cIj5EZWxldGU8L2J1dHRvbj5cbiAgICA8L2ZpZWxkc2V0PlxuYFxufVxubW9kdWxlLmV4cG9ydHMgPSBqb3VybmFsRW50cnkiLCJjb25zdCBqb3VybmFsRW50cnkgPSByZXF1aXJlKFwiLi9Kb3VybmFsTGF5b3V0XCIpXG5jb25zdCBqb3VybmFsRGF0YSA9IHJlcXVpcmUoXCIuL0RhdGFNYW5hZ2VyXCIpXG5cbmNvbnN0IGpvdXJuYWxCdWlsZGVyID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG4gICAgam91cm5hbExpc3Rlcjoge1xuICAgICAgICB2YWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGpvdXJuYWxEYXRhLmxvYWRKb3VybmFsRW50cnkoKVxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJldmVyc2UoKVxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RyaW5nID0gXCJcIlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlc3VsdFtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9IGpvdXJuYWxFbnRyeShlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBudWtlOiB7XG4gICAgICAgIHZhbHVlOiAoYnV0dG9uSWQpID0+IHtcbiAgICAgICAgICAgIGpvdXJuYWxEYXRhLmRlbGV0ZUVudHJ5KGJ1dHRvbklkKVxuICAgICAgICB9XG4gICAgfSxcbiAgICByZWxvYWRFbnRyaWVzOiB7XG4gICAgICAgIHZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS52YWx1ZSA9IFwiXCJcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cblxubW9kdWxlLmV4cG9ydHMgPSBqb3VybmFsQnVpbGRlciIsImNvbnN0IEZvcm1NYW5hZ2VyID0gcmVxdWlyZShcIi4vSm91cm5hbEZvcm1cIilcbmNvbnN0IGpvdXJuYWxEYXRhID0gcmVxdWlyZShcIi4vRGF0YU1hbmFnZXJcIilcbmNvbnN0IGpvdXJuYWxCdWlsZGVyID0gcmVxdWlyZShcIi4vSm91cm5hbExpc3RcIilcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRm9ybVwiKS5pbm5lckhUTUwgPSBGb3JtTWFuYWdlci5idWlsZEZvcm1UZW1wbGF0ZSgpXG5cbmpvdXJuYWxCdWlsZGVyLmpvdXJuYWxMaXN0ZXIoKS50aGVuKHN0cmluZyA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikuaW5uZXJIVE1MID0gc3RyaW5nXG59KVxuXG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlRW50cnlCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBmdW5jdGlvbiBkYXRlRnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkID0gbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IG4gPSBkLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiBuXG4gICAgfVxuXG4gICAgY29uc3QgbmV3RW50cnkgPSB7XG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5VGl0bGVcIikudmFsdWUsXG4gICAgICAgIGNvbnRlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDb250ZW50XCIpLnZhbHVlLFxuICAgICAgICBkYXRlOiBkYXRlRnVuY3Rpb24oKVxuICAgIH1cblxuICAgIGpvdXJuYWxEYXRhLnNhdmVKb3VybmFsRW50cnkobmV3RW50cnkpXG5cbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgRm9ybU1hbmFnZXIuY2xlYXJGb3JtKClcbiAgICAgICAgfSlcblxuICAgICAgICAudGhlbihcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgIClcbn0pXG5cblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqb3VybmFsRW50cnlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGxldCBidXR0b25JZCA9IGV2ZW50LnRhcmdldC5pZFxuICAgIGpvdXJuYWxCdWlsZGVyLm51a2UoYnV0dG9uSWQpXG4gICAgbG9jYXRpb24ucmVsb2FkKClcbn0pXG5cblxudmFyIGQgPSBEYXRlKERhdGUubm93KCkpO1xuZC50b1N0cmluZygpIl19
