const studentCountNextBtnEle = document.getElementById("student-count-next-btn");
const studentCountEle = document.getElementById("student-count");
const siteErrorEle = document.getElementById("site-error");
const studentInfoFormEle = document.getElementById("student-details-form");
const templateDesignEle = document.getElementById("designed-templates");
const studentInfoSubmitBtnId = "student-info-submit";
let studentCount = 0;
let studentDetails = [];

studentCountNextBtnEle.addEventListener("click", onStudentButtonNextClick);

function onStudentButtonNextClick(event) {
  //   const template1 = document.getElementById("template-1");
  //   template1.innerHTML = template1.innerHTML.replace("school_name", "sdl0306");

  studentCount = parseInt(studentCountEle.value || "0");
  if (studentCount == 0) {
    setErrorMessage("Enter no of students");
    hideElement(studentInfoFormEle);
  } else {
    hideErrorMessage();
    displayElement(studentInfoFormEle);
    generateStudentsFields(studentCount);
  }
}

function generateStudentsFields(count) {
  studentInfoFormEle.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const ele = document.createElement("div");
    const innerHtml = `
    <div class="student-info">
    <div class="student-field">
      <label for="studentReg-${i}">Reg No</label>
      <input required type="text" name="studentReg" id="studentReg-${i}" placeholder="Enter Name" />
    </div>
    <div class="student-field">
      <label for="studentID-${i}">Student ID</label>
      <input required type="text" name="studentID" id="studentID-${i}" placeholder="Enter Name" />
    </div>
    <div class="student-field">
    <label for="studentProfile-${i}">Student ID</label>
    <input type="file" accept="image/*" name="studentProfile" id="studentProfile-${i}" placeholder="Enter Name" />
    </div>
    <div class="student-field">
      <label for="studentName-${i}">Name</label>
      <input required type="text" name="studentName" id="studentName-${i}" placeholder="Enter Name" />
    </div>
    <div class="student-field">
      <label for="studentBranch-${i}">Branch</label>
      <select required name="studentBranch" id="studentBranch-${i}" aria-placeholder="Select">
        <option selected disabled value="">-- Select --</option>
        <option value="CSE">CSE</option>
        <option value="EEE">EEE</option>
        <option value="EEE">ECE</option>
        <option value="MEC">MEC</option>
        <option value="IT">IT</option>
        <option value="Civil">Civil</option>
      </select>
    </div>
    <div class="student-field">
      <label for="studentAcademicYear-${i}">Academic Year</label>
      <input required type="date" name="studentAcademicYear" id="studentAcademicYear-${i}" placeholder="Enter Name" />
    </div>
    <div class="student-field">
      <label for="studentContact-${i}">Contact Number</label>
      <input required type="number" name="studentContact" id="studentContact-${i}" placeholder="Enter Name" />
    </div>
  </div> `;
    ele.innerHTML = innerHtml;
    studentInfoFormEle.appendChild(ele);
  }

  const submitButton = document.createElement("button");
  submitButton.id = studentInfoSubmitBtnId;
  submitButton.innerText = "Next";
  //   submitButton.type = "button";
  studentInfoFormEle.appendChild(submitButton);
}

function submitStudentInfo(event) {
  const profileImages = document.getElementById("profileImage");
  studentDetails = [];
  const studentInfoEle = studentInfoFormEle.querySelectorAll(".student-info");
  for (let i = 0; i < studentInfoEle.length; i++) {
    const element = studentInfoEle[i];
    console.log(element);
    let studentInfo = {};
    studentInfo["regNo"] = element.querySelector(`#studentReg-${i}`).value;
    studentInfo["studentId"] = element.querySelector(`#studentID-${i}`).value;
    studentInfo["name"] = element.querySelector(`#studentName-${i}`).value;
    studentInfo["branch"] = element.querySelector(`#studentBranch-${i}`).value;
    studentInfo["academicYear"] = element.querySelector(`#studentAcademicYear-${i}`).value;
    studentInfo["contact"] = element.querySelector(`#studentContact-${i}`).value;
    studentInfo["profileImage"] = element.querySelector(`#studentProfile-${i}`).files[0];
    studentDetails.push(studentInfo);
  }

  console.log(studentDetails);
  displayElement(templateDesignEle, "flex");
}

function setErrorMessage(message) {
  siteErrorEle.innerText = message;
  if (message) {
    siteErrorEle.style.display = "block";
  }
}
function hideErrorMessage() {
  siteErrorEle.innerText = "";
  siteErrorEle.style.display = "none";
}

function displayElement(ele, prop) {
  ele.style.display = prop || "block";
}
function hideElement(ele) {
  ele.style.display = "none";
}
