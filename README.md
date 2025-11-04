# Mise en place des web services basés sur RESTapi

Application web complète pour la gestion des stations-service et des prix journaliers des carburants.

## 🛠️ Technologies

**Backend:**
- Spring Boot 3.5.7
- Spring Data JPA
- H2 Database
- Lombok

**Frontend:**
- Angular 19
- Bootstrap 5
- Reactive Forms

## 📋 Fonctionnalités

- Gestion CRUD des stations (nom, ville, adresse)
- Gestion CRUD des carburants (nom, description)
- Gestion de l'historique des prix journaliers
- Interface utilisateur moderne et réactive
- API REST complète

## 🚀 Démarrage

### Backend
```bash
cd GestionStations
mvn spring-boot:run
```
L'API sera accessible sur `http://localhost:8080`

### Frontend
```bash
cd client
npm install
npm start
```
L'application sera accessible sur `http://localhost:4200`

## 📡 API Endpoints

- **Stations**: `/api/stations`
- **Carburants**: `/api/carburants`
- **Historique**: `/api/histocarb`

## 🗄️ Base de données

Base de données H2 en mémoire (données perdues au redémarrage).
Console H2: `http://localhost:8080/h2-console`
- URL: `jdbc:h2:mem:stations_db`
- Username: `sa`
- Password: (vide)

## 📁 Structure

```
A5/
├── GestionStations/     # Backend Spring Boot
└── client/              # Frontend Angular
```

## 👨‍💻 Auteur

Projet développé dans le cadre académique.

