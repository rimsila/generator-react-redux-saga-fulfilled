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

import { <%= stateName %> } from './state';
import { reducerPayloadDoableHelper } from '@/redux-store/rootReducer';

const initialState: <%= stateName %> = {
  <%= stateLower %>: [],
  errable: {},
  booleanable: {},
  successible: {},
};

export default (
  state: <%= stateName %> = initialState,
  { type, payload: incomingPayload }: ReduxActions.Action<<%= stateName %>>
) => {
  const payload =
    type === RESET_<%= STATE_NAME %>_DOABLES
      ? incomingPayload
      : (reducerPayloadDoableHelper(state, incomingPayload) as <%= stateName %>);

  switch (type) {
    case TOGGLE_<%= STATE_NAME %>_BOOLEANABLE_STATE:
    case TOGGLE_<%= STATE_NAME %>_ERRABLE_STATE:
    case TOGGLE_<%= STATE_NAME %>_SUCCESSIBLE_STATE:
    case FETCH_<%= STATE_NAME %>:
    case FETCH_<%= STATE_NAME %>_SUCCESS:
    case FETCH_<%= STATE_NAME %>_ERROR:
    /* new-constant-cases-go-here */
      return {
        ...state, 
        ...payload,
      }
    default:
      return state;
  }
};

