import { catchError } from '@/utils/error';
import { httpMethod } from '@/utils/axios-config';

const <%= stateLower %>Api = {
  get<%= stateShortName %>: () => httpMethod('get', `/<%= stateLower %>`).catch(catchError),
  get<%= stateShortName %>Param: (param?: Record<string, unknown>) => httpMethod('get', '/<%= stateLower %>', param).catch(catchError),
  del<%= stateShortName %>: (id:number) => httpMethod('delete', `/<%= stateLower %>/${id}`).catch(catchError),
  add<%= stateShortName %>: (param?: Record<string, unknown>) => httpMethod('post', '/<%= stateLower %>/create', param).catch(catchError),
  edit<%= stateShortName %>: (param?: Record<string, unknown>) => httpMethod('put', '/<%= stateLower %>/update', param).catch(catchError),
  edit<%= stateShortName %>Id: (id: number, param?: param?: Record<string, unknown>) => httpMethod('put', `/<%= stateLower %>/${id}`, param).catch(catchError),
};
export default <%= stateLower %>Api;
