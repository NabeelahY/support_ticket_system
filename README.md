# Support Ticket System
[API Documentation](https://documenter.getpostman.com/view/11434923/T17Ke6kP?version=latest#intro)

[Deployed API](https://support-request-app.herokuapp.com/)  🚀

![CircleCI](https://circleci.com/gh/NabeelahY/support_ticket_system.svg?style=shield&circle-token=8d10a5f120275605792a7797aa0eb10248c4b6a9)
[![Coverage Status](https://coveralls.io/repos/github/NabeelahY/support_ticket_system/badge.svg?branch=develop&t=5i98vb)](https://coveralls.io/github/NabeelahY/support_ticket_system?branch=develop)

## Installation

**Clone project**

```bash
git clone https://github.com/NabeelahY/support_ticket_system.git
```

**Install NPM dependencies**

```bash
npm install
```

**Setup .env file**

```bash
cp .env.example .env
```

## Running development server

Run the server on [localhost:8000](http://localhost:8000)

```bash
npm run dev
```

## Testing

Testing is done with Jest and are located under the `tests` directory amd `__tests__` directory located in each route folder. To run the tests use:

```bash
npm test
```

For testing, you do not require a seperate database. That is being handled with the `mongodb-memory-server` package once you install the dependencies.

## Seeding

To seed your database, run:

```bash
npm run seed
```

## Roadmap / Thought Process

- [x] Create a user schema that encompasses a customer, support agent and admin
- [x] Create user models and routes along with middlewares for each kind of users
- [x] Test endpoints with Jest. 
- [x] Integrate CircleCI along with coveralls for Continuous Integration
- [x] Create other routes and make sure to test before merging to develop branch
- [x] Create documentation for each route using Postman
- [x] Add admin user features and improve API

