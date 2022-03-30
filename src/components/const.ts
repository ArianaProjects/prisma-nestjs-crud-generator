import { fixedConfigInterface, generalConfig } from '../interfaces';

export const UserDecoratorParam: string = '@UserDecorator() user: UserGeneralDto';
export const UserParam: string = 'user';
export const UserParamService: string = 'user: UserGeneralDto';

export const fixedConfig: fixedConfigInterface = {
  functions: {
    exist: {
      query: 'FIND_DTO',
      fixedPath: 'exist',
      resp: `Boolean`,
      info: 'Exist ENTITY with filter as Query',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query, ...this.hasAccessData(user), ...this.isNotDeletedData() }
      });
      return ret.length > 0;`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query, ...this.isNotDeletedData() }
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
    findMany: {
      query: 'FIND_DTO',
      fixedPath: 'many',
      resp: `ENTITY[]`,
      info: 'Find many ENTITY with filter as Query',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query, ...this.hasAccessData(user), ...this.isNotDeletedData() }
      });
      return ret;`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query, ...this.isNotDeletedData() }
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
      fixedPath: '',
      resp: `ENTITY[]`,
      info: 'get All ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: {
          ...this.hasAccessData(user),
          ...this.isNotDeletedData()
        },
      });
      return ret;`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: {
          ...this.isNotDeletedData()
        },}
      );
      return ret;`,
      responses: [
        {
          description: 'CREATE_DTO',
          status: 200,
          type: '[ENTITY]',
        },
      ],
    },
    findUniq: {
      param: 'CONNECT_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      info: 'find unique ENTITY ',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...param, ...this.hasAccessData(user), ...this.isNotDeletedData() }
      });
      return ret[0];`,
      service: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...param , ...this.isNotDeletedData()}
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
    createOne: {
      body: 'CREATE_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      info: 'create ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.create({
        data: { ...body,userId:user.id },
      });
      return ret;`,
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
      info: 'create many ENTITY',
      serviceAccess: `    
      const ret = await this.prismaService.NAME_CAMEL.createMany({
        data: [
          ...body.map((b) => {
            return { ...b, userId:user.id };
          }),
        ],
      });
      return ret.count;`,
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
    updateMany: {
      param: 'CONNECT_DTO',
      body: 'UPDATE_DTO',
      paramArray: true,
      fixedPath: 'many',
      resp: `Number`,
      info: 'update many ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          AND: [
            {  ...this.hasAccessData(user),...this.isNotDeletedData() },
            {
              OR: [
                ...param.map((p) => {
                  return { ...p };
                }),
              ],
            },
          ],
        },
        data: { ...body },
      });
      return ret.count;`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          AND: [
            {  ...this.isNotDeletedData() },
            {
              OR: [
                ...param.map((p) => {
                  return { ...p };
                }),
              ],
            },
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
      fixedPath: '',
      resp: `Number`,
      info: 'update all ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          ...this.hasAccessData(user), ...this.isNotDeletedData() 
        },
        data: { ...body },
      });
      return ret.count;`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        data: { ...body,...this.isNotDeletedData()  },
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

    updateOne: {
      body: 'UPDATE_DTO',
      param: 'CONNECT_DTO',
      fixedPath: '',
      resp: `ENTITY`,
      info: 'update unique ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.update({
        where: { ...param,...this.hasAccessData(user), ...this.isNotDeletedData()  },
        data: { ...body },
      });
      return ret;`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.update({
        where: { ...param,...this.isNotDeletedData()  },
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
    deleteMany: {
      param: 'CONNECT_DTO',
      paramArray: true,
      fixedPath: 'many',
      resp: `Number`,
      info: 'Delete many ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          AND: [
            { ...this.hasAccessData(user),...this.isNotDeletedData() },
            {
              OR: [
                ...param.map((p) => {
                  return { ...p };
                }),
              ],
            },
          ],
        },
        data: { ...this.pseudonymisationData(),deletedAt: new Date() },
      });
      return ret.count;`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {
          AND: [
            { ...this.isNotDeletedData() },
            {
              OR: [
                ...param.map((p) => {
                  return { ...p };
                }),
              ],
            },
          ],
        },
        data: { ...this.pseudonymisationData(),deletedAt: new Date() },
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
      fixedPath: '',
      resp: `Number`,
      info: 'delete all ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: { ...this.hasAccessData(user), ...this.isNotDeletedData() },
        data: { ...this.pseudonymisationData(),deletedAt: new Date() },
      });
      return ret.count;`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: {...this.isNotDeletedData() },
        data: { ...this.pseudonymisationData(),deletedAt: new Date() },
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
      resp: `Number`,
      info: 'delete one ENTITY',
      serviceAccess: `
      if (!this.hasAccess(user, param)) {
        throw new UnauthorizedException();
      }
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: { ...param ,...this.hasAccessData(user), ...this.isNotDeletedData()},
        data: { ...this.pseudonymisationData(),deletedAt: new Date() },
      });
      return ret;`,
      service: `
            const ret = await this.prismaService.NAME_CAMEL.updateMany({
        where: { ...param , ...this.isNotDeletedData()},
        data: { ...this.pseudonymisationData(),deletedAt: new Date() },
      });
      return ret.count;`,
      responses: [
        {
          description: 'UPDATE_DTO',
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
    existAdmin: {
      admin: true,
      query: 'FIND_ADMIN_DTO',
      fixedPath: 'admin/exist',
      resp: `Boolean`,
      info: 'ADMIN - Exist ENTITY with filter as Query',
      serviceAccess: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query },
      });
      return ret.length > 0;`,
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
    findAdminMany: {
      admin: true,
      query: 'FIND_ADMIN_DTO',
      fixedPath: 'admin/many',
      resp: `ENTITY[]`,
      info: 'ADMIN - find many ENTITY',
      serviceAccess: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany({
        where: { ...query },
      });
      return ret;`,
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
    getAllAdmin: {
      admin: true,
      fixedPath: 'admin',
      resp: `ENTITY[]`,
      info: 'ADMIN - get all ',
      serviceAccess: `    
      const ret = await this.prismaService.NAME_CAMEL.findMany();
      return ret;`,
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
    findUniqAdmin: {
      admin: true,
      param: 'CONNECT_ADMIN_DTO',
      fixedPath: 'admin',
      resp: `ENTITY`,
      info: 'ADMIN - get unique ENTITY',
      serviceAccess: `    
      const ret = await this.prismaService.NAME_CAMEL.findUnique({
        where: { ...param },
      });
      return ret;`,
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
    createAdminOne: {
      admin: true,
      body: 'CREATE_ADMIN_DTO',
      fixedPath: 'admin',
      resp: `ENTITY`,
      info: 'ADMIN - create one ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.create({
        data: { ...body },
      });
      return ret;`,
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
    createAdminMany: {
      admin: true,
      body: 'CREATE_ADMIN_DTO',
      bodyArray: true,
      fixedPath: 'admin/many',
      resp: `Number`,
      info: 'ADMIN - create many ENTITY',
      serviceAccess: `    
      const ret = await this.prismaService.NAME_CAMEL.createMany({
        data: [
          ...body.map((b) => {
            return { ...b };
          }),
        ],
      });
      return ret.count;`,
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
    updateAdminMany: {
      admin: true,
      param: 'CONNECT_ADMIN_DTO',
      body: 'UPDATE_ADMIN_DTO',
      paramArray: true,
      fixedPath: 'admin/many',
      resp: `Number`,
      info: 'ADMIN - update Many ENTITY',
      serviceAccess: `
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
      admin: true,
      body: 'UPDATE_ADMIN_DTO',
      fixedPath: 'admin',
      resp: `Number`,
      info: 'ADMIN - update all ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.updateMany({
        data: { ...body },
      });
      return ret.count;`,
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
      admin: true,
      param: 'CONNECT_ADMIN_DTO',
      body: 'UPDATE_ADMIN_DTO',
      fixedPath: 'admin',
      resp: `ENTITY`,
      info: 'ADMIN - update unique ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.update({
        where: { ...param },
        data: { ...body },
      });
      return ret;`,
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
    deleteAdminMany: {
      admin: true,
      param: 'CONNECT_ADMIN_DTO',
      paramArray: true,
      fixedPath: 'admin/many',
      resp: `Number`,
      info: 'ADMIN - delete many ENTITY',
      serviceAccess: `
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
      admin: true,
      fixedPath: 'admin',
      resp: `Number`,
      info: 'ADMIN - delete All ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.deleteMany();
      return ret.count;`,
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

    deleteAdminOne: {
      admin: true,
      param: 'CONNECT_ADMIN_DTO',
      fixedPath: 'admin',
      resp: `ENTITY`,
      info: 'ADMIN - delete unique ENTITY',
      serviceAccess: `
      const ret = await this.prismaService.NAME_CAMEL.delete({
        where: {
                  ...param,
        },
      });
      return ret;`,
      service: `
      const ret = await this.prismaService.NAME_CAMEL.delete({
        where: {
                  ...param,
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
  },
};
