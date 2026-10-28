# 🛠️ Local Setup Guide

Quick start guide to configure and run the project locally.

## 1. Backend & Database Setup (Java Spring Boot + PostgreSQL)

1. **Create Configuration File:**

   Copy `backend/src/main/resources/application.properties.example` to `application.properties` in the same directory.

2. **Configure Database Credentials:**

   Open `application.properties` and update your local PostgreSQL details:

   ```
   spring.datasource.url=YOUR_POSTGRES_URL
   spring.datasource.username=YOUR_POSTGRES_USER
   spring.datasource.password=YOUR_POSTGRES_PASSWORD
   
   
   ```

3. **Run Application:**

   Open the project in **IntelliJ IDEA**, locate `PlanetPulseApplication.java`, and click the green **Run ▶️** button.

## 2. Frontend Setup (Vanilla JavaScript)

1. **Create Configuration File:**

   Copy `frontend/config.env.example.json` to `frontend/config.env.json`.

2. **Configure Backend API URL:**

   Ensure `config.env.json` points to your local Spring Boot server:

   ```
   {
     "API_BASE_URL": "YOUR_API_URL"
   }
   
   
   ```

3. **Run Frontend:**

   Open `frontend/index.html` in your browser (or use IntelliJ / VS Code **Live Server** extension).