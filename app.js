// Declaring the variables
const API_KEY = '677f8b96d6ce44c8a28114725222006';

const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const dayNames = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi",
    "Pazar"
];

let days = 7;
let lon;
let lat;
let temperature = document.querySelector(".weather-temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".iconify1");
let dayName = document.querySelector(".date-dayname");
let weatherDesc = document.querySelector(".weather-desc");
let humidity = document.querySelector(".humidity .value");
let wind = document.querySelector(".wind .value");
let precipitation = document.querySelector(".precipitation .value");
const kelvin = 273;
const date = new Date();
dayName.innerHTML = dayNames[date.getDay() - 1];
// var today = new Date();
let today = document.querySelector(".date-day");


// dateFormat(new Date(), 'dd-MM-yyyy');
today.innerHTML = dateFormat(date, 'dd MM yyyy');

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            // API ID
            const api = "6d055e39ee237af35ca066f35474e9df";

            // API URL
            // const base =
            //     `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
            //     `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df&lang=tr`;

            const base =
                `https://api.weatherapi.com/v1/forecast.json?key=677f8b96d6ce44c8a28114725222006` +
                `&q=${lat + "," + lon}&days=${days}&aqi=no&alerts=no`;

            console.log(base);

            // Calling the API
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    temperature.textContent = data.current.temp_c + "°C";
                    // Math.floor(data.current.temp_c - kelvin) + "°C"
                    // summary.textContent = data.weather[0].description;
                    console.log(data.name);
                    loc.textContent = data.location.name + ", " + data.location.region;
                    let icon1 = data.current.condition.icon;
                    console.log(icon1);
                    icon.innerHTML =
                        `<img src="${icon1}" style= 'height:3rem'></a>`;
                    weatherDesc.innerHTML = data.current.condition.text;
                    humidity.innerHTML = data.current.humidity + " %";
                    wind.innerHTML = data.current.wind_kph + " km/h";
                    precipitation.innerHTML = data.current.precip_in + " %";
                });
        });
    }
});

function dateFormat(date, format) {
    //parse the input date


    //extract the parts of the date
    const day = date.getDate();
    const month = monthNames[date.getMonth() + 1];
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
}
