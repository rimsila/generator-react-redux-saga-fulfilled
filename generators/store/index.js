const Generator = require('yeoman-generator');
const camelCase = require('camelcase');
const decamelize = require('decamelize');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    const { options } = this.options;
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Store name',
        validate: str => {
          if (str.trim().length > 0) {
            return true;
          }
          return 'Please add a name for your new store';
        },
        default: options ? options.name : null,
      },
    ]).then(answers => {
      this.answers = {
        name: answers.name,
      };
    });
  }

  writing() {
    const { name } = this.answers;

    const STATE_NAME = decamelize(name, '_').toUpperCase();

    const nameToCamelCase = camelCase(name);

    const nameToPascalCase = camelCase(name, {
      pascalCase: true,
    });

    const stateShortName = nameToPascalCase;

    const stateName = `I${nameToPascalCase}State`;

    const selectorState = `${nameToCamelCase}State`;

    const sagaName = `${nameToCamelCase}Saga`;

    const stateLower = nameToCamelCase;

    const reduxStorePath = this.fs.exists('redux') ? 'redux' : 'redux-store';

    const apiPath = './api';

    const nameWithLowerCase = name.charAt(0).toLowerCase() + name.slice(1);
    const nameWithUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

    const interfaceName = `I${nameWithUpperCase}`;

    // create folder project
    mkdirp(`${reduxStorePath}/${nameToCamelCase}`);

    // copy actions into the redux folder
    this.fs.copyTpl(
      this.templatePath('_actions.ts'),
      this.destinationPath(`${reduxStorePath}/${nameToCamelCase}/actions.ts`),
      {
        stateName,
        STATE_NAME,
        stateShortName,
        stateLower,
      },
    );

    // copy constants
    this.fs.copyTpl(
      this.templatePath('_constants.ts'),
      this.destinationPath(`${reduxStorePath}/${nameToCamelCase}/constants.ts`),
      {
        STATE_NAME,
      },
    );
    // copy api

    // copy page into the pages folder
    this.fs.copyTpl(this.templatePath('_api.ts'), this.destinationPath(`api/${nameToCamelCase}.ts`), {
      nameToCamelCase,
      stateName,
      stateShortName,
      stateLower,
    });
    // import to api/index.js
    this.fs.copy(apiPath, apiPath, {
      process(content) {
        const regEx = new RegExp(/\/\* new-api-import-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(
            regEx,
            `export { default as ${nameToCamelCase} } from './${nameToCamelCase}';\n/* new-api-import-goes-here */`,
          );
        return newContent;
      },
    });
    // copy reducer
    this.fs.copyTpl(
      this.templatePath('_reducer.ts'),
      this.destinationPath(`${reduxStorePath}/${nameToCamelCase}/reducer.ts`),
      {
        stateName,
        STATE_NAME,
        stateLower,
      },
    );

    // copy saga
    this.fs.copyTpl(
      this.templatePath('_sagas.ts'),
      this.destinationPath(`${reduxStorePath}/${nameToCamelCase}/sagas.ts`),
      {
        sagaName,
        stateShortName,
        stateLower,
        STATE_NAME,
      },
    );

    // copy selector
    this.fs.copyTpl(
      this.templatePath('_selectors.ts'),
      this.destinationPath(`${reduxStorePath}/${nameToCamelCase}/selectors.ts`),
      {
        stateName: selectorState,
        nameWithLowerCase: nameToCamelCase,
        stateShortName,
        stateLower
      },
    );

    // copy state
    this.fs.copyTpl(
      this.templatePath('_state.ts'),
      this.destinationPath(`${reduxStorePath}/${nameToCamelCase}/state.ts`),
      {
        stateName,
        stateShortName,
        stateLower,
        interfaceName,
      },
    );

    // update rootReducer.ts to add the new namespace to the list
    const rootReducerPath = `./${reduxStorePath}/rootReducer.ts`;

    this.fs.copy(rootReducerPath, rootReducerPath, {
      process(content) {
        const regEx = new RegExp(/\/\* new-imported-reducer-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(
            regEx,
            `import ${nameToCamelCase} from './${nameToCamelCase}/reducer';\n/* new-imported-reducer-goes-here */`,
          );
        return newContent;
      },
    });

    // update rootReducer.ts to add the new reducer to the rootReducer object
    this.fs.copy(rootReducerPath, rootReducerPath, {
      process(content) {
        const regEx = new RegExp(/\/\* new-tranformed-reducer-export-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(regEx, `${nameToCamelCase},\n/* new-tranformed-reducer-export-goes-here */`);
        return newContent;
      },
    });

    // update rootSaga.ts to add the new namespace to the list
    const rootSagaPath = `./${reduxStorePath}/rootSaga.ts`;

    this.fs.copy(rootSagaPath, rootSagaPath, {
      process(content) {
        const regEx = new RegExp(/\/\* new-imported-saga-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(
            regEx,
            `import ${nameToCamelCase} from './${nameToCamelCase}/sagas';\n/* new-imported-saga-goes-here */`,
          );
        return newContent;
      },
    });

    // update rootSaga.ts to add the new reducer to the rootSaga object
    this.fs.copy(rootSagaPath, rootSagaPath, {
      process(content) {
        const regEx = new RegExp(/\/\* new-imported-saga-element-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(regEx, `${nameToCamelCase},\n/* new-imported-saga-element-goes-here */`);
        return newContent;
      },
    });

    // update storeState.ts to add the new namespace to the list
    const rootStatePath = `./${reduxStorePath}/storeState.ts`;

    this.fs.copy(rootStatePath, rootStatePath, {
      process(content) {
        const regEx = new RegExp(/\/\* new-imported-state-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(
            regEx,
            `import { ${stateName} } from './${nameToCamelCase}/state';\n/* new-imported-state-goes-here */`,
          );
        return newContent;
      },
    });

    // update storeState.ts to add the new reducer to the storeState object
    this.fs.copy(rootStatePath, rootStatePath, {
      process(content) {
        const regEx = new RegExp(/\/\* new-imported-state-key-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(regEx, `readonly ${nameToCamelCase}: ${stateName};\n\t/* new-imported-state-key-goes-here */`);
        return newContent;
      },
    });



    // copy models into the models folder
    this.fs.copyTpl(this.templatePath('_model.ts'), this.destinationPath(`models/${nameWithLowerCase}.d.ts`), {
      interfaceName,
    });

    // update models/index.d.ts to add the new namespace to the list
    this.fs.copy('./models/index.d.ts', './models/index.d.ts', {
      process(content) {
        const regEx = new RegExp(/\/\* new-interface-import-goes-here \*\//, 'g');
        const newContent = content
          .toString()
          .replace(
            regEx,
            `export { ${interfaceName} } from './${nameWithLowerCase}';\n/* new-interface-import-goes-here */`,
          );
        return newContent;
      },
    });

    // Save this reducer in the config file
    // const _pages = this.config.get('pages').map(({ name }) => name);
    const stores = this.config.get('stores');

    this.config.set('stores', [...stores, nameToPascalCase]);
  }
};
