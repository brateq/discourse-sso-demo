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
