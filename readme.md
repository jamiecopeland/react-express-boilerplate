# React/Express Boilerplate
A boilerplate for React/Express applications with all the bells and whistles.

#### Development environment
- [Webpack dev server](https://github.com/webpack/webpack-dev-server)
- [Hot module replacement](https://webpack.github.io/docs/hot-module-replacement.html) (via [React transform HMR](https://github.com/gaearon/react-transform-hmr))

#### Application architecture
- [React Router](https://github.com/rackt/react-router)
- [Redux](https://github.com/rackt/redux)
    - [Redux Actions](https://github.com/acdlite/redux-actions)
    - [Redux Thunk](https://github.com/gaearon/redux-thunk)
    - [React Redux](https://github.com/rackt/react-redux)

#### Testing
- [Karma](https://github.com/karma-runner/karma)
- [Mocha](https://github.com/mochajs/mocha)
- [Chai](https://github.com/chaijs/chai)
- [Sinon](https://github.com/sinonjs/sinon)

## Installation
```
git clone git@github.com:jamiecopeland/react-express-boilerplate.git
cd react-express-boilerplate
npm install
```

## Development
Run the development server:

```
gulp
```

Start Karma test runner:

```
gulp startKarma
```

## Production
Build and run the production server:

```
gulp startProduction
```
