import { Configuration, OpenAIApi } from 'openai'

export const generateImage = async (prompt: string, apiKey: string) => {
  if (!apiKey) {
    throw new Error('Invalid API Key')
  }

  const configuration = new Configuration({
    apiKey: apiKey,
  })
  // ブラウザからAPIを叩くときに発生するエラーを無くすworkaround
  // https://github.com/openai/openai-node/issues/6#issuecomment-1492814621
  delete configuration.baseOptions.headers['User-Agent']

  const openai = new OpenAIApi(configuration)

  const { data } = await openai.createImage({
    prompt,
    n: 1,
    size: '512x512',
  })

  const img = data.data[0]

  return img.url
}
