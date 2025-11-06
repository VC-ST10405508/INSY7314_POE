# Github Link:

https://github.com/VC-ST10405508/INSY7314_Task2_POE

---

# Video:
https://youtu.be/oCyy_PlBNj4 

---

# Introduction
---
Welcome to Team 9's part 2 solution for INSY7314. The goal of this part is to implement security measures for user login and registration. We will also implement a UI for this portal.
For this solution we create an API with the following:
- express
- node.js
- mongo database

The API then interacts with our front-end which is created with the following:
- react+vite
- CSS (in future - 2 devs had unfortunate circumstances and werent able to help much for this program. As a team we accept this as our failure to deliver)
- HTML

Additional tools:
- CircleCI pipeline with SonarQube
---
# Team Members:
- Kabelo Ntokozo Will Mndebele – ST10030414
- Joshua Ponquett – ST10405508
- Mohau D Menyatsoe – ST10335992
- Maqhawe Maseko – ST10205103

---

# How to run the program

### Setup
- 1: install node.js, visual studio code and openSSL (openssl will be used to generate your own SSL key and cert if you dont have them)
- 2: Create the SSL private key and certificate key. if you don't know how to please find a guide online to follow.
- 3: Make sure your pc has the privatekey and certificate key saved as key.pem and cert.pem
- 3: add the keys to the backend of the project under a new folder call ssl
- 4: Make sure you pc trusts these self signed keys if they are self signed.
- 5: if you are still struggling with ssl try this video: https://www.youtube.com/watch?v=qlcVx-k-02E&t=408s 

### Running the code:
- 1: open visual studio
- 2: clone the repository to your Visual studio Code
- 3.1: cd backend - run this command to switch to the backend file in your terminal
- 3.2: run the following command in the backend to install the node modules: npm install express bcrypt jsonwebtoken mongoose cors helmet dotenv
- 3.3 npm install
- npm install will detect any additional stuff we added according to the json and didnt add in the first cmd
- 4: run this command: npm install nodemon -D
- 5: run the app with: npm run dev - this will start the backend
- 6: open a new terminal and do cd frontend
- 7: npm install
- will install modules needed
- 8: npm install react-router-dom
- 9: npm run dev

everything should be working now.
---

# Challanges faced:
- This is our ever assignment that we have done with a fully integrated MERN. The main problem was trying to understand how to set everything up with good OOP (object orientated programming) and SoC (seperation of concerns) in mind since we have been taught that OOP and SoC are essential for application development. 
- With other Assigments and some of our members working real jobs - we unfortunatly ran out of time. We also had unforseen circumstances on the final few days of submission which lead to a failure to deliver a nice banking portal so we did the bare minimum to try meet the rubric's marking allocation. 



