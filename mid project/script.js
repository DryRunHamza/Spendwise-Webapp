const table = document.getElementById("table");
const total = document.getElementById("total");
const active = document.getElementById("active");
const inactive = document.getElementById("inactive");

const form = document.getElementById("form");
const nameInput = document.getElementById("studentName");
const idInput = document.getElementById("studentId");
const courseInput = document.getElementById("studentCourse");
const statusInput = document.getElementById("studentStatus");

const attendanceBtn = document.getElementById("attendanceBtn");
const attendanceText = document.getElementById("attendanceText");

const students = [
  {
    name: "Ali Raza",
    id: "001",
    course: "Web Development",
    status: "Active"
  },
  {
    name: "Ahmed Khan",
    id: "002",
    course: "Database Systems",
    status: "Active"
  },
  {
    name: "Usman Tariq",
    id: "003",
    course: "Operating System",
    status: "Inactive"
  }
];

function render() {
  table.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.course}</td>
      <td>
        <span class="status-badge ${student.status === "Active" ? "status-active" : "status-inactive"}">
          ${student.status}
        </span>
      </td>
      <td>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });

  total.textContent = students.length;
  active.textContent = students.filter(student => student.status === "Active").length;
  inactive.textContent = students.filter(student => student.status === "Inactive").length;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    name: nameInput.value.trim(),
    id: idInput.value.trim(),
    course: courseInput.value.trim(),
    status: statusInput.value
  };

  if (!student.name || !student.id || !student.course || !student.status) {
    alert("Please fill all fields.");
    return;
  }

  students.push(student);
  render();
  form.reset();
});

function deleteStudent(index) {
  students.splice(index, 1);
  render();
}

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");
}

attendanceBtn.addEventListener("click", function () {
  attendanceText.textContent = "Attendance Marked Successfully";
  attendanceText.style.color = "green";
  attendanceBtn.disabled = true;
  attendanceBtn.textContent = "Marked";
});

render();