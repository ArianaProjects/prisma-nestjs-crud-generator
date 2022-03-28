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
  'deleteOne' = 'deleteOne',
  'deleteMany' = 'deleteMany',
  'deleteAll' = 'deleteAll',
  'existAdmin' = 'existAdmin',
  'findUniqAdmin' = 'findUniqAdmin',
  'findAdminMany' = 'findAdminMany',
  'getAllAdmin' = 'getAllAdmin',
  'createAdminOne' = 'createAdminOne',
  'createAdminMany' = 'createAdminMany',
  'updateAdminOne' = 'updateAdminOne',
  'updateAdminMany' = 'updateAdminMany',
  'updateAdminAll' = 'updateAdminAll',
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
  'deleteOne' = 'DELETE',
  'deleteMany' = 'DELETE',
  'deleteAll' = 'DELETE',
  'existAdmin' = 'GET',
  'findUniqAdmin' = 'GET',
  'findAdminMany' = 'GET',
  'getAllAdmin' = 'GET',
  'createAdminOne' = 'POST',
  'createAdminMany' = 'POST',
  'updateAdminOne' = 'PUT',
  'updateAdminMany' = 'PUT',
  'updateAdminAll' = 'PUT',
  'deleteAdminOne' = 'DELETE',
  'deleteAdminMany' = 'DELETE',
  'deleteAdminAll' = 'DELETE',
}

export interface generalConfig {
  additionalImport?: string[];
  access?: boolean;
  accessBlackList?: string[];
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
  info: string;
  param?: string;
  paramArray?: boolean;
  body?: string;
  bodyArray?: boolean;
  query?: string;
  header?: string;
  service: string;
  serviceAccess: string;
  resp: string;
  responses?: apiResponseInterface[];
  fixedPath: string;
  admin?: boolean;
}
export interface apiResponseInterface {
  status: string | number;
  description?: string;
  type?: string;
}
