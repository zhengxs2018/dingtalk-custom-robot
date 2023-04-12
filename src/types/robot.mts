export type RobotMessageTypeWithAt = 'text' | 'markdown'

export type RobotMessageType =
  | 'link'
  | 'feedCard'
  | 'actionCard'
  | RobotMessageTypeWithAt

export interface RobotMessage {
  msgtype: RobotMessageType
  [key: string]: unknown
}

export interface RobotLinkStyle {
  title: string
  text: string
  picUrl?: string
  messageUrl: string
}

export interface RobotLinkMessage extends RobotMessage {
  msgtype: 'link'
  link: RobotLinkStyle
}

export interface RobotActionCardButtonStyle {
  title: string
  text: string
  btnOrientation?: 0 | 1
}

export interface RobotActionCardButtonStyleWithSingle
  extends RobotActionCardButtonStyle {
  singleTitle: string
  singleURL: string
}

export interface RobotActionCardButtonStyleWithButtons
  extends RobotActionCardButtonStyle {
  singleTitle: string
  singleURL: string
  btns: Array<{ title: string; actionURL: string }>
}

export interface RobotActionCardMessage extends RobotMessage {
  msgtype: 'actionCard'
  actionCard:
    | RobotActionCardButtonStyleWithSingle
    | RobotActionCardButtonStyleWithButtons
}

export interface RobotFeedCardLinkStyle {
  title: string
  messageURL: string
  picURL: string
}

export interface RobotFeedCardMessage extends RobotMessage {
  msgtype: 'feedCard'
  feedCard: {
    links: RobotFeedCardLinkStyle[]
  }
}

export interface RobotMessageWithAt extends RobotMessage {
  msgtype: RobotMessageTypeWithAt
  isAtAll?: boolean
  atMobiles?: string[]
  atUserIds?: string[]
  [key: string]: unknown
}

export interface RobotTextMessage extends RobotMessageWithAt {
  msgtype: 'text'
  text: { content: string }
}

export interface RobotMarkdownStyle {
  text: string
  content: string
}

export interface RobotMarkdownMessage extends RobotMessageWithAt {
  msgtype: 'markdown'
  markdown: RobotMarkdownStyle
}
