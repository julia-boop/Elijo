let inputsChecked = [];
function testing(algo){
    if(inputsChecked.length == 0){
        inputsChecked.push(algo)
    } else {
        if(inputsChecked.includes(algo)){
            inputsChecked = inputsChecked.filter(function(elemento){
                return elemento != algo
            })
        } else {
            inputsChecked.push(algo)
        }
    }
}

window.addEventListener('load', function() {
    let btnFilter = document.querySelector('.btn-filter');
    let divFilter = document.querySelector('.div-filter');
    let header = document.querySelector('header');
    let arrow = document.querySelector('.arrow');
    let pcmenu = document.querySelector('.pcMenu');
    let formFilter = document.querySelector('.filter-form');
    let filterBtn = document.querySelector('.filter-btn');
    let uniQuery = document.querySelector('#university');
    let carreerQuery = document.querySelector('#carreer');
    let instQuery = document.querySelector("#institutes");
    let courseQuery = document.querySelector('#courses');
    let interestQuery = document.querySelector('#interest');
    let regionQuery = document.querySelectorAll('input[name="region"]');
    let yearQuery = document.querySelectorAll('input[name="year"]');
    let genderQuery = document.querySelectorAll('input[name="genero"]');
    let ageQuery = document.querySelectorAll('input[name="age"]');

    let sleepBackground = document.querySelector('.sleep-background');
    
    btnFilter.addEventListener('click', function(){
        if(divFilter.classList.contains('slide-in')){
            divFilter.classList.remove('slide-in')
            divFilter.classList.add('slide-out')
            header.classList.remove('move-up')
        }else{
            divFilter.classList.remove('slide-out')
            divFilter.classList.add('slide-in')
            header.classList.add('move-up')
            pcmenu.classList.add('d-none')
        }
        
    });
    
    arrow.addEventListener('click', function(){
        if(divFilter.classList.contains('slide-in')){
            divFilter.classList.remove('slide-in')
            divFilter.classList.add('slide-out')
            header.classList.remove('move-up')
            pcmenu.classList.remove('d-none')

        }else{
            divFilter.classList.remove('slide-out')
            divFilter.classList.add('slide-in')
            header.classList.add('move-up')
        }
    })
    
    if(screen.width > 768){  
        window.addEventListener('click', function(){
            clearInterval(meetInterval);
            sleepBackground.classList.add('d-none');
            sleepBackground.classList.remove('active');
        })

        let meetInterval = setInterval(function(){
            sleepBackground.classList.remove('d-none');
            sleepBackground.classList.add('active');
        }, 10000)
    }

    formFilter.addEventListener('submit', function(e){        
        e.preventDefault();        
        console.log(inputsChecked)
    })
    
    
})