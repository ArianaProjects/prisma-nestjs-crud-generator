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
