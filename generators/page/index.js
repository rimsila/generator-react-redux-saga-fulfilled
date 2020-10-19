/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const humanizeString = require('humanize-string');
const camelCase = require('camelcase');
const decamelize = require('decamelize');

module.exports = class extends Generator {
  prompting() {
    const pages = this.config.get('pages');
    const _pageOptions = pages.map(({ path }) => path).sort();

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Page name',
        validate: str => {
          if (str.trim().length > 0) {
            return true;
          }
          return 'Please add a name for your new page';
        },
      },
    ]).then(({ name }) =>
      this.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Page title',
          default: humanizeString(name),
          validate: str => {
            if (str.trim().length > 0) {
              return true;
            }
            return 'Please add a name for your new page';
          },
        },
        {
          type: 'confirm',
          name: 'isNestedPage',
          message: 'Is this a nested page?',
          default: false,
        },
        {
          when(response) {
            return response.isNestedPage;
          },
          type: 'list',
          name: 'parentPage',
          message: 'Select the parent page',
          choices: _pageOptions,
        },
        {
          type: 'confirm',
          name: 'createReducer',
          message: 'Would you like to create a store for this page?',
          default: false,
        },
      ]).then(({ title, isNestedPage, parentPage, createReducer }) => {
        this.answers = {
          name: camelCase(name, {
            pascalCase: true,
          }), // Make sure that there's no space between the characters
          title,
          isNestedPage,
          parentPage: isNestedPage && parentPage ? pages.find(({ path }) => path === parentPage).name : '',
          createReducer,
        };
      }),
    );
  }

  writing() {
    const { name, title, isNestedPage, parentPage, createReducer } = this.answers;

    const decamelizedName = decamelize(name, '-'); // page-name
    const pascalCasedName = camelCase(name, {
      pascalCase: true,
    }); // page-name
    const className = `${decamelizedName}-page`; // page-name-class

    const pagePath = isNestedPage ? `${parentPage}/${decamelizedName}` : `${decamelizedName}`;

    const pagePageWithRoot = `pages/${pagePath}`;

    // create folder project
    mkdirp(pagePageWithRoot);

    // copy page into the pages folder
    this.fs.copyTpl(this.templatePath('_page.js'), this.destinationPath(`${pagePageWithRoot}/index.tsx`), {
      component: pascalCasedName,
      className,
      i18n: decamelizedName,
      title,
    });

    // copy i18n.json
    this.fs.copyTpl(
      this.templatePath('_i18n.json'),
      this.destinationPath(`locales/en/${pagePageWithRoot}.json`),
      this.destinationPath(`locales/km/${pagePageWithRoot}.json`),
      {
        title,
      },
    );

    // Add reducer for this page
    if (createReducer) {
      this.composeWith(
        'yarn store',
        {
          options: {
            name,
            appName: this.appName,
          },
        },
        {
          local: require.resolve('../store'),
        },
      );
    }

    // Save this page in the config file
    // const _pages = this.config.get('pages').map(({ name }) => name);
    const _pages = this.config.get('pages');

    this.config.set('pages', [
      ..._pages,
      {
        name: decamelizedName,
        path: pagePath,
      },
    ]);
  }
};
