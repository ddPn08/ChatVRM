import { Menu } from '@/components/menu'
import { MessageInputContainer } from '@/components/messageInputContainer'
import { Meta } from '@/components/meta'
import VrmViewer from '@/components/vrmViewer'
import { getChatResponseStream } from '@/features/chat/openAiChat'
import { KoeiroParam, DEFAULT_PARAM } from '@/features/constants/koeiroParam'
import { SYSTEM_PROMPT } from '@/features/constants/systemPromptConstants'
import { generateImage } from '@/features/image/openAiImage'
import { Message, textsToScreenplay, Screenplay } from '@/features/messages/messages'
import { speakCharacter } from '@/features/messages/speakCharacter'
import { ViewerContext } from '@/features/vrmViewer/viewerContext'
import { M_PLUS_2, Montserrat } from 'next/font/google'
import { useCallback, useContext, useState } from 'react'

const m_plus_2 = M_PLUS_2({
  variable: '--font-m-plus-2',
  display: 'swap',
  preload: false,
})

const montserrat = Montserrat({
  variable: '--font-montserrat',
  display: 'swap',
  subsets: ['latin'],
})

export default function Home() {
  const { viewer } = useContext(ViewerContext)

  const [systemPrompt, setSystemPrompt] = useState(SYSTEM_PROMPT)
  const [openAiKey, setOpenAiKey] = useState(process.env.NEXT_PUBLIC_OPENAI_KEY)
  const [koeiroParam, setKoeiroParam] = useState<KoeiroParam>(DEFAULT_PARAM)
  const [chatProcessing, setChatProcessing] = useState(false)
  const [chatLog, setChatLog] = useState<Message[]>([])
  const [assistantMessage, setAssistantMessage] = useState<Message>()

  const handleChangeChatLog = useCallback(
    (targetIndex: number, text: string) => {
      const newChatLog = chatLog.map((v: Message, i) => {
        return i === targetIndex ? { role: v.role, content: text } : v
      })

      setChatLog(newChatLog)
    },
    [chatLog],
  )

  /**
   * 文ごとに音声を直列でリクエストしながら再生する
   */
  const handleSpeakAi = useCallback(
    async (screenplay: Screenplay, onStart?: () => void, onEnd?: () => void) => {
      speakCharacter(screenplay, viewer, onStart, onEnd)
    },
    [viewer],
  )

  /**
   * アシスタントとの会話を行う
   */
  const handleSendChat = useCallback(
    async (text: string) => {
      if (!openAiKey) {
        setAssistantMessage({
          role: 'system',
          content: 'OpenAIのAPIキーが設定されていません',
        })
        return
      }

      const newMessage = text

      if (newMessage == null) return

      setChatProcessing(true)
      // ユーザーの発言を追加して表示
      const messageLog: Message[] = [...chatLog, { role: 'user', content: newMessage }]
      setChatLog(messageLog)

      // Chat GPTへ
      const messages: Message[] = [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messageLog,
      ]

      // messagesから`image`項目を消しておく
      const messagesWithoutImage = messages.map((v) => {
        const { image, ...rest } = v
        return rest
      })

      const stream = await getChatResponseStream(messagesWithoutImage, openAiKey).catch((e) => {
        console.error(e)
        return null
      })
      if (stream == null) {
        setChatProcessing(false)
        return
      }

      const reader = stream.getReader()
      let receivedMessage = ''
      let aiTextLog = ''
      let aiImage = ''
      let tag = ''
      const sentences = new Array<string>()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          receivedMessage += value

          // 返答内容のタグ部分の検出
          const tagMatch = receivedMessage.match(/^\[(.*?)\]/)
          if (tagMatch && tagMatch[0]) {
            tag = tagMatch[0]
            receivedMessage = receivedMessage.slice(tag.length)
          }

          // 返答を一文単位で切り出して処理する
          const sentenceMatch = receivedMessage.match(/^(.+[。．！？\n]|.{10,}[、,])/)
          if (sentenceMatch && sentenceMatch[0]) {
            let sentence = sentenceMatch[0]

            const imageMatches = sentence.match(/{image:"([^"]+)"}/)
            sentence = sentence.replace(/{image:"([^"]+)"}/, '')
            sentences.push(sentence)

            receivedMessage = receivedMessage.slice(sentence.length).trimStart()

            // 発話不要/不可能な文字列だった場合はスキップ
            if (!sentence.replace(/^[\s\[\(\{「［（【『〈《〔｛«‹〘〚〛〙›»〕》〉』】）］」\}\)\]]+$/g, '')) {
              continue
            }

            if (imageMatches && imageMatches[1]) {
              aiImage = (await generateImage(imageMatches[1], openAiKey)) ?? ''
            }
            const aiText = `${tag} ${sentence}`

            const aiTalks = textsToScreenplay([aiText], koeiroParam)
            aiTextLog += aiText

            // 文ごとに音声を生成 & 再生、返答を表示
            const currentAssistantMessage = sentences.join(' ')
            handleSpeakAi(aiTalks[0], () => {
              setAssistantMessage({
                role: 'assistant',
                content: currentAssistantMessage,
                image: aiImage,
              })
            })
          }
        }
      } catch (e) {
        setChatProcessing(false)
        console.error(e)
      } finally {
        reader.releaseLock()
      }

      // アシスタントの返答をログに追加
      const messageLogAssistant: Message[] = [...messageLog, { role: 'assistant', content: aiTextLog, image: aiImage }]

      setChatLog(messageLogAssistant)
      setChatProcessing(false)
    },
    [systemPrompt, chatLog, handleSpeakAi, openAiKey, koeiroParam],
  )

  return (
    <div className={`${m_plus_2.variable} ${montserrat.variable}`}>
      <Meta />
      {/* <Introduction openAiKey={openAiKey} onChangeAiKey={setOpenAiKey} /> */}
      <VrmViewer />
      <MessageInputContainer isChatProcessing={chatProcessing} onChatProcessStart={handleSendChat} />
      <Menu
        openAiKey={openAiKey}
        systemPrompt={systemPrompt}
        chatLog={chatLog}
        koeiroParam={koeiroParam}
        assistantMessage={assistantMessage}
        onChangeAiKey={setOpenAiKey}
        onChangeSystemPrompt={setSystemPrompt}
        onChangeChatLog={handleChangeChatLog}
        onChangeKoeiromapParam={setKoeiroParam}
      />
    </div>
  )
}
