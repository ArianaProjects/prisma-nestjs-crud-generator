export function tryCatchGenerator(body: string, type: string, errorBody: string) {
  return `
  try {
    ${body}
  } catch (e:${type}) {
    ${errorBody}
  }
  `;
}
