// Prevent forms from submitting
function preventFormSubmit() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
        });
    });
}

// Handle form submission
function handleFormSubmit(formObject) {
    const userId = document.getElementById('searchtext').value.trim();
    const password = document.getElementById('searchtext2').value.trim();

    if (!userId || !password) {
        alert("Mohon isi User ID dan Password");
        return;
    }

    document.querySelectorAll('.spinner-grow').forEach(spinner => {
        spinner.classList.remove("d-none");
    });

    google.script.run
        .withSuccessHandler(createTable)
        .processForm(formObject);
    
    document.getElementById("search-form").reset();
}

// Create the data table
function createTable(dataArray) {
    const spinners = document.querySelectorAll('.spinner-grow');
    spinners.forEach(spinner => spinner.classList.add("d-none"));

    const div = document.getElementById('search-results');
    if (dataArray && dataArray.length) {
        let result = "<table class='table table-sm table-striped' id='dtable' style='font-size:0.8em'>" +
                     "<thead style='white-space: nowrap'>" +
                     "<tr>" +
                     // Change table headings to match with the Google Sheet
                     "</tr>" +
                     "</thead><tbody>";

        dataArray.forEach(row => {
            result += "<tr>" + row.map(cell => `<td>${cell}</td>`).join('') + "</tr>";
        });

        result += "</tbody></table>";
        div.innerHTML = result;
    } else {
        div.innerHTML = "Data tidak ditemukan!";
    }
}

// Attach event listeners on window load
window.addEventListener('load', preventFormSubmit, true);
