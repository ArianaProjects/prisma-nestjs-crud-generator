export const FUNCTION_ASYNC_TEMPLATE = `
/**
* #!{DOC}
* 
* 
* #!{PARAMETERS_DOC}
* 
* #!{RETURN_DOC}
*/
#!{DECORATORS}
async #!{NAME} (#!{PARAMETERS}) {
return #!{RETURN}
}`;

export const FUNCTION_ASYNC_RETURN_TEMPLATE = `

/**
* #!{DOC}
* 
* #!{PARAMETERS_DOC}
* 
* #!{RETURN_DOC}
*/
#!{DECORATORS}
async #!{NAME} (#!{PARAMETERS}):#!{RETURN_TYPE} {
#!{BODY}
}`;
export const PUBLIC_FUNCTION_TEMPLATE = `

/**
* #!{DOC}
* 
* #!{PARAMETERS_DOC}
* 
* #!{RETURN_DOC}
*/
public #!{NAME}(#!{PARAMETERS}) {
#!{BODY}
}
`;

export function functionGenerator(name: string, param: string, ret: string, body: string) {
  return `async ${name}(${param}): ${ret}{
   ${body}
 }`;
}

export function functionPromiseGenerator(name: string, param: string, retType: string, body: string) {
  const ret = `Promise<${retType}>`;
  return functionGenerator(name, param, ret, body);
}
