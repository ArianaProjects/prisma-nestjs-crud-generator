import { ReqNamesType } from './../interfaces';
import { DMMF } from '@prisma/generator-helper/dist/dmmf';
import { apiResponseInterface, functionFixConfig, generalConfig, ReqNames, ReqType } from '../interfaces';
import { classGenerator, constructorGenerator, decoratorGenerator, functionGenerator, functionPromiseGenerator, parameterGenerator, parameterPrivateGenerator } from '../templates';
import Model from './Model';
import fs from 'fs';
import { fixedConfig } from './const';
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
    // console.log(serBody);
    const keys = Object.keys(fixedConfig.functions);
    keys.map((f) => {
      const d = this.config && this.config.functions && this.config.functions[f] && this.config.functions[f].disable;
      if (!(this.config && this.config.functions && this.config.functions[f] && this.config.functions[f].disable)) {
        const c = fixedConfig.functions[f];
        //   // controller
        conBody.push(this.controllerFunction(ReqNames[f], c, true, true, true));
        //   // service
        serBody.push(this.serviceFunction(ReqNames[f], c));
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

  private apiOperationDecorator(name: ReqNames) {
    let res: string[] = [];
    res.push('@ApiOperation({');
    if (this.config && this.config.functions && this.config.functions[name] && !!this.config.functions[name].summary) res.push(`summary:"${this.parent.replace(this.config.functions[name].summary)}",`);
    if (this.config && this.config.functions && this.config.functions[name] && !!this.config.functions[name].description) res.push(`description:"${this.parent.replace(this.config.functions[name].description)}",`);
    res.push('})');
    return res.join('\n');
  }

  private allApiResponseDecorators(responses?: apiResponseInterface[]) {
    return responses.map((r) => this.apiResponseDecorator(r)).join('\n');
  }

  private apiResponseDecorator(option: apiResponseInterface) {
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

  private paramController(option: functionFixConfig) {
    let res: string[] = [];

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

  private paramControllerToService(option: functionFixConfig) {
    let res: string[] = [];

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
    return res.join(' ');
  }

  private paramService(option: functionFixConfig) {
    let res: string[] = [];

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
    let res: string[] = [];
    res.push('/********************************************************************');
    res.push('*                            ' + ReqNames[name]);
    res.push('   ********************************************************************/');
    return res.join('\n');
  }
  private controllerFunctionBody(name: ReqNames, conf: functionFixConfig) {
    let res: string[] = [];
    res.push(`return await this.${this.parent.nameCamel}Service.${name}(${this.paramControllerToService(conf)})`);
    return res.join('\n');
  }

  private controllerFunction(name: ReqNames, conf: functionFixConfig, apiOperator: boolean, apiReq: boolean, apiResp: boolean) {
    let res: string[] = [];

    const optionalConf = this.config && this.config.functions && this.config.functions[name];
    res.push(this.controllerFunctionComment(name));
    res.push(this.functionControllerDecorator(ReqType[ReqNamesType[name]], conf, name)); // TODO param
    if (apiOperator) res.push(this.apiOperationDecorator(name));
    if (apiResp) res.push(this.allApiResponseDecorators(conf.responses));
    if (apiReq) res.push(this.apiRequestDecorator(conf));
    if (optionalConf && optionalConf.additionalDecorator) optionalConf.additionalDecorator.map((a) => res.push(a));
    res.push(functionPromiseGenerator(ReqNames[name], this.paramController(conf), this.parent.replace(conf.resp), this.parent.replace(this.controllerFunctionBody(name, conf))));
    return res.join('\n');
  }

  private serviceFunction(name: ReqNames, conf: functionFixConfig) {
    let res: string[] = [];
    res.push(functionPromiseGenerator(ReqNames[name], this.parent.replace(this.paramService(conf)), this.parent.replace(conf.resp), this.parent.replace(this.serviceFunctionBody(conf))));
    return res.join('\n');
  }

  private serviceFunctionBody(conf: functionFixConfig) {
    let res: string[] = [];
    let fix = conf.service;
    if (this.parent.idsNoDefault.length > 0) {
      if (fix.includes('createMany') && conf.bodyArray) {
        fix = conf.service.replace(
          '...b ',
          `
        ${this.parent.idsNoDefault
          .map((id) => {
            return `${id.name}:this.${id.name}Gen()`;
          })
          .join(`,`)}
         , ...b
        `,
        );
        // console.log(fix);
      } else if (fix.includes('create') && !conf.bodyArray) {
        fix = conf.service.replace(
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
        Put,
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
    res.push(
      `import {
        ${this.parent.namePascal}Service
    } from './${this.parent.nameCamel}.service';`,
    );
    return res.join('\n');
  }

  private serviceImport() {
    let res: string[] = [];
    res.push(
      `import {
        ${this.parent.namePascal}
    } from './${this.parent.nameCamel}.entity';`,
    );
    res.push(`import { PrismaService } from 'src/shared/services/prisma.service';`);
    res.push(
      `import {
        Find${this.parent.namePascal}Dto,
        Create${this.parent.namePascal}Dto,
        Update${this.parent.namePascal}Dto,
        Connect${this.parent.namePascal}Dto,
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
        Put,
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
