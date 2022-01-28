import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { classGenerator, constructorGenerator } from '../templates/class';
import { functionPromiseGenerator } from '../templates/function';
import { prettierFormat } from '../util';
import FileGeneral from './File';
import Model from './Model';

export default class Controller extends FileGeneral {
  model: DMMF.Model;
  fileContent: string = '';
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
    const importData = [];

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
    importData.push(
      `import {
        Body,
        Controller,
        Delete,
        Get,
        HttpCode,
        HttpStatus,Query,
        NotFoundException,
        Param,
        Post,
        Patch,
        Put,
        Req,
      } from '@nestjs/common';
      import {
        ApiBearerAuth,
        ApiBody,
        ApiConflictResponse,
        ApiConsumes,
        ApiCreatedResponse,
        ApiNotFoundResponse,
        ApiOkResponse,
        ApiOperation,
        ApiParam,
        ApiQuery,
        ApiResponse,
        ApiTags,
        ApiUnauthorizedResponse,
      } from '@nestjs/swagger';`,
    );
    importData.push(
      `import {
        ${this.model.name}Service
    } from './${this.toCamelCase(this.model.name)}.service';`,
    );
    let decorator = [
      `
      const apiTag = '${this.toPascalCase(this.model.name)}';`,
      `@Controller('${this.toCamelCase(this.model.name)}')`,
      `@ApiBearerAuth()`,
      `@ApiTags(apiTag)`,
    ];

    let bodyData = [constructorGenerator(`private ${this.toCamelCase(this.model.name)}Service: ${this.model.name}Service`)];
    const ids = this.model.fields.filter((x) => x.isId);

    let getParam = ``;
    if (ids.length > 1) {
      getParam = `:${ids
        .map((id) => {
          return id.name.slice(0, id.name.length - 2) + '/:' + id.name;
        })
        .join('/')}`;
    } else {
      getParam = `:${ids[0].name}`;
    }
    const Ser1 = ` await this.${this.toCamelCase(this.model.name)}Service.`;

    // GET exist ==> /?Query ! (service.findMany)
    ////CCCCC
    let existDoc: string[] = [
      `
        /********************************************************************
   *                            exist
   ********************************************************************/
      `,
    ];
    let existBody: string[] = [];
    let existParam: string[] = [];
    let existDecorator: string[] = [];
    let existServiceParam: string[] = [];
    existDecorator.push(`@Get('exist')`);
    existDecorator.push(`@ApiOperation({summary:'Api for exist'})`);
    existDecorator.push(`@ApiResponse({ status: HttpStatus.OK, description: 'DESCSTATUS', type: Boolean,})`);
    if (!!this.parent.existParamBody) {
      existDecorator.push(`@ApiBody({type:[${this.parent.existParamBody}]})`);
      existParam.push(`@Body() body:${this.parent.existParamBody}`);
      existServiceParam.push('body');
    }
    if (!!this.parent.existParamParam) {
      // existDecorator.push(`@ApiParam({type:[${this.parent.existParamParam}]})`);
      existParam.push(`@Param() param:${this.parent.existParamParam}`);
      existServiceParam.push('param');
    }
    if (!!this.parent.existParamQuery) {
      existDecorator.push(`@ApiQuery({type:[${this.parent.existParamQuery}]})`);
      existParam.push(`@Query() query:${this.parent.existParamQuery}`);
      existServiceParam.push('query');
    }
    if (!!this.parent.existParamHeader) {
      existDecorator.push(`@ApiHeader({type:[${this.parent.existParamHeader}]})`);
      existParam.push(`@Header() header:${this.parent.existParamHeader}`);
      existServiceParam.push('header');
    }
    existBody.push(`return ${Ser1}exist(${existServiceParam.join(',')})`);
    bodyData.push(existDoc.join('\n'));
    bodyData.push(existDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('exist', existParam.join(', '), 'Boolean', existBody.join('\n')));

    // GET findUniq ==> /:id (service.findUniq)
    ////CCCCC
    let findUniqDoc: string[] = [
      `
        /********************************************************************
   *                            findUniq
   ********************************************************************/
      `,
    ];
    let findUniqBody: string[] = [];
    let findUniqParam: string[] = [];
    let findUniqDecorator: string[] = [];
    let findUniqServiceParam: string[] = [];
    findUniqDecorator.push(`@Get('${getParam}')`);
    findUniqDecorator.push(`@ApiOperation({summary:'Api for findUniq'})`);
    findUniqDecorator.push(`@ApiResponse({ status: HttpStatus.OK, description: 'DESCSTATUS', type: ${this.model.name},})`);
    if (!!this.parent.findUniqParamBody) {
      findUniqDecorator.push(`@ApiBody({type:[${this.parent.findUniqParamBody}]})`);
      findUniqParam.push(`@Body() body:${this.parent.findUniqParamBody}`);
      findUniqServiceParam.push('body');
    }
    if (!!this.parent.findUniqParamParam) {
      // findUniqDecorator.push(`@ApiParam({type:[${this.parent.findUniqParamParam}]})`);
      findUniqParam.push(`@Param() param:${this.parent.findUniqParamParam}`);
      findUniqServiceParam.push('param');
    }
    if (!!this.parent.findUniqParamQuery) {
      findUniqDecorator.push(`@ApiQuery({type:[${this.parent.findUniqParamQuery}]})`);
      findUniqParam.push(`@Query() query:${this.parent.findUniqParamQuery}`);
      findUniqServiceParam.push('query');
    }
    if (!!this.parent.findUniqParamHeader) {
      findUniqDecorator.push(`@ApiHeader({type:[${this.parent.findUniqParamHeader}]})`);
      findUniqParam.push(`@Header() header:${this.parent.findUniqParamHeader}`);
      findUniqServiceParam.push('header');
    }
    findUniqBody.push(`return  ${Ser1}findUniq(${findUniqServiceParam.join(',')})`);
    bodyData.push(findUniqDoc.join('\n'));
    bodyData.push(findUniqDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('findUniq', findUniqParam.join(', '), this.model.name, findUniqBody.join('\n')));

