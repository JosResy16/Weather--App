const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const contentBox = document.querySelector('.content-box');
const detailBox = document.querySelector('.details-box');
const error404 = document.querySelector('.not-found');

search.addEventListener('click' , () => {
    
    const APIKey = '9679739c596b2465f24bbdfc52056b04';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=
            ${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then
            (json => {


                if(json.cod === '404'){
                    contentBox.style.display = 'none';
                    detailBox.style.display = 'none';
                    contentBox.classList.remove('fadeIn');
                    detailBox.classList.remove('fadeIn')

                    container.style.height = '500px';
                    contentBox.style.display = 'none';
                    detailBox.style.display = 'none';
                    error404.style.display = 'block';
                    error404.classList.add('fadeIn');
                    return;
                }

                error404.style.display = 'none';
                error404.classList.remove('fadeIn');

                const imagen = document.querySelector('.content-box img');
                const temperatura = document.querySelector('.content-box .temperatura');
                const descripcion = document.querySelector('.content-box .descripcion');
                const humedad = document.querySelector('.details-box .humedad span');
                const viento = document.querySelector('.details-box .viento span');

                switch(json.weather[0].main) {
                    case 'Clear':
                        imagen.src = 'img/soleado.png'
                        break;
                    case 'Rain':
                        imagen.src = 'img/lluvioso.png'
                        break;
                    case 'Snow':
                        imagen.src = 'img/nieve.png'
                        break;
                    case 'Clouds':
                        imagen.src = 'img/parcialmente-nublado.png'
                        break;
                    case 'Mist':
                        imagen.src = 'img/nublado.png'
                        break;

                    default:
                        imagen.src = '';
                }

                temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                descripcion.innerHTML = `${json.weather[0].description}`;
                humedad.innerHTML = `${json.main.humidity}%`;
                viento.innerHTML = `${parseInt(json.wind.speed)}km/h`;

                contentBox.style.display = '';
                detailBox.style.display = '';
                contentBox.classList.add('fadeIn');
                detailBox.classList.add('fadeIn');
                container.style.height = '590px';



            });
});


