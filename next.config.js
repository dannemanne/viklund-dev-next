const withSass = require('@zeit/next-sass');
module.exports = withSass({
  cssModules: true,
  resolve: { symlinks: false },
});