    // GET findMany ==> /?Query ! (service.findMany)
    ////CCCCC
    let findManyDoc: string[] = [
      `
        /********************************************************************
   *                            findMany
   ********************************************************************/
      `,
    ];
    let findManyBody: string[] = [];
    let findManyParam: string[] = [];
    let findManyDecorator: string[] = [];
    let findManyServiceParam: string[] = [];
    findManyDecorator.push(`@Get('')`);
    findManyDecorator.push(`@ApiOperation({summary:'Api for findMany'})`);
    findManyDecorator.push(`@ApiResponse({ status: HttpStatus.OK, description: 'DESCSTATUS', type: [${this.model.name}]})`);
    if (!!this.parent.findManyParamBody) {
      findManyDecorator.push(`@ApiBody({type:[${this.parent.findManyParamBody}]})`);
      findManyParam.push(`@Body() body:${this.parent.findManyParamBody}`);
      findManyServiceParam.push('body');
    }
    if (!!this.parent.findManyParamParam) {
      // findManyDecorator.push(`@ApiParam({type:[${this.parent.findManyParamParam}]})`);
      findManyParam.push(`@Param() param:${this.parent.findManyParamParam}`);
      findManyServiceParam.push('param');
    }
    if (!!this.parent.findManyParamQuery) {
      findManyDecorator.push(`@ApiQuery({type:[${this.parent.findManyParamQuery}]})`);
      findManyParam.push(`@Query() query:${this.parent.findManyParamQuery}`);
      findManyServiceParam.push('query');
    }
    if (!!this.parent.findManyParamHeader) {
      findManyDecorator.push(`@ApiHeader({type:[${this.parent.findManyParamHeader}]})`);
      findManyParam.push(`@Header() header:${this.parent.findManyParamHeader}`);
      findManyServiceParam.push('header');
    }
    findManyBody.push(`return  ${Ser1}findMany(${findManyServiceParam.join(',')})`);
    bodyData.push(findManyDoc.join('\n'));
    bodyData.push(findManyDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('findMany', findManyParam.join(', '), this.model.name + '[]', findManyBody.join('\n')));

    // GET getAll ==> /all (service.getAll)
    ////CCCCC
    let getAllDoc: string[] = [
      `
        /********************************************************************
   *                            getAll
   ********************************************************************/
      `,
    ];
    let getAllBody: string[] = [];
    let getAllParam: string[] = [];
    let getAllDecorator: string[] = [];
    let getAllServiceParam: string[] = [];
    getAllDecorator.push(`@Get('all')`);
    getAllDecorator.push(`@ApiOperation({summary:'Api for getAll'})`);
    getAllDecorator.push(`@ApiResponse({ status: HttpStatus.OK, description: 'DESCSTATUS', type: [${this.model.name}]})`);
    if (!!this.parent.getAllParamBody) {
      getAllDecorator.push(`@ApiBody({type:[${this.parent.getAllParamBody}]})`);
      getAllParam.push(`@Body() body:${this.parent.getAllParamBody}`);
      getAllServiceParam.push('body');
    }
    if (!!this.parent.getAllParamParam) {
      // getAllDecorator.push(`@ApiParam({type:[${this.parent.getAllParamParam}]})`);
      getAllParam.push(`@Param() param:${this.parent.getAllParamParam}`);
      getAllServiceParam.push('param');
    }
    if (!!this.parent.getAllParamQuery) {
      getAllDecorator.push(`@ApiQuery({type:[${this.parent.getAllParamQuery}]})`);
      getAllParam.push(`@Query() query:${this.parent.getAllParamQuery}`);
      getAllServiceParam.push('query');
    }
    if (!!this.parent.getAllParamHeader) {
      getAllDecorator.push(`@ApiHeader({type:[${this.parent.getAllParamHeader}]})`);
      getAllParam.push(`@Header() header:${this.parent.getAllParamHeader}`);
      getAllServiceParam.push('header');
    }
    getAllBody.push(`return  ${Ser1}getAll(${getAllServiceParam.join(',')})`);
    bodyData.push(getAllDoc.join('\n'));
    bodyData.push(getAllDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('getAll', getAllParam.join(', '), this.model.name + '[]', getAllBody.join('\n')));

