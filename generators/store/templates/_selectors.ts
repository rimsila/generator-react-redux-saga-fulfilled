import { createSelector } from 'reselect';
import { IStoreState } from '../storeState';
import {
  <%= stateShortName %>Errable,
  <%= stateShortName %>Booleanable,
  <%= stateShortName %>Successible,
} from './state';

const <%= stateName %>  = (state: IStoreState) => state.<%= nameWithLowerCase %>;

export const  <%= stateName %>Selector = createSelector(
  <%= stateName %>,
  ({
    booleanable: { isFetch<%= stateShortName %>InProgress },
    <%= stateLower %>,
    errable: { fetch<%= stateShortName %>ErrorMsg },
    successible: { fetch<%= stateShortName %>SuccessMsg },
  }) => ({
    isFetch<%= stateShortName %>InProgress,
    <%= stateLower %>,
    fetch<%= stateShortName %>ErrorMsg,
    fetch<%= stateShortName %>SuccessMsg,
  }),
);

//#region Doables

//#endregion