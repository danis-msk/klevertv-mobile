declare const android: any

export const PLATFORM = process.env.REACT_APP_PLATFORM

console.log('-- start App for ' + PLATFORM)

export const getDeviceMAC = () => {
  switch (PLATFORM) {
    case 'android':
      return android.getDeviceMAC()
    case 'browser': // case 'browser' предназначен для разработки
      return ''
  }
}

export const getDeviceId = () => {
  switch (PLATFORM) {
    case 'android':
      return android.getDeviceId()
    case 'browser': // case 'browser' предназначен для разработки
      return ''
  }
}
