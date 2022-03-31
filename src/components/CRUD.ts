import { ReqNamesType } from './../interfaces';
import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { apiResponseInterface, functionFixConfig, generalConfig, ReqNames, ReqType } from '../interfaces';
import { classGenerator, constructorGenerator, decoratorGenerator, functionGenerator, functionPromiseGenerator, parameterGenerator, parameterPrivateGenerator } from '../templates';
import Model from './Model';
import fs from 'fs';
import { fixedConfig, UserDecoratorParam, UserParam, UserParamService } from './const';
import { prettierFormatFormat, tsTypes } from '../util';

export default class CRUD {
  parent: Model;
  config: generalConfig;
  controller: string;
  service: string;

  idGenerator: boolean = false;

  constructor(parent: Model) {
    this.parent = parent;
    this.config = this.configParser(this.parent.option.configPath);
    // console.log('here', this.parent.model.fields);
    this.generate();
  }

  private generate() {
    // if id not automatically

    let conBody: string[] = [];
    let serBody: string[] = [];
    conBody.push(this.controllerClassConstructor());
    serBody.push(this.serviceClassConstructor());
    if (this.config.access && !this.config.accessBlackList.includes(this.parent.namePascal)) {
      serBody.push(
        functionPromiseGenerator(
          'hasAccess',
          `${UserParamService}, ${this.parent.replace('query: FIND_DTO')}`,
          'Boolean',
          this.parent.replace(`
          const ret = await this.prismaService.NAME_CAMEL.findMany({
            where: { ...query,  ...this.hasAccessData(user),
              ...this.isNotDeletedData(), },
          });
          return ret.length > 0;
        `),
        ),
      );
      serBody.push(
        functionGenerator(
          'hasAccessData',
          `${UserParamService}`,
          `Access${this.parent.namePascal}Dto`,
          `
          return {
            userId:user.id
          };
        `,
        ),
      );
    }
    serBody.push(
      functionGenerator(
        'isNotDeletedData',
        ``,
        `Deleted${this.parent.namePascal}Dto`,
        `
        return {
          deletedAt:null
        };
      `,
      ),
    );
    serBody.push(
      functionGenerator(
        'pseudonymisationData',
        ``,
        `Pseudonymisation${this.parent.namePascal}Dto`,
        `
        return {
        };
      `,
      ),
    );
    this.parent.idsNoDefault.map((id) => {
      serBody.push(
        functionGenerator(
          `${id.name}Gen`,
          ``,
          tsTypes(id.type),
          `// TODO
      return null`,
        ),
      );
    });
    const keys = Object.keys(fixedConfig.functions);
    keys.map((f, i) => {
      const d = this.config && this.config.functions && this.config.functions[f] && this.config.functions[f].disable;
      if (!(this.config && this.config.functions && this.config.functions[f] && this.config.functions[f].disable)) {
        if (i == 11) {
          conBody.push('\n\n//\t------------------ ADMIN -------------------\n');
          serBody.push('\n\n//\t------------------ ADMIN -------------------\n');
        }
        const c = fixedConfig.functions[f];
        // controller
        conBody.push(this.controllerFunction(ReqNames[f], c, true, true, true));
        // service
        serBody.push(this.serviceFunction(ReqNames[f], c));
        serBody.push('\n');
      }
    });

    this.controller = prettierFormatFormat(this.controllerGenerator(conBody.join('\n')));
    this.service = prettierFormatFormat(this.serviceGenerator(serBody.join('\n')));
  }
  private configParser(path?: string): generalConfig {
    if (!!path) return JSON.parse(fs.readFileSync(process.cwd() + '/' + path, 'utf-8')) as generalConfig;
    return null;
  }

  private functionControllerDecorator(type: ReqType, conf: functionFixConfig, name: string) {
    let res: string[] = [];
    let p: string[] = [conf.fixedPath];
    if (conf.param)
      this.parent.idFields.map((id) => {
        if (this.parent.idFields.length > 1) p.push(`${id.name}/:${id.name}`);
        else p.push(`:${id.name}`);
      });
    res.push(decoratorGenerator(String(type), p.join('/')));
    if (this.config && this.config.functions && this.config.functions[name] && this.config.functions[name].additionalDecorator) res.push(this.config.functions[name].additionalDecorator.join('\n'));

    return res.join('\n');
  }

