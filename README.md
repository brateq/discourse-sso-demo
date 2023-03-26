# Discourse Authorization - Demo

This demo demonstrates how to use Discourse as an SSO (Single Sign-On) provider in a web application.

## Requirements

Before starting the server, make sure to install all required packages. You can do this with:

```
npm install express crypto base64url querystring
```

## Discourse Configuration

1. Log in to the Discourse admin panel.
2. In the search bar, enter the phrase "discourse connect provider".
3. Check the option "enable discourse connect provider".
4. Fill in the "discourse connect provider secrets" field - enter `*` in the first field (for the production environment, enter the exact address of the site).
5. In the "DiscourseConnect secret" field, enter the password (recommended: `Zaq1234567`, so you don't have to change server `discourseSsoSecret` in server file later).

<img width="1076" alt="Zrzut ekranu 2023-03-26 o 23 01 22" src="https://user-images.githubusercontent.com/5649199/227804468-66f7f63d-7d6e-4619-b31e-46790e24a891.png">


## Server Configuration

In the `server.js` file, find the line:

```javascript
const discourseSsoSecret = 'Zaq1234567';
```
and change the value to the password used in the Discourse configuration.

Starting the Server
To start the server, enter the following command:

node server.js
The server will be available at: http://localhost:8080.
