export function fileGenerator(imports: string, body: string) {
  return `${imports}

    ${body}`;
}
