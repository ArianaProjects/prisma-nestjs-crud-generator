export function ModuleDecoratorGenerator(IMPORTS: string, PROVIDERS: string, CONTROLLERS: string, EXPORTS: string) {
  return `@Module({
          imports: [
              ${IMPORTS}
          ],
          providers: [
              ${PROVIDERS}
          ],
          controllers: [
              ${CONTROLLERS}
          ],
          exports: [
              ${EXPORTS}
          ]
        })`;
}

export function classGenerator(name: string, body: string, decorator: string = '') {
  return `${decorator}
  export class ${name} {
      ${body}
    }`;
}

export function moduleGenerator(
  name: string,
  IMPORTS: string,
  PROVIDERS: string,
  CONTROLLERS: string,
  EXPORTS: string,
) {
  return classGenerator(name, '', ModuleDecoratorGenerator(IMPORTS, PROVIDERS, CONTROLLERS, EXPORTS));
}

export function constructorGenerator(param: string, body: string) {
  return `constructor(${param}){${body}}`;
}

export function fieldGeneratorGeneral(name: any, type: any, decorator: string) {
  return `
  ${decorator}
  ${name}: ${type}`;
}

export function functionGenerator(name: string, param: string, ret: string, body: string) {
  return `private ${name}(${param}): ${ret}{
     ${body}
   }`;
}

export function asyncFunctionGenerator(name: string, param: string, ret: string, body: string) {
  return `async ${name}(${param}): ${ret}{
     ${body}
   }`;
}

export function functionPromiseGenerator(name: string, param: string, retType: string, body: string) {
  const ret = `Promise<${retType}>`;
  return asyncFunctionGenerator(name, param, ret, body);
}

export function importAsGenerator(NAME: string, MODULE: string) {
  return `import * as ${NAME} from ${MODULE}`;
}

export function importGenerator(NAME: string, MODULE: string) {
  return `import ${NAME} from ${MODULE}`;
}

export function parameterPrivateReadonlyGenerator(name: string, type: string) {
  return `private readonly  ${name}:${type}`;
}

export function parameterPrivateGenerator(name: string, type: string) {
  return `private ${name}:${type}`;
}

export function parameterGenerator(name: string, type: string) {
  return `${name}:${type}`;
}

export function parameterPipeGenerator(name: string, type: string, pipe: string) {
  return `${pipe} ${name}:${type}`;
}
export function decoratorGenerator(name: string, body: string) {
  return `@${name}("${body}")`;
}
