import {
   <%= interfaceName %>,
  /* new-imported-model-goes-here */
} from "@/model";

export type <%= stateShortName %>Errable =
  | 'fetch<%= stateShortName %>ErrorMsg'
  /* new-errable-goes-here */;

export type <%= stateShortName %>Booleanable =
  | 'isFetch<%= stateShortName %>InProgress'
  /* new-booleanable-goes-here */;

export type <%= stateShortName %>Successible =
  | 'fetch<%= stateShortName %>SuccessMsg' 
  /* new-successible-goes-here */;

export interface <%= stateName %>{

  readonly <%= stateLower %>?: <%= interfaceName %>;
  /* new-state-goes-here */

  //#region Doables
  readonly errable?: { [key in <%= stateShortName %>Errable]?: string };
  readonly booleanable?: { [key in <%= stateShortName %>Booleanable]?: boolean };
  readonly successible?: { [key in <%= stateShortName %>Successible]?: string };
  //#endregion
}
