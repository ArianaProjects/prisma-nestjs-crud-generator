import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import * as prettier from 'prettier';

export default class FileGeneral {
  _prettierOptions: prettier.Options;

  constructor() {}

  public get prettierOptions() {
    return this._prettierOptions;
  }

  public set prettierOptions(value) {
    this._prettierOptions = value;
  }

  public toCamelCase(str: string | DMMF.SchemaEnum | DMMF.OutputType | DMMF.SchemaArg) {
    let s = str;
    if (typeof str != 'string') {
      if (str && str.name) {
        s = str.name;
      }
    }
    return (
      s
        // @ts-ignore
        .split(' ')
        .map((x: string, i: number) => {
          if (i > 0) return x.charAt(0).toUpperCase() + x.slice(1);
          else return x.charAt(0).toLowerCase() + x.slice(1);
        })
        .join('')
    );
  }
  public toPascalCase(str: string | DMMF.SchemaEnum | DMMF.OutputType | DMMF.SchemaArg) {
    let s = str;
    if (typeof str != 'string') {
      if (str && str.name) {
        s = str.name;
      }
    }
    return (
      s
        // @ts-ignore
        .split(' ')
        .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
        .join('')
    );
  }
}
