# gulp-typescript-webpack-react-hotreload

This is a starter kit for a client side project using the following stack:

* Gulp
* TypeScript
* React w. hot module reload
* Webpack
* Karma TDD
* Correct line numbers reported in stack traces
* Variable renaming across whole project

## Installation

```
git clone https://github.com/alexgorbatchev/gulp-typescript-webpack-react-hotreload
npm install
```

## Usage

### npm run dev

* Starts webpack server on [http://localhost:3000](http://localhost:3000).
* Restarts webpack server when `webpack.ts` and `webpack.config.ts` change.
* Whenever `.ts` and `.tsx` files in `src` change, visible module will be reload without whole page needing a refresh.
* (Re)formats all TypeScript files on change to keep consistent style.
* Keeps `files` node in `tsconfig.json` project file in sync with all `.ts`, `.tsx` files in `src` and `test` folders.

## License

MIT

