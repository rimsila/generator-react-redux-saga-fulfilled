/* eslint-disable prettier/prettier */
import { catchError } from '@/utils/error';
import { httpMethod } from '@/utils/axios-config';

const <%= stateName %>Api = {
  get<%= stateShortName %>: () => httpMethod('get', `/<%= stateName %>`).catch(catchError),
  get<%= stateShortName %>Param: param => httpMethod('get', '/<%= stateName %>', param).catch(catchError),
  del<%= stateShortName %>: id => httpMethod('delete', `/<%= stateName %>/${id}`).catch(catchError),
  add<%= stateShortName %>: param => httpMethod('post', '/<%= stateName %>/create', param).catch(catchError),
  edit<%= stateShortName %>: param => httpMethod('put', '/<%= stateName %>/update', param).catch(catchError),
  edit<%= stateShortName %>Id: (id?: any, param?: any) => httpMethod('put', `/<%= stateName %>/${id}`, param).catch(catchError),
};
export default <%= stateName %>Api;
