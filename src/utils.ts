export const daysSinceEpoch = (): number => Math.floor(Date.now() / 8.64e7);

export const encodeParams = (
  endpoint: string,
  values?: Record<string, string | number | boolean>
): string =>
  values
    ? endpoint.concat(
        '?',
        Object.entries(values)
          .map(([k, v]) => `${k}=${v}`)
          .join('&')
      )
    : endpoint;
