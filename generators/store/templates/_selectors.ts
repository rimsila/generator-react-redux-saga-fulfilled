import { createSelector } from 'reselect';
import { IStoreState } from '../storeState';

const <%= stateName %>  = (state: IStoreState) => state.<%= nameWithLowerCase %>;

export const  <%= stateName %>Selector = createSelector(
  <%= stateName %>,
  ({
    <%= stateLower %>,
  /* new-state-goes-here */

    booleanable: { 
      isFetch<%= stateShortName %>InProgress,
      /* new-booleanable-goes-here */
    },
    successible: { fetch<%= stateShortName %>SuccessMsg,
    /* new-successible-goes-here */
  
    },


    errable: { fetch<%= stateShortName %>ErrorMsg,
    /* new-errable-goes-here */
  },
  }) => ({
    <%= stateLower %>,
    /* new-state-goes-here */

    fetch<%= stateShortName %>ErrorMsg,
    /* new-errable-goes-here */

    fetch<%= stateShortName %>SuccessMsg,
    /* new-successible-goes-here */

    isFetch<%= stateShortName %>InProgress,
    /* new-booleanable-goes-here */

    
  }),
);

