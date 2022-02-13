declare const android: any

export const PLATFORM = process.env.REACT_APP_PLATFORM

console.log('-- start App for ' + PLATFORM)

export const getDeviceMAC = () => {
  switch (PLATFORM) {
    case 'android':
      return android.getDeviceMAC()
    case 'browser': // case 'browser' предназначен для разработки
      return ['cc:2d:8c:8b:60:76', '5c:c1:d7:73:d3:1d', '00:00:00:00:00:00'][1]
  }
}

export const getDeviceId = () => {
  switch (PLATFORM) {
    case 'android':
      return android.getDeviceId()
    case 'browser': // case 'browser' предназначен для разработки
      return ['53454455534535353'][0]
  }
}