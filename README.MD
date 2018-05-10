# geo-desafio

Website testing automation using Nightwatch.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Nodejs

- Nightwatch.js

```
npm install -g nightwatch
```

- Selenium and Chrome

Run to install Chrome and Selenium

```
./utils/installChromeSelenium.sh
```

Run the following command to install the dependencies in the local node_modules folder:

```
npm install
```

### Environment Variables

export SELENIUM_PATH=/usr/local/bin
export CHROMEDRIVER_PATH=/usr/local/bin

## Files and Folders

- tests: tests
- custom commands: commands
- Environment execution (default chrome, firefox): nightwatch.json
- Global Variables: globals.js

- Chrome

```
nightwatch --test tests/testSubmitSpontaneousCandidate.js
```

- Firefox

```
nightwatch --test tests/testSubmitSpontaneousCandidate.js --env firefox
```