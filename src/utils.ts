export const daysSinceEpoch = () => Math.floor(Date.now() / 8.64e7);

export const encodeParams = (
  endpoint: string,
  values?: Record<string, string | number | boolean>
) => (values ? endpoint.concat('?', values) : endpoint);
