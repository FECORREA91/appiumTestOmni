# Appium Mobile Testing Project (Android, JavaScript, Cucumber, POM)

This project is an implementation of automated tests for mobile applications on Android, using Appium, JavaScript, and Cucumber with a Page Object Model (POM) architecture. The goal is to simplify the creation, maintenance, and execution of tests to ensure the quality of mobile applications.

## 📋 Technologies Used

* **Appium**: A mobile automation testing framework that allows interaction with native, hybrid, and web applications on real devices and emulators.
* **JavaScript**: The main language for writing test scripts.
* **Cucumber**: A tool that allows writing test cases in a human-readable format using Gherkin.
* **POM (Page Object Model)**: An architecture that separates test logic from application behavior, making tests easier to maintain and scale.

## 🚀 Why Use These Technologies?

* **Appium**: Enables cross-platform testing (iOS and Android) using a single codebase, supports a wide variety of languages, and has strong support for automating native applications.
* **JavaScript**: Popular, flexible, and with a large community, making it ideal for modern test automation.
* **Cucumber (Gherkin)**: Facilitates collaboration between testers, developers, and business analysts, using a clear, easy-to-understand format.
* **POM**: Improves code maintenance, promotes reuse, and enhances test organization by separating UI elements and actions from test cases.

## 📁 Project Architecture

The POM architecture is used to keep tests organized and efficient. The project is structured as follows:

* **features/** - `.feature` files written in Gherkin that describe the test cases.
* **step\_definitions/** - Implementation of the steps defined in the feature files.
* **page\_objects/** - Classes representing each screen of the application and their elements.
* **utils/** - Helper files and additional configurations.

## 📦 Dependency Installation

### 1. Clone the Repository

```bash
$ git clone <REPOSITORY_URL>
$ cd project-name
```

### 2. Create and Configure the Node.js Project

```bash
$ npm init -y
```

### 3. Install the Required Dependencies

```bash
$ npm install appium @wdio/appium-service cucumber @cucumber/cucumber chai
```

### 4. Configure Appium

* **Ensure that Appium is installed and properly configured.**
* You can install Appium globally if you don't have it:

```bash
$ npm install -g appium
```

* Verify the installation:

```bash
$ appium -v
```

### 5. Configure the Android Virtual Device

The project is configured to use an emulator with the following capabilities:

```json
{
  "platformName": "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Pixel 6a",
  "appium:platformVersion": "16",
  "appium:udid": "emulator-5554",
  "appium:appActivity": "com.cencosud.co.clientes.MainActivity",
  "appium:appPackage": "com.cencosud.co.clientes"
}
```

Make sure your virtual device is active before running the tests.

### 6. Start the Appium Server

```bash
$ appium
```

### 7. Run the Tests

```bash
$ npx cucumber-js
```

## 📝 Next Steps

* Create `.feature` files for the test scenarios.
* Implement page object classes for each screen of the application.
* Add scripts for logging and reporting.

## 📚 Additional Resources

* [Appium Documentation](https://appium.io/docs/en/about-appium/intro/)
* [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
* [Android Emulator Setup](https://developer.android.com/studio/run/emulator)

## 🛠️ Contributions

Contributions are welcome. If you find a bug or have an idea to improve the project, feel free to open an issue or submit a pull request.

---

Happy testing! 🚀
