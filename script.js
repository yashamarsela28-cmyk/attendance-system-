//////////////////////
// Student Data
//////////////////////
const students = [
    "Rahul", "Priya", "Amit", "Sneha", "Arjun",
    "Neha", "Karan", "Pooja", "Ravi", "Anjali"
];

//////////////////////
// Grab HTML Elements
//////////////////////
const container = document.getElementById("student-list");
const totalEl = document.getElementById("total");
const presentEl = document.getElementById("present");
const absentEl = document.getElementById("absent");

//////////////////////
// Load saved attendance from localStorage
//////////////////////
let savedData = JSON.parse(localStorage.getItem("attendance")) || [];

//////////////////////
// Generate student list dynamically
//////////////////////
students.forEach((name, index) => {
    const div = document.createElement("div");
    div.className = "student";

    div.innerHTML = `
        <span>${name}</span>
        <input type="checkbox" id="student-${index}" ${savedData[index] ? "checked" : ""} onchange="saveAttendance()">
    `;

    container.appendChild(div);
});

//////////////////////
// Save attendance to localStorage
//////////////////////
function saveAttendance() {
    let data = [];

    students.forEach((_, index) => {
        data.push(document.getElementById(`student-${index}`).checked);
    });

    localStorage.setItem("attendance", JSON.stringify(data));
}

//////////////////////
// Calculate Attendance
//////////////////////
function calculateAttendance() {
    let present = 0;

    students.forEach((_, index) => {
        if (document.getElementById(`student-${index}`).checked) {
            present++;
        }
    });

    let absent = students.length - present;

    // Update cards
    totalEl.innerText = students.length;
    presentEl.innerText = present;
    absentEl.innerText = absent;

    // Draw chart
    drawChart(present, absent);
}

//////////////////////
// Draw Chart.js Pie Chart
//////////////////////
let myChart; // keep chart reference to update

function drawChart(present, absent) {
    const ctx = document.getElementById('chart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // Remove old chart
    }

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent'],
            datasets: [{
                data: [present, absent],
                backgroundColor: ['#4CAF50', '#F44336'],
                borderColor: ['#ffffff', '#ffffff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white',
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}

//////////////////////
// Initialize Dashboard
//////////////////////
calculateAttendance();
