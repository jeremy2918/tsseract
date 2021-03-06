<div align="center">
  <p align="center">
    <img src='./static/Main-aside/logo_transparent_background.png' height='200' />
  </p>

  <p align="center">
    Tsseract in a social media app where you can create valuable content to share.
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/workflow/status/jeremy2918/tsseract/Continuous%20Integration/master" />
    <img src="https://img.shields.io/website?down_message=down&up_message=running&url=https%3A%2F%2Ftsseract.herokuapp.com%2F" />
    <img src="https://img.shields.io/github/repo-size/jeremy2918/tsseract" />
    <a href="https://twitter.com/AskJere">
        <img src="https://img.shields.io/twitter/follow/AskJere?style=social" />
    </a>
  </p>
</div>

## Folder Structure 🗂️

    ├── .github                     # GitHub Settings
        ├── workflows                   # GitHub Actions files
        └── pull_request_template       # PR Description template
    ├── client                      # React Components and Containers
        ├── components                  # Function React Components
        ├── helpers                     # Helpers Functions
        ├── hooks                       # Custom React Hooks
        ├── pages                       # NextJS Pages
        └── theme                       # MaterialUI theme
    ├── server                      # App Restful API
        ├── controllers                 # Database controllers
        ├── helpers                     # Helpers folder
        ├── middlewares                 # Express middlewares
        ├── models                      # MongoDB collections Models
        ├── routes                      # Express routes
        ├── tests                       # Unit tests
        ├── database.ts                 # MongoDB connection file
        ├── index.ts                    # NextJS Server configuration file
        └── server.ts                   # Express Server configuration file
    ├── static                      # Static files
        └── manifest.json               # Manifest file
    ├── .babelrc                    # Babel custom config file
    ├── .dockerignore               # Docker ignored files
    ├── .env.sample                 # Environment variables file
    ├── .gitignore                  # Git ignored files
    ├── .prettierrc                 # Prettier config file
    ├── docker-compose.yml          # Image dependencies file
    ├── Dockerfile                  # Image file
    ├── .jest.config.js             # Jest config file
    ├── License                     # MIT License
    ├── .next-env.d.ts              # Next environment file
    ├── next.config.js              # NextJS configuration file
    ├── nodemon.jon                 # Nodemon configuration file
    ├── package-lock.json           # Dependencies tree
    ├── package.json                # Dependencies management file
    └── README.md                   # ReadMe file

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Check out the [docs](docs/index.md) for more info about the API endpoints.

### Prerequisites

First, you will need to create an `.env`. Then set the missing environment variables.
To create the `.env` file just run `cp .env.sample .env`.

### Full Set-up (recommended)

You will need to have installed and running these technologies in order to run the application:

- [NodeJS](https://nodejs.org/es/) - Dependencies Management
- [MongoDB](https://www.mongodb.com/es) - Database Storage
- [MongoDB Compass](https://www.mongodb.com/products/compass) - **Optional** To explore and manipulate the database

- Clone the repo:

  ```
  git clone https://github.com/jeremy2918/tsseract-app.git
  ```

- Install dependencies: `npm install`

- Build the `dist` folder with the TypeScript compiler: `npm run tsc`

- Copy the `static` files into the `dist` folder: `npm run copy-files`

- To start the app in development mode: `npm run dev`

- You can seed the database with some dummy data by running: `npm run seed`

You should get the following logs on the console:

```
🚀 Server running on port 8080...
📡 Connected to MongoDB...
```

- You should be able to go to [http://localhost:8080/](http://localhost:8080/) and see the application running.

> If you are making some changes to the project, you should run `npm run tsc:w` to start the TypeScript compilation on watch mode.

## Running the tests

This app uses [Jest](https://jestjs.io/) as testing framework 🧑‍💻. To run tests, just run `npm test` in the console at the project directory.

## Built With

- [NodeJS](https://nodejs.org/es/) - Dependencies Management
- [React](https://es.reactjs.org/) - The Web Framework
- [NextJS](https://nextjs.org/) - React Framework
- [Material-UI](https://material-ui.com/) - Components design
- [Express](https://expressjs.com/es/) - API service framework
- [MongoDB](https://www.mongodb.com/es) - Database storage
- [Jest](https://jestjs.io/) - Testing Framework

## Authors

- **Jeremy** - _Project Owner & Developer_ 🧑‍💻 - [GitHub](https://github.com/jeremy2918) [Twitter](https://twitter.com/AskJere)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