    // POST createOne ==> /  (service.createOne)
    ////CCCCC
    let createOneDoc: string[] = [
      `
        /********************************************************************
   *                            createOne
   ********************************************************************/
      `,
    ];
    let createOneBody: string[] = [];
    let createOneParam: string[] = [];
    let createOneDecorator: string[] = [];
    let createOneServiceParam: string[] = [];
    createOneDecorator.push(`@Post('')`);
    createOneDecorator.push(`@ApiOperation({summary:'Api for createOne'})`);
    createOneDecorator.push(`@ApiResponse({ status: HttpStatus.CREATED, description: 'DESCSTATUS', type: ${this.model.name}})`);
    if (!!this.parent.createOneParamBody) {
      createOneDecorator.push(`@ApiBody({type:[${this.parent.createOneParamBody}]})`);
      createOneParam.push(`@Body() body:${this.parent.createOneParamBody}`);
      createOneServiceParam.push('body');
    }
    if (!!this.parent.createOneParamParam) {
      // createOneDecorator.push(`@ApiParam({type:[${this.parent.createOneParamParam}]})`);
      createOneParam.push(`@Param() param:${this.parent.createOneParamParam}`);
      createOneServiceParam.push('param');
    }
    if (!!this.parent.createOneParamQuery) {
      createOneDecorator.push(`@ApiQuery({type:[${this.parent.createOneParamQuery}]})`);
      createOneParam.push(`@Query() query:${this.parent.createOneParamQuery}`);
      createOneServiceParam.push('query');
    }
    if (!!this.parent.createOneParamHeader) {
      createOneDecorator.push(`@ApiHeader({type:[${this.parent.createOneParamHeader}]})`);
      createOneParam.push(`@Header() header:${this.parent.createOneParamHeader}`);
      createOneServiceParam.push('header');
    }
    createOneBody.push(`return  ${Ser1}createOne(${createOneServiceParam.join(',')})`);
    bodyData.push(createOneDoc.join('\n'));
    bodyData.push(createOneDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('createOne', createOneParam.join(', '), this.model.name, createOneBody.join('\n')));

    // POST createMany ==> /many (service.createMany)
    ////CCCCC
    let createManyDoc: string[] = [
      `
        /********************************************************************
   *                            createMany
   ********************************************************************/
      `,
    ];
    let createManyBody: string[] = [];
    let createManyParam: string[] = [];
    let createManyDecorator: string[] = [];
    let createManyServiceParam: string[] = [];
    createManyDecorator.push(`@Post('many')`);
    createManyDecorator.push(`@ApiOperation({summary:'Api for createMany'})`);
    createManyDecorator.push(`@ApiResponse({ status: HttpStatus.CREATED, description: 'DESCSTATUS', type: [${this.model.name}]})`);
    if (!!this.parent.createManyParamBody) {
      createManyDecorator.push(`@ApiBody({type:[${this.parent.createManyParamBody}]})`);
      createManyParam.push(`@Body() body:${this.parent.createManyParamBody}`);
      createManyServiceParam.push('body');
    }
    if (!!this.parent.createManyParamParam) {
      // createManyDecorator.push(`@ApiParam({type:[${this.parent.createManyParamParam}]})`);
      createManyParam.push(`@Param() param:${this.parent.createManyParamParam}[]`);
      createManyServiceParam.push('param');
    }
    if (!!this.parent.createManyParamQuery) {
      createManyDecorator.push(`@ApiQuery({type:[${this.parent.createManyParamQuery}]})`);
      createManyParam.push(`@Query() query:${this.parent.createManyParamQuery}`);
      createManyServiceParam.push('query');
    }
    if (!!this.parent.createManyParamHeader) {
      createManyDecorator.push(`@ApiHeader({type:[${this.parent.createManyParamHeader}]})`);
      createManyParam.push(`@Header() header:${this.parent.createManyParamHeader}`);
      createManyServiceParam.push('header');
    }
    createManyBody.push(`return ${Ser1}createMany(${createManyServiceParam.join(',')})`);
    bodyData.push(createManyDoc.join('\n'));
    bodyData.push(createManyDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('createMany', createManyParam.join(', '), this.model.name + '[]', createManyBody.join('\n')));

