import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { classGenerator } from '../templates/class';
import { ModuleDecoratorGenerator } from '../templates/decorators';
import { fileGenerator } from '../templates/file';
import { importGenerator } from '../templates/import';
import { prettierFormat } from '../util';
import FileGeneral from './File';

export default class Module extends FileGeneral {
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
    // fileGenerator();
    this.toCamelCase(this.model.name);
    const serviceImport = importGenerator(
      `{${this.toPascalCase(this.model.name)}Service}`,
      `"./${this.toCamelCase(this.model.name)}.service"`,
    );
    const Import = importGenerator(
      `{${this.toPascalCase(this.model.name)}Controller}`,
      `"./${this.toCamelCase(this.model.name)}.controller"`,
    );
    const decorator = ModuleDecoratorGenerator(
      '',
      '',
      `${this.toPascalCase(this.model.name)}Controller`,
      `${this.toPascalCase(this.model.name)}Service`,
    );
    const classG = classGenerator(`${this.toPascalCase(this.model.name)}Module`, '');
    this.fileContent = prettierFormat(`
    ${importGenerator('{ Global, Module }', '"@nestjs/common"')}
    ${serviceImport}
    ${Import}

    ${decorator}
    ${classG}
    `);
  }

  public get fileContentGetter() {
    return this.fileContent;
  }
}
