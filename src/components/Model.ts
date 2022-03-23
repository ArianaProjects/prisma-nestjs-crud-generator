import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { OptionInterface } from '../interfaces';
import { importGenerator, moduleGenerator } from '../templates';
import { defaultGenerator, log, prettierFormatFormat, tsTypes, writeTSFile } from '../util';
import CRUD from './CRUD';
import FileGenerator from './FileGenerator';
import Types from './Types';

export default class Model extends FileGenerator {
  model: DMMF.Model;
  option: OptionInterface;

  types: Types;
  crud: CRUD;

  idFields: DMMF.Field[];
  createFields: DMMF.Field[];
  updateFields: DMMF.Field[];
  connectFields: DMMF.Field[];
  findFields: DMMF.Field[];
  uniqFields: DMMF.Field[];
  returnFields: DMMF.Field[];
  entityFields: DMMF.Field[];
  idsNoDefault: DMMF.Field[];

  enumFields: DMMF.Field[];
  objectFields: DMMF.Field[];

  blackList: string[] = ['deletedAt', 'updatedAt', 'createdAt'];
  excludeList: string[] = ['deletedAt'];

  nameCamel: string;
  namePascal: string;

  module: string;

  fullPath: string;
  configPath: string;
  constructor(model: DMMF.Model, option: OptionInterface) {
    super();
    this.model = model;
    this.option = option;
    this.fullPath = option.fullPath && option.fullPath;
    this.configPath = option.configPath;
    this.preGenerator();
    this.types = new Types(this);
    this.crud = new CRUD(this);
  }

  public preGenerator() {
    this.idFields = this.model.fields.filter((x) => x.isId);
    this.createFields = this.model.fields.filter((x) => !x.isId && (x.kind == 'scalar' || x.kind == 'enum' || x.kind == 'unsupported') && !this.isInBlackList(x.name));
    this.updateFields = this.model.fields.filter((x) => !x.isId && (x.kind == 'scalar' || x.kind == 'enum' || x.kind == 'unsupported') && !this.isInBlackList(x.name));
    this.returnFields = this.model.fields.filter((x) => !this.isInBlackList(x.name));
    this.connectFields = this.model.fields.filter((x) => x.isId || x.isUnique);
    this.findFields = this.model.fields.filter((x) => (x.kind == 'scalar' || x.kind == 'enum' || x.kind == 'unsupported') && !this.isInBlackList(x.name));
    this.uniqFields = this.model.fields.filter((x) => x.isUnique);
    this.entityFields = this.model.fields;
    this.enumFields = this.model.fields.filter((x) => x.kind == 'enum');
    this.objectFields = this.model.fields.filter((x) => x.kind == 'object');
    this.idsNoDefault = this.idFields.filter((x) => !x.default);

    this.nameCamel = this.toCamelCase(this.model.name);
    this.namePascal = this.toPascalCase(this.model.name);

    this.module = `
    import {  Module } from '@nestjs/common';
    ${importGenerator('{' + this.namePascal + 'Controller }', '"./' + this.nameCamel + '.controller"')}
    ${importGenerator('{' + this.namePascal + 'Service }', '"./' + this.nameCamel + '.service"')}
    ${moduleGenerator(this.namePascal + 'Module', '', this.namePascal + 'Service', this.namePascal + 'Controller', '')}`;
  }

  public generator() {}

  public toString() {
    console.log(this.types.dto);
    console.log(this.types.entity);
    console.log(this.crud.controller);
    console.log(this.crud.service);
  }

  public postGenerate() {
    writeTSFile(this.fullPath + `/${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.dto.ts`, this.types.dto, false);
    writeTSFile(this.fullPath + `/${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.entity.ts`, this.types.entity, false);
    writeTSFile(this.fullPath + `/${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.controller.ts`, this.crud.controller, false);
    writeTSFile(this.fullPath + `/${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.service.ts`, this.crud.service, false);
    writeTSFile(this.fullPath + `/${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.module.ts`, this.module, false);
  }

  public isInBlackList(name: string) {
    return this.blackList.includes(name);
  }
  public isExcludeList(name: string) {
    return this.excludeList.includes(name);
  }

  public replace(s: any) {
    if (typeof s == 'string')
      return s
        .replace('NAME_PASCAL', this.namePascal)
        .replace('NAME_CAMEL', this.nameCamel)
        .replace('ENTITY', this.namePascal)
        .replace('CREATE_DTO', `Create${this.namePascal}Dto`)
        .replace('CONNECT_DTO', `Connect${this.namePascal}Dto`)
        .replace('FIND_DTO', `Find${this.namePascal}Dto`)
        .replace('UPDATE_DTO', `Update${this.namePascal}Dto`);
    return s;
  }
}
