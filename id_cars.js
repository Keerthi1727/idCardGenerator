const generatedTemplates = document.getElementById("generated-templates");
const templatesParentEle = document.getElementById("designed-templates");
const downloadCardsEle = document.getElementById("download-cards");
const templatesEle = templatesParentEle.querySelectorAll(".template");
let selectedTemplate;
(() => {
  templatesEle.forEach((ele) => {
    ele.style.border = "1px solid black";
    ele.addEventListener("click", (event) => {
      templatesEle.forEach((ele2) => {
        ele2.classList.remove("selected-card");
      });
      selectedTemplate = document.getElementById(ele.id);
      console.log(selectedTemplate.id);
      selectedTemplate.classList.add("selected-card");
      generateIdCards(selectedTemplate);
    });
  });
  downloadCardsEle.addEventListener("click", (e) => downloadIdCards());
})();

function generateIdCards(ele) {
  generatedTemplates.innerHTML = "";

  studentDetails.forEach((e) => {
    const clonedTemplate = ele.cloneNode(true);
    clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$school_name", "Sdk0306");
    clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$reg_no", e["regNo"]);
    clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$id_no", e["studentId"]);
    clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$student_name", e["name"]);
    clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$branch", e["branch"]);
    clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$a_y", e["academicYear"]);
    clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$contact", e["contact"]);
    // clonedTemplate.innerHTML = clonedTemplate.innerHTML.replace("$", e["profileImage"]);.

    var reader = new FileReader();

    reader.onload = function (e) {
      clonedTemplate.querySelector(".profile-image").src = e.target.result;
    };
    reader.readAsDataURL(e["profileImage"]);
    generatedTemplates.appendChild(clonedTemplate);
  });
}

function downloadIdCards() {
  // define the html element to export
  var element = document.getElementById("generated-templates");
  // define optional configuration
  var options = { filename: "my-file.pdf" };

  // create an instance of html2pdf class
  var exporter = new html2pdf(element, options);
  // download the pdf
  exporter.getPdf(true).then((pdf) => {
    console.log("pdf downloaded!", pdf);
  });

  // or download it directly without instancing the class object
  options.source = element;
  options.download = false;

  html2pdf.getPdf(options).then((pdf) => {
    console.log(pdf.output("datauristring"));
  });
}
