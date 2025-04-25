let apiKey="4cabf123d0aaa0205abbfb31d9752eab"
let cityName=document.getElementById("cityName")
let form=document.getElementById("form")
let cityContainer=document.querySelector(".city-container")

window.addEventListener("DOMContentLoaded",()=>{
    const savedData=JSON.parse(localStorage.getItem('weatherData'),[])
    savedData.forEach(displayWeather)
})

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`
    console.log(api)
    
    fetch(api)
        .then((res)=>{
            console.log(res)
            return res.json()
        })
        .then((res)=>{
           // console.log(res)
            if(res.cod==="404"){
                alert("City not found")
                return 
            }
            const {name,sys,weather,main}=res
            const weatherObj={
                name,
                temp:main.temp,
                country:sys.country,
                weatherType:weather[0].main
            }
            console.log(weatherObj)
            let data=JSON.parse(localStorage.getItem("weatherData"))|| []
            data.push(weatherObj)
            localStorage.setItem("weatherData",JSON.stringify(data))
            displayWeather(weatherObj)
        })
})

function displayWeather(data){
    console.log(data)
    let div=document.createElement("div")
    div.classList.add("weather-card")
    div.innerHTML=
    `
        <h2>${data.name}</h2>
        <p>Temperature:${data.temp}</p>
        <p>Country:${data.country}</p>
    `
    cityContainer.append(div)
}