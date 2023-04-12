import { createHmac } from 'node:crypto'

import type { Message } from './messages/message.mjs'
import type { Configuration } from './types/config.mjs'

type RobotResponse = {
  /**
   * 错误码
   */
  errcode: number
  /**
   * 错误信息
   */
  errmsg: string
}

export class MessageHandler {
  constructor(private config: Configuration) {}

  async postMessage(message: Message): Promise<void> {
    const response = await fetch(this.makeURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: message.toString(),
    })

    const result: RobotResponse = await response.json()

    if (result?.errcode === 0) return

    const reason = result?.errmsg || '未知异常'
    return Promise.reject(new Error(reason))
  }

  private makeURL(): string {
    const { baseURL, endpoint, accessToken, secret } = this.config
    const url = new URL(endpoint, baseURL)
    const searchParams = url.searchParams

    if (accessToken) {
      searchParams.set('access_token', accessToken)
    }

    if (secret) {
      const timeStamp = Date.now()
      const hash = createHmac('sha256', secret)
        .update(`${timeStamp}\n${secret}`)
        .digest('base64')

      searchParams.set('sign', hash)
      searchParams.set('timestamp', timeStamp.toString())
    }

    return url.toString()
  }
}
