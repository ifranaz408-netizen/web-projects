// Get all pages
const pages = document.querySelectorAll(".page");

// Get page title
const pageTitle = document.getElementById("page-title");


// Show selected page
function showPage(pageName, button) {

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    // Show selected page
    document.getElementById(pageName).classList.add("active-page");

    // Change title
    pageTitle.textContent =
        pageName.charAt(0).toUpperCase() + pageName.slice(1);

    // Remove active class from all menu buttons
    document.querySelectorAll(".nav-link").forEach(function(link) {
        link.classList.remove("active");
    });

    // Add active class to clicked button
    if (button) {
        button.classList.add("active");
    }
}


// Notifications
function toggleNotifications() {

    const box = document.getElementById("notification-box");

    box.classList.toggle("show");
}


// Mark notifications as read
function markNotifications() {

    document.getElementById("notification-count").style.display = "none";

    showMessage("All notifications marked as read");
}


// Show profile
function showProfile() {

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    // Show profile
    document.getElementById("profile").classList.add("active-page");

    // Change title
    pageTitle.textContent = "My Profile";

    // Remove active menu
    document.querySelectorAll(".nav-link").forEach(function(link) {
        link.classList.remove("active");
    });
}


// Show message
function showMessage(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2500);
}


// Export report
function exportReport() {

    const report = `
NovaAdmin Dashboard Report

Total Revenue: $84,254
Total Orders: 12,482
Total Customers: 8,549
Conversion Rate: 6.84%

Generated from NovaAdmin Dashboard.
`;

    const file = new Blob([report], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(file);

    link.download = "novaadmin-report.txt";

    link.click();

    showMessage("Report downloaded");
}


// Calendar buttons
const calendarButtons =
    document.querySelectorAll(".calendar button");

calendarButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        showMessage("Date " + button.textContent + " selected");

    });

});


// Search
const search = document.getElementById("search");

search.addEventListener("input", function() {

    const value = search.value.toLowerCase();

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(function(row) {

        const text = row.textContent.toLowerCase();

        if (text.includes(value)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});
// Revenue chart
const chartSelect = document.getElementById("chart-select");
const chart = document.querySelector(".chart");

chartSelect.addEventListener("change", function () {

    let heights = [];

    if (chartSelect.value === "This Year") {

        heights = [
            "45%", "60%", "50%", "72%",
            "65%", "82%", "70%", "90%",
            "78%", "95%", "86%", "100%"
        ];

    } else if (chartSelect.value === "Last 6 Months") {

        heights = [
            "55%", "70%", "62%",
            "80%", "75%", "95%"
        ];

    } else if (chartSelect.value === "This Month") {

        heights = [
            "40%", "55%", "65%",
            "50%", "75%", "85%"
        ];
    }

    chart.innerHTML = "";

    heights.forEach(function (height) {

        const bar = document.createElement("div");

        bar.className = "bar";

        bar.style.height = height;

        chart.appendChild(bar);

    });

});
// Upgrade Plan button
function upgradePlan() {
    showMessage("Upgrade Plan page opened");
}


// Help Center button
function openHelp() {
    showMessage("Help Center opened");
}
function searchHelp() {

    const searchInput = document.getElementById("help-search");

    const value = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".help-card");

    cards.forEach(function(card) {

        const text = card.textContent.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}
