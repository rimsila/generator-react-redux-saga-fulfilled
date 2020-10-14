import { createSelector } from 'reselect';
import { IStoreState } from '../storeState';

const <%= stateName %>  = (state: IStoreState) => state.<%= nameWithLowerCase %>;

export const  <%= stateName %>Selector = createSelector(
  <%= stateName %>,
  ({
    booleanable: { 
      isFetch<%= stateShortName %>InProgress,
      /* new-booleanable-goes-here */
    },
    successible: { fetch<%= stateShortName %>SuccessMsg,
    /* new-successible-goes-here */
  
    },
    <%= stateLower %>,
    errable: { fetch<%= stateShortName %>ErrorMsg,
    /* new-errable-goes-here */
  },
  }) => ({
    <%= stateLower %>,
    fetch<%= stateShortName %>ErrorMsg,
    /* new-errable-goes-here */

    fetch<%= stateShortName %>SuccessMsg,
    /* new-successible-goes-here */

    isFetch<%= stateShortName %>InProgress,
    /* new-booleanable-goes-here */
  }),
);

