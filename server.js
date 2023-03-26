const express = require('express');
const crypto = require('crypto');
const base64url = require('base64url');
const querystring = require('querystring');

const app = express();
const port = 8080;

const discourseSsoSecret = 'Zaq1234567';
const discourseRootUrl = 'http://localhost:3000';

function generateNonce() {
    const nonceSize = 24;
    return crypto.randomBytes(nonceSize).toString('hex');
}

app.get('/sso/login', (req, res) => {
    const nonce = generateNonce();
    const returnUrl = 'http://localhost:8080/sso/callback';

    const rawPayload = `nonce=${nonce}&return_sso_url=${encodeURIComponent(returnUrl)}`;
    const base64Payload = base64url.encode(rawPayload);
    const urlEncodedPayload = encodeURIComponent(base64Payload);

    const hmac = crypto.createHmac('sha256', discourseSsoSecret);
    hmac.update(base64Payload);
    const hexSignature = hmac.digest('hex');

    const authUrl = `${discourseRootUrl}/session/sso_provider?sso=${urlEncodedPayload}&sig=${hexSignature}`;
    res.redirect(authUrl);
});

app.get('/sso/callback', (req, res) => {
    const sso = req.query.sso;
    const sig = req.query.sig;

    if (!sso || !sig) {
        res.status(400).send('SSO paremeters missing');
        return;
    }

    const hmac = crypto.createHmac('sha256', discourseSsoSecret);
    hmac.update(sso);
    const computedSig = hmac.digest();

    const sigBytes = Buffer.from(sig, 'hex');

    if (!computedSig.equals(sigBytes)) {
        res.status(403).send('Incorrect signature of SSO');
        return;
    }

    const decodedSso = base64url.decode(sso);
    const payload = querystring.parse(decodedSso);

    // nonce verification
    // ...

    res.send(`${JSON.stringify(payload)}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});