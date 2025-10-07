Movie review API
Et API for å håndtere filmer og anmeldelser.

Hva som er blitt brukt:
 - Node Express
 - Microsoft SQL Server
 - dotenv
 - mssql
 - Postman (for testing)

For å starte dette må du installere:
npm install

Sett opp .env- fil med tilkoblingsinformasjon til databasen.
Start serveren:
node src/main.js

Endepunkter:
 - GET /movies (Henter alle filmene)
 - GET /movies/:id (Henter en film)
 - POST /movies (Legger til film)
 - PUT /movies/:id (Oppdaterer en film)

For anmeldelser:
 - GET /movies/:id/reviews (Henter anmeldelser for en film)
 - POST /movies/:id/reviews (Legg til en anmeldelse)

Statuskoder:
 - 200 OK
 - 201 Created
 - 400 Bad Request
 - 404 Not Found
 - 500 Internal Server Error
