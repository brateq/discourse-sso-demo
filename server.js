const express = require('express');
const crypto = require('crypto');
const base64url = require('base64url');
const querystring = require('querystring');

const app = express();

const discourseRootUrl = 'http://localhost:3000';
const discourseSsoSecret = 'Zaq1234567'; // minimum 10 znaków, wpisać w discourse connect provider secrets * zamiast www.website.com
const returnUrl = 'http://localhost:8080/sso/callback';

app.use(express.static('public'));

app.get('/sso/login', (req, res) => {
    const nonce = crypto.randomBytes(16).toString('hex');
    const rawPayload = `nonce=${nonce}&return_sso_url=${returnUrl}`;
    const base64Payload = base64url.fromBase64(Buffer.from(rawPayload).toString('base64'));
    const hexSignature = crypto.createHmac('sha256', discourseSsoSecret).update(base64Payload).digest('hex');
    const ssoRedirectUrl = `${discourseRootUrl}/session/sso_provider?sso=${base64Payload}&sig=${hexSignature}`;

    res.redirect(ssoRedirectUrl);
});

app.get('/sso/callback', (req, res) => {
    const { sso, sig } = req.query;
    const calculatedSig = crypto.createHmac('sha256', discourseSsoSecret).update(sso).digest('hex');

    if (calculatedSig !== sig) {
        res.status(401).send('Podpis nie zgadza się. Autoryzacja nieudana.');
        return;
    }

    const decodedSso = base64url.toBase64(sso);
    const payload = querystring.parse(Buffer.from(decodedSso, 'base64').toString());
    res.json(JSON.stringify(payload));
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});