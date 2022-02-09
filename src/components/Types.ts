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
    res.push(this.classGenerator(`Create${this.parent.namePascal}Dto`, this.parent.createFields, true, false, true));
    res.push(this.classGenerator(`Update${this.parent.namePascal}Dto`, this.parent.updateFields, true, false, true));
    res.push(this.classGenerator(`Find${this.parent.namePascal}Dto`, this.parent.findFields, true, false, true));
    res.push(this.classGenerator(`Connect${this.parent.namePascal}Dto`, this.parent.connectFields, true, false, true));
    this.dto = res.join('\n');
  }

  private generateEntity() {
    let res: string[] = [];
    res.push(this.entityImport());
    res.push(this.classGenerator(this.parent.namePascal, this.parent.entityFields));
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
      "import { ApiProperty } from '@nestjs/swagger';",
      "import { Prisma } from '@prisma/client';",
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
    ];
    const importPrisma =
      '{Prisma,' +
      this.parent.enumFields
        .map((f) => {
          return f.name;
        })
        .join(',') +
      '}';

    res.push(importGenerator(importPrisma, '"@prisma/client"'));
    this.parent.objectFields.map((f) => {
      res.push(importGenerator('{' + this.parent.toPascalCase(f.name) + '}', `"../${this.parent.toCamelCase(f.name)}/${this.parent.toCamelCase(f.name)}.entity"`));
    });
    return res.join('\n');
  }

  private classGenerator(name: string, fields: DMMF.Field[], classValidator: boolean = true, classTransformer: boolean = true, apiProperty: boolean = true) {
    const body = fields.map((f) => this.fieldDecoratorGenerator(f, classValidator, classTransformer, apiProperty)).join('\n\n');
    return classGenerator(name, body);
  }

  private fieldDecoratorGenerator(f: DMMF.Field, classValidator: boolean = true, classTransformer: boolean = true, apiProperty: boolean = true) {
    let res: string[] = [];
    if (classTransformer) res.push(this.classTransformerDecorator(f));
    if (apiProperty) res.push(this.apiPropertyDecorator(f));
    if (classValidator) res.push(this.classValidatorDecorator(f));

    res.push(this.tsTypesDecorator(f));
    res.push(this.fieldGenerator(f));
    return res.join('\n');
  }
  private tsTypesDecorator(f: DMMF.Field) {
    let ret = '';
    if (f.isList) ret = ret + '\n@IsArray()';

    if (f.isRequired && f.kind != 'object') ret = ret + '\n@IsNotEmpty()';
    else ret = ret + '\n@IsOptional()';

    if (f.kind == 'enum') return ret + '\n@IsEnum(' + f.type + ')';
    if (f.kind == 'object') return ret + '\n@ValidateNested()';

    if (f.type == 'Int' || f.type == 'BigInt') return (ret = ret + '\n@IsNumber()');
    else if (f.type == 'String' || f.type == 'Text') return (ret = ret + '\n@IsString()');
    else if (f.type == 'DateTime') return (ret = ret + '\n@IsDate()');
    else if (f.type == 'Boolean') return (ret = ret + '\n@IsBoolean()');
    else if (f.type == 'Decimal') return '\n@IsDecimal()';
    else return (ret = ret + '\n@IsObject()');
  }

  private fieldGenerator(f: DMMF.Field) {
    let res: string[] = [];
    res.push();
    res.push(f.name);
    if (!f.isRequired) res.push('?');
    res.push(':');
    res.push(tsTypes(f.type));
    if (f.isList) res.push('[]');
    return res.join(' ');
  }

  private classTransformerDecorator(f: DMMF.Field) {
    let res: string[] = [];
    if (this.parent.isInBlackList(f.name)) res.push('@Exclude()');
    return res.join('\n');
  }

  private apiPropertyDecorator(f: DMMF.Field) {
    let res: string[] = [];
    res.push('@ApiProperty({');
    // Array
    if (f.isList) res.push('isArray: true,');
    // type
    if (f.kind == 'object') res.push(`type: ${f.type},`);
    else if (f.kind == 'enum') res.push(`enum: ${f.type},`);
    else if (f.kind == 'unsupported') res.push(`// TODO`);
    // not required
    if (!f.isRequired) res.push(`required:false,`);
    // default
    const d = defaultGenerator(f.name, tsTypes(f.type));
    if (!!d) res.push(`default:${d}`);

    res.push('})');
    return res.join('\n');
  }

  private classValidatorDecorator(f: DMMF.Field) {
    let res: string[] = [];
    // array
    if (f.isList) res.push('@IsArray()');
    // required
    if (f.isRequired && f.kind != 'object') res.push('@IsNotEmpty()');
    else res.push('@IsOptional()');
    // kind
    if (f.kind == 'enum') res.push(`@IsEnum( + ${f.type} + )`);
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
