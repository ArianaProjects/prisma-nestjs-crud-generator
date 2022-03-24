import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { classGenerator, importGenerator } from '../templates';
import { defaultGenerator, tsTypes } from '../util';
import Model from './Model';

export default class Types {
  parent: Model;
  entity: string;
  dto: string;

  constructor(parent: Model) {
    this.parent = parent;

    this.generateDTO();
    this.generateEntity();
  }

  public get entityDTO(): string {
    return this.dto;
  }

  public get entityGetter(): string {
    return this.entity;
  }

  private generateDTO() {
    let res: string[] = [];
    res.push(this.dtoImport());
    res.push(this.classGenerator(`Create${this.parent.namePascal}Dto`, this.parent.createFields, true, false, true, false));
    res.push(this.classGenerator(`Update${this.parent.namePascal}Dto`, this.parent.updateFields, true, false, true, true));
    res.push(this.classGenerator(`Find${this.parent.namePascal}Dto`, this.parent.findFields, true, false, true, true));
    res.push(this.classGenerator(`Connect${this.parent.namePascal}Dto`, this.parent.connectFields, true, false, true, false));
    this.dto = res.join('\n');
  }

  private generateEntity() {
    let res: string[] = [];
    res.push(this.entityImport());
    res.push(this.classGenerator(this.parent.namePascal, this.parent.entityFields, true, true, true, false));
    this.entity = res.join('\n');
  }

  private dtoImport(): string {
    let res: string[] = [
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
      IsJSON,
      ValidateNested,IsString
    } from 'class-validator';`,
      "import { Decimal } from '@prisma/client/runtime';",
      "import { ApiProperty } from '@nestjs/swagger';",
      `import { Prisma, ${this.parent.enumFields
        .map((f) => {
          return f.type;
        })
        .join(',')} } from '@prisma/client';`,
    ];
    return res.join('\n');
  }
  private entityImport() {
    let res: string[] = [
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
      IsJSON,
      ValidateNested,IsString
    } from 'class-validator';`,
      "import { ApiProperty } from '@nestjs/swagger';",
      "import { Decimal } from '@prisma/client/runtime';",
    ];
    const importPrisma =
      '{Prisma,' +
      this.parent.enumFields
        .map((f) => {
          return f.type;
        })
        .join(',') +
      '}';

    res.push(importGenerator(importPrisma, '"@prisma/client"'));
    this.parent.objectFields.map((f) => {
      res.push(importGenerator('{' + this.parent.toPascalCase(tsTypes(f.type)) + '}', `"../${this.parent.toCamelCase(tsTypes(f.type))}/${this.parent.toCamelCase(tsTypes(f.type))}.entity"`));
    });
    return res.join('\n');
  }

  private classGenerator(name: string, fields: DMMF.Field[], classValidator: boolean = true, classTransformer: boolean = true, apiProperty: boolean = true, isOptional: boolean = true) {
    const body = fields.map((f) => this.fieldDecoratorGenerator(f, classValidator, classTransformer, apiProperty, isOptional)).join('\n\n');
    return classGenerator(name, body);
  }

  private fieldDecoratorGenerator(f: DMMF.Field, classValidator: boolean = true, classTransformer: boolean = true, apiProperty: boolean = true, isOptional: boolean) {
    let res: string[] = [];
    if (classTransformer) res.push(this.classTransformerDecorator(f));
    if (apiProperty) res.push(this.apiPropertyDecorator(f, isOptional));
    if (classValidator) res.push(this.classValidatorDecorator(f, isOptional));

    res.push(this.fieldGenerator(f, isOptional));
    return res.join('\n');
  }

  private fieldGenerator(f: DMMF.Field, isOptional) {
    let res: string[] = [];
    res.push();
    res.push(f.name);
    if (isOptional || !f.isRequired || f.kind == 'object') res.push('?');
    res.push(':');
    res.push(tsTypes(f.type));
    if (f.isList) res.push('[]');
    return res.join(' ');
  }

  private classTransformerDecorator(f: DMMF.Field) {
    let res: string[] = [];
    if (this.parent.isExcludeList(f.name)) res.push('@Exclude()');
    return res.join('\n');
  }

  private apiPropertyDecorator(f: DMMF.Field, isOptional) {
    let res: string[] = [];
    if (this.parent.isInBlackList(f.name)) return '';
    res.push('@ApiProperty({');
    // Array
    if (f.isList) res.push('isArray: true,');
    // type
    if (f.kind == 'object') res.push(`type: ()=>${f.type},`);
    else if (f.kind == 'enum') res.push(`enum: ${f.type},`);
    else if (f.kind == 'unsupported') res.push(`// TODO`);
    if (f.type == 'Decimal' || f.type == 'Float') res.push('type: ()=>Decimal,');
    // not required

    if (isOptional || !f.isRequired) res.push(`required:false,`);
    // default
    const d = defaultGenerator(f.name, tsTypes(f.type));
    if (!!d) res.push(`default:${d}`);

    res.push('})');
    return res.join('\n');
  }

  private classValidatorDecorator(f: DMMF.Field, isOptional: boolean) {
    console.log(f);
    let res: string[] = [];
    // array
    if (f.isList) res.push('@IsArray()');
    // required
    if (!isOptional && f.isRequired && f.kind != 'object') res.push('@IsNotEmpty()');
    else res.push('@IsOptional()');
    // kind
    if (f.kind == 'enum') res.push(`@IsEnum( ${f.type} )`);
    else if (f.kind == 'object') res.push('@ValidateNested()');
    //types
    if (f.type == 'Int' || f.type == 'BigInt') res.push('@IsNumber()');
    else if (f.type == 'String' || f.type == 'Text') res.push('@IsString()');
    else if (f.type == 'DateTime') res.push('@IsDate()');
    else if (f.type == 'Boolean') res.push('@IsBoolean()');
    else if (f.type == 'Decimal' || f.type == 'Float') res.push('@IsDecimal()');
    else if (f.type == 'Json') res.push('@IsJSON()');
    else res.push('@IsObject()');
    return res.join('\n');
  }
}
