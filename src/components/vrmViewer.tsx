import { buildUrl } from '@/utils/buildUrl'
import { useContext, useCallback } from 'react'

import { ViewerContext } from '../features/vrmViewer/viewerContext'

export default function VrmViewer() {
  const { viewer } = useContext(ViewerContext)

  const canvasRef = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (canvas) {
        viewer.setup(canvas)
        viewer.loadVrm(buildUrl('/model_01.vrm'))

        // Drag and DropでVRMを差し替え
        canvas.addEventListener('dragover', function (event) {
          event.preventDefault()
        })

        canvas.addEventListener('drop', function (event) {
          event.preventDefault()

          const files = event.dataTransfer?.files
          if (!files) {
            return
          }

          const file = files[0]
          if (!file) {
            return
          }

          const file_type = file.name.split('.').pop()
          if (file_type === 'vrm') {
            const blob = new Blob([file], { type: 'application/octet-stream' })
            const url = window.URL.createObjectURL(blob)
            viewer.loadVrm(url)
          }
        })
      }
    },
    [viewer],
  )

  return (
    <div className="absolute left-0 top-0 -z-10 h-[100svh] w-screen">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  )
}
