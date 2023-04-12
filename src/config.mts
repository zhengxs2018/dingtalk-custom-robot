import type { Configuration } from './types/config.mjs'

export const defaultConfig: Configuration = {
  baseURL: 'https://oapi.dingtalk.com',
  endpoint: '/robot/send',
  accessToken: '',
}

export function mergeConfig(source: Partial<Configuration>): Configuration
export function mergeConfig(
  target: Configuration,
  source?: Partial<Configuration>,
): Configuration
export function mergeConfig(
  target: Configuration | Partial<Configuration>,
  source?: Partial<Configuration>,
) {
  if (source == null) {
    return { ...defaultConfig, ...target }
  }

  return { ...target, ...source }
}
