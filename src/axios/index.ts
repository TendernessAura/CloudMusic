import axios from "axios"

const musicApi = axios.create({
  baseURL: 'https://netease-cloud-music-api-cyan-zeta.vercel.app/',
  method: 'get'
})

export const getPersonalized = () => musicApi('/personalized')

export const getSongList = (id: number) => musicApi(
  {
    url: '/playlist/detail',
    params: { id }
  }
)

export const getSongInfo = (ids: string) => musicApi(
  {
    url: '/song/detail',
    params: { ids }
  }
)