window.addEventListener('load', function(){
    console.log("entre");
    
    let newCourseBtn = document.querySelector("#addNewCourse");
    let coursesContainer = document.querySelector("#courseContainer");
    let course = document.querySelector("#course");
    let submitBtn = document.querySelector("#BtnSubmitCourse");
    let newCourseInput = document.querySelector("#newCourse");
    let form = document.querySelector("form");

    newCourseBtn.addEventListener('click', (event) => {
        coursesContainer.innerHTML += course.outerHTML;
    });
})