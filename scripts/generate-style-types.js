// More info here:
// https://medium.com/@kvendrik/generating-typings-for-your-css-modules-in-webpack-2beb3739b342

const DtsCreator = require('typed-css-modules');
const glob = require('glob');

const creator = new DtsCreator();

glob(process.argv[2], {}, (error, filePaths) => {
  for (const filePath of filePaths) {
    creator.create(filePath)
      .then(content => content.writeFile())
      .catch((error) => console.log(error));
  }
});
