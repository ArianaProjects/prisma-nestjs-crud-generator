export function importAsGenerator(NAME: string, MODULE: string) {
  return `import * as ${NAME} from ${MODULE}`;
}

export function importGenerator(NAME: string, MODULE: string) {
  return `import ${NAME} from ${MODULE}`;
}
