import { GeneratorOptions } from '@prisma/generator-helper';
import { parseEnvValue } from '@prisma/sdk';
import * as path from 'path';
import { GeneratorPathNotExists } from './error-handler';
import * as prettier from 'prettier';
import { JSONSchema7 } from 'json-schema';
import Model from './components/Model';
import { OptionInterface } from './interfaces';
import { importGenerator, moduleGenerator } from './templates';
import { prettierFormatFormat, writeTSFile } from './util';

export const GENERATOR_NAME = 'Prisma Code Generator';
export interface PrismaCodeGeneratorConfig {}

export class PrismaGenerator {
  static instance: PrismaGenerator;
  _options: GeneratorOptions;
  rootPath: string;
  clientPath: string;

  constructor(options?: GeneratorOptions) {
    if (options) {
      this.options = options;
    }
    const output = parseEnvValue(options.generator.output!);
  }

  public get options() {
    return this._options;
  }

  public set options(value) {
    this._options = value;
  }

  static getInstance(options?: GeneratorOptions) {
    if (PrismaGenerator.instance) {
      return PrismaGenerator.instance;
    }
    PrismaGenerator.instance = new PrismaGenerator(options);
    return PrismaGenerator.instance;
  }

  getClientImportPath() {
    if (!this.rootPath || !this.clientPath) {
      throw new GeneratorPathNotExists();
    }
    return path.relative(this.rootPath, this.clientPath).replace('node_modules/', '');
  }

  setPrismaClientPath(): void {
    const { otherGenerators, schemaPath } = this.options;

    this.rootPath = schemaPath.replace('/prisma/schema.prisma', '');
    const defaultPath = path.resolve(this.rootPath, 'node_modules/@prisma/client');
    const clientGenerator = otherGenerators.find((g) => g.provider.value === 'prisma-client-js');

    this.clientPath = clientGenerator?.output.value ?? defaultPath;
  }

  run = async (): Promise<void> => {
    let o: OptionInterface = {
      fullPath: this.options.generator.output.value || './gen',
    };

    let impFile: string[] = ["import {  Module } from '@nestjs/common';"];
    let impModule: string[] = [];

    this.options.dmmf.datamodel.models.map((m) => {
      const M = new Model(m, o);
      M.postGenerate();
      impFile.push(importGenerator('{' + M.namePascal + 'Module}', '"./' + M.nameCamel + '/' + M.nameCamel + '.module"'));
      impModule.push(M.namePascal + 'Module');
    });
    writeTSFile(
      o.fullPath + `/GeneralModel.module.ts`,
      `
      ${impFile.join('\n')}
      ${moduleGenerator('GeneralModelModule', '', '', impModule.join(','), '')}
      `,
      false,
    );
    return;
  };
}
