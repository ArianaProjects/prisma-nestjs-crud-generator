import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper';
import { GENERATOR_NAME, PrismaGenerator } from './generator';
import { log } from './util';
import { JSONSchema7 } from 'json-schema';
import { handleGenerateError } from './error-handler';

generatorHandler({
  onManifest: () => ({
    prettyName: GENERATOR_NAME,
    requiresGenerators: ['prisma-client-js'],
  }),
  onGenerate: async (options: GeneratorOptions) => {
    console.log('Handler Registered.');

    try {
      await PrismaGenerator.getInstance(options).run();
    } catch (e) {
      handleGenerateError(e);
      return;
    }
  },
});

log('Handler Registered.');
