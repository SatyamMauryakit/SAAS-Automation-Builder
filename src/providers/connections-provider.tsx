'use client'

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'

// Node types
type DiscordNode = {
  webhookURL: string
  content: string
  webhookName: string
  guildName: string
}

type GoogleNode = Record<string, any>[] // adjust type as needed

type NotionNode = {
  accessToken: string
  databaseId: string
  workspaceName: string
  content: string
}

type SlackNode = {
  appId: string
  authedUserId: string
  authedUserToken: string
  slackAccessToken: string
  botUserId: string
  teamId: string
  teamName: string
  content: string
}

type WorkflowTemplate = {
  discord?: string
  notion?: string
  slack?: string
}

// Context type
export type ConnectionProviderProps = {
  discordNode: DiscordNode
  setDiscordNode: Dispatch<SetStateAction<DiscordNode>>
  googleNode: GoogleNode
  setGoogleNode: Dispatch<SetStateAction<GoogleNode>>
  notionNode: NotionNode
  setNotionNode: Dispatch<SetStateAction<NotionNode>>
  slackNode: SlackNode
  setSlackNode: Dispatch<SetStateAction<SlackNode>>
  workflowTemplate: WorkflowTemplate
  setWorkFlowTemplate: Dispatch<SetStateAction<WorkflowTemplate>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

// Props for provider component
type ConnectionWithChildProps = {
  children: ReactNode
}

// Initial values
const InitialValues: ConnectionProviderProps = {
  discordNode: { webhookURL: '', content: '', webhookName: '', guildName: '' },
  setDiscordNode: () => {},
  googleNode: [],
  setGoogleNode: () => {},
  notionNode: { accessToken: '', databaseId: '', workspaceName: '', content: '' },
  setNotionNode: () => {},
  slackNode: {
    appId: '',
    authedUserId: '',
    authedUserToken: '',
    slackAccessToken: '',
    botUserId: '',
    teamId: '',
    teamName: '',
    content: '',
  },
  setSlackNode: () => {},
  workflowTemplate: { discord: '', notion: '', slack: '' },
  setWorkFlowTemplate: () => {},
  isLoading: false,
  setIsLoading: () => {},
}

// Create context
const ConnectionsContext = createContext<ConnectionProviderProps>(InitialValues)
const { Provider } = ConnectionsContext

// Provider component
export const ConnectionsProvider = ({ children }: ConnectionWithChildProps) => {
  const [discordNode, setDiscordNode] = useState<DiscordNode>(InitialValues.discordNode)
  const [googleNode, setGoogleNode] = useState<GoogleNode>(InitialValues.googleNode)
  const [notionNode, setNotionNode] = useState<NotionNode>(InitialValues.notionNode)
  const [slackNode, setSlackNode] = useState<SlackNode>(InitialValues.slackNode)
  const [workflowTemplate, setWorkFlowTemplate] = useState<WorkflowTemplate>(
    InitialValues.workflowTemplate
  )
  const [isLoading, setIsLoading] = useState<boolean>(InitialValues.isLoading)

  const values: ConnectionProviderProps = {
    discordNode,
    setDiscordNode,
    googleNode,
    setGoogleNode,
    notionNode,
    setNotionNode,
    slackNode,
    setSlackNode,
    workflowTemplate,
    setWorkFlowTemplate,
    isLoading,
    setIsLoading,
  }

  return <Provider value={values}>{children}</Provider>
}

// Custom hook
export const useNodeConnections = () => useContext(ConnectionsContext)
