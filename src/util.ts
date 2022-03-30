import { logger } from '@prisma/sdk';
import * as path from 'path';
import * as fs from 'fs';
import { GENERATOR_NAME } from './generator';
import { GeneratorFormatNotValidError } from './error-handler';
import { DMMF } from '@prisma/generator-helper';
import { Options, format } from 'prettier';
import { ReqNames } from './interfaces';

export const log = (src: string) => {
  logger.info(`[${GENERATOR_NAME}]:${src}`);
};

export const parseBoolean = (value: unknown): boolean => {
  if (['true', 'false'].includes(value.toString()) === false) {
    throw new GeneratorFormatNotValidError('parseBoolean failed');
  }
  return value.toString() === 'true';
};

export const toArray = <T>(value: T | T[]): T[] => {
  return Array.isArray(value) ? value : [value];
};

export const writeTSFile = (fullPath: string, content: string, dryRun = true) => {
  log(`${dryRun ? '[dryRun] ' : ''}Generate ${fullPath}`);
  if (dryRun) {
    console.log(content);
    return;
  }
  const dirname = path.dirname(fullPath);
  if (fs.existsSync(dirname) === false) {
    fs.mkdirSync(dirname, { recursive: true });
  }
  fs.writeFileSync(fullPath, prettierFormatFormat(content));
};

export const prettierFormat = (content: string) => {
  return format(content, {
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'all',
    semi: true,
    printWidth: 250,
    arrowParens: 'always',
    bracketSpacing: true,
  });
};
export const prettierFormatFormat = (content: string, options: Options = {}) => {
  // return content;
  return format(content, { ...options, parser: 'typescript' });
};

export function tsTypes(type: string | any, entity: boolean = false) {
  if (type == 'Int' || type == 'BigInt') return 'number';
  else if (type == 'String' || type == 'Text') return 'string';
  else if (type == 'DateTime') return 'Date';
  else if (type == 'Boolean') return 'boolean';
  else if (type == 'Decimal' || type == 'Float') {
    if (entity) return 'Decimal | number';
    else return 'number';
  } else if (type == 'Json') return 'Prisma.JsonValue';
  else return type;
}

export function defaultGenerator(name: string, type: string): string {
  return '';
}
export function isUrl(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return (tsTypes(f.type) == 'string' && sl.includes('url')) || sl.includes('link');
}
export function isEmail(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return tsTypes(f.type) == 'string' && sl.includes('email');
}
export function isName(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return tsTypes(f.type) == 'string' && sl.includes('name');
}
export function isCity(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return tsTypes(f.type) == 'string' && sl.includes('city');
}
export function isStreet(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return (tsTypes(f.type) == 'string' && sl.includes('street')) || sl.includes('line');
}
export function isCountry(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return tsTypes(f.type) == 'string' && sl.includes('country');
}
export function isZipcode(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return (tsTypes(f.type) == 'string' || tsTypes(f.type) == 'number') && (sl.includes('zipcode') || sl.includes('plz'));
}
export function isMoney(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return tsTypes(f.type) == 'number' || (tsTypes(f.type) == 'Prisma.Decimal' && sl.includes('cost')) || sl.includes('amount');
}
export function isDescription(f: DMMF.Field): boolean {
  const sl = f.name.toLocaleLowerCase();
  return (tsTypes(f.type) == 'string' && sl.includes('description')) || sl.includes('info');
}
