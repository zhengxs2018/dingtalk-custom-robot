import type {
  RobotMessageTypeWithAt,
  RobotMessageWithAt,
} from '../types/robot.mjs'

export abstract class AtMessage<T extends RobotMessageWithAt> {
  abstract readonly type: RobotMessageTypeWithAt

  atUsers = new Set<string>()

  atMobiles = new Set<string>()

  isAtAll = false

  toString(): string {
    return JSON.stringify(this.toJSON())
  }

  abstract toJSON(): T

  protected toObject(): T {
    const message = {
      msgtype: 'text',
    } as T

    if (this.isAtAll) {
      message.isAtAll = true
      return message
    }

    const atMobiles = this.atMobiles
    if (atMobiles.size) {
      message.atMobiles = Array.from(atMobiles)
    }

    const atUsers = this.atUsers
    if (atUsers.size) {
      message.atUserIds = Array.from(atUsers)
    }

    return message
  }
}
