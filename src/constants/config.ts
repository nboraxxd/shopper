export const envConfig = {
  serverUrl: import.meta.env.VITE_SERVER_API as string,
  clientUrl: import.meta.env.VITE_CLIENT_URL as string,
} as const
