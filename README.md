# gulp-typescript-webpack-react-hotreload

This is a starter kit for a client side project that uses TypeScript and React at its core. The goal of this starter kit is to provide a foundation for a production ready application following the following criteria:

* Fast development cycle
* Production build

## Stack

* gulp
* typescript
* webpack
* react
* react-router
* redux
* redux-thunk
* mocha
* istanbul

## Features

* TypeScript
* Auto TypeScript formatting
* Lightning fast TypeScript compilation and bundling
* Hot module reload
* Correct line numbers reported in stack traces
* Production assets build
* Precompiled DLLs with external modules speed up application & test updates
* Async route and component loading using Webpack:
  * Each page is a chunk
  * Vendor modules are in a separate DLL that is only built once
  * Development modules are in a separate DLL that is only built once
  * Components are in a separate chunk
* Server side React testing with Mocha & JSDom
* Code coverage reports using Istanbul for TypeScript files

## Installation

```
git clone https://github.com/alexgorbatchev/gulp-typescript-webpack-react-hotreload
npm install
./node_modules/.bin/tsd install
```

## Usage

### gulp dev

`gulp dev` is the main command to start developing with the project.

* Starts Webpack server on [http://localhost:3000](http://localhost:3000)
* Restarts Webpack server when configuration changes
* Watches `src` folder for file changes and:
  * Reformats and lints TypeScript files
  * Compiles all `.ts` and `.tsx` into the `build/src` folder
  * Rebuild Webpack bundles into the `build/public` folder
  * Updates opened webpage with Hot Module Reload (HMR)
  * Run Mocha tests
  * Generates coverage report

## License

MIT

