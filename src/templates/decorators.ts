export function ModuleDecoratorGenerator(IMPORTS: string, PROVIDERS: string, CONTROLLERS: string, EXPORTS: string) {
  return `@Module({
        import: [
            ${IMPORTS}
        ],
        providers: [
            ${PROVIDERS}
        ],
        controllers: [
            ${CONTROLLERS}
        ],
        exports: [
            ${EXPORTS}
        ]
      })`;
}
