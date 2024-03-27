# Soul Hues, a custom ChatGPT AI Chatbot

Soul Hues is a <b><i>personality color discovery app</i></b> which can turn a user’s colors into artwork. This app uses a personalized and interactive AI chatbot (OpenAI's ChatGPT-4) creation to determine a person’s color based on their personality and then uses DALL-E 3 to create a watercolor painting with their approved colors.

This is a MERN stack app using TypeScript where users will be able to authenticate their credentials using middleware validation chains (express-validator), JWT tokens (JSON web tokens), HTTP-Only cookies (cookie parser), signed cookies and password encryption using bcrypt.

Users will be able to store their AI chatbot sessions within a MongoDB database for 7 days (retrieval and deletion) and interact with the AI in a React based front-end interface using mostly TypeScript.

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

<!-- ### To view and run the program online:

The app is deployed on Vercel and can be accessed at: tbd -->
<br><br>


### Demo Screenshots:
&ensp;
&ensp;<img width="45%" alt="homepage" src="https://github.com/sajidahw/soul_hues/assets/88634981/4f4b2877-5070-4bd2-b1a1-5971441f532d" >

Upon signing in, users will be able to chat with the AI Personality GPT-4 and receive a watercolor painting based on their personality colors from Dall-E-3.

1. Begin your conversation with the Soul Hues AI by typing <b><i>"I would like to discover a new personality color."</b></i>
   

2. Answer the AI's questions to determine your personality color. Feel free to suggest your own color if you have one in mind or to inform the AI if you don't like the color it suggests.
   &ensp;<img width="75%" alt="demo_convo" src="https://github.com/sajidahw/soul_hues/assets/88634981/104d92fa-19e3-441f-a478-07724540a7bd">

   
3. Once your personality color is determined, you will be given an image description. Copy that description and paste it into the Dall-E 3 image generator to create your watercolor painting.
  &ensp; <img width="75%" alt="demo_copyimg_description" src="https://github.com/sajidahw/soul_hues/assets/88634981/88a8e33e-baec-4e9f-a4a8-d0a0853de1dc">

   
4. Enable your browser pop-ups, so you view your customized painting in a new window as well as see it minimized below the generator box. Enjoy your personalized watercolor painting!

  &ensp; <img width="25%" alt="demo_pasted_imgbox" src="https://github.com/sajidahw/soul_hues/assets/88634981/31699b3b-04f3-4bfd-86a2-0b41006b597a">     &ensp; &emsp;&emsp;
   <img width="40%" alt="demo_browserpopupimg" src="https://github.com/sajidahw/soul_hues/assets/88634981/bb59a104-56b1-401d-9277-45ef0acef37d">
