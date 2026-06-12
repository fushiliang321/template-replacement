// Stub type declarations for index.ts runtime imports

declare module './dist/dispatcher/general' {
  const dispatcher: () => Promise<any>;
  export default dispatcher;
}

declare module './dist/dispatcher/sign' {
  const dispatcher: (options: any) => Promise<any>;
  export default dispatcher;
}

declare module './dist/dispatcher/workerGeneral' {
  const dispatcher: (options: any) => Promise<any>;
  export default dispatcher;
}

declare module './dist/dispatcher/workerSign' {
  const dispatcher: (options: any) => Promise<any>;
  export default dispatcher;
}

declare module './dist-legacy/dispatcher/polyfill/general' {
  const dispatcher: () => Promise<any>;
  export default dispatcher;
}

declare module './dist-legacy/dispatcher/polyfill/sign' {
  const dispatcher: (options: any) => Promise<any>;
  export default dispatcher;
}

declare module './dist-legacy/dispatcher/polyfill/workerGeneral' {
  const dispatcher: (options: any) => Promise<any>;
  export default dispatcher;
}

declare module './dist-legacy/dispatcher/polyfill/workerSign' {
  const dispatcher: (options: any) => Promise<any>;
  export default dispatcher;
}

export {};
