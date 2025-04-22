# WebdriverIO E2E Tests for Telnyx Website

## Project Description

This automation project was created to explore and validate the capabilities of the WebdriverIO framework as part of the Luxe Quality trainee program. It focuses on End-to-End (E2E) testing of the Telnyx website, ensuring key user workflows are functioning correctly. The project utilizes the Page Object Model (POM) design pattern for better organization and maintainability of test code.

## Technologies Used

- **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
- **Automation Framework:** [WebdriverIO](https://webdriver.io/)
- **Reporting:** [Allure Report](https://docs.qameta.io/allure/)
- **Testing Library:** [Mocha](https://mochajs.org/)

## Setup and Installation

To run this automation project locally, you will need to have the following prerequisites installed on your system:

1.  **Node.js and npm (Node Package Manager):** WebdriverIO and its dependencies are managed through npm, which comes bundled with Node.js.

    - You can download and install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)
    - To verify if Node.js and npm are installed correctly, open your terminal or command prompt and run the following commands:

      ```bash
      node -v
      npm -v
      ```

      These commands should print the installed versions of Node.js and npm.

**Installation Steps:**

1.  **Clone the Repository:**

    - If you haven't already, clone the Git repository containing this automation project to your local machine using the following command in your terminal:

      ```bash
      git clone https://github.com/anavoro/WedriverIO-telnyx.git
      ```

2.  **Navigate to the Project Directory:**

    - Once the repository is cloned, navigate into the project's root directory using the `cd` command:

      ```bash
      cd WebDriverIO-telnyx
      ```

3.  **Install Dependencies:**

    - Inside the project directory, install all the necessary dependencies (including WebdriverIO and Allure reporter) by running the following command:

      ```bash
      npm install
      ```

      This command will read the `package.json` file in your project and download all the listed dependencies.

## How to Run the Tests

This project includes several npm scripts to facilitate running the tests and generating reports:

- **`npm run test`**: Runs the WebdriverIO E2E tests as defined in your `wdio.conf.ts` configuration file.

  ```bash
  npm run test
  ```

- **`npm run wdio:headless`**: Runs the WebdriverIO tests in headless mode (without a visible browser UI), as configured in `wdio.headless.js`. This is often used for CI/CD environments.

  ```bash
  npm run wdio:headless
  ```

- **`npm run allure:generate`**: Generates the Allure report from the raw test results located in the `allure-results` directory. This command should be run after the tests have finished.

  ```bash
  npm run allure:generate
  ```

- **`npm run allure:report`**: This is a convenience script that first runs the tests (`npm run test`), then generates the Allure report (`npm run allure:generate`), and finally opens the generated report in your default web browser.

  ```bash
  npm run allure:report
  ```

- **`npm run test:headless:allure`**: Runs the tests in headless mode (`npm run wdio:headless`) and then generates the Allure report (`npm run allure:generate`).

  ```bash
  npm run test:headless:allure
  ```

## Reporting

This project uses **Allure Report** for comprehensive and visually appealing test reports. After running the tests using the appropriate npm script (especially `npm run allure:report` or `npm run test:headless:allure`), you can view the detailed report in your web browser. The report provides information on test execution status, steps, attachments (like screenshots), and more.

## GitHub Actions

This project also includes a **GitHub Actions** workflow located in `.github/workflows/run-automation-test.yml` to automate the running of tests in a Continuous Integration (CI) environment. This workflow is configured to trigger on pushes to the `main` branch and also includes **workflow dispatch**, allowing manual triggering of the workflow from the GitHub Actions tab. This ensures the quality of the codebase is continuously checked and provides the flexibility to run tests on demand.

## Author/Trainee Information

**Author:** Anastasia Voropayeva
**Trainee Program:** Luxe Quality
**Contact:** voropayeva.a@gmail.com

---
