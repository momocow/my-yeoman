const fs = require('fs');
const path = require('path');

module.exports = function (cls) {
  class RecipeGenerator extends cls {
    constructor(...args) {
      super(...args);

      RecipeGenerator.recipeNames.forEach((name) =>
        this.option(name, {
          type: Boolean,
          default: true,
          description: `Apply recipes for ${name}`
        })
      );
    }

    recipePath(recipeName) {
      return path.join(RecipeGenerator.recipeDir, recipeName);
    }

    async initializing() {}
    async prompting() {}
    async configuring() {}
    async default() {}
    async conflicts() {}

    async writing() {
      await Promise.all(
        RecipeGenerator.recipeNames
          .filter((name) => this.options[name])
          .map((name) => this.recipePath(name))
          .map(async (recipePath) => {
            const promises = [];
            const packageJSONPath = path.join(recipePath, 'package.json');
            if (this.fs.exists(packageJSONPath)) {
              const { devDependencies, dependencies, ...pkg } =
                this.fs.readJSON(packageJSONPath);
              if (devDependencies) {
                promises.push(this.addDevDependencies(devDependencies));
              }
              if (dependencies) {
                promises.push(this.addDependencies(dependencies));
              }
              this.packageJson.merge(pkg);
            }
            this.fs.copy(
              path.join(recipePath, '**/!(package.json)'),
              this.destinationRoot(),
              { ignoreNoMatch: true }
            );
            await Promise.all(promises);
          })
      );
    }

    async install() {}
    async end() {}
  }
  RecipeGenerator.recipeDir = path.join(__dirname, 'recipes');
  RecipeGenerator.recipeNames = fs.readdirSync(RecipeGenerator.recipeDir);
  return RecipeGenerator;
};
