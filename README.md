# e2e_qa

## Description

Sample of E2E tests written in Playwright with typescript/javascript

## Requirements

* [Node JS](https://nodejs.org/en/)

## Develop - IN PROGRESS

Install git hook:

    pre-commit install

Run linters on all files:

    pre-commit run -a

## Running the tests

1. To install dependencies: `npm install`
2. To run test framework correctly you need to configure `.env` file:

* check out `.env.example` file
* copy and paste content into new `.env` file

To run all tests at once:
 `npm run test` (use `npm run test -- --debug` to run in headed mode with a debugger stopped at the start of each test). Use the `--project=chromium` parameter to run tests only on Chromium.
   To run single test using its title:
 `npm run test -- -g 'test-title' --retries=1`
   In case of failed tests, you can use `--retries=1` parameter to make sure if test is badly created or just flaky and requires other changes.

### Limitations

* `.env.example` file has valid login and password. It is caused by CI configuration which creates copy of this file and calls it `.env`. It solves problem with `dot.env` on CI. On `https://www.saucedemo.com/` website you can find other credentials but for now they are configured for `standard_user`.
