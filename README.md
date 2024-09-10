# Welcome to the PlaywrightMT repository

Hi! My name is Mateusz and I have created this repository to show my approach to E2E tests and give you a sample of my skillset. Hope you will enjoy it as I did.

## Description

I have been writing tests in Playwright framework mostly, but I also have some basics of Cypress. I have been working with API requests aswell but the webpage that I used in this repository couldn't give me a proper access to such actions.

I would say that 60% of my time was taken by creating and maintaining the E2E tests. The rest of the time was devoted to other activities: creating test scenarios, verifying of requirements (QA), manual testing, reporting bugs, creating subtasks in Jira etc.

I hope that checking the code and proposed solutions will be easy and pleasant. I appreciate every feedback and that you for yout time!

## Table of contents

-   [Requirements](#requirements)
-   [Repository Configuration](#repository-configuration)
-   [Running the tests](#running-the-tests)
-   [Limitations](#limitations)
-   [HTML Reports](#html-reports)
-   [TypeDoc Documentation](#typedoc-documentation)
-   [Tips](#tips)

## Requirements

-   [Node JS](https://nodejs.org/en/)

## Repository Configuration

1. To install dependencies: `npm install`
2. To run test framework correctly you need to configure `.env` file:
    - check out `.env.example` file
    - copy and paste content into new `.env` file

## Running the tests

To run all tests at once:

-   `npm run test`

To run tests in headed mode with a debugger stopped at the start of each test:

-   `npm run test -- --debug`

To run tests only on Chromium:

-   `npm run test -- --project=chromium`

To run single test using its title:

-   `npm run test -- -g 'test-title'`

To make sure if test is badly created or just flaky and requires other change:

-   `npm run test -- -g 'test-title' --retries=1`

## Limitations

-   `.env.example` file has valid login and password. On `https://www.saucedemo.com/` website you can find other credentials but for now they are configured for `standard_user`.

## HTML Reports

In tests on CI we use HTML reporter with trace viewer that trace only failed tests. If you want to use it, click on **Artifacts** section on the **PlaywrightMT** repository and then click on **playwright-report** to download **.zip** file. Later, extract the zip file into **playwright-report** folder (create it). After that you can open report with command:

    npx playwright show-report

## TypeDoc Documentation

In this project we use the TypeDoc, a documentation generator for TypeScript.

Build separately written documentation by running:

    npm run typedoc

then open the `docs/index.html` file in your browser. For more information see [typedoc documentation.](https://typedoc.org/)

Overall documentation standards in this project:

-   Ensure comments are concise and to the point.
-   Use proper grammar and punctuation for readability.
-   Maintain consistent formatting across all comments for uniformity.
-   When describing a parameter using the `@param` e.g. an argument of a function, use a hyphen after the parameter name before the short role description.
-   All the documentation comments must start with the capital letter.
-   Use `/** */` to enclose a documentation comment.

#### Classes

Every class must have a top-level comment describing its overall purpose and usage.

-   Class properties are self-explanatory, they don't require special documentation unless there is a need for one.
-   The class constructor should be documented with a brief description of its role. Use `@param` tags for each parameter, including short text explaining their purpose.
-   All other class methods must be documented:
    -   Provide a brief summary of the method’s functionality.
    -   Use `@param` tags to describe each parameter’s purpose.
    -   When a method returns a value, use `@returns` tag to describe the return value and its type.
    -   Include additional notes or special cases in the method comment if necessary.

#### Functions

Each function must have a top-level comment summarizing its purpose.

-   Document all parameters using `@param` tags. Include the parameter name and purpose.
-   When a function returns a value, document the return value using `@returns` tag.
-   Provide an example of how the function works if necessary. Such section should start with the `@example` tag.
-   Include additional notes or special cases in the method comment if necessary.

## Tips

### Have independent tests

Each test should be able to run on its own, or in a run of all or a subset of
tests. This requires not depending on the presence of data from other tests.

### Use page object models

See [the Playwright documentation](https://playwright.dev/docs/pom) and [Martin Fowler's
explanation](https://www.martinfowler.com/bliki/PageObject.html). Their implementations are located in the `pages` subdirectory.

Tests should not directly use Playwright locators, instead accessing page object
members.

### Write descriptive tests

It should be clear from test names and their steps what they do. Use code comments where needed.

### Have assertions in tests

Assertions should usually be included directly in the tests: both to see them when
reading the test, and to have more easily debug them on failure.

### Have clear names for functions

Write imperative function names clearly showing what the function does or computes.

### Use fixtures for data setup

Create objects in [Playwright fixtures](https://playwright.dev/docs/test-fixtures).

This brings multiple benefits:

-   tests are shorter
-   reusable setup is shared between multiple tests
-   data created for a test gets deleted by the fixture when finalizing regardless of it passing or failing (`DELETE` API request)
-   not hardcoding values (e.g. IDs or names of objects) that can be returned by the
    fixture

When the fixture is used only for the side effect of creating an object and its return value is not used, then the test should use `/* eslint-disable
@typescript-eslint/no-unused-vars */` as it has an unused parameter.

### Parametrize fixtures by overriding data fixtures

See <https://github.com/microsoft/playwright/issues/7065#issuecomment-862842235>.

### Prefer API over the UI in fixtures and test setup

Unless a test checks specific functionality, it should be accessed via the API for more reliability and faster test runs. This might involve custom APIs limited to staff users for use in E2E tests only.

### Use locators matching how a user would find the element

E.g. form elements can usually be found via the
[`getByRole`](https://playwright.dev/docs/locators#locate-by-role) method.

Do not use random-looking class names when finding elements. Sometimes the difficulty of locating elements necessities changes in the application frontend.

### Have consistent field names

Aim for the `nameType` format, e.g. `selectCheckbox`, `resetButton`. Do not abbreviate words like `button` (do not use `btn`).

### Have appropriate naming of things

To be consistent in writing the tests, there should be appropriate naming of things when it is possible:

-   file names should suggest the feature/view that is being tested within them
-   fixture names in tests:
    -   singular form - for a fixture not returning an array of multiple things that the test cares about
    -   plural form - for fixtures returning arrays, having zero or more objects that the test uses (or produces by overriding the fixture).

#### Use models to define specific values (mostly for API requests)

Represent objects by classes named by the singular object name in `./models`.
These represent data set in the test.
