import { PLATFORM } from './device'

declare const android: any

export const play = (mrl: string) => {
  switch (PLATFORM) {
    case 'android':
      return android.play(mrl)
    case 'browser': // case 'browser' предназначен для разработки
      return () => {} // плеер не поддерживает данный формат
  }
}

export const stop = () => {
  switch (PLATFORM) {
    case 'android':
      return android.stop()
    case 'browser': // case 'browser' предназначен для разработки
      return () => {}
  }
}