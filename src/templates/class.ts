export const CLASS_TEMPLATE = `#!{IMPORTS}

#!{DECORATORS}
export class #!{NAME} {
#!{BODY}
}`;

export const CONSTRUCTOR_TEMPLATE = `  
constructor(
#!{BODY}
) {}`;

export function classGenerator(name: string, body: string) {
  return `export class ${name} {
    ${body}
  }`;
}
export function constructorGenerator(param: string) {
  return `constructor(${param}){}`;
}
