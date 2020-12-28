# RESTPLATE

A template for building REST APIs with Node.js, Express and Mongo DB. Giving you the MEN part of 
your MEAN stack.

## Structure

```
/
    /models
        * Post
        * User
    /routes
        * auth
        * posts
        * validateJWT
    * app.js
    * validation.js
    * package.json
    * .env
```

## Usage

You can either:

### Build New package.json

```
sudo rm package.json package-lock.json 
npm init

# Install dependancies
npm install @hapi/joi bcryptjs cors dotenv express jsonwebtoken mongoose --save

# Optional DevOPS
npm install nodemon --save
```

### Modify Existing package.json

```
npm install
```

## Config

### Nodemon

`nodemon app.js`