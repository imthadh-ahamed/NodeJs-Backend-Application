# Weather Report Service - NodeJs-Backend-Application <br><br>

<p>This project is an automated weather report service built using Node.js, Express, MongoDB, and various other technologies. It fetches weather data from the OpenWeatherMap API and sends regular email updates to users. The weather report text is generated using the Google Generative AI (Gemini) API. <br><br>

## Features <br>
<ul>
  <li>User registration with location data. </li>
  <li>Fetches weather data based on user location.</li>
  <li>Generates detailed weather report text using the Gemini API.</li>
  <li>Sends regular email updates to users with the current weather information.</li>
  <li>Stores weather data and reports in MongoDB.</li>
  <li>Cron job to send weather updates every 3 hours.</li>
</ul><br><br>

## Technologies Used <br>
<ul>
  <li>Node.js</li>
  <li>Express</li>
  <li>MongoDB</li>
  <li>Mongoose</li>
  <li>Dotenv</li>
  <li>Cron</li>
  <li>Nodemailer</li>
  <li>Google Generative AI (Gemini)</li>
  <li>OpenWeatherMap API</li>
</ul><br><br>

## Getting Started <br>
## Prerequisites <br>
<ul>
  <li>Node.js and npm installed</li>
  <li>MongoDB instance running</li>
  <li>OpenWeatherMap API key</li>
  <li>Google Generative AI (Gemini) API key</li>
  <li>Gmail account for sending emails</li>
</ul><br><br>

## Installation <br>

<ol>
  <li>Clone the repository:</li>
  
  ```bash
   git clone https://github.com/yourusername/weather-report-service.git
   cd weather-report-service
   ```

<br>
  <li>Install the dependencies:</li>

  ```bash
  npm install
  ```

<br>
  <li>Create a .env file in the root directory and add the following variables:</li>

  ```bash
  MONGO_URI=your_mongodb_uri
  EMAIL=your_gmail_address
  EMAIL_PASSWORD=your_gmail_password
  OPENWEATHER_API_KEY=your_openweather_api_key
  GEMINI_API_KEY=your_gemini_api_key
```

</ol>
<br><br>

# Running the Application <br>
<ol>
  <li>Start the server:</li>

  ```bash
  npm run start
  ```
<br>
  <li>The server will run on port 3000 by default. You can access the API endpoints at http://localhost:3000.</li>
  <ul>
    <li>User Routes:</li>
    - POST /api/user/create - Create a new user. <br>
    - PUT /api/user/update/:email - Update user's location by email
    <li>Weather Routes:</li>
    - GET /api/weather/:email/:date - Fetch weather data for a specific date associated with a user.
  </ul>
</ol>

# Folder Structure <br>

```bash
-api
├── controllers
│   ├── userController.js
│   ├── weatherController.js
├── models
│   └── User.js
├── routes
│   ├── userRoutes.js
│   └── weatherRoutes.js
├── services
│   ├── emailService.js
│   ├── weatherService.js
├── .env
├── index.js
└── package.json
```

# Acknowledgements <br>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a></li>
  <li><a href="https://expressjs.com/">Express</a></li>
  <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  <li><a href="https://mongoosejs.com/">Mongoose</a></li>
  <li><a href="https://github.com/motdotla/dotenv">Dotenv</a></li>
  <li><a href="https://nodemailer.com/">Nodemailer</a></li>
  <li><a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/overview">Google Generative AI</a></li>
  <li><a href="https://openweathermap.org/">OpenWeatherMap API</a></li>
</ul>

















