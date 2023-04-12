export interface Configuration {
  /**
   * 基础路径
   */
  baseURL: string
  /**
   * 请求端点
   */
  endpoint: string
  /**
   * 访问令牌
   */
  accessToken: string
  /**
   * 密钥
   */
  secret?: string
}
