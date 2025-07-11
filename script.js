const API_KEY = "944b79897f1b4721b8d105202252806";
const input = document.querySelector(".search__box input");
const searchBtn = document.querySelector(".search__box button");
const weatherIcon = document.querySelector(".weather-icon");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const description = document.querySelector(".desc");
const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

function isValidInput(value) {
    return !regex.test(value); 
}
let validInput = false;

input.addEventListener("input", (e) => {
    const output = document.createElement("p");
    output.className = "output";
    output.innerHTML = "Invalid city name"
    const searchBox = document.querySelector(".search");
    const existingMessage = searchBox.querySelector(".output");
    if (!isValidInput(e.target.value)) {
        validInput = false;
        if (!searchBox.contains(existingMessage)) {
            searchBox.insertAdjacentElement('beforeend', output)
        }
    } else {
        validInput = true;
    }

    if (validInput) {
        let searchBoxArr = Array.from(searchBox.children);
        searchBoxArr.forEach(item => {
            if (item.tagName.toLowerCase() === 'p') {
                item.remove();
            }
        })
    }
})


document.querySelector(".details").style.display = "none";
document.querySelector(".weather").style.display = "none";
searchBtn.addEventListener("click", () => {
    if (validInput && input.value.trim() !== "") {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q="${input.value}"&aqi=no`;
        fetch(url)
        .then(response => {
            if(response.ok) {
                document.querySelector(".details").style.display = "flex";
                document.querySelector(".weather").style.display = "block";
                return response.json()
            }
        })
        .then(data => {
            temp.innerHTML = Math.round(data.current.temp_c) + "°C";
            city.innerHTML = input.value;
            weatherIcon.setAttribute("src", data.current.condition.icon);
            description.innerHTML = data.current.condition.text;
            wind.innerHTML = data.current.wind_kph + " km/h"
            humidity.innerHTML = data.current.humidity + "%";
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
        });
    }
})
