/* eslint-disable prettier/prettier */
// eslint-disable

const Generator = require('yeoman-generator');
const camelCase = require('camelcase');

module.exports = class extends Generator {
  prompting() {
    const stores = this.config.get('stores');
    const storeOptions = stores.sort();

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Boolean name',
        validate: str => {
          if (str.trim().length > 0) {
            return true;
          }
          return 'Please enter a name for your new Boolean';
        },
      },
      {
        type: 'list',
        name: 'reducerName',
        message: 'Select the store',
        choices: storeOptions,
      },
      {
        type: 'confirm',
        name: 'isCrudBoolean',
        message: 'Is it Crud Boolean? (add/del/edit/view)',
        default: false,
      },
    ]).then(({ name, reducerName, isCrudBoolean }) => {
      this.answers = {
        name: camelCase(name),
        isCrudBoolean,
        reducerName,
      };
    });
  }

  writing() {
    const { name, reducerName, isCrudBoolean } = this.answers;
    const actionNameToPascalCase = camelCase(name, {
      pascalCase: true,
    });

    const REDUX_STORE_BASE_PATH = `./redux-store/${reducerName.toLowerCase()}`;

    const booleanable = `${actionNameToPascalCase}`;
    const STATE_PATH = `${REDUX_STORE_BASE_PATH}/state.ts`;
    const SELECTOR_PATH = `${REDUX_STORE_BASE_PATH}/selectors.ts`;
    const regEx = new RegExp(/\/\* new-booleanable-goes-here \*\//, 'g');

    // #region Do the things in the state.ts
    if (isCrudBoolean) {
      // Booleanable
      this.fs.copy(STATE_PATH, STATE_PATH, {
        process(content) {
          const newContent = content
            .toString()
            .replace(
              regEx,
              `| 'isAddEdit${booleanable}' | 'isDel${booleanable}' | 'isView${booleanable}' /* new-booleanable-goes-here */`,
            );
          return newContent;
        },
      });
      //* ----- Selector Booleanable
      this.fs.copy(SELECTOR_PATH, SELECTOR_PATH, {
        process(content) {
          const newContent = content
            .toString()
            .replace(
              regEx,
              `isAddEdit${booleanable}, isDel${booleanable},isView${booleanable}, /* new-booleanable-goes-here */`,
            );
          return newContent;
        },
      });
    } else {
      // Booleanable
      this.fs.copy(STATE_PATH, STATE_PATH, {
        process(content) {
          const newContent = content.toString().replace(regEx, `| 'is${booleanable}' /* new-booleanable-goes-here */`);
          return newContent;
        },
      });

      // Selector Booleanable
      this.fs.copy(SELECTOR_PATH, SELECTOR_PATH, {
        process(content) {
          const newContent = content.toString().replace(regEx, ` is${booleanable}, /* new-booleanable-goes-here */`);
          return newContent;
        },
      });
    }
    // #endregion
  }
  // #endregion
};
