const withTM = require('next-transpile-modules')(['snoken']);

module.exports = withTM({
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
});
