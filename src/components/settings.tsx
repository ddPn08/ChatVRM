import { KoeiroParam, PRESET_A, PRESET_B, PRESET_C, PRESET_D } from '@/features/constants/koeiroParam'
import { Message } from '@/features/messages/messages'
import React from 'react'

import { IconButton } from './iconButton'
import { Link } from './link'
import { TextButton } from './textButton'

type Props = {
  openAiKey: string
  systemPrompt: string
  chatLog: Message[]
  koeiroParam: KoeiroParam
  onClickClose: () => void
  onChangeAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  onChangeChatLog: (index: number, text: string) => void
  onChangeKoeiroParam: (x: number, y: number) => void
  onClickOpenVrmFile: () => void
}
export const Settings = ({
  openAiKey,
  chatLog,
  systemPrompt,
  koeiroParam,
  onClickClose,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeChatLog,
  onChangeKoeiroParam,
  onClickOpenVrmFile,
}: Props) => {
  return (
    <div className="absolute z-40 h-full w-full bg-white/80 backdrop-blur ">
      <div className="absolute m-24">
        <IconButton iconName="24/Close" isProcessing={false} onClick={onClickClose}></IconButton>
      </div>
      <div className="max-h-full overflow-auto">
        <div className="mx-auto max-w-3xl px-24 py-64 text-text1 ">
          <div className="my-24 font-bold typography-32">設定</div>
          <div className="my-24">
            <div className="my-16 font-bold typography-20">OpenAI API キー</div>
            <input
              className="w-col-span-2 text-ellipsis rounded-8 bg-surface1 px-16 py-8 hover:bg-surface1-hover"
              type="text"
              placeholder="sk-..."
              value={openAiKey}
              onChange={onChangeAiKey}
            />
            <div>
              APIキーは
              <Link url="https://platform.openai.com/account/api-keys" label="OpenAIのサイト" />
              で取得できます。取得したAPIキーをフォームに入力してください。
            </div>
            <div className="my-16">
              入力されたAPIキーで、ブラウザから直接OpenAIのAPIを利用しますので、サーバー等には保存されません。 なお、利用しているモデルはGPT-3です。
              <br />
              ※APIキーや会話文はピクシブのサーバーに送信されません。
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 font-bold typography-20">キャラクターモデル</div>
            <div className="my-8">
              <TextButton onClick={onClickOpenVrmFile}>VRMを開く</TextButton>
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 font-bold typography-20">キャラクター設定（システムプロンプト）</div>

            <textarea
              value={systemPrompt}
              onChange={onChangeSystemPrompt}
              className="h-168 w-full  rounded-8 bg-surface1 px-16 py-8 hover:bg-surface1-hover"
            ></textarea>
          </div>
          <div className="my-40">
            <div className="my-16 font-bold typography-20">声の調整</div>
            <div>
              Koeiro APIを使用しています。詳しくは
              <a className="text-primary hover:text-primary-hover" target="_blank" rel="noopener noreferrer" href="http://koeiromap.rinna.jp">
                http://koeiromap.rinna.jp
              </a>
              をご覧ください。
            </div>
            <div className="mt-16">プリセット</div>
            <div className="my-8 grid grid-cols-2 gap-[8px]">
              <TextButton onClick={() => onChangeKoeiroParam(PRESET_A.speakerX, PRESET_A.speakerY)}>かわいい</TextButton>
              <TextButton onClick={() => onChangeKoeiroParam(PRESET_B.speakerX, PRESET_B.speakerY)}>元気</TextButton>
              <TextButton onClick={() => onChangeKoeiroParam(PRESET_C.speakerX, PRESET_C.speakerY)}>かっこいい</TextButton>
              <TextButton onClick={() => onChangeKoeiroParam(PRESET_D.speakerX, PRESET_D.speakerY)}>渋い</TextButton>
            </div>
            <div className="my-24">
              <div className="select-none">x : {koeiroParam.speakerX}</div>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.001}
                value={koeiroParam.speakerX}
                className="input-range mb-16 mt-8"
                onChange={(e) => {
                  onChangeKoeiroParam(Number(e.target.value), koeiroParam.speakerY)
                }}
              ></input>
              <div className="select-none">y : {koeiroParam.speakerY}</div>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.001}
                value={koeiroParam.speakerY}
                className="input-range mb-16 mt-8"
                onChange={(e) => {
                  onChangeKoeiroParam(koeiroParam.speakerX, Number(e.target.value))
                }}
              ></input>
            </div>
          </div>
          {chatLog.length > 0 && (
            <div className="my-40">
              <div className="my-16 font-bold typography-20">会話履歴</div>
              <div className="my-8">
                {chatLog.map((value, index) => {
                  return (
                    <div key={index} className="my-8 grid grid-flow-col  grid-cols-[min-content_1fr] gap-x-fixed">
                      <div className="w-[64px] py-8">{value.role === 'assistant' ? 'Character' : 'You'}</div>
                      <input
                        key={index}
                        className="w-full rounded-8 bg-surface1 px-16 py-8 hover:bg-surface1-hover"
                        type="text"
                        value={value.content}
                        onChange={(event) => {
                          onChangeChatLog(index, event.target.value)
                        }}
                      ></input>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
