module.exports = function (cls) {
  return class NodeLintGenerator extends cls {
    async end() {
      return Promise.all([
        super.end(),
        this.spawnCommand('npx', [
          'husky',
          'add',
          '.husky/pre-commit',
          'lint-staged'
        ])
      ]);
    }
  };
};