    // PATCH updateOne ==> /:id (service.updateOne)
    ////CCCCC
    let updateOneDoc: string[] = [
      `
        /********************************************************************
   *                            updateOne
   ********************************************************************/
      `,
    ];
    let updateOneBody: string[] = [];
    let updateOneParam: string[] = [];
    let updateOneDecorator: string[] = [];
    let updateOneServiceParam: string[] = [];
    updateOneDecorator.push(`@Patch('${getParam}')`);
    updateOneDecorator.push(`@ApiOperation({summary:'Api for updateOne'})`);
    updateOneDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.updateOneParamBody) {
      updateOneDecorator.push(`@ApiBody({type:[${this.parent.updateOneParamBody}]})`);
      updateOneParam.push(`@Body() body:${this.parent.updateOneParamBody}`);
      updateOneServiceParam.push('body');
    }
    if (!!this.parent.updateOneParamParam) {
      // updateOneDecorator.push(`@ApiParam({type:[${this.parent.updateOneParamParam}]})`);
      updateOneParam.push(`@Param() param:${this.parent.updateOneParamParam}`);
      updateOneServiceParam.push('param');
    }
    if (!!this.parent.updateOneParamQuery) {
      updateOneDecorator.push(`@ApiQuery({type:[${this.parent.updateOneParamQuery}]})`);
      updateOneParam.push(`@Query() query:${this.parent.updateOneParamQuery}`);
      updateOneServiceParam.push('query');
    }
    if (!!this.parent.updateOneParamHeader) {
      updateOneDecorator.push(`@ApiHeader({type:[${this.parent.updateOneParamHeader}]})`);
      updateOneParam.push(`@Header() header:${this.parent.updateOneParamHeader}`);
      updateOneServiceParam.push('header');
    }
    updateOneBody.push(`${Ser1}updateOne(${updateOneServiceParam.join(',')})`);
    bodyData.push(updateOneDoc.join('\n'));
    bodyData.push(updateOneDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('updateOne', updateOneParam.join(', '), 'void', updateOneBody.join('\n')));

    // PATCH updateMany ==> /many (service.updateMany)
    ////CCCCC
    let updateManyDoc: string[] = [
      `
        /********************************************************************
   *                            updateMany
   ********************************************************************/
      `,
    ];
    let updateManyBody: string[] = [];
    let updateManyParam: string[] = [];
    let updateManyDecorator: string[] = [];
    let updateManyServiceParam: string[] = [];
    updateManyDecorator.push(`@Patch('many/${getParam}')`);
    updateManyDecorator.push(`@ApiOperation({summary:'Api for updateMany'})`);
    updateManyDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.updateManyParamBody) {
      updateManyDecorator.push(`@ApiBody({type:[${this.parent.updateManyParamBody}]})`);
      updateManyParam.push(`@Body() body:${this.parent.updateManyParamBody}`);
      updateManyServiceParam.push('body');
    }
    if (!!this.parent.updateManyParamParam) {
      // updateManyDecorator.push(`@ApiParam({type:[${this.parent.updateManyParamParam}]})`);
      updateManyParam.push(`@Param() param:${this.parent.updateManyParamParam}`);
      updateManyServiceParam.push('param');
    }
    if (!!this.parent.updateManyParamQuery) {
      updateManyDecorator.push(`@ApiQuery({type:[${this.parent.updateManyParamQuery}]})`);
      updateManyParam.push(`@Query() query:${this.parent.updateManyParamQuery}`);
      updateManyServiceParam.push('query');
    }
    if (!!this.parent.updateManyParamHeader) {
      updateManyDecorator.push(`@ApiHeader({type:[${this.parent.updateManyParamHeader}]})`);
      updateManyParam.push(`@Header() header:${this.parent.updateManyParamHeader}`);
      updateManyServiceParam.push('header');
    }
    updateManyBody.push(`${Ser1}updateMany(${updateManyServiceParam.join(',')})`);
    bodyData.push(updateManyDoc.join('\n'));
    bodyData.push(updateManyDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('updateMany', updateManyParam.join(', '), 'void', updateManyBody.join('\n')));

    // PATCH updateAll ==> /all (service.updateAll)
    ////CCCCC
    let updateAllDoc: string[] = [
      `
        /********************************************************************
   *                            updateAll
   ********************************************************************/
      `,
    ];
    let updateAllBody: string[] = [];
    let updateAllParam: string[] = [];
    let updateAllDecorator: string[] = [];
    let updateAllServiceParam: string[] = [];
    updateAllDecorator.push(`@Patch('all')`);
    updateAllDecorator.push(`@ApiOperation({summary:'Api for updateAll'})`);
    updateAllDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.updateAllParamBody) {
      updateAllDecorator.push(`@ApiBody({type:[${this.parent.updateAllParamBody}]})`);
      updateAllParam.push(`@Body() body:${this.parent.updateAllParamBody}`);
      updateAllServiceParam.push('body');
    }
    if (!!this.parent.updateAllParamParam) {
      // updateAllDecorator.push(`@ApiParam({type:[${this.parent.updateAllParamParam}]})`);
      updateAllParam.push(`@Param() param:${this.parent.updateAllParamParam}`);
      updateAllServiceParam.push('param');
    }
    if (!!this.parent.updateAllParamQuery) {
      updateAllDecorator.push(`@ApiQuery({type:[${this.parent.updateAllParamQuery}]})`);
      updateAllParam.push(`@Query() query:${this.parent.updateAllParamQuery}`);
      updateAllServiceParam.push('query');
    }
    if (!!this.parent.updateAllParamHeader) {
      updateAllDecorator.push(`@ApiHeader({type:[${this.parent.updateAllParamHeader}]})`);
      updateAllParam.push(`@Header() header:${this.parent.updateAllParamHeader}`);
      updateAllServiceParam.push('header');
    }
    updateAllBody.push(`${Ser1}updateAll(${updateAllServiceParam.join(',')})`);
    bodyData.push(updateAllDoc.join('\n'));
    bodyData.push(updateAllDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('updateAll', updateAllParam.join(', '), 'void', updateAllBody.join('\n')));

    // PUT updateAdminOne ==> /:id (service.updateOne)
    ////CCCCC
    let updateAdminOneDoc: string[] = [
      `
        /********************************************************************
   *                            updateAdminOne
   ********************************************************************/
      `,
    ];
    let updateAdminOneBody: string[] = [];
    let updateAdminOneParam: string[] = [];
    let updateAdminOneDecorator: string[] = [];
    let updateAdminOneServiceParam: string[] = [];
    updateAdminOneDecorator.push(`@Put('${getParam}')`);
    updateAdminOneDecorator.push(`@ApiOperation({summary:'Api for updateAdminOne'})`);
    updateAdminOneDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.updateAdminOneParamBody) {
      updateAdminOneDecorator.push(`@ApiBody({type:[${this.parent.updateAdminOneParamBody}]})`);
      updateAdminOneParam.push(`@Body() body:${this.parent.updateAdminOneParamBody}`);
      updateAdminOneServiceParam.push('body');
    }
    if (!!this.parent.updateAdminOneParamParam) {
      // updateAdminOneDecorator.push(`@ApiParam({type:[${this.parent.updateAdminOneParamParam}]})`);
      updateAdminOneParam.push(`@Param() param:${this.parent.updateAdminOneParamParam}`);
      updateAdminOneServiceParam.push('param');
    }
    if (!!this.parent.updateAdminOneParamQuery) {
      updateAdminOneDecorator.push(`@ApiQuery({type:[${this.parent.updateAdminOneParamQuery}]})`);
      updateAdminOneParam.push(`@Query() query:${this.parent.updateAdminOneParamQuery}`);
      updateAdminOneServiceParam.push('query');
    }
    if (!!this.parent.updateAdminOneParamHeader) {
      updateAdminOneDecorator.push(`@ApiHeader({type:[${this.parent.updateAdminOneParamHeader}]})`);
      updateAdminOneParam.push(`@Header() header:${this.parent.updateAdminOneParamHeader}`);
      updateAdminOneServiceParam.push('header');
    }
    updateAdminOneBody.push(`${Ser1}updateAdminOne(${updateAdminOneServiceParam.join(',')})`);
    bodyData.push(updateAdminOneDoc.join('\n'));
    bodyData.push(updateAdminOneDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('updateAdminOne', updateAdminOneParam.join(', '), 'void', updateAdminOneBody.join('\n')));

    // PUT updateAdminMany ==> /many (service.updateMany)
    ////CCCCC
    let updateAdminManyDoc: string[] = [
      `
        /********************************************************************
   *                            updateAdminMany
   ********************************************************************/
      `,
    ];
    let updateAdminManyBody: string[] = [];
    let updateAdminManyParam: string[] = [];
    let updateAdminManyDecorator: string[] = [];
    let updateAdminManyServiceParam: string[] = [];
    updateAdminManyDecorator.push(`@Put('many/${getParam}')`);
    updateAdminManyDecorator.push(`@ApiOperation({summary:'Api for updateAdminMany'})`);
    updateAdminManyDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.updateAdminManyParamBody) {
      updateAdminManyDecorator.push(`@ApiBody({type:[${this.parent.updateAdminManyParamBody}]})`);
      updateAdminManyParam.push(`@Body() body:${this.parent.updateAdminManyParamBody}`);
      updateAdminManyServiceParam.push('body');
    }
    if (!!this.parent.updateAdminManyParamParam) {
      // updateAdminManyDecorator.push(`@ApiParam({type:[${this.parent.updateAdminManyParamParam}]})`);
      updateAdminManyParam.push(`@Param() param:${this.parent.updateAdminManyParamParam}`);
      updateAdminManyServiceParam.push('param');
    }
    if (!!this.parent.updateAdminManyParamQuery) {
      updateAdminManyDecorator.push(`@ApiQuery({type:[${this.parent.updateAdminManyParamQuery}]})`);
      updateAdminManyParam.push(`@Query() query:${this.parent.updateAdminManyParamQuery}`);
      updateAdminManyServiceParam.push('query');
    }
    if (!!this.parent.updateAdminManyParamHeader) {
      updateAdminManyDecorator.push(`@ApiHeader({type:[${this.parent.updateAdminManyParamHeader}]})`);
      updateAdminManyParam.push(`@Header() header:${this.parent.updateAdminManyParamHeader}`);
      updateAdminManyServiceParam.push('header');
    }
    updateAdminManyBody.push(`${Ser1}updateAdminMany(${updateAdminManyServiceParam.join(',')})`);
    bodyData.push(updateAdminManyDoc.join('\n'));
    bodyData.push(updateAdminManyDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('updateAdminMany', updateAdminManyParam.join(', '), 'void', updateAdminManyBody.join('\n')));

    // PUT updateAdminAll ==> /all (service.updateAll)
    ////CCCCC
    let updateAdminAllDoc: string[] = [
      `
        /********************************************************************
   *                            updateAdminAll
   ********************************************************************/
      `,
    ];
    let updateAdminAllBody: string[] = [];
    let updateAdminAllParam: string[] = [];
    let updateAdminAllDecorator: string[] = [];
    let updateAdminAllServiceParam: string[] = [];
    updateAdminAllDecorator.push(`@Put('all')`);
    updateAdminAllDecorator.push(`@ApiOperation({summary:'Api for updateAdminAll'})`);
    updateAdminAllDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.updateAdminAllParamBody) {
      updateAdminAllDecorator.push(`@ApiBody({type:[${this.parent.updateAdminAllParamBody}]})`);
      updateAdminAllParam.push(`@Body() body:${this.parent.updateAdminAllParamBody}`);
      updateAdminAllServiceParam.push('body');
    }
    if (!!this.parent.updateAdminAllParamParam) {
      // updateAdminAllDecorator.push(`@ApiParam({type:[${this.parent.updateAdminAllParamParam}]})`);
      updateAdminAllParam.push(`@Param() param:${this.parent.updateAdminAllParamParam}`);
      updateAdminAllServiceParam.push('param');
    }
    if (!!this.parent.updateAdminAllParamQuery) {
      updateAdminAllDecorator.push(`@ApiQuery({type:[${this.parent.updateAdminAllParamQuery}]})`);
      updateAdminAllParam.push(`@Query() query:${this.parent.updateAdminAllParamQuery}`);
      updateAdminAllServiceParam.push('query');
    }
    if (!!this.parent.updateAdminAllParamHeader) {
      updateAdminAllDecorator.push(`@ApiHeader({type:[${this.parent.updateAdminAllParamHeader}]})`);
      updateAdminAllParam.push(`@Header() header:${this.parent.updateAdminAllParamHeader}`);
      updateAdminAllServiceParam.push('header');
    }
    updateAdminAllBody.push(`${Ser1}updateAdminAll(${updateAdminAllServiceParam.join(',')})`);
    bodyData.push(updateAdminAllDoc.join('\n'));
    bodyData.push(updateAdminAllDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('updateAdminAll', updateAdminAllParam.join(', '), 'void', updateAdminAllBody.join('\n')));

    // DELETE deleteOne /:id (service.DeleteOne)
    ////CCCCC
    let deleteOneDoc: string[] = [
      `
        /********************************************************************
   *                            deleteOne
   ********************************************************************/
      `,
    ];
    let deleteOneBody: string[] = [];
    let deleteOneParam: string[] = [];
    let deleteOneDecorator: string[] = [];
    let deleteOneServiceParam: string[] = [];
    deleteOneDecorator.push(`@Delete('${getParam}')`);
    deleteOneDecorator.push(`@ApiOperation({summary:'Api for deleteOne'})`);
    deleteOneDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.deleteOneParamBody) {
      deleteOneDecorator.push(`@ApiBody({type:[${this.parent.deleteOneParamBody}]})`);
      deleteOneParam.push(`@Body() body:${this.parent.deleteOneParamBody}`);
      deleteOneServiceParam.push('body');
    }
    if (!!this.parent.deleteOneParamParam) {
      // deleteOneDecorator.push(`@ApiParam({type:[${this.parent.deleteOneParamParam}]})`);
      deleteOneParam.push(`@Param() param:${this.parent.deleteOneParamParam}`);
      deleteOneServiceParam.push('param');
    }
    if (!!this.parent.deleteOneParamQuery) {
      deleteOneDecorator.push(`@ApiQuery({type:[${this.parent.deleteOneParamQuery}]})`);
      deleteOneParam.push(`@Query() query:${this.parent.deleteOneParamQuery}`);
      deleteOneServiceParam.push('query');
    }
    if (!!this.parent.deleteOneParamHeader) {
      deleteOneDecorator.push(`@ApiHeader({type:[${this.parent.deleteOneParamHeader}]})`);
      deleteOneParam.push(`@Header() header:${this.parent.deleteOneParamHeader}`);
      deleteOneServiceParam.push('header');
    }
    deleteOneBody.push(`${Ser1}deleteOne(${deleteOneServiceParam.join(',')})`);
    bodyData.push(deleteOneDoc.join('\n'));
    bodyData.push(deleteOneDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('deleteOne', deleteOneParam.join(', '), 'void', deleteOneBody.join('\n')));

    // DELETE deleteMany /many (service.DeleteMany)
    ////CCCCC
    let deleteManyDoc: string[] = [
      `
        /********************************************************************
   *                            deleteMany
   ********************************************************************/
      `,
    ];
    let deleteManyBody: string[] = [];
    let deleteManyParam: string[] = [];
    let deleteManyDecorator: string[] = [];
    let deleteManyServiceParam: string[] = [];
    deleteManyDecorator.push(`@Delete('many/${getParam}')`);
    deleteManyDecorator.push(`@ApiOperation({summary:'Api for deleteMany'})`);
    deleteManyDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.deleteManyParamBody) {
      deleteManyDecorator.push(`@ApiBody({type:[${this.parent.deleteManyParamBody}]})`);
      deleteManyParam.push(`@Body() body:${this.parent.deleteManyParamBody}`);
      deleteManyServiceParam.push('body');
    }
    if (!!this.parent.deleteManyParamParam) {
      // deleteManyDecorator.push(`@ApiParam({type:[${this.parent.deleteManyParamParam}]})`);
      deleteManyParam.push(`@Param() param:${this.parent.deleteManyParamParam}`);
      deleteManyServiceParam.push('param');
    }
    if (!!this.parent.deleteManyParamQuery) {
      deleteManyDecorator.push(`@ApiQuery({type:[${this.parent.deleteManyParamQuery}]})`);
      deleteManyParam.push(`@Query() query:${this.parent.deleteManyParamQuery}`);
      deleteManyServiceParam.push('query');
    }
    if (!!this.parent.deleteManyParamHeader) {
      deleteManyDecorator.push(`@ApiHeader({type:[${this.parent.deleteManyParamHeader}]})`);
      deleteManyParam.push(`@Header() header:${this.parent.deleteManyParamHeader}`);
      deleteManyServiceParam.push('header');
    }
    deleteManyBody.push(`${Ser1}deleteMany(${deleteManyServiceParam.join(',')})`);
    bodyData.push(deleteManyDoc.join('\n'));
    bodyData.push(deleteManyDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('deleteMany', deleteManyParam.join(', '), 'void', deleteManyBody.join('\n')));

    // DELETE deleteAll /all  (service.DeleteAll)
    ////CCCCC
    let deleteAllDoc: string[] = [
      `
        /********************************************************************
   *                            deleteAll
   ********************************************************************/
      `,
    ];
    let deleteAllBody: string[] = [];
    let deleteAllParam: string[] = [];
    let deleteAllDecorator: string[] = [];
    let deleteAllServiceParam: string[] = [];
    deleteAllDecorator.push(`@Delete('all')`);
    deleteAllDecorator.push(`@ApiOperation({summary:'Api for deleteAll'})`);
    deleteAllDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.deleteAllParamBody) {
      deleteAllDecorator.push(`@ApiBody({type:[${this.parent.deleteAllParamBody}]})`);
      deleteAllParam.push(`@Body() body:${this.parent.deleteAllParamBody}`);
      deleteAllServiceParam.push('body');
    }
    if (!!this.parent.deleteAllParamParam) {
      // deleteAllDecorator.push(`@ApiParam({type:[${this.parent.deleteAllParamParam}]})`);
      deleteAllParam.push(`@Param() param:${this.parent.deleteAllParamParam}`);
      deleteAllServiceParam.push('param');
    }
    if (!!this.parent.deleteAllParamQuery) {
      deleteAllDecorator.push(`@ApiQuery({type:[${this.parent.deleteAllParamQuery}]})`);
      deleteAllParam.push(`@Query() query:${this.parent.deleteAllParamQuery}`);
      deleteAllServiceParam.push('query');
    }
    if (!!this.parent.deleteAllParamHeader) {
      deleteAllDecorator.push(`@ApiHeader({type:[${this.parent.deleteAllParamHeader}]})`);
      deleteAllParam.push(`@Header() header:${this.parent.deleteAllParamHeader}`);
      deleteAllServiceParam.push('header');
    }
    deleteAllBody.push(`${Ser1}deleteAll(${deleteAllServiceParam.join(',')})`);
    bodyData.push(deleteAllDoc.join('\n'));
    bodyData.push(deleteAllDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('deleteAll', deleteAllParam.join(', '), 'void', deleteAllBody.join('\n')));

    // DELETE deleteAdminOne /:id (service.DeleteOne)
    ////CCCCC
    let deleteAdminOneDoc: string[] = [
      `
        /********************************************************************
   *                            deleteAdminOne
   ********************************************************************/
      `,
    ];
    let deleteAdminOneBody: string[] = [];
    let deleteAdminOneParam: string[] = [];
    let deleteAdminOneDecorator: string[] = [];
    let deleteAdminOneServiceParam: string[] = [];
    deleteAdminOneDecorator.push(`@Delete('admin/${getParam}')`);
    deleteAdminOneDecorator.push(`@ApiOperation({summary:'Api for deleteAdminOne'})`);
    deleteAdminOneDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.deleteAdminOneParamBody) {
      deleteAdminOneDecorator.push(`@ApiBody({type:[${this.parent.deleteAdminOneParamBody}]})`);
      deleteAdminOneParam.push(`@Body() body:${this.parent.deleteAdminOneParamBody}`);
      deleteAdminOneServiceParam.push('body');
    }
    if (!!this.parent.deleteAdminOneParamParam) {
      // deleteAdminOneDecorator.push(`@ApiParam({type:[${this.parent.deleteAdminOneParamParam}]})`);
      deleteAdminOneParam.push(`@Param() param:${this.parent.deleteAdminOneParamParam}`);
      deleteAdminOneServiceParam.push('param');
    }
    if (!!this.parent.deleteAdminOneParamQuery) {
      deleteAdminOneDecorator.push(`@ApiQuery({type:[${this.parent.deleteAdminOneParamQuery}]})`);
      deleteAdminOneParam.push(`@Query() query:${this.parent.deleteAdminOneParamQuery}`);
      deleteAdminOneServiceParam.push('query');
    }
    if (!!this.parent.deleteAdminOneParamHeader) {
      deleteAdminOneDecorator.push(`@ApiHeader({type:[${this.parent.deleteAdminOneParamHeader}]})`);
      deleteAdminOneParam.push(`@Header() header:${this.parent.deleteAdminOneParamHeader}`);
      deleteAdminOneServiceParam.push('header');
    }
    deleteAdminOneBody.push(`${Ser1}deleteAdminOne(${deleteAdminOneServiceParam.join(',')})`);
    bodyData.push(deleteAdminOneDoc.join('\n'));
    bodyData.push(deleteAdminOneDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('deleteAdminOne', deleteAdminOneParam.join(', '), 'void', deleteAdminOneBody.join('\n')));

    // DELETE deleteAdminMany  /many (service.DeleteMany)
    ////CCCCC
    let deleteAdminManyDoc: string[] = [
      `
        /********************************************************************
   *                            deleteAdminMany
   ********************************************************************/
      `,
    ];
    let deleteAdminManyBody: string[] = [];
    let deleteAdminManyParam: string[] = [];
    let deleteAdminManyDecorator: string[] = [];
    let deleteAdminManyServiceParam: string[] = [];
    deleteAdminManyDecorator.push(`@Delete('admin/many/${getParam}')`);
    deleteAdminManyDecorator.push(`@ApiOperation({summary:'Api for deleteAdminMany'})`);
    deleteAdminManyDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.deleteAdminManyParamBody) {
      deleteAdminManyDecorator.push(`@ApiBody({type:[${this.parent.deleteAdminManyParamBody}]})`);
      deleteAdminManyParam.push(`@Body() body:${this.parent.deleteAdminManyParamBody}`);
      deleteAdminManyServiceParam.push('body');
    }
    if (!!this.parent.deleteAdminManyParamParam) {
      // deleteAdminManyDecorator.push(`@ApiParam({type:[${this.parent.deleteAdminManyParamParam}]})`);
      deleteAdminManyParam.push(`@Param() param:${this.parent.deleteAdminManyParamParam}`);
      deleteAdminManyServiceParam.push('param');
    }
    if (!!this.parent.deleteAdminManyParamQuery) {
      deleteAdminManyDecorator.push(`@ApiQuery({type:[${this.parent.deleteAdminManyParamQuery}]})`);
      deleteAdminManyParam.push(`@Query() query:${this.parent.deleteAdminManyParamQuery}`);
      deleteAdminManyServiceParam.push('query');
    }
    if (!!this.parent.deleteAdminManyParamHeader) {
      deleteAdminManyDecorator.push(`@ApiHeader({type:[${this.parent.deleteAdminManyParamHeader}]})`);
      deleteAdminManyParam.push(`@Header() header:${this.parent.deleteAdminManyParamHeader}`);
      deleteAdminManyServiceParam.push('header');
    }
    deleteAdminManyBody.push(`${Ser1}deleteAdminMany(${deleteAdminManyServiceParam.join(',')})`);
    bodyData.push(deleteAdminManyDoc.join('\n'));
    bodyData.push(deleteAdminManyDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('deleteAdminMany', deleteAdminManyParam.join(', '), 'void', deleteAdminManyBody.join('\n')));

    // DELETE deleteAdminAll  /all (service.DeleteAll)
    ////CCCCC
    let deleteAdminAllDoc: string[] = [
      `
        /********************************************************************
   *                            deleteAdminAll
   ********************************************************************/
      `,
    ];
    let deleteAdminAllBody: string[] = [];
    let deleteAdminAllParam: string[] = [];
    let deleteAdminAllDecorator: string[] = [];
    let deleteAdminAllServiceParam: string[] = [];
    deleteAdminAllDecorator.push(`@Delete('admin/all')`);
    deleteAdminAllDecorator.push(`@ApiOperation({summary:'Api for deleteAdminAll'})`);
    deleteAdminAllDecorator.push(`@ApiResponse({ status: HttpStatus.ACCEPTED, description: 'DESCSTATUS'})`);
    if (!!this.parent.deleteAdminAllParamBody) {
      deleteAdminAllDecorator.push(`@ApiBody({type:[${this.parent.deleteAdminAllParamBody}]})`);
      deleteAdminAllParam.push(`@Body() body:${this.parent.deleteAdminAllParamBody}`);
      deleteAdminAllServiceParam.push('body');
    }
    if (!!this.parent.deleteAdminAllParamParam) {
      // deleteAdminAllDecorator.push(`@ApiParam({type:[${this.parent.deleteAdminAllParamParam}]})`);
      deleteAdminAllParam.push(`@Param() param:${this.parent.deleteAdminAllParamParam}`);
      deleteAdminAllServiceParam.push('param');
    }
    if (!!this.parent.deleteAdminAllParamQuery) {
      deleteAdminAllDecorator.push(`@ApiQuery({type:[${this.parent.deleteAdminAllParamQuery}]})`);
      deleteAdminAllParam.push(`@Query() query:${this.parent.deleteAdminAllParamQuery}`);
      deleteAdminAllServiceParam.push('query');
    }
    if (!!this.parent.deleteAdminAllParamHeader) {
      deleteAdminAllDecorator.push(`@ApiHeader({type:[${this.parent.deleteAdminAllParamHeader}]})`);
      deleteAdminAllParam.push(`@Header() header:${this.parent.deleteAdminAllParamHeader}`);
      deleteAdminAllServiceParam.push('header');
    }
    deleteAdminAllBody.push(`${Ser1}deleteAdminAll(${deleteAdminAllServiceParam.join(',')})`);
    bodyData.push(deleteAdminAllDoc.join('\n'));
    bodyData.push(deleteAdminAllDecorator.join('\n'));
    bodyData.push(this.controllerFunctionGenerator('deleteAdminAll', deleteAdminAllParam.join(', '), 'void', deleteAdminAllBody.join('\n')));

    this.fileContent = prettierFormat(`
    ${importData.join('\n')}

    ${decorator.join('\n')}
${classGenerator(this.model.name + 'Controller', bodyData.join('\n'))}
    `);
  }

  public get fileContentGetter() {
    return this.fileContent;
  }

  public controllerFunctionGenerator(name: string, param: string, retType: string, body: string) {
    // return functionPromiseGenerator(name,param,retType, tryCatchGenerator());
    return functionPromiseGenerator(name, param, retType, body);
  }
}
