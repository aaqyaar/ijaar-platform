export const getEnv = (key: string): string => {
  const value = process.env[key] || '';
  if (!value) {
    throw new Error(`Env variable ${key} not found`);
  }
  return value;
};
