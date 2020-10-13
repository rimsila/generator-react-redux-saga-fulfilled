import { createAction } from 'redux-actions';
import {
  DEFAULT_ACTION,
  RESET_<%= STATE_NAME %>_DOABLES,
  TOGGLE_<%= STATE_NAME %>_BOOLEANABLE_STATE,
  TOGGLE_<%= STATE_NAME %>_ERRABLE_STATE,
  TOGGLE_<%= STATE_NAME %>_SUCCESSIBLE_STATE,
  /* new-constant-import-goes-here */
} from './constants';
import {
  <%= stateName %>,
  <%= stateShortName %>Errable,
  <%= stateShortName %>Booleanable,
  <%= stateShortName %>Successible,
} from './state';

export const defaultAction = createAction<<%= stateName %>>(DEFAULT_ACTION, () => ({
  errable: { __errable__: null },
  booleanable: { __booleanable__: true },
  successible: { __successible__: 'Successfully!' },
}));

//#region Doables
export const reset<%= stateShortName %>Doables = createAction<<%= stateName %>>(RESET_<%= STATE_NAME %>_DOABLES, () => ({
  errable: {},
  booleanable: {},
  successible: {},
}));

export const toggle<%= stateShortName %>BooleanableState = createAction<
  <%= stateName %>,
  { [key in <%= stateShortName %>Booleanable]?: boolean }
>(TOGGLE_<%= STATE_NAME %>_BOOLEANABLE_STATE, key => ({
  booleanable: key,
}));

export const toggle<%= stateShortName %>ErrableState = createAction<<%= stateName %>, { [key in <%= stateShortName %>Errable]?: string }>(
  TOGGLE_<%= STATE_NAME %>_ERRABLE_STATE,
  key => ({
    errable: key,
  })
);

export const toggle<%= stateShortName %>SuccessibleState = createAction<
  <%= stateName %>,
  { [key in <%= stateShortName %>Successible]?: string }
>(TOGGLE_<%= STATE_NAME %>_SUCCESSIBLE_STATE, key => ({
  successible: key,
}));
//#endregion

/* new-actions-go-here */