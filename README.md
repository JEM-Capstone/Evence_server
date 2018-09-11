TO SET UP SERVER FOR USE ON A NEW NETWORK IN DEVELOPMENT

  1) Change ```secrets.js``` LINKEDIN_CALLBACK to ```http://${your_ip_address}:8080/auth/linkedin/callback```
  2) Add this new url to the linkedin developer app page if it hasn't been
    add already
  3) Run command ```npm run start-dev```
  4) Server should now be running!


  DICTIONARY MODIFICATION INSTRUCTIONS:

  1) Run build dictonary: `node run build-dictionary`
  2) Copy dictionary output form terminal and replace the dictionary object in "./server/services/parser/dictionary.js"
