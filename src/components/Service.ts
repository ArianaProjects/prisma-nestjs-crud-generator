import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { classGenerator, constructorGenerator } from '../templates/class';
import { functionGenerator, functionPromiseGenerator } from '../templates/function';
import { tryCatchGenerator } from '../templates/tryCatch';
import { blackListFIelds, prettierFormat, tsTypes } from '../util';
import FileGeneral from './File';
import Model from './Model';

export default class Service extends FileGeneral {
  model: DMMF.Model;
  fileContent: string = ``;
  parent: Model;
  constructor(model: DMMF.Model, parent: Model) {
    super();
    this.model = model;
    this.parent = parent;
    this.generate();
  }
  public toString() {
    console.log(this.fileContent);
  }

  private generate() {
    const ids = this.model.fields.filter((x) => x.isId);
    const uniques = this.model.fields.filter((x) => x.isUnique);
    const fields = this.model.fields.filter((x) => !blackListFIelds(x.name) && x.kind != 'object');
    const createFields = this.model.fields.filter((x) => !x.isId && (x.kind == 'scalar' || x.kind == 'unsupported') && !blackListFIelds(x.name));
    const updateFields = this.model.fields.filter((x) => !x.isId && (x.kind == 'scalar' || x.kind == 'unsupported') && !blackListFIelds(x.name));
    let importData = ["import { PrismaService } from 'src/shared/services/prisma.service';", "import { HttpException, HttpStatus, Injectable } from '@nestjs/common';"];
    importData.push(
      `import {
        ${this.model.name}
    } from './${this.toCamelCase(this.model.name)}.entity';`,
    );
    importData.push(
      `import {
        Find${this.model.name}Dto,
        Create${this.model.name}Dto,
        Update${this.model.name}Dto,
        Connect${this.model.name}Dto,
    } from './${this.toCamelCase(this.model.name)}.dto';`,
    );
    let prismaImport = [];

    this.model.fields.map((f) => {
      if (f.kind == 'enum') {
        prismaImport.push(` ${f.type},`);
      } else if (f.kind == 'object') {
        importData.push(`import {${f.type}} from "../${this.toCamelCase(f.type)}/${this.toCamelCase(f.type)}.entity"`);
      }
    });
    const importPrisma =
      'import { ' +
      prismaImport
        .map((f) => {
          return f;
        })
        .join('\n') +
      "} from '@prisma/client'";
    importData.push(importPrisma);

    let decorator = ['@Injectable()'];

    let bodyData = [constructorGenerator(`private prismaService: PrismaService`)];

    const idsWithNotDefault = ids.filter((id) => !id.default);
    const needIdGenerator = idsWithNotDefault.length > 0;
    const bodyCreateIdNotDefault: string[] = [];

    if (needIdGenerator) {
      idsWithNotDefault.map((id) => {
        bodyData.push(
          functionGenerator(
            `${id.name}Generator`,
            ``,
            id.type == 'String' ? 'string' : 'number',
            `
        return ${id.type == 'String' ? '1' : 1},
        `,
          ),
        );
        bodyCreateIdNotDefault.push(`${id.name}:this.${id.name}Generator()`);
      });
    }

    const Ser1 = `const ret = await this.prismaService.${this.toCamelCase(this.model.name)}.`;
    // exist
    //CCCCCC
    let existBody: string[] = [];
    let existServiceParam: string[] = [];
    if (!!this.parent.existParamBody) {
      existServiceParam.push('body:' + this.parent.existParamBody);
    }
    if (!!this.parent.existParamParam) {
      existServiceParam.push('param:' + this.parent.existParamParam);
    }
    if (!!this.parent.existParamQuery) {
      existServiceParam.push('query:' + this.parent.existParamQuery);
    }
    if (!!this.parent.existParamHeader) {
      existServiceParam.push('header:' + this.parent.existParamHeader);
    }
    existBody.push(
      `
      ${Ser1}findMany
      ({
        where: {
          ${ids.map((f) => {
            if (`!!query["${f.name}"]`) return `${f.name}: query["${f.name}"] `;
            return '';
          })},
          ${uniques.map((f) => {
            if (`!!query["${f.name}"]`) return `${f.name}: query["${f.name}"] `;
            return '';
          })}
        },
      });
      return ret.length > 0

`,
    );

    bodyData.push(this.serviceFunctionGenerator('exist', existServiceParam.join(', '), 'Boolean', existBody.join('\n')));

    // findUniq
    //CCCCCC
    let findUniqBody: string[] = [];
    let findUniqServiceParam: string[] = [];
    if (!!this.parent.findUniqParamBody) {
      findUniqServiceParam.push('body:' + this.parent.findUniqParamBody);
    }
    if (!!this.parent.findUniqParamParam) {
      findUniqServiceParam.push('param:' + this.parent.findUniqParamParam);
    }
    if (!!this.parent.findUniqParamQuery) {
      findUniqServiceParam.push('query:' + this.parent.findUniqParamQuery);
    }
    if (!!this.parent.findUniqParamHeader) {
      findUniqServiceParam.push('header:' + this.parent.findUniqParamHeader);
    }
    findUniqBody.push(
      `
      ${Ser1}findUnique 
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        },
      });
      return ret
`,
    );

    bodyData.push(this.serviceFunctionGenerator('findUniq', findUniqServiceParam.join(', '), this.model.name, findUniqBody.join('\n')));

    // findMany
    //CCCCCC
    let findManyBody: string[] = [];
    let findManyServiceParam: string[] = [];
    if (!!this.parent.findManyParamBody) {
      findManyServiceParam.push('body:' + this.parent.findManyParamBody);
    }
    if (!!this.parent.findManyParamParam) {
      findManyServiceParam.push('param:' + this.parent.findManyParamParam);
    }
    if (!!this.parent.findManyParamQuery) {
      findManyServiceParam.push('query:' + this.parent.findManyParamQuery);
    }
    if (!!this.parent.findManyParamHeader) {
      findManyServiceParam.push('header:' + this.parent.findManyParamHeader);
    }
    findManyBody.push(
      `
      ${Ser1}findMany
      ({
        where: {
          ${fields.map((f) => {
            if (`!!query["${f.name}"]`) return `${f.name}: query["${f.name}"] `;
            return '';
          })}
        },
      });
      return ret
`,
    );

    bodyData.push(this.serviceFunctionGenerator('findMany', findManyServiceParam.join(', '), this.model.name + '[]', findManyBody.join('\n')));

    // getAll
    //CCCCCC
    let getAllBody: string[] = [];
    let getAllServiceParam: string[] = [];
    if (!!this.parent.getAllParamBody) {
      getAllServiceParam.push('body:' + this.parent.getAllParamBody);
    }
    if (!!this.parent.getAllParamParam) {
      getAllServiceParam.push('param:' + this.parent.getAllParamParam);
    }
    if (!!this.parent.getAllParamQuery) {
      getAllServiceParam.push('query:' + this.parent.getAllParamQuery);
    }
    if (!!this.parent.getAllParamHeader) {
      getAllServiceParam.push('header:' + this.parent.getAllParamHeader);
    }
    getAllBody.push(
      `
      ${Ser1}findMany
      ({
        where: {
        },
      });
      return ret
`,
    );

    bodyData.push(this.serviceFunctionGenerator('getAll', getAllServiceParam.join(', '), this.model.name + '[]', getAllBody.join('\n')));

    // createOne
    //CCCCCC
    let createOneBody: string[] = [];
    let createOneServiceParam: string[] = [];
    if (!!this.parent.createOneParamBody) {
      createOneServiceParam.push('body:' + this.parent.createOneParamBody);
    }
    if (!!this.parent.createOneParamParam) {
      createOneServiceParam.push('param:' + this.parent.createOneParamParam);
    }
    if (!!this.parent.createOneParamQuery) {
      createOneServiceParam.push('query:' + this.parent.createOneParamQuery);
    }
    if (!!this.parent.createOneParamHeader) {
      createOneServiceParam.push('header:' + this.parent.createOneParamHeader);
    }
    createOneBody.push(
      `
      ${Ser1}create
      ({
        data: 
        {
              ${bodyCreateIdNotDefault.join(',')}

              ${createFields.map((f) => {
                if (`!!body["${f.name}"]`) return `${f.name}: body["${f.name}"] `;
                return '';
              })}}
      });
      return ret
`,
    );

    bodyData.push(this.serviceFunctionGenerator('createOne', createOneServiceParam.join(', '), this.model.name, createOneBody.join('\n')));

    // createMany
    //CCCCCC
    let createManyBody: string[] = [];
    let createManyServiceParam: string[] = [];
    if (!!this.parent.createManyParamBody) {
      createManyServiceParam.push('body:' + this.parent.createManyParamBody + '[]');
    }
    if (!!this.parent.createManyParamParam) {
      createManyServiceParam.push('param:' + this.parent.createManyParamParam);
    }
    if (!!this.parent.createManyParamQuery) {
      createManyServiceParam.push('query:' + this.parent.createManyParamQuery);
    }
    if (!!this.parent.createManyParamHeader) {
      createManyServiceParam.push('header:' + this.parent.createManyParamHeader);
    }
    createManyBody.push(
      `
      ${Ser1}createMany
      ({
        data: 

        [body.map(b=>{
          ${bodyCreateIdNotDefault.join(',')}
           return {${createFields.map((f) => {
             if (`!!b["${f.name}"]`) return `${f.name}: b["${f.name}"] `;
             return '';
           })}
          }})]
      });
      return ret
`,
    );

    bodyData.push(this.serviceFunctionGenerator('createMany', createManyServiceParam.join(', '), this.model.name + '[]', createManyBody.join('\n')));

    // updateOne
    //CCCCCC
    let updateOneBody: string[] = [];
    let updateOneServiceParam: string[] = [];
    if (!!this.parent.updateOneParamBody) {
      updateOneServiceParam.push('body:' + this.parent.updateOneParamBody);
    }
    if (!!this.parent.updateOneParamParam) {
      updateOneServiceParam.push('param:' + this.parent.updateOneParamParam);
    }
    if (!!this.parent.updateOneParamQuery) {
      updateOneServiceParam.push('query:' + this.parent.updateOneParamQuery);
    }
    if (!!this.parent.updateOneParamHeader) {
      updateOneServiceParam.push('header:' + this.parent.updateOneParamHeader);
    }
    updateOneBody.push(
      `
      ${Ser1}update
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        },
        data: 
            {${updateFields.map((f) => {
              if (`!!body["${f.name}"]`) return `${f.name}: body["${f.name}"] `;
              return '';
            })}}
      });

`,
    );

    bodyData.push(this.serviceFunctionGenerator('updateOne', updateOneServiceParam.join(', '), 'void', updateOneBody.join('\n')));

    // updateMany
    //CCCCCC
    let updateManyBody: string[] = [];
    let updateManyServiceParam: string[] = [];
    if (!!this.parent.updateManyParamBody) {
      updateManyServiceParam.push('body:' + this.parent.updateManyParamBody);
    }
    if (!!this.parent.updateManyParamParam) {
      updateManyServiceParam.push('param:' + this.parent.updateManyParamParam);
    }
    if (!!this.parent.updateManyParamQuery) {
      updateManyServiceParam.push('query:' + this.parent.updateManyParamQuery);
    }
    if (!!this.parent.updateManyParamHeader) {
      updateManyServiceParam.push('header:' + this.parent.updateManyParamHeader);
    }
    updateManyBody.push(
      `// TODO
      ${Ser1}updateMany
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        }, 
        data: 
            {${updateFields.map((f) => {
              if (`!!body["${f.name}"]`) return `${f.name}: body["${f.name}"] `;
              return '';
            })}}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('updateMany', updateManyServiceParam.join(', '), 'void', updateManyBody.join('\n')));

    // updateAll
    //CCCCCC
    let updateAllBody: string[] = [];
    let updateAllServiceParam: string[] = [];
    if (!!this.parent.updateAllParamBody) {
      updateAllServiceParam.push('body:' + this.parent.updateAllParamBody);
    }
    if (!!this.parent.updateAllParamParam) {
      updateAllServiceParam.push('param:' + this.parent.updateAllParamParam);
    }
    if (!!this.parent.updateAllParamQuery) {
      updateAllServiceParam.push('query:' + this.parent.updateAllParamQuery);
    }
    if (!!this.parent.updateAllParamHeader) {
      updateAllServiceParam.push('header:' + this.parent.updateAllParamHeader);
    }
    updateAllBody.push(
      `
      ${Ser1}updateMany
      ({
        data: 
            {${updateFields.map((f) => {
              if (`!!body["${f.name}"]`) return `${f.name}: body["${f.name}"] `;
              return '';
            })}}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('updateAll', updateAllServiceParam.join(', '), 'void', updateAllBody.join('\n')));

    // updateAdminOne
    //CCCCCC
    let updateAdminOneBody: string[] = [];
    let updateAdminOneServiceParam: string[] = [];
    if (!!this.parent.updateAdminOneParamBody) {
      updateAdminOneServiceParam.push('body:' + this.parent.updateAdminOneParamBody);
    }
    if (!!this.parent.updateAdminOneParamParam) {
      updateAdminOneServiceParam.push('param:' + this.parent.updateAdminOneParamParam);
    }
    if (!!this.parent.updateAdminOneParamQuery) {
      updateAdminOneServiceParam.push('query:' + this.parent.updateAdminOneParamQuery);
    }
    if (!!this.parent.updateAdminOneParamHeader) {
      updateAdminOneServiceParam.push('header:' + this.parent.updateAdminOneParamHeader);
    }
    updateAdminOneBody.push(
      `
      ${Ser1}update
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        },
        data: 
            {${updateFields.map((f) => {
              if (`!!body["${f.name}"]`) return `${f.name}: body["${f.name}"] `;
              return '';
            })}}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('updateAdminOne', updateAdminOneServiceParam.join(', '), 'void', updateAdminOneBody.join('\n')));

    // updateAdminMany
    //CCCCCC
    let updateAdminManyBody: string[] = [];
    let updateAdminManyServiceParam: string[] = [];
    if (!!this.parent.updateAdminManyParamBody) {
      updateAdminManyServiceParam.push('body:' + this.parent.updateAdminManyParamBody);
    }
    if (!!this.parent.updateAdminManyParamParam) {
      updateAdminManyServiceParam.push('param:' + this.parent.updateAdminManyParamParam);
    }
    if (!!this.parent.updateAdminManyParamQuery) {
      updateAdminManyServiceParam.push('query:' + this.parent.updateAdminManyParamQuery);
    }
    if (!!this.parent.updateAdminManyParamHeader) {
      updateAdminManyServiceParam.push('header:' + this.parent.updateAdminManyParamHeader);
    }
    updateAdminManyBody.push(
      `// TODO
      ${Ser1}updateMany
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        }, 
        data: 
            {${updateFields.map((f) => {
              if (`!!body["${f.name}"]`) return `${f.name}: body["${f.name}"] `;
              return '';
            })}}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('updateAdminMany', updateAdminManyServiceParam.join(', '), 'void', updateAdminManyBody.join('\n')));

    // updateAdminAll
    //CCCCCC
    let updateAdminAllBody: string[] = [];
    let updateAdminAllServiceParam: string[] = [];
    if (!!this.parent.updateAdminAllParamBody) {
      updateAdminAllServiceParam.push('body:' + this.parent.updateAdminAllParamBody);
    }
    if (!!this.parent.updateAdminAllParamParam) {
      updateAdminAllServiceParam.push('param:' + this.parent.updateAdminAllParamParam);
    }
    if (!!this.parent.updateAdminAllParamQuery) {
      updateAdminAllServiceParam.push('query:' + this.parent.updateAdminAllParamQuery);
    }
    if (!!this.parent.updateAdminAllParamHeader) {
      updateAdminAllServiceParam.push('header:' + this.parent.updateAdminAllParamHeader);
    }
    updateAdminAllBody.push(
      `
      ${Ser1}updateMany
      ({
        data: 
            {${fields.map((f) => {
              if (`!!body["${f.name}"]`) return `${f.name}: body["${f.name}"] `;
              return '';
            })}}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('updateAdminAll', updateAdminAllServiceParam.join(', '), 'void', updateAdminAllBody.join('\n')));

    // deleteOne
    //CCCCCC
    let deleteOneBody: string[] = [];
    let deleteOneServiceParam: string[] = [];
    if (!!this.parent.deleteOneParamBody) {
      deleteOneServiceParam.push('body:' + this.parent.deleteOneParamBody);
    }
    if (!!this.parent.deleteOneParamParam) {
      deleteOneServiceParam.push('param:' + this.parent.deleteOneParamParam);
    }
    if (!!this.parent.deleteOneParamQuery) {
      deleteOneServiceParam.push('query:' + this.parent.deleteOneParamQuery);
    }
    if (!!this.parent.deleteOneParamHeader) {
      deleteOneServiceParam.push('header:' + this.parent.deleteOneParamHeader);
    }
    deleteOneBody.push(
      `
      ${Ser1}update
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        },
        data: 
            {deletedAt:new Date()}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('deleteOne', deleteOneServiceParam.join(', '), 'void', deleteOneBody.join('\n')));

    // deleteMany
    //CCCCCC
    let deleteManyBody: string[] = [];
    let deleteManyServiceParam: string[] = [];
    if (!!this.parent.deleteManyParamBody) {
      deleteManyServiceParam.push('body:' + this.parent.deleteManyParamBody);
    }
    if (!!this.parent.deleteManyParamParam) {
      deleteManyServiceParam.push('param:' + this.parent.deleteManyParamParam);
    }
    if (!!this.parent.deleteManyParamQuery) {
      deleteManyServiceParam.push('query:' + this.parent.deleteManyParamQuery);
    }
    if (!!this.parent.deleteManyParamHeader) {
      deleteManyServiceParam.push('header:' + this.parent.deleteManyParamHeader);
    }
    deleteManyBody.push(
      ` // TODO
      ${Ser1}updateMany
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        },
        data: 
            {deletedAt:new Date()}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('deleteMany', deleteManyServiceParam.join(', '), 'void', deleteManyBody.join('\n')));

    // deleteAll
    //CCCCCC
    let deleteAllBody: string[] = [];
    let deleteAllServiceParam: string[] = [];
    if (!!this.parent.deleteAllParamBody) {
      deleteAllServiceParam.push('body:' + this.parent.deleteAllParamBody);
    }
    if (!!this.parent.deleteAllParamParam) {
      deleteAllServiceParam.push('param:' + this.parent.deleteAllParamParam);
    }
    if (!!this.parent.deleteAllParamQuery) {
      deleteAllServiceParam.push('query:' + this.parent.deleteAllParamQuery);
    }
    if (!!this.parent.deleteAllParamHeader) {
      deleteAllServiceParam.push('header:' + this.parent.deleteAllParamHeader);
    }
    deleteAllBody.push(
      ` // TODO
      ${Ser1}updateMany
      ({
        data: 
            {deletedAt:new Date()}
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('deleteAll', deleteAllServiceParam.join(', '), 'void', deleteAllBody.join('\n')));

    // deleteAdminOne
    //CCCCCC
    let deleteAdminOneBody: string[] = [];
    let deleteAdminOneServiceParam: string[] = [];
    if (!!this.parent.deleteAdminOneParamBody) {
      deleteAdminOneServiceParam.push('body:' + this.parent.deleteAdminOneParamBody);
    }
    if (!!this.parent.deleteAdminOneParamParam) {
      deleteAdminOneServiceParam.push('param:' + this.parent.deleteAdminOneParamParam);
    }
    if (!!this.parent.deleteAdminOneParamQuery) {
      deleteAdminOneServiceParam.push('query:' + this.parent.deleteAdminOneParamQuery);
    }
    if (!!this.parent.deleteAdminOneParamHeader) {
      deleteAdminOneServiceParam.push('header:' + this.parent.deleteAdminOneParamHeader);
    }
    deleteAdminOneBody.push(
      `
      ${Ser1}delete
      ({
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        },
      });

`,
    );

    bodyData.push(this.serviceFunctionGenerator('deleteAdminOne', deleteAdminOneServiceParam.join(', '), 'void', deleteAdminOneBody.join('\n')));

    // deleteAdminMany
    //CCCCCC
    let deleteAdminManyBody: string[] = [];
    let deleteAdminManyServiceParam: string[] = [];
    if (!!this.parent.deleteAdminManyParamBody) {
      deleteAdminManyServiceParam.push('body:' + this.parent.deleteAdminManyParamBody);
    }
    if (!!this.parent.deleteAdminManyParamParam) {
      deleteAdminManyServiceParam.push('param:' + this.parent.deleteAdminManyParamParam);
    }
    if (!!this.parent.deleteAdminManyParamQuery) {
      deleteAdminManyServiceParam.push('query:' + this.parent.deleteAdminManyParamQuery);
    }
    if (!!this.parent.deleteAdminManyParamHeader) {
      deleteAdminManyServiceParam.push('header:' + this.parent.deleteAdminManyParamHeader);
    }
    deleteAdminManyBody.push(
      `
      ${Ser1}deleteMany
      ({ // TODO
        where: {
          ${ids.map((f) => {
            if (`!!param["${f.name}"]`) return `${f.name}: param["${f.name}"] `;
            return '';
          })}
        },
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('deleteAdminMany', deleteAdminManyServiceParam.join(', '), 'void', deleteAdminManyBody.join('\n')));

    // deleteAdminAll
    //CCCCCC
    let deleteAdminAllBody: string[] = [];
    let deleteAdminAllServiceParam: string[] = [];
    if (!!this.parent.deleteAdminAllParamBody) {
      deleteAdminAllServiceParam.push('body:' + this.parent.deleteAdminAllParamBody);
    }
    if (!!this.parent.deleteAdminAllParamParam) {
      deleteAdminAllServiceParam.push('param:' + this.parent.deleteAdminAllParamParam);
    }
    if (!!this.parent.deleteAdminAllParamQuery) {
      deleteAdminAllServiceParam.push('query:' + this.parent.deleteAdminAllParamQuery);
    }
    if (!!this.parent.deleteAdminAllParamHeader) {
      deleteAdminAllServiceParam.push('header:' + this.parent.deleteAdminAllParamHeader);
    }
    deleteAdminAllBody.push(
      `
      ${Ser1}deleteMany
      ({
        where: {
        },
      });
`,
    );

    bodyData.push(this.serviceFunctionGenerator('deleteAdminAll', deleteAdminAllServiceParam.join(', '), 'void', deleteAdminAllBody.join('\n')));

    this.fileContent = prettierFormat(`
    ${importData.join('\n')}

    ${decorator.join('\n')}
${classGenerator(this.model.name + 'Service', bodyData.join('\n\n'))}
    `);
  }

  public get fileContentGetter() {
    return this.fileContent;
  }

  public serviceFunctionGenerator(name: string, param: string, retType: string, body: string) {
    // return functionPromiseGenerator(name,param,retType, tryCatchGenerator());
    return functionPromiseGenerator(name, param, retType, body);
  }
}
