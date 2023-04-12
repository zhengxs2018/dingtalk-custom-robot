import type { Configuration } from './config.mjs'

export interface RobotClientConfig extends Partial<Configuration> {
  /**
   * 访问令牌
   */
  accessToken: string
}

export type RobotClientOptions = Required<RobotClientConfig>
