import { buildUrl } from '@/utils/buildUrl'

export const GitHubLink = () => {
  return (
    <div className="absolute right-0 z-10 m-24">
      <a draggable={false} href="https://github.com/pixiv/ChatVRM" rel="noopener noreferrer" target="_blank">
        <div className="flex rounded-16 bg-[#1F2328] p-8 hover:bg-[#33383E] active:bg-[565A60]">
          <img alt="https://github.com/pixiv/ChatVRM" height={24} width={24} src={buildUrl('/github-mark-white.svg')}></img>
          <div className="mx-4 font-M_PLUS_2 font-bold text-white">Fork me</div>
        </div>
      </a>
    </div>
  )
}