  private apiOperationDecorator(name: ReqNames, conf: functionFixConfig) {
    let res: string[] = [];
    res.push('@ApiOperation({');
    if (this.config && this.config.functions && this.config.functions[name] && !!this.config.functions[name].summary) res.push(`summary:"${this.parent.replace(this.config.functions[name].summary)}",`);
    if (this.config && this.config.functions && this.config.functions[name] && !!this.config.functions[name].description) res.push(`description:"${this.parent.replace(this.config.functions[name].description)}",`);
    res.push(`summary:"${this.parent.replace(conf.info)}",`);
    res.push('})');
    return res.join('\n');
  }

  private allApiResponseDecorators(conf: functionFixConfig) {
    return conf.responses.map((r) => this.apiResponseDecorator(r, conf)).join('\n');
  }

  private apiResponseDecorator(option: apiResponseInterface, conf: functionFixConfig) {
    let res: string[] = [];
    res.push('@ApiResponse({');
    res.push(`status:${this.parent.replace(option.status)},`);
    if (option.description) res.push(`description:"${this.parent.replace(option.description)}",`);
    if (option.type) res.push(`type:${this.parent.replace(option.type)},`);
    res.push('})');
    return res.join('\n');
  }

  private apiRequestDecorator(option: functionFixConfig) {
    let res: string[] = [];

    // // ApiQuery
    // if (option.query) {
    //   res.push('@ApiQuery({');
    //   res.push('type:' + this.parent.replace(option.query));
    //   res.push('})');
    // }

    // // ApiParam
    // if (option.param) {
    //   res.push('@ApiParam({');
    //   if (option.bodyArray) res.push('isArray:true');
    //   res.push('type:' + this.parent.replace(option.param));
    //   res.push('})');
    // }

    // // Header
    // if (option.header) {
    //   res.push('@ApiHeader({');
    //   res.push('type:' + this.parent.replace(option.header));
    //   res.push('})');
    // }

    // ApiBody
    if (option.body) {
      res.push('@ApiBody({');
      if (option.bodyArray) res.push('isArray:true,');
      res.push('type:' + this.parent.replace(option.body));
      res.push('})');
    }
    return res.join('\n');
  }

  private paramController(option: functionFixConfig, access: boolean = false) {
    let res: string[] = [];

    if (access && !option.admin) {
      res.push(UserDecoratorParam);
      res.push(',');
    }

    // ApiQuery
    if (option.query) {
      res.push('@Query() query: ');
      res.push(this.parent.replace(option.query));
      res.push(',');
    }

    // ApiParam
    if (option.param) {
      res.push('@Param() param: ');
      res.push(this.parent.replace(option.param));
      if (option.paramArray) res.push('[]');
      res.push(',');
    }

    // Header
    if (option.header) {
      res.push('@Header() header: ');
      res.push(this.parent.replace(option.header));
      res.push(',');
    }

    // ApiBody
    if (option.body) {
      res.push('@Body() body: ');
      res.push(this.parent.replace(option.body));
      if (option.bodyArray) res.push('[]');
      res.push(',');
    }
    return res.join(' ');
  }

  private paramControllerToService(option: functionFixConfig, access: boolean = false) {
    let res: string[] = [];
    if (access && !option.admin) {
      res.push(UserParam);
      res.push(',');
    }
    // ApiQuery
    if (option.query) {
      res.push('query');
      res.push(',');
    }

    // ApiParam
    if (option.param) {
      res.push('param');
      res.push(',');
    }

    // Header
    if (option.header) {
      res.push('header');
      res.push(',');
    }

    // ApiBody
    if (option.body) {
      res.push('body ');
      res.push(',');
    }
    // console.log(access, !option.admin, res);

    return res.join(' ');
  }

