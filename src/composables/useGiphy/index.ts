import * as Giphy from '@giphy/js-fetch-api'
import type { GiphyFetch } from '@giphy/js-fetch-api'

export const useGiphy = () => {
  // @ts-ignore
  const giphy = new Giphy.default.GiphyFetch('YPYiDNvPx5F7QpxUnzbVRVPqitbcnBVW') as GiphyFetch

  return {
    giphy,
  }
}
