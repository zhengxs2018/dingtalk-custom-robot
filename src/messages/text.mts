import type { RobotTextMessage } from '../types/robot.mjs'
import { AtMessage } from './at.mjs'
import type { Message } from './message.mjs'

export class TextMessage
  extends AtMessage<RobotTextMessage>
  implements Message
{
  constructor(public content: string) {
    super()
  }

  get type() {
    return 'text' as const
  }

  toJSON(): RobotTextMessage {
    const message = this.toObject()
    message['text'] = { content: this.content }
    return message
  }
}
