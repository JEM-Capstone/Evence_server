TO SET UP SERVER FOR USE ON A NEW NETWORK IN DEVELOPMENT
    
  1) Clone this repository to your local machine
  2) Change ```secrets.js``` LINKEDIN_CALLBACK to ```http://${your_ip_address}:8080/auth/linkedin/callback```
  3) Add the above url to the linkedin developer app page ```https://www.linkedin.com/developer/apps/6268176/auth```
  4) Clone this repository to your local machine
  5) Inside project directory, run command ```npm run start-dev```
  
  The server should now be running!



  DICTIONARY MODIFICATION INSTRUCTIONS:

  1) Inside the project directory on your local machine run: ```npm run build-dictionary````
  2) Copy dictionary output form terminal 
  3) Replace the dictionary object in ```./server/services/parser/dictionary.js``` with copied contents from step 2
