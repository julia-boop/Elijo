window.addEventListener('load', function(){


let addNewCourse = document.querySelector('#addNewCourse');
    let i = 0;
    function duplicate() {
        let courseContainer = document.getElementById('courseContainer' + i);
        let clone = courseContainer.cloneNode(true); // "deep" clone
        clone.id = "courseContainer" + ++i; // there can only be one element with an ID
        addNewCourse.onclick = duplicate; // event handlers are not cloned
        courseContainer.parentNode.appendChild(clone);
    }

    addNewCourse.addEventListener('onclick', function() {
        console.log('Me estas clickeandoooooo')
        //return duplicate();
    })


})