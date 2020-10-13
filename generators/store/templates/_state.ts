/* eslint-disable prettier/prettier */
import { <%= interfaceName %> } from "@/model";

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

  readonly <%= stateLower %>?: <%= interfaceName %>[];

  //#region Doables
  readonly errable?: { [key in <%= stateShortName %>Errable]?: string };
  readonly booleanable?: { [key in <%= stateShortName %>Booleanable]?: boolean };
  readonly successible?: { [key in <%= stateShortName %>Successible]?: string };
  //#endregion
}
