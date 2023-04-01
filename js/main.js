const TOKEN = "372fa0bbf5d844c182a204151230103"

let form = document.getElementById('cityForm');
form.addEventListener('submit', handleFormSubmit);


async function handleFormSubmit(event){
    event.preventDefault(); 
    // 1. get input value: city name
    let cityName = event.target.cityName.value;
    // console.log(cityName);

    // 2 call api get city weather info
    let cityInfo = await getCityInfo(cityName);
    // console.log(cityInfo);

    // 3 parse following data from cityInfo
    let city_region = cityInfo["location"]["name"] + ", " + cityInfo["location"]["region"];
    let temp_f = cityInfo["current"]["temp_f"];
    let feelslike_f = cityInfo["current"]["feelslike_f"];
    let condition = cityInfo["current"]["condition"]["text"];
    console.log(city_region, temp_f, feelslike_f, condition);

    // 4 add data to html tag
    buildCityHTML(city_region, temp_f, feelslike_f, condition  );

    event.target.cityName.value = '';
}

async function getCityInfo(cityName){
    try{
        let url = `http://api.weatherapi.com/v1/current.json?key=${TOKEN}&q=${cityName}&aqi=yes`
        // console.log(url);
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch(err){
        console.error(err);
    };
};

function buildCityHTML(city_region, temp_f, feelslike_f, condition){
    let ul = document.getElementById("cityInfo");
    ul.innerHTML = "";

    let li1 = document.createElement('li');
    li1.className = 'list-group-item bg-light';
    li1.innerHTML = city_region;
    ul.append(li1);

    let li2 = document.createElement('li');
    li2.className= 'list-group-item';
    li2.innerHTML = `CurrentTemp:${temp_f}°F`;
    ul.append(li2);

    let li3 = document.createElement('li');
    li3.className= 'list-group-item';
    li3.innerHTML = `Feels Like: ${feelslike_f}°F`;
    ul.append(li3);

    let li4 = document.createElement('li');
    li4.className= 'list-group-item';
    li4.innerHTML = `Current Condition: ${condition}`;
    ul.append(li4);

}