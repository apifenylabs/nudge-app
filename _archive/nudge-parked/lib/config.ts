export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')

export function buildAppUrl(path: string = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${APP_URL}${normalizedPath}`
}
