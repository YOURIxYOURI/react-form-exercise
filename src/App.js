import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    birthDate: "",
    country: "",
    gender: "",
    marketingConsent: false,
    termsConsent: false,
  });

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedCountryFlag, setSelectedCountryFlag] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryData = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg,
        }));
        setCountries(countryData);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "Imię musi mieć co najmniej 2 znaki.";
    }

    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Nazwisko musi mieć co najmniej 2 znaki.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Podaj poprawny adres email.";
    }

    const passwordRegex = /^(?=.*\d.*\d)(?=.*[!@#$%^&*]{3,}).{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Hasło musi mieć co najmniej 8 znaków, 2 cyfry i 3 znaki specjalne.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Hasła muszą być takie same.";
    }

    if (!formData.age || formData.age < 18 || formData.age > 99) {
      newErrors.age = "Wiek musi być liczbą pomiędzy 18 a 99.";
    }

    const birthYear = new Date(formData.birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear !== parseInt(formData.age)) {
      newErrors.birthDate = "Data urodzenia musi być zgodna z wiekiem.";
    }

    if (!formData.country) {
      newErrors.country = "Musisz wybrać kraj.";
    }

    if (!formData.termsConsent) {
      newErrors.termsConsent = "Musisz zaakceptować regulamin.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (name === "country") {
      const selectedCountry = countries.find((country) => country.name === value);
      setSelectedCountryFlag(selectedCountry ? selectedCountry.flag : "");
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Rejestracja</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            Imię
          </label>
          <input
            type="text"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Nazwisko
          </label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Hasło
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Potwierdź hasło
          </label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Wiek
          </label>
          <input
            type="number"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Data urodzenia
          </label>
          <input
            type="date"
            className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Kraj
          </label>
          <div className="d-flex align-items-center">
            <select
              className={`form-select ${errors.country ? "is-invalid" : ""}`}
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Wybierz kraj</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {selectedCountryFlag && (
              <img
                src={selectedCountryFlag}
                alt="flaga"
                width="30"
                height="20"
                className="ms-3"
              />
            )}
          </div>
          {errors.country && <div className="invalid-feedback">{errors.country}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Płeć</label>
          <div>
            <label className="form-check-label me-3">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />{" "}
              Mężczyzna
            </label>
            <label className="form-check-label">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Kobieta
            </label>
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="marketingConsent"
            name="marketingConsent"
            checked={formData.marketing}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="marketingConsent">
              Zgoda na otrzymywanie treści marketingowych
            </label>
          </div>
  
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsConsent"
              name="termsConsent"
              checked={formData.termsConsent}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="termsConsent">
              Akceptuję regulamin (wymagane)
            </label>
            {errors.termsConsent && <div className="invalid-feedback">{errors.termsConsent}</div>}
          </div>
  
          <button onClick={handleSubmit} className="btn btn-primary">
            Zarejestruj się
          </button>
        </form>
        <pre className="mt-4">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    );
  };

  export default App;
  