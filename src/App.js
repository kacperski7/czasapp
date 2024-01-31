import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [timezoneData, setTimezoneData] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [projectFilters, setProjectFilters] = useState({
    search: '',
    sort: 'all',
  });

  const handleConvertToTimezone = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;

          const response = await axios.get(
            `https://api.timezonedb.com/v2.1/get-time-zone?key=QU2RLEPOQ681&format=json&by=position&lat=${userLatitude}&lng=${userLongitude}`
          );

          const {
            zoneName,
            gmtOffset,
            dst,
            formatted,
          } = response.data;

          const timezoneInfo = {
            zoneName,
            gmtOffset,
            daylightSavingTime: dst,
            currentTime: formatted,
          };

          setTimezoneData(timezoneInfo);
          setLatitude(userLatitude);
          setLongitude(userLongitude);
        },
        (error) => {
          console.error('Błąd pobierania lokalizacji użytkownika:', error);
          setTimezoneData(null);
        }
      );
    } catch (error) {
      console.error('Błąd pobierania danych z API:', error);
      setTimezoneData(null);
    }
  };

  const handleContactFormChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleContactFormSubmit = (event) => {
    event.preventDefault();
    console.log('Wysyłam formularz:', contactForm);
  };

  const handleProjectFiltersChange = (event) => {
    const { name, value } = event.target;
    setProjectFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className="HomePage">
        <h2>Strona Główna</h2>
        <div className="HomePageText">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
            nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
            nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
            nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
            nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
            nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
            nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus,
            nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.
          </p>
        </div>
        <img className="HomePageImage" src="/sdsdsd.png" alt="Obrazek" />
      </section>

      <section className="AboutMe">
        <h2>Informacje o Mnie</h2>
        <div className="AboutMeText">
          {/* Tutaj możesz dodać treść informacji o sobie */}
        </div>
        <div>
          <ul>
            <li>Zainteresowania i hobby:</li>
            <li>Edukacja i doświadczenie zawodowe:
              <ul>
                <li>Ukończone kursy</li>
                <li>Doświadczenie zawodowe</li>
              </ul>
            </li>
            <li>Cele i ambicje:
              <ul>
                <li>Krótkoterminowe cele:</li>
                <li>Długoterminowe cele:</li>
              </ul>
            </li>
            <li>Umiejętności:
              <ul>
                <li>Języki programowania:</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section className="Projects">
        <h2>Projekty</h2>
        <div className="projectFilters">
          <div className="searchProject">
            <label htmlFor="search">Wyszukaj projekt:</label>
            <input
              type="text"
              id="search"
              name="search"
              value={projectFilters.search}
              onChange={handleProjectFiltersChange}
            />
          </div>
          <div className="sortProjects">
            <label htmlFor="sort">Sortuj projekty:</label>
            <select
              id="sort"
              name="sort"
              value={projectFilters.sort}
              onChange={handleProjectFiltersChange}
            >
              <option value="all">Wszystkie projekty</option>
              <option value="oldest">Od najstarszego</option>
              <option value="newest">Od najnowszego</option>
            </select>
          </div>
        </div>
      </section>

      <section className="App">
        <header className="App-header">
          <h1>Konwersja Lokalizacji na strefę czasową</h1>
          <button className="convertButton" onClick={handleConvertToTimezone}>
            Pobierz lokalizację i konwertuj na strefę czasową
          </button>
          {timezoneData && (
            <div className="timezoneInfo">
              <h2>Informacje o strefie czasowej:</h2>
              <p>Szerokość geograficzna: {latitude}</p>
              <p>Długość geograficzna: {longitude}</p>
              <p>Strefa czasowa: {timezoneData.zoneName}</p>
              <p>Przesunięcie GMT: {timezoneData.gmtOffset / 3600} godzin</p>
              <p>Czas letni: {timezoneData.daylightSavingTime ? 'Tak' : 'Nie'}</p>
              <p className="currentTime">Aktualny czas: {timezoneData.currentTime}</p>
            </div>
          )}
        </header>
      </section>

      <section className="Contact">
        <h2>Kontakt</h2>
        <form onSubmit={handleContactFormSubmit}>
          <div className="contactFormField">
            <label htmlFor="name">Imię:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactForm.name}
              onChange={handleContactFormChange}
            />
          </div>
          <div className="contactFormField">
            <label htmlFor="email">Adres e-mail:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactForm.email}
              onChange={handleContactFormChange}
            />
          </div>
          <div className="contactFormField">
            <label htmlFor="phone">Numer telefonu:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={contactForm.phone}
              onChange={handleContactFormChange}
            />
          </div>
          <div className="contactFormField">
            <label htmlFor="message">Wiadomość:</label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleContactFormChange}
            />
          </div>
          <button type="submit">Wyślij</button>
        </form>
      </section>
    </div>
  );
}

export default App;
