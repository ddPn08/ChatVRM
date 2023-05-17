import { Message } from '@/features/messages/messages'
import { useEffect, useRef } from 'react'
type Props = {
  messages: Message[]
}
export const ChatLog = ({ messages }: Props) => {
  const chatScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'center',
    })
  }, [])

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [messages])
  return (
    <div className="absolute h-[100svh] w-col-span-6 max-w-full pb-64">
      <div className="scroll-hidden max-h-full overflow-y-auto px-16 pb-64 pt-104">
        {messages.map((msg, i) => {
          return (
            <div key={i} ref={messages.length - 1 === i ? chatScrollRef : null}>
              <Chat role={msg.role} message={msg.content} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Chat = ({ role, message }: { role: string; message: string }) => {
  const roleColor = role === 'assistant' ? 'bg-secondary text-white ' : 'bg-base text-primary'
  const roleText = role === 'assistant' ? 'text-secondary' : 'text-primary'
  const offsetX = role === 'user' ? 'pl-40' : 'pr-40'

  return (
    <div className={`mx-auto my-16 max-w-sm ${offsetX}`}>
      <div className={`rounded-t-8 px-24 py-8 font-Montserrat font-bold tracking-wider ${roleColor}`}>
        {role === 'assistant' ? 'CHARACTER' : 'YOU'}
      </div>
      <div className="rounded-b-8 bg-white px-24 py-16">
        <div className={`font-M_PLUS_2 font-bold typography-16 ${roleText}`}>{message}</div>
      </div>
    </div>
  )
}
