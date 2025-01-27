function studForm() {
  var name = document.getElementById("name").value.trim();
  var department = document.getElementById("department").value.trim();
  var roll = document.getElementById("roll").value.trim();

  if (name === "") {
    alert("Name is required");
    return false;
  }

  if (department === "") {
    alert("Department is required");
    return false;
  }

  if (roll === "") {
    alert("Roll Number is required");
    return false;
  } else if (parseInt(roll) < 1) {
    alert("Roll Number must be positive");
    return false;
  }

  return true;
}

function showData() {
  var studList = localStorage.getItem("studList") ? JSON.parse(localStorage.getItem("studList")) : [];
  var html = "";

  studList.forEach(function (element, index) {
    html += `<tr>
      <td>${element.name}</td>
      <td>${element.department}</td>
      <td>${element.roll}</td>
      <td>
        <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
        <button onclick="updateData(${index})" class="btn btn-warning">Edit</button>
      </td>
    </tr>`;
  });

  document.querySelector("#table-body").innerHTML = html;
}

window.onload = showData;

function AddData() {
  if (studForm()) {
    var name = document.getElementById("name").value.trim();
    var department = document.getElementById("department").value.trim();
    var roll = document.getElementById("roll").value.trim();

    var studList = localStorage.getItem("studList") ? JSON.parse(localStorage.getItem("studList")) : [];

    studList.push({
      name: name,
      department: department,
      roll: roll,
    });

    localStorage.setItem("studList", JSON.stringify(studList));
    showData();

    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("roll").value = "";
  }
}

function deleteData(index) {
  var studList = localStorage.getItem("studList") ? JSON.parse(localStorage.getItem("studList")) : [];
  studList.splice(index, 1);
  localStorage.setItem("studList", JSON.stringify(studList));
  showData();
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  var studList = localStorage.getItem("studList") ? JSON.parse(localStorage.getItem("studList")) : [];
  document.getElementById("name").value = studList[index].name;
  document.getElementById("department").value = studList[index].department;
  document.getElementById("roll").value = studList[index].roll;

  document.getElementById("Update").onclick = function () {
    if (studForm()) {
      studList[index].name = document.getElementById("name").value.trim();
      studList[index].department = document.getElementById("department").value.trim();
      studList[index].roll = document.getElementById("roll").value.trim();

      localStorage.setItem("studList", JSON.stringify(studList));
      showData();

      document.getElementById("name").value = "";
      document.getElementById("department").value = "";
      document.getElementById("roll").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}
