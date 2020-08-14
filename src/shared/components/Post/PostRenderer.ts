import { defineComponent, h } from 'vue';
import { tokensToRenderFunction } from './util';
import YoutubePlayer from './YoutubePlayer.vue';

import marked from 'marked';

const USERNAME_REGEX = /@(\w{1,15})\b/mgi;

const selectLinkByPriority = (links) => {

    const PriorityList = ['YOUTUBE', 'SPOTIFY'];
    const Priorities = {
        'YOUTUBE': (url: string) => {
            const r = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

            if (url.match(r))
                return true;

            return false;
        },
        'SPOTIFY': (url: string) => {
            if (url.indexOf('open.spotify.com') > -1)
                return true;

            return false;
        },
    };

    for (const item of PriorityList) {
        for (const url of links) {
            if (Priorities[item](url.href)) {
                return { ...url, type: item };
            }
        }
    }

    return { ...links[0], type: 'NORMAL' };
}

export default defineComponent({
    name: 'AppPostRenderer',
    props: {
        content: String,
    },
    setup(props, { slots }) {        
        const options = {
            "baseUrl": null,
            "breaks": false,
            "gfm": true,
            "headerIds": true,
            "headerPrefix": "",
            "highlight": null,
            "langPrefix": "language-",
            "mangle": true,
            "pedantic": false,
            "sanitize": false,
            "sanitizer": null,
            "silent": false,
            "smartLists": false,
            "smartypants": false,
            "tokenizer": null,
            "walkTokens": null,
            "xhtml": false
        }
        
        return () => {
            const lexed = marked.lexer(props.content, options);
            const tokens = lexed.filter((content, key) => key !== 'links');
            const output = tokens.map(token => tokensToRenderFunction(token));

            const nodes = output.map(n => n.nodes);
            const links = output.map(l => l.links).flat();

            let mediaNode = null;

            if (links.length > 0) {
                const link = selectLinkByPriority(links);

                const renderTypes = {
                    YOUTUBE: (link) => {
                        return h(YoutubePlayer, { url: link.href });
                    },

                    SPOTIFY: (link) => {
                        return h('span', 'SPOTIFY PLAYER')
                    },
                    
                    NORMAL: (link) => {
                        return null;
                    },
                };

                mediaNode = renderTypes[link.type](link);
            }


            return h('div', [
                h('div', { class: 'app-post-renderer__content px-4 py-2' }, nodes),
                mediaNode
            ]);
        };
    }
});