export function env(key: string): string {
  const val = process.env[key];
  if (typeof val === 'string') {
    return val;
  }
  throw new Error(`process.env.${key} is undefined`);
}

export function envs(...keys: string[]): string[] {
  const { env: penv } = process;
  const values: string[] = [];
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    const val = penv[key];
    if (typeof val === 'string') {
      values.push(val);
    } else {
      throw new Error(`process.env.${key} is undefined`);
    }
  }
  return values;
}

export function envMap<T extends { [key: string]: string }>(
  keyMapping: T
): { [key in T[keyof T]]: string } {
  const { env: penv } = process;
  const keys = Object.keys(keyMapping) as Array<keyof T>;
  const values = {} as { [key in T[keyof T]]: string };
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    const val = penv[key as string];
    if (typeof val === 'string') {
      values[keyMapping[key]] = val;
    } else {
      throw new Error(`process.env.${key} is undefined`);
    }
  }
  return values;
}
