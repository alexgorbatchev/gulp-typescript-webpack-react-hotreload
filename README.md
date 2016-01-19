# gulp-typescript-webpack-react-hotreload

This is a starter kit for a client side project that uses TypeScript and React at its core. The goal of this starter kit is to provide a foundation for a production ready application following the following criteria:

* Fast development cycle
* Production build

## Stack

* Gulp
* TypeScript
* Webpack
* Karma
* React
* React Router
* Redux

## Features

* TypeScript.
* Hot module reload.
* Correct line numbers reported in stack traces.
* Production assets build.
* Precompiled DLLs with external modules speed up application & test updates.
* Async route and component loading using Webpack:
  * Each page is a chunk.
  * Vendor modules are in a separate DLL that is only built once.
  * Development modules are in a separate DLL that is only built once.
  * Components are in a separate chunk.
* Fast Karma compilation due to:
  * Vendor, test and development modules statically precompiled as separate DLLs.
  * Only application files are recompiled on build.

## Installation

```
git clone https://github.com/alexgorbatchev/gulp-typescript-webpack-react-hotreload
npm install
```

## Usage

### gulp dev

* Starts Webpack server on [http://localhost:3000](http://localhost:3000).
* Restarts Webpack server configuration changes.
* Whenever `.ts` and `.tsx` files in `src` change, visible module will be reload without whole page needing a refresh.
* Starts Karma.
* Restarts Karma when configuration changes.

## License

MIT

