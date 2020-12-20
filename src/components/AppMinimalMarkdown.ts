import { defineComponent, h } from 'vue'
import { tokensToRenderFunction } from '/~/util/minimalMarkdownRenderer'

import marked from 'marked'

export default defineComponent({
  name: 'AppMinimalMarkdown',
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

      return h('div', [
        h('div', {}, nodes),
      ])
    }
  },
})
