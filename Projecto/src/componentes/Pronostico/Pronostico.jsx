import React, { useEffect, useState } from "react";
import "./Pronostico.css";

const ciudades = [
  { nombre: "Ciudad Autónoma de Buenos Aires", valor: "Buenos Aires" },
  { nombre: "La Plata", valor: "La Plata" },
  { nombre: "Quilmes", valor: "Quilmes" },
  { nombre: "Avellaneda", valor: "Avellaneda" },
  { nombre: "Morón", valor: "Moron" },
  { nombre: "Lomas de Zamora", valor: "Lomas de Zamora" },
  { nombre: "San Isidro", valor: "San Isidro" },
  { nombre: "Vicente López", valor: "Vicente Lopez" },
];

// TU API KEY
const API_KEY = "de46aac53e89de96a434e0c9c9330ca1";

export function Pronostico() {
  const [climas, setClimas] = useState({});

  useEffect(() => {
    ciudades.forEach(async (ciudad) => {
      try {
        const respuesta = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${ciudad.valor}&appid=${API_KEY}&units=metric&lang=es`
        );

        const data = await respuesta.json();

        setClimas((prev) => ({
          ...prev,
          [ciudad.valor]: {
            temp: data.main.temp,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            humedad: data.main.humidity,
            viento: data.wind.speed,
          },
        }));
      } catch (error) {
        console.log("Error cargando clima de " + ciudad.valor, error);
      }
    });
  }, []);

  return (
    <div className="pronostico-container">
      <h2 className="pronostico-title">Pronóstico del Clima AMBA</h2>

      <div className="cards-container">
        {ciudades.map(({ nombre, valor }) => {
          const clima = climas[valor];

          return (
            <div key={nombre} className="card">
              <h3>{nombre}</h3>

              {!clima ? (
                <p>Cargando...</p>
              ) : (
                <>
                  <img
                    src={`https://openweathermap.org/img/wn/${clima.icon}@2x.png`}
                    alt="icono clima"
                    className="card-icon"
                  />

                  <p>{clima.temp}°C - {clima.desc}</p>
                  <p>Humedad: {clima.humedad}%</p>
                  <p>Viento: {clima.viento} m/s</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
