import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { log, writeTSFile } from '../util';
import Controller from './Controller';
import DTO from './DTO';
import Entity from './Entity';
import FileGeneral from './File';
import ModuleG from './Module';
import Service from './Service';

export default class Model extends FileGeneral {
  model: DMMF.Model;
  module: ModuleG;
  entity: Entity;
  dto: DTO;
  controller: Controller;
  service: Service;

  existParamBody: string;
  existParamParam: string;
  existParamQuery: string;
  existParamHeader: string;
  findUniqParamBody: string;
  findUniqParamParam: string;
  findUniqParamQuery: string;
  findUniqParamHeader: string;
  findManyParamBody: string;
  findManyParamParam: string;
  findManyParamQuery: string;
  findManyParamHeader: string;
  getAllParamBody: string;
  getAllParamParam: string;
  getAllParamQuery: string;
  getAllParamHeader: string;
  createOneParamBody: string;
  createOneParamParam: string;
  createOneParamQuery: string;
  createOneParamHeader: string;
  createManyParamBody: string;
  createManyParamParam: string;
  createManyParamQuery: string;
  createManyParamHeader: string;
  updateOneParamBody: string;
  updateOneParamParam: string;
  updateOneParamQuery: string;
  updateOneParamHeader: string;
  updateManyParamBody: string;
  updateManyParamParam: string;
  updateManyParamQuery: string;
  updateManyParamHeader: string;
  updateAllParamBody: string;
  updateAllParamParam: string;
  updateAllParamQuery: string;
  updateAllParamHeader: string;
  updateAdminOneParamBody: string;
  updateAdminOneParamParam: string;
  updateAdminOneParamQuery: string;
  updateAdminOneParamHeader: string;
  updateAdminManyParamBody: string;
  updateAdminManyParamParam: string;
  updateAdminManyParamQuery: string;
  updateAdminManyParamHeader: string;
  updateAdminAllParamBody: string;
  updateAdminAllParamParam: string;
  updateAdminAllParamQuery: string;
  updateAdminAllParamHeader: string;
  deleteOneParamBody: string;
  deleteOneParamParam: string;
  deleteOneParamQuery: string;
  deleteOneParamHeader: string;
  deleteManyParamBody: string;
  deleteManyParamParam: string;
  deleteManyParamQuery: string;
  deleteManyParamHeader: string;
  deleteAllParamBody: string;
  deleteAllParamParam: string;
  deleteAllParamQuery: string;
  deleteAllParamHeader: string;
  deleteAdminOneParamBody: string;
  deleteAdminOneParamParam: string;
  deleteAdminOneParamQuery: string;
  deleteAdminOneParamHeader: string;
  deleteAdminManyParamBody: string;
  deleteAdminManyParamParam: string;
  deleteAdminManyParamQuery: string;
  deleteAdminManyParamHeader: string;
  deleteAdminAllParamBody: string;
  deleteAdminAllParamParam: string;
  deleteAdminAllParamQuery: string;
  deleteAdminAllParamHeader: string;

  fullPath: string;
  constructor(model: DMMF.Model, fullPath: string) {
    super();
    this.model = model;
    this.fullPath = fullPath;
    this.preGenerate();
    this.module = new ModuleG(model);
    this.entity = new Entity(model);
    this.dto = new DTO(model);
    this.controller = new Controller(model, this);
    this.service = new Service(model, this);
    this.postGenerate();
  }

  public toString() {
    console.log(this.model);
    // this.module.toString();
    // this.dto.toString();
    // this.entity.toString();
    // this.controller.toString();
    // this.service.toString();
  }
  public postGenerate() {
    writeTSFile(this.fullPath + `${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.dto.ts`, this.dto.fileContentGetter, false);
    writeTSFile(this.fullPath + `${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.entity.ts`, this.entity.fileContentGetter, false);
    writeTSFile(this.fullPath + `${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.controller.ts`, this.controller.fileContentGetter, false);
    writeTSFile(this.fullPath + `${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.service.ts`, this.service.fileContentGetter, false);
    writeTSFile(this.fullPath + `${this.toCamelCase(this.model.name)}/${this.toCamelCase(this.model.name)}.module.ts`, this.module.fileContentGetter, false);
  }

  public preGenerate() {
    this.existParamQuery = `Find${this.toPascalCase(this.model.name)}Dto`;
    this.findUniqParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.findManyParamQuery = `Find${this.toPascalCase(this.model.name)}Dto`;
    this.createOneParamBody = `Create${this.toPascalCase(this.model.name)}Dto`;
    this.createManyParamBody = `Create${this.toPascalCase(this.model.name)}Dto`;
    this.updateOneParamBody = `Update${this.toPascalCase(this.model.name)}Dto`;
    this.updateOneParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.updateManyParamBody = `Update${this.toPascalCase(this.model.name)}Dto`;
    this.updateManyParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.updateAllParamBody = `Update${this.toPascalCase(this.model.name)}Dto`;
    this.updateAdminOneParamBody = `Update${this.toPascalCase(this.model.name)}Dto`;
    this.updateAdminOneParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.updateAdminManyParamBody = `Update${this.toPascalCase(this.model.name)}Dto`;
    this.updateAdminManyParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.updateAdminAllParamBody = `Update${this.toPascalCase(this.model.name)}Dto`;
    this.deleteOneParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.deleteManyParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.deleteAdminOneParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
    this.deleteAdminManyParamParam = `Connect${this.toPascalCase(this.model.name)}Dto`;
  }
}
