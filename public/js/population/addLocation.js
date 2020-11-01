window.addEventListener('load', function(){
    let locationContainer = document.querySelector('#locationData');
    let locationsAmount = document.querySelector('#amount');


    locationsAmount.addEventListener('change', (event) => {
        locationContainer.innerHTML = '';
        for(let i = 0; i < locationsAmount.value; i++){
            locationContainer.innerHTML += `
            <div id="location">
                <h4 class="mt-3 ">Direccion</h4>
                <input required name="address" type="text" placeholder="Av Figueroa Alcorta 1401">
                <h4 class="mt-3 ">Provincia:</h4>
                <input required name="province" type="text" placeholder="CABA">
                <h4 class="mt-3 ">Pais:</h4>
                <input required name="country" type="text" placeholder="Argentina">
                <h4 class="mt-3 ">Codigo postal:</h4>
                <input required name="zip_code" type="number" placeholder="1440">
            </div>
            `;
        }
    });
});

/*
 

*/