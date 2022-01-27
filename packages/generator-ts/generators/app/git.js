const fs = require('fs');

module.exports = function (cls) {
  return class NodeGitGenerator extends cls {
    async writing() {
      if (!fs.existsSync(this.destinationPath('.git'))) {
        this.log('Initializing a local new Git project.');
        return Promise.all([
          super.writing(),
          this.spawnCommand('git', ['init'])
        ]);
      }
    }
  };
};
