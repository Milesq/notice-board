# Notice Board

[![Netlify Status](https://api.netlify.com/api/v1/badges/a03f18fd-b75a-4182-8206-9d2a7cca3a18/deploy-status)](https://app.netlify.com/sites/lucid-johnson-b23f0a/deploys)

Synchronized with firebase auth and firestore, announcements system with CRUD panel system.

## Features

- Login by name
- Admin login with google

## Usage

Before run fill config data in `functions/credentials.json` (like `credentials.example.json`). The same with `functions/env.json`
Credentials are equal to private key from admin sdk, you can download it from
[this url](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk)

Nextly you should fill `public/firebase-messaging-sw.js`. You can take data from firebase app console (they are called _Firebase SDK snippet_) and cloud _messaging_
