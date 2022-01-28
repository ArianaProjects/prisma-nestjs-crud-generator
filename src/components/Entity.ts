import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { classGenerator } from '../templates/class';
import { fieldGenerator, fieldGeneratorNull } from '../templates/fields';
import { apiPropertyDecorator, blackListFIelds, prettierFormat, tsTypesDecorator } from '../util';
import FileGeneral from './File';

export default class Entity extends FileGeneral {
  model: DMMF.Model;
  fileContent: string = '';

  constructor(model: DMMF.Model) {
    super();
    this.model = model;
    this.generate();
  }

  public toString() {
    console.log(this.fileContent);
  }

  private generate() {
    let imported = [
      `import { Exclude, Expose } from 'class-transformer';`,
      `import {
      IsArray,
      IsBoolean,
      IsDate,
      IsDecimal,
      IsEnum,IsString,
      IsNotEmpty,
      IsNumber,
      IsObject,
      IsOptional,
      ValidateNested,
    } from 'class-validator';`,
      "import { ApiProperty } from '@nestjs/swagger';",
    ];
    let prismaImport = ['Prisma'];

    const bodyEntity = this.model.fields
      .map((f) => {
        if (f.kind == 'enum') {
          prismaImport.push(`, ${f.type}`);
        } else if (f.kind == 'object') {
          imported.push(`import {${f.type}} from "../${this.toCamelCase(f.type)}/${this.toCamelCase(f.type)}.entity"`);
        }
        return this.generateField(f);
      })
      .join('\n');

    const importImported = imported
      .map((f) => {
        return f;
      })
      .join('\n');
    const importPrisma =
      'import { ' +
      prismaImport
        .map((f) => {
          return f;
        })
        .join('\n') +
      "} from '@prisma/client'";

    const connectClass = classGenerator(`${this.model.name}`, bodyEntity);

    this.fileContent = prettierFormat(`
    ${importImported}
    ${importPrisma}

    ${connectClass}`);
  }

  public get fileContentGetter() {
    return this.fileContent;
  }

  public decoratorField(f: DMMF.Field) {
    let ret = '';
    if (blackListFIelds(f.name)) {
      ret =
        ret +
        `
      @Exclude()`;
    } else {
      ret =
        ret +
        `${apiPropertyDecorator(f)}
         ${tsTypesDecorator(f)}`;
    }
    return ret;
  }

  public generateField(f: DMMF.Field) {
    return `
      ${this.decoratorField(f)}
      ${fieldGeneratorNull(f)}
      `;
  }
}