  private paramService(option: functionFixConfig, access: boolean = false) {
    let res: string[] = [];

    if (access && !option.admin) {
      res.push(UserParamService);
      res.push(',');
    }

    // ApiQuery
    if (option.query) {
      res.push(parameterGenerator('query', this.parent.replace(option.query)));
      res.push(',');
    }

    // ApiParam
    if (option.param) {
      res.push(parameterGenerator('param', this.parent.replace(option.param)));
      if (option.paramArray) res.push('[]');
      res.push(',');
    }

    // Header
    if (option.header) {
      res.push(parameterGenerator('header', this.parent.replace(option.header)));
      res.push(',');
    }

    // ApiBody
    if (option.body) {
      res.push(parameterGenerator('body ', this.parent.replace(option.body)));
      if (option.bodyArray) res.push('[]');
      res.push(',');
    }
    return res.join(' ');
  }

  private serviceClassDecorator() {
    let res: string[] = [];
    res.push('@Injectable()');
    return res.join('\n');
  }

  private controllerClassDecorator() {
    let res: string[] = [];
    res.push(``);
    res.push(`@Controller('${this.parent.nameCamel}')`);
    res.push('@ApiBearerAuth()');
    res.push(`@ApiTags("${this.parent.namePascal}")`);

    return res.join('\n');
  }
  private controllerFunctionComment(name: ReqNames) {
    let res: string[] = ['\n'];
    res.push('/********************************************************************');
    res.push('*                            ' + ReqNames[name]);
    res.push('   ********************************************************************/');
    return res.join('\n');
  }
  private controllerFunctionBody(name: ReqNames, conf: functionFixConfig) {
    let res: string[] = [];
    const ENTITY = conf.responses.filter((r) => r.type == 'ENTITY').length >= 1;
    const ENTITYArray = conf.responses.filter((r) => r.type == '[ENTITY]').length >= 1;
    if (ENTITY || ENTITYArray) res.push(`return plainToInstance(${this.parent.namePascal}, (await this.${this.parent.nameCamel}Service.${name}(${this.paramControllerToService(conf, this.config.access)})))`);
    else res.push(`return await this.${this.parent.nameCamel}Service.${name}(${this.paramControllerToService(conf, this.config.access)})`);
    return res.join('\n');
  }

  private controllerFunction(name: ReqNames, conf: functionFixConfig, apiOperator: boolean, apiReq: boolean, apiResp: boolean) {
    let res: string[] = [];

    const optionalConf = this.config && this.config.functions && this.config.functions[name];
    res.push(this.controllerFunctionComment(name));
    res.push(this.functionControllerDecorator(ReqType[ReqNamesType[name]], conf, name)); // TODO param
    if (apiOperator) res.push(this.apiOperationDecorator(name, conf));
    if (apiResp) res.push(this.allApiResponseDecorators(conf));
    if (apiReq) res.push(this.apiRequestDecorator(conf));
    res.push(functionPromiseGenerator(ReqNames[name], this.paramController(conf, this.config.access), this.parent.replace(conf.resp), this.parent.replace(this.controllerFunctionBody(name, conf))));
    return res.join('\n');
  }

  private serviceFunction(name: ReqNames, conf: functionFixConfig) {
    let res: string[] = [];
    res.push(functionPromiseGenerator(ReqNames[name], this.parent.replace(this.paramService(conf, this.config.access)), this.parent.replace(conf.resp), this.parent.replace(this.serviceFunctionBody(conf, name))));
    return res.join('\n\n');
  }

  private serviceFunctionBody(conf: functionFixConfig, name: ReqNames) {
    let res: string[] = [];
    const service = this.config.access && !this.config.accessBlackList.includes(this.parent.namePascal) ? conf.serviceAccess : conf.service;
    // console.log(this.parent.namePascal, service);

    let fix = service;
    if (this.parent.idsNoDefault.length > 0) {
      if (fix.includes('createMany') && conf.bodyArray) {
        fix = service.replace(
          '...b ',
          `
        ${this.parent.idsNoDefault
          .map((id) => {
            return `${id.name}:this.${id.name}Gen()`;
          })
          .join(`,`)}
         , ...b `,
        );
        // console.log(fix);
      } else if (fix.includes('create') && !conf.bodyArray) {
        fix = service.replace(
          '...body',
          `
        ${this.parent.idsNoDefault
          .map((id) => {
            return `${id.name}:this.${id.name}Gen()`;
          })
          .join(`,`)}
         , ...body
        `,
        );
        // console.log(fix);
      }
    }
    res.push(fix);
    return res.join('\n');
  }

