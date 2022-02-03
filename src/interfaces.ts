export interface OptionInterface {
  blackList?: string;
  configPath?: string;
  fullPath: string;
}

export enum ReqType {
  'POST' = 'Post',
  'GET' = 'Get',
  'DELETE' = 'Delete',
  'PUT' = 'Put',
  'PATCH' = 'Patch',
}

export enum ReqNames {
  'exist' = 'exist',
  'findUniq' = 'findUniq',
  'findMany' = 'findMany',
  'getAll' = 'getAll',
  'createOne' = 'createOne',
  'createMany' = 'createMany',
  'updateOne' = 'updateOne',
  'updateMany' = 'updateMany',
  'updateAll' = 'updateAll',
  'updateAdminOne' = 'updateAdminOne',
  'updateAdminMany' = 'updateAdminMany',
  'updateAdminAll' = 'updateAdminAll',
  'deleteOne' = 'deleteOne',
  'deleteMany' = 'deleteMany',
  'deleteAll' = 'deleteAll',
  'deleteAdminOne' = 'deleteAdminOne',
  'deleteAdminMany' = 'deleteAdminMany',
  'deleteAdminAll' = 'deleteAdminAll',
}

export enum ReqNamesType {
  'exist' = 'GET',
  'findUniq' = 'GET',
  'findMany' = 'GET',
  'getAll' = 'GET',
  'createOne' = 'POST',
  'createMany' = 'POST',
  'updateOne' = 'PATCH',
  'updateMany' = 'PATCH',
  'updateAll' = 'PATCH',
  'updateAdminOne' = 'PUT',
  'updateAdminMany' = 'PUT',
  'updateAdminAll' = 'PUT',
  'deleteOne' = 'DELETE',
  'deleteMany' = 'DELETE',
  'deleteAll' = 'DELETE',
  'deleteAdminOne' = 'DELETE',
  'deleteAdminMany' = 'DELETE',
  'deleteAdminAll' = 'DELETE',
}

export interface generalConfig {
  additionalImport?: string[];
  functions: { [name in string]?: functionConfig };
}
export interface fixedConfigInterface {
  functions: { [name in string]?: functionFixConfig };
}
export interface functionConfig {
  disable?: boolean;
  summary?: string;
  description?: string;
  additionalDecorator?: string[];
}
export interface functionFixConfig {
  param?: string;
  paramArray?: boolean;
  body?: string;
  bodyArray?: boolean;
  query?: string;
  header?: string;
  service: string;
  resp: string;
  responses?: apiResponseInterface[];
  fixedPath: string;
}
export interface apiResponseInterface {
  status: string | number;
  description?: string;
  type?: string;
}
