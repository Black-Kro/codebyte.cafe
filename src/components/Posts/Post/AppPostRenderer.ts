import { defineComponent, h } from 'vue'
import marked from 'marked'
import { tokensToRenderFunction } from './util'

import YoutubePlayer from '/~/components/AppYoutubePlayer.vue'
import TwitchPlayer from '/~/components/AppTwitchPlayer.vue'
import CodepenEmbed from '/~/components/AppCodepenEmbed.vue'
import SpotifyPlayer from '/~/components/AppSpotifyPlayer.vue'

const selectLinkByPriority = (links) => {
  const PriorityList = ['YOUTUBE', 'SPOTIFY', 'TWITCH', 'CODEPEN']
  const Priorities = {
    YOUTUBE: (url: string) => {
      const r = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\-_]+)/

      if (url.match(r))
        return true

      return false
    },
    SPOTIFY: (url: string) => {
      const r = /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/

      if (url.match(r))
        return true

      return false
    },
    TWITCH: (url: string) => {
      if (url.includes('twitch.tv'))
        return true

      return false
    },
    CODEPEN: (url: string) => {
      if (url.includes('codepen.io') && url.includes('/pen/'))
        return true

      return false
    },
  }

  for (const item of PriorityList) {
    for (const url of links) {
      if (Priorities[item](url.href))
        return { ...url, type: item }
    }
  }

  return { ...links[0], type: 'NORMAL' }
}

export default defineComponent({
  name: 'AppPostRenderer',
  props: {
    content: String,
  },
  setup(props) {
    const options = {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      highlight: null,
      langPrefix: 'language-',
      mangle: true,
      pedantic: false,
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tokenizer: null,
      walkTokens: null,
      xhtml: false,
    }

    return () => {
      const lexed = marked.lexer(props.content, options)
      const tokens = lexed.filter((_, key) => key !== 'links')
      const output = tokens.map(token => tokensToRenderFunction(token))

      const nodes = output.map(n => n.nodes)
      const links = output.map(l => l.links).flat()

      let mediaNode = null

      if (links.length > 0) {
        const link = selectLinkByPriority(links)
        const renderTypes = {
          YOUTUBE: (link) => {
            return h(YoutubePlayer, { url: link.href })
          },

          SPOTIFY: (link) => {
            return h(SpotifyPlayer, { url: link.href })
          },

          TWITCH: (link) => {
            return h(TwitchPlayer, { url: link.href })
          },

          CODEPEN: (link) => {
            return h(CodepenEmbed, { url: link.href })
          },

          NORMAL: (_) => {
            return null
          },
        }

        mediaNode = renderTypes[link.type](link)
      }

      return h('div', [
        h('div', { class: 'app-post-renderer__content' }, nodes),
        h('div', [mediaNode]),
        // mediaNode
      ])
    }
  },
})
