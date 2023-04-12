import type { RobotMessage, RobotMessageType } from '../types/robot.mjs'

export interface Message {
  readonly type: RobotMessageType

  toString(): string
  toJSON(): RobotMessage
}
