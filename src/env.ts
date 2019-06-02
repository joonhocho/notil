export const env = (key: string): string => {
  if (typeof process.env[key] === 'string') {
    return process.env[key] as string;
  }
  throw new Error(`process.env.${key} is undefined`);
};
