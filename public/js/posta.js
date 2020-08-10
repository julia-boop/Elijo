function myFunction(id) {
  document.getElementById(id).classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

window.addEventListener('load', function() {

  /*REVISAR*/
  let universityBtn = document.querySelector('.universities');
  let carrersBtn = document.querySelector('.carrers');
  let cursesBtn = document.querySelector('.curses');
  let programsBtn = document.querySelector('.programs');
  universityBtn.addEventListener('click', function(){
    universityBtn.classList.add('show');
    carrersBtn.classList.remove('show');
    cursesBtn.classList.remove('show');
    programsBtn.classList.remove('show');
  });
  /*FIN REVISAR*/
  
  let tipsBtn = document.querySelector('.tipsPhoneBtn');
  let tipsDiv = document.querySelector('.mobileTips');
  let closeMobBtn = document.querySelector('.mobileTipsCross');
  tipsBtn.addEventListener('click', function(){
    tipsBtn.classList.add('d-none')
    tipsDiv.classList.add('openMobileTips');
  })
  
  closeMobBtn.addEventListener('click', function(){
    tipsBtn.classList.remove('d-none');
    tipsDiv.classList.remove('openMobileTips');
  })




  /*FUNCIONAMIENTO DE BOTONES NAVEGACION*/
  let genBtn = document.querySelector('.general-btn');
  let faqsTipsBtn = document.querySelector('.faqs-tips-btn');
  let generalBtn = document.querySelector('.lessons-btn');

  let generalView = document.querySelector('.generalFlap');
  let faqsTipsView = document.querySelector('.faqs-tips-container');
  let lessonsView = document.querySelector('.lessons-container');

  /*DEFAULTS*/
  generalView.style.display = 'initial';
  faqsTipsView.style.display = 'none';
  lessonsView.style.display = 'none';


  genBtn.addEventListener('click', function(){
    generalView.style.display = 'initial';
    faqsTipsView.style.display = 'none';
    lessonsView.style.display = 'none';

  });

  faqsTipsBtn.addEventListener('click', function(){
    generalView.style.display = 'none';
    faqsTipsView.style.display = 'initial';
    lessonsView.style.display = 'none';
  });

  faqsTipsBtn.addEventListener('click', function(){
    generalView.style.display = 'none';
    faqsTipsView.style.display = 'none';
    lessonsView.style.display = 'initial';
  });


})