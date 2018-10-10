## Samesite cookies sample

Install

* ```npm i```

Run

* ```npm start```
* [http://localhost:3000](http://localhost:3000)
* it will automatically perform redirections and will print out a log:

```
=======localhost========
Setting normalCookie, strictCooke, laxCookie for localhost
redirecting to 127.0.0.1
=======127.0.0.1========
doing a POST, a GET, and a redirect to the localhost domain
=======localhost========
GET request from 127.0.0.1 to localhost
normalCookie is SET
strictCookie is not set
laxCookie is not set
=======localhost========
redirect from 127.0.0.1 to localhost
normalCookie is SET
strictCookie is not set
laxCookie is SET
=======localhost========
GET request from localhost to localhost
normalCookie is SET
strictCookie is SET
laxCookie is SET
=======localhost========
redirect from localhost
normalCookie is SET
strictCookie is SET
laxCookie is SET
```

* normalCookie is without the SameSite attribute
* strictCookie is with SameSite=Strict
* laxCookie is with SameSite=Lax