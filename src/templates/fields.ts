import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { tsTypes } from '../util';

export const FIELD_TEMPLATE_DEFAULT = `	#!{DECORATORS}
	#!{NAME}: #!{TYPE} = #!{DEFAULT}
	`;

export const FIELD_TEMPLATE = `	#!{DECORATORS}
	#!{NAME}: #!{TYPE}
	`;

export function fieldGeneratorGeneral(n: any, f: any) {
  return `${n}: ${f}`;
}
export function fieldGenerator(f: DMMF.Field) {
  const t = tsTypes(f.type);
  const n = f.isRequired ? f.name : f.name + '?';
  return fieldGeneratorGeneral(n, t);
}

export function fieldGeneratorNull(f: DMMF.Field) {
  const t = f.isRequired ? tsTypes(f.type) : tsTypes(f.type) + ' | null';
  const n = f.isRequired && f.kind != 'object' ? f.name : f.name + '?';
  return fieldGeneratorGeneral(n, t);
}
