# Soul Hues, a custom ChatGPT AI Chatbot

Soul Hues is a <b><i>personality color discovery app</i></b> which can turn a user’s colors into artwork. This app uses a personalized and interactive AI chatbot (OpenAI's ChatGPT-4) creation to determine a person’s color based on their personality and then uses DALL-E to create a watercolor painting with their approved colors.

This will be a MERN stack app where users will be able to authenticate their credentials using middleware validation chains (express-validator), JWT tokens (JSON web tokens), HTTP-Only cookies (cookie parser), signed cookies and password encryption using bcrypt.

Users will be able to store their AI chatbot sessions within a MongoDB database for 7 days (retrieval and deletion) and interact with the AI in a React based front-end interface using mostly JavaScript.

### To run the program locally:

1. Clone the repository
2. Within the root directory, install the dependencies:

   ```javascript
   npm install
   ```

3. Open the backend in a terminal to start the server concurrently while connected to the MongoDB database:
   ```javascript
   npm run start
   ```
4. Open a second terminal for the frontend and start the web client concurrently:

   ```javascript
   npm run dev
   ```

5. Open your browser and go to `http://localhost:PORT/` to view the app

### To view and run the program online:

The app is deployed on Vercel and can be accessed at: tbd
