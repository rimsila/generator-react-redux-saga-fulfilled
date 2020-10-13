import { createAction } from 'redux-actions';
import {
  RESET_<%= STATE_NAME %>_DOABLES,
  TOGGLE_<%= STATE_NAME %>_BOOLEANABLE_STATE,
  TOGGLE_<%= STATE_NAME %>_ERRABLE_STATE,
  TOGGLE_<%= STATE_NAME %>_SUCCESSIBLE_STATE,
  FETCH_<%= STATE_NAME %>,
  FETCH_<%= STATE_NAME %>_SUCCESS,
  FETCH_<%= STATE_NAME %>_ERROR,
  /* new-constant-import-goes-here */
} from './constants';
import {
  <%= stateName %>,
  <%= stateShortName %>Errable,
  <%= stateShortName %>Booleanable,
  <%= stateShortName %>Successible,
} from './state';

export const fetch<%= stateShortName %> = createAction<<%= stateName %>>(FETCH_<%= STATE_NAME %>, () => ({
  booleanable: { isFetch<%= stateShortName %>InProgress: true },
  errable: { fetch<%= stateShortName %>ErrorMsg: null },
  successible: { fetch<%= stateShortName %>SuccessMsg: null },
}));

export const fetch<%= stateShortName %>Success = createAction<<%= stateName %> , string>(
  FETCH_<%= STATE_NAME %>_SUCCESS,
  (<%= stateName %>) => ({
    booleanable: { isFetch<%= stateShortName %>InProgress: false },
    successible: { fetch<%= stateShortName %>SuccessMsg: "FETCH_BOOK action fullfilled!" },
    <%= stateName %>,
  }),
);

export const fetch<%= stateShortName %>Error = createAction<<%= stateName %>,   string>(
  FETCH_<%= STATE_NAME %>_ERROR,
  (fetch<%= stateShortName %>ErrorMsg) => ({
    booleanable: { isFetch<%= stateShortName %>InProgress: false },
    errable: { fetch<%= stateShortName %>ErrorMsg },
  }),
);

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