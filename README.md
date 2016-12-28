# WebSDKtester
Simple MFPF Web SDK tester with Ionic 2 RC.4

Main goal was to create reusable test application for MobileFirst Foundation 8 Web SDK and Ionic 2 Web development approach.

![app_screenshot](https://github.com/andriivasylchenko/WebSDKtester/blob/initial/app_screenshot.png?raw=true)

## Prerequisites

1. Node, npm
2. cordova, ionic
3. MFPF 8.0 server

## Installation

1. Clone this repository
2. Type `npm install` in root project folder
3. Type `ionic state restore` in root project folder
4. Open MFPF Operations Console and deploy JavaAdapter and UserLogin security check from adapters folder in this repository
5. Register web application with applicationID com.ibm.websample in Operations Console
6. Create scope-element mapping for you app (MyCustomScope to UserLogin)
7. Copy your fully qualified server url and past it in `ionic.config.json` under proxyUrl with adding /mfp at the end
8. Replace content of the file `node_modules/@ionic/app-scripts/config/copy.config.js` with content from file `copy.config.js` that is located in project root folder

## Running 

Type `ionic serve` in terminal. If you will face `cannot read property indexOf` error, then re-save home.ts file under src/pages/home

