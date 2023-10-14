import React from 'react';

// 台灣的城市/縣列表
const cities = [
  "台北市",
  "新北市",
  "桃園市",
  "台中市",
  "台南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "嘉義市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "澎湖縣",
  "金門縣",
  "連江縣"
];

const TaiwanCitySelector = ({ onChange, value, name, multiple }) => (
  <select onChange={onChange} value={value} multiple={multiple}>
    <option value="" disabled={!value}>Select a city</option>
    {cities.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ))}
  </select>
);


export default TaiwanCitySelector;
