import { Message } from '@/features/messages/messages'

export const AssistantText = ({ message }: { message: Message }) => {
  return (
    <div className="absolute bottom-0 left-0 mb-104  w-full">
      <div className="mx-auto w-full max-w-4xl p-16">
        <div className="rounded-8 bg-white">
          <div className="rounded-t-8 bg-secondary px-24 py-8 font-Montserrat font-bold tracking-wider text-white">CHARACTER</div>
          <div className="px-24 py-16">
            <div className="font-M_PLUS_2 font-bold text-secondary typography-16 line-clamp-4">
              {message.content.replace(/\[([a-zA-Z]*?)\]/g, '')}
            </div>
            {message.image && (
              <div className="w-[30%] py-16">
                <img className="rounded-8" src={message.image} alt="ai" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
