/* eslint-disable prettier/prettier */
import { catchError } from '@/utils/error';
import { httpMethod } from '@/utils/axios-config';

const <%= stateLower %>Api = {
  get<%= stateShortName %>: () => httpMethod('get', `/<%= stateLower %>`).catch(catchError),
  get<%= stateShortName %>Param: param => httpMethod('get', '/<%= stateLower %>', param).catch(catchError),
  del<%= stateShortName %>: id => httpMethod('delete', `/<%= stateLower %>/${id}`).catch(catchError),
  add<%= stateShortName %>: param => httpMethod('post', '/<%= stateLower %>/create', param).catch(catchError),
  edit<%= stateShortName %>: param => httpMethod('put', '/<%= stateLower %>/update', param).catch(catchError),
  edit<%= stateShortName %>Id: (id?: any, param?: any) => httpMethod('put', `/<%= stateLower %>/${id}`, param).catch(catchError),
};
export default <%= stateLower %>Api;
