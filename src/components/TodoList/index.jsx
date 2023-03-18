import React from 'react';
import { useState } from 'react';
import './style.scss';
import { ReactComponent as Search } from '../../assets/svgs/search.svg';
import axios from 'axios';

export const TodoList = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [hum, setHum] = useState(0);
  const [wind, setWind] = useState(0);

  const getWeather = async (e) => {
    e.preventDefault();
    const reponsve = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c704f6fc7c1f4dcc436973235c0e428c`);
    console.log(reponsve.data);
    setTemp(Math.round(reponsve.data.main.temp) - 273);
    setDesc(reponsve.data.weather[0].description);
    selectImg(reponsve.data.weather[0].main);
    setHum(Math.round(reponsve.data.main.humidity));
    setWind(Math.round(reponsve.data.wind.speed));
  };

  function selectImg(sky) {
    switch (sky) {
      case "Clear":
        setImage("https://cdn-icons-png.flaticon.com/512/6974/6974833.png");
        break;
      case "Rain":
        setImage("https://cdn-icons-png.flaticon.com/512/6974/6974833.png");
        break;
      case "Snow":
        setImage("https://cdn-icons-png.flaticon.com/512/642/642102.png");
        break;
      case "Clouds":
        setImage("https://cdn-icons-png.flaticon.com/512/414/414825.png");
        break;
      case "Haze":
        setImage("https://cdn-icons-png.flaticon.com/512/1197/1197102.png");
        break;
      case "Smoke":
        setImage("https://cdn-icons-png.flaticon.com/512/4380/4380458.png");
        break;
      case "Mist":
        selectImg("https://cdn-icons-png.flaticon.com/512/4005/4005901.png");
        break;
      case "Drizzle":
        selectImg("https://cdn-icons-png.flaticon.com/512/3076/3076129.png");
        break;
      default:
        setImage("https://i.imgur.com/NNLjUId.png");
        break;
    }
  }

  return (
    <div className='background'>
      <div className='box-search'>
        <form onSubmit={(e) => getWeather(e)}>
          <div className='row'>
            <input type="text" placeholder='ENTER YOUR LOCATION' name="name" value={city} onChange={(e) => setCity(e.target.value)} />
            <button type='submit' onChange={(e) => setCity(e.target.value)}><Search className='search-icon' /></button>
          </div>
        </form>
      </div>
      <div className="box-output">
        {!city == "" ? <div className="city">{city}</div> : null}
        {!image == "" ? <div className='test'><img className="sky-img" src={image} alt="weather-img" /></div> : null}

        <div>
          {!desc == "" ? <div className="sky">{desc}</div> : null}
          {!temp == "" ? <div className="temp">{temp} &deg;C</div> : null}
        </div>

        {!hum == "" ?
          <div className='other'>
            <div className="hum">
              <div>Độ ẩm {hum}%</div>
            </div>

            <div className="wind">
              <div>Tốc độ gió {wind} KMPH</div>
            </div>
          </div>
        : null}
      </div>
    </div>
  )
}

export default TodoList;