# Filmbase Application 🎞️

Projekt semestralny przygotowany na kurs "Zaawansowane Techniki Programowania".

## Zespół projektowy

- **Krzysztof Radzięta** - Backend
- **Daniel Warzecha** - Backend
- **Maksymilian Patoń** - Frontend
- **Jakub Goch** - Frontend

---

## Opis projektu

### Główne funkcjonalności:

1. **Rejestracja i logowanie**
2. **Przeglądanie filmów**
3. **Ocenianie filmów**
4. **Dodawanie komentarzy**

---

## Instrukcja uruchomienia

### Wymagania wstępne

- Node v22.11.0 lub inny kompatybilny z Angularem 18
- Angular 18.2.13

---

### Uruchomienie aplikacji

- Dla samej aplikacji frontend komenda 'ng serve'
- Dla całości aplikacji uruchomienie kontenera docker

### Dostęp do aplikacji

- Aplikacja dostępna pod adresem `http://localhost:4200/`.

## Struktura aplikacji

### Backend:

- **Uwierzytelnianie**: Bezstanowe JWT z obsługą refresh tokenów.
- **Funkcje dotyczące filmów**: Ocena i komentowanie filmów.
- **Role użytkowników**:
  - Zwykli użytkownicy mogą oceniać i komentować filmy.
  - Administrator zarządza filmami bezpośrednio przez SQL.

### Frontend:

- Stworzony do komunikacji z API backendowym w celu zapewnienia płynnej obsługi użytkowników.
