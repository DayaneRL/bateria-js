document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    clearInfo();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        showWarning('carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}
                &appid=d236222aa996005213c52c4fd46cafd2&units=metric&lang=pt_br`;
        let result = await fetch(url);
        let json = await result.json();

        console.log(json);
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                climaIcon: json.weather[0].icon,
                climaTempo: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                temp: json.main.temp
            });
        } else{
            showWarning('Não encontramos esta localização');
        }

    }
})

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(message){
    document.querySelector('.aviso').innerHTML = message;
}

function showInfo(data){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${data.name}, ${data.country}`;
    document.querySelector('.tempInfo').innerHTML = `${data.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${data.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${data.climaIcon}@2x.png`);
    
    document.querySelector('.climaTitulo').innerHTML = `${data.climaTempo}`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${data.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}