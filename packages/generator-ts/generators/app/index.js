const R = require('ramda');
const BaseGenerator = R.compose(
  require('./lint'),
  require('./git'),
  require('./base')
)(require('yeoman-generator'));

module.exports = class extends BaseGenerator {
  constructor(...args) {
    super(...args);
    this.env.options.nodePackageManager = 'npm';
  }

  async initializing() {
    await super.initializing();
  }

  async prompting() {
    await super.prompting();
  }

  async configuring() {
    await super.configuring();
  }

  async default() {
    await super.default();
  }

  async conflicts() {
    await super.conflicts();
  }

  async writing() {
    await super.writing();
  }

  async install() {
    await super.install();
  }

  async end() {
    await super.end();
  }
};
