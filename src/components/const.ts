import { fixedConfigInterface, generalConfig } from '../interfaces';

export const fixedConfig: fixedConfigInterface = {
  functions: {
    exist: {
      query: 'FIND_DTO',
      fixedPath: 'exist',
      resp: `Boolean`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query },
      });
      return ret.length > 0;`,
      responses: [
        {
          description: 'NAME_PASCAL',
          type: 'Boolean',
          status: 200,
        },
      ],
    },
    findUniq: {
      param: 'CONNECT_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findUnique({
        where: { ...param },
      });
      return ret;`,
      responses: [
        {
          description: 'NAME_CAMEL',
          type: 'ENTITY',
          status: 200,
        },
      ],
    },
    findMany: {
      query: 'FIND_DTO',
      fixedPath: 'many',
      resp: `ENTITY[]`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query },
      });
      return ret;`,
      responses: [
        {
          description: 'ENTITY',
          type: '[ENTITY]',
          status: 200,
        },
      ],
    },
    getAll: {
      fixedPath: 'all',
      resp: `ENTITY[]`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany();
      return ret;`,
      responses: [
        {
          description: 'CREATE_DTO',
          status: 200,
          type: '[ENTITY]',
        },
      ],
    },
    createOne: {
      body: 'CREATE_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.create({
        data: { ...body },
      });
      return ret;`,
      responses: [
        {
          description: 'CONNECT_DTO',
          status: 201,
          type: 'ENTITY',
        },
      ],
    },
    createMany: {
      body: 'CREATE_DTO',
      bodyArray: true,
      fixedPath: 'many',
      resp: `Number`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.createMany({
        data: [
          ...body.map((b) => {
            return { ...b };
          }),
        ],
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 201,
          type: 'Number',
        },
      ],
    },
    updateOne: {
      body: 'UPDATE_DTO',
      param: 'CONNECT_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.update({
        where: { ...param },
        data: { ...body },
      });
      return ret;`,
      responses: [
        {
          description: 'UPDATE_DTO',
          status: 202,
          type: 'ENTITY',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    updateMany: {
      param: 'CONNECT_DTO',
      body: 'UPDATE_DTO',
      paramArray: true,
      fixedPath: 'many',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          OR: [
            ...param.map((p) => {
              return { ...p };
            }),
          ],
        },
        data: { ...body },
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    updateAll: {
      paramArray: true,
      body: 'UPDATE_DTO',
      fixedPath: 'all',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        data: { ...body },
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    updateAdminOne: {
      param: 'CONNECT_DTO',
      body: 'UPDATE_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.update({
        where: { ...param },
        data: { ...body },
      });
      return ret;`,
      responses: [
        {
          description: 'UPDATE_DTO',
          status: 202,
          type: 'ENTITY',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    updateAdminMany: {
      param: 'CONNECT_DTO',
      body: 'UPDATE_DTO',
      paramArray: true,
      fixedPath: 'many',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          OR: [
            ...param.map((p) => {
              return { ...p };
            }),
          ],
        },
        data: { ...body },
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    updateAdminAll: {
      body: 'UPDATE_DTO',
      fixedPath: 'all',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        data: { ...body },
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    deleteOne: {
      param: 'CONNECT_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      service: `
            const ret = await this.prismaService.NAME_CAMEL.update({
        where: { ...param },
        data: { deletedAt: new Date() },
      });
      return ret;`,
      responses: [
        {
          description: 'UPDATE_DTO',
          status: 202,
          type: 'ENTITY',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    deleteMany: {
      param: 'CONNECT_DTO',
      paramArray: true,
      fixedPath: 'many',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          OR: [
            ...param.map((p) => {
              return { ...p };
            }),
          ],
        },
        data: { deletedAt: new Date() },
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    deleteAll: {
      fixedPath: 'all',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        data: { deletedAt: new Date() },
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    deleteAdminOne: {
      param: 'CONNECT_DTO',
      fixedPath: 'admin',
      resp: `ENTITY`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.delete({
        where: {
          id: param['id'],
        },
      });
      return ret;`,
      responses: [
        {
          description: 'UPDATE_DTO',
          status: 202,
          type: 'ENTITY',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    deleteAdminMany: {
      param: 'CONNECT_DTO',
      paramArray: true,
      fixedPath: 'adminmany',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.deleteMany({
        where: {
          OR: [
            ...param.map((p) => {
              return { ...p };
            }),
          ],
        },
      });
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
    deleteAdminAll: {
      fixedPath: 'adminall',
      resp: `Number`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.deleteMany();
      return ret.count;`,
      responses: [
        {
          description: 'FIND_DTO',
          status: 202,
          type: 'Number',
        },
        {
          status: 406,
          description: 'Not Acceptable',
        },
        {
          status: 409,
          description: 'Conflict',
        },
      ],
    },
  },
};
