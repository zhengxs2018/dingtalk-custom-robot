import { defaultConfig, mergeConfig } from './config.mjs'
import { MessageHandler } from './message_handler.mjs'
import type { Message } from './messages/message.mjs'
import { TextMessage } from './messages/text.mjs'
import type { RobotClientConfig, RobotClientOptions } from './types/client.mjs'

export class RobotClient {
  /**
   * 消息处理器
   */
  private handler: MessageHandler

  /**
   * 配置
   */
  readonly options: RobotClientOptions

  constructor(options: RobotClientConfig) {
    // TODO 类型需要修复
    this.options = mergeConfig(
      RobotClient.config,
      options,
    ) as RobotClientOptions
    this.handler = new MessageHandler(this.options)
  }

  /**
   * 发送一个消息
   *
   * @param text - 消息内容
   * @returns 空
   */
  sendMessage(text: string | Message): Promise<void> {
    const message = typeof text === 'string' ? new TextMessage(text) : text
    return this.handler.postMessage(message)
  }

  /**
   * 全局配置
   */
  static get config() {
    return defaultConfig
  }
}
