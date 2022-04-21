import { defineStore } from 'pinia'
import { getPersonalized, getSongList, getSongInfo } from '~/axios'
import { PersonalizedInfo, PlayList, Songs, SongInfo } from './type'

export const useStore = defineStore({
  id: 'musicStore',
  state: () => ({
    personalized: <PersonalizedInfo[]>[],
    playList: <PlayList>{},
    songs: <Songs[]>[],
    isPlay: <boolean>false,
    index: <number>0,
    show: <boolean[]>[]
  }),
  actions: {
    async setPersonalized() {
      let result = await getPersonalized()
      if (result.status === 200) {
        this.personalized = result.data.result
      }
    },
    async setSongList(listId: number) {
      let result = await getSongList(listId)
      this.playList = result.data.playlist
      result = await getSongInfo(this.trackIds.toString())
      this.songs = result.data.songs
    },
  },
  getters: {
    trackIds(state): number[] {
      let ids: number[] = []
      if (state.playList.trackIds) {
        state.playList.trackIds.forEach(item => {
          ids.push(item.id)
        })
      }
      return ids
    },
    songInfo(state) {
      let songInfo: SongInfo[] = []
      if (state.songs) {
        state.songs.forEach(item => {
          songInfo.push({
            id: item.id,
            name: item.name,
            url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
            album: item.al.name,
            singer: item.ar[0].name,
            imgUrl: item.al.picUrl
          })
        })
      }
      return songInfo
    }
  }
})
