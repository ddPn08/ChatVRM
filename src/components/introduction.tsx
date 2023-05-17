import { useState, useCallback } from 'react'

import { Link } from './link'

type Props = {
  openAiKey: string
  onChangeAiKey: (openAiKey: string) => void
}
export const Introduction = ({ openAiKey, onChangeAiKey }: Props) => {
  const [opened, setOpened] = useState(true)

  const handleAiKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeAiKey(event.target.value)
    },
    [onChangeAiKey],
  )

  return opened ? (
    <div className="absolute z-40 h-full w-full bg-black/30 px-24  py-40 font-M_PLUS_2">
      <div className="m-auto max-h-full max-w-3xl overflow-auto rounded-16 bg-white p-24">
        <div className="my-24">
          <div className="my-8 font-bold text-secondary typography-20 ">このアプリケーションについて</div>
          <div>
            Webブラウザだけで3Dキャラクターとの会話を、マイクやテキスト入力、音声合成を用いて楽しめます。キャラクター（VRM）の変更や性格設定、音声調整もできます。
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold text-secondary typography-20">技術紹介</div>
          <div>
            3Dモデルの表示や操作には
            <Link url="https://github.com/pixiv/three-vrm" label="@pixiv/three-vrm" />
            、 会話文生成には
            <Link url="https://openai.com/blog/introducing-chatgpt-and-whisper-apis" label="ChatGPT API" />
            音声合成には
            <Link url="http://koeiromap.rinna.jp/" label="Koeiro API" />
            を使用しています。 詳細はこちらの
            <Link url="https://inside.pixiv.blog/2023/04/28/160000" label="技術解説記事" />
            をご覧ください。
          </div>
          <div className="my-16">
            このデモはGitHubでソースコードを公開しています。自由に変更や改変をお試しください！
            <br />
            リポジトリ：
            <Link url="https://github.com/pixiv/ChatVRM" label="https://github.com/pixiv/ChatVRM" />
          </div>
        </div>

        <div className="my-24">
          <div className="my-8 font-bold text-secondary typography-20">利用上の注意</div>
          <div>
            差別的または暴力的な発言、特定の人物を貶めるような発言を、意図的に誘導しないでください。また、VRMモデルを使ってキャラクターを差し替える際はモデルの利用条件に従ってください。
          </div>
        </div>
        <div className="my-24">
          <div className="my-8 font-bold text-secondary typography-20">OpenAI APIキー</div>
          <input
            type="text"
            placeholder="sk-..."
            value={openAiKey}
            onChange={handleAiKeyChange}
            className="my-4 h-40 w-full text-ellipsis rounded-4 bg-surface3 px-16 py-8 hover:bg-surface3-hover"
          ></input>
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
        <div className="my-24">
          <button
            onClick={() => {
              setOpened(false)
            }}
            className="rounded-oval bg-secondary px-24 py-8 font-bold text-white hover:bg-secondary-hover active:bg-secondary-press disabled:bg-secondary-disabled"
          >
            APIキーを入力してはじめる
          </button>
        </div>
      </div>
    </div>
  ) : null
}
