import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { classGenerator } from '../templates/class';
import { fieldGenerator } from '../templates/fields';
import { apiPropertyDecorator, blackListFIelds, prettierFormat, tsTypesDecorator } from '../util';
import FileGeneral from './File';

export default class DTO extends FileGeneral {
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
      IsEnum,
      IsNotEmpty,
      IsNumber,
      IsObject,
      IsOptional,
      ValidateNested,IsString
    } from 'class-validator';`,
      "import { ApiProperty } from '@nestjs/swagger';",
      "import { Prisma } from '@prisma/client';",
    ];
    let prismaImport = ['Prisma'];

    const importImported = imported
      .map((f) => {
        return f;
      })
      .join('\n');

    const ids = this.model.fields.filter((x) => x.isId);
    const createFields = this.model.fields.filter((x) => !x.isId && (x.kind == 'scalar' || x.kind == 'unsupported') && !blackListFIelds(x.name));

    const bodyConnect = ids
      .map((id) => {
        return this.generateDTO(id);
      })
      .join('\n');

    const connectClass = classGenerator(`Connect${this.toPascalCase(this.model.name)}Dto`, bodyConnect);

    const bodyIdsCreate = ids
      .map((id) => {
        // if (!id.hasDefaultValue) return this.generateDTO(id);
        return '';
      })
      .join('\n');

    const bodyFieldsCreate = createFields
      .map((id) => {
        return this.generateDTO(id);
      })
      .join('\n');
    const bodyCreate = `
      ${bodyIdsCreate}
      ${bodyFieldsCreate}`;
    const createClass = classGenerator(`Create${this.toPascalCase(this.model.name)}Dto`, bodyCreate);

    const bodyUpdate = bodyFieldsCreate;
    const updateClass = classGenerator(`Update${this.toPascalCase(this.model.name)}Dto`, bodyUpdate);

    const uniqF = this.model.fields
      .filter((x) => x.isUnique)
      .map((id) => {
        return this.generateDTO(id);
      })
      .join('\n');
    const bodyFind = `


    ${bodyConnect}
    ${uniqF}`;
    const findClass = classGenerator(`Find${this.toPascalCase(this.model.name)}Dto`, bodyFind);
    this.fileContent = prettierFormat(`

    ${importImported}

    
    ${connectClass}

    ${createClass}
    
    ${updateClass}
    
    ${findClass}
    `);
  }

  public get fileContentGetter() {
    return this.fileContent;
  }

  public decoratorDTO(f: DMMF.Field) {
    let ret = apiPropertyDecorator(f);
    ret = ret + tsTypesDecorator(f);
    return ret;
  }
  public generateDTO(f: DMMF.Field) {
    return `
    ${this.decoratorDTO(f)}
    ${fieldGenerator(f)}
            `;
  }
}