  private controllerClassConstructor() {
    let res: string[] = [];
    // console.log('sad');
    res.push(constructorGenerator(parameterPrivateGenerator(this.parent.nameCamel + 'Service', this.parent.namePascal + 'Service'), ''));
    return res.join('\n');
  }
  private serviceClassConstructor() {
    let res: string[] = [];
    res.push(constructorGenerator(parameterPrivateGenerator('prismaService', 'PrismaService'), ''));
    return res.join('\n');
  }

  private controllerImport() {
    let res: string[] = [];
    if (this.config.additionalImport) {
      this.config.additionalImport.map((i) => {
        res.push(i);
      });
    }
    res.push(
      `import {
        ${this.parent.namePascal}
    } from './${this.parent.nameCamel}.entity';`,
    );
    res.push(
      `import {
        Find${this.parent.namePascal}Dto,
        Create${this.parent.namePascal}Dto,
        Update${this.parent.namePascal}Dto,
        Connect${this.parent.namePascal}Dto,
        Find${this.parent.namePascal}AdminDto,
        Create${this.parent.namePascal}AdminDto,
        Update${this.parent.namePascal}AdminDto,
        Connect${this.parent.namePascal}AdminDto,
        Access${this.parent.namePascal}Dto,
        Deleted${this.parent.namePascal}Dto,
        Pseudonymisation${this.parent.namePascal}Dto
    } from './${this.parent.nameCamel}.dto';`,
    );
    res.push(
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
        Put,  UnauthorizedException,
        ForbiddenException,
        ConflictException,
        Req,Injectable
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
      "import { Prisma } from '@prisma/client';",
    );
    res.push(`import { UserGeneralDto } from 'src/shared/dtos/user.dto';`);
    res.push(`import { plainToInstance } from 'class-transformer';`);
    res.push(`import { User as UserDecorator } from 'src/shared/decorators/user.decorator';    `);
    res.push(
      `import {
        ${this.parent.namePascal}Service
    } from './${this.parent.nameCamel}.service';`,
    );
    return res.join('\n');
  }

  private serviceImport() {
    let res: string[] = [];
    if (this.config.additionalImport) {
      this.config.additionalImport.map((i) => {
        res.push(i);
      });
    }
    res.push(
      `import {
        ${this.parent.namePascal}
    } from './${this.parent.nameCamel}.entity';`,
    );
    res.push(`import { plainToInstance } from 'class-transformer';`);
    res.push(`import { PrismaService } from 'src/shared/services/prisma.service';`);
    res.push(`import { UserGeneralDto } from 'src/shared/dtos/user.dto';`);
    res.push(`import { User as UserDecorator } from 'src/shared/decorators/user.decorator';    `);
    res.push(
      `import {
        Find${this.parent.namePascal}Dto,
        Create${this.parent.namePascal}Dto,
        Update${this.parent.namePascal}Dto,
        Connect${this.parent.namePascal}Dto,
        Find${this.parent.namePascal}AdminDto,
        Create${this.parent.namePascal}AdminDto,
        Update${this.parent.namePascal}AdminDto,
        Connect${this.parent.namePascal}AdminDto,
        Access${this.parent.namePascal}Dto,
        Deleted${this.parent.namePascal}Dto,
        Pseudonymisation${this.parent.namePascal}Dto
    } from './${this.parent.nameCamel}.dto';`,
    );
    res.push(
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
        Put,  UnauthorizedException,
        ForbiddenException,
        ConflictException,
        Req,Injectable
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
      "import { Prisma } from '@prisma/client';",
    );

    let prismaImport = [];
    this.parent.enumFields.map((f) => {
      prismaImport.push(` ${f.type},`);
    });
    res.push('import { ' + prismaImport.join('\n') + "} from '@prisma/client'");
    return res.join('\n');
  }

  private controllerGenerator(body: string) {
    let res: string[] = [];
    res.push(this.controllerImport());
    res.push(classGenerator(this.parent.namePascal + 'Controller', body, this.controllerClassDecorator()));
    return res.join('\n');
  }

  private serviceGenerator(body: string) {
    let res: string[] = [];
    res.push(this.serviceImport());
    res.push(classGenerator(this.parent.namePascal + 'Service', body, this.serviceClassDecorator()));
    return res.join('\n');
  }
}
