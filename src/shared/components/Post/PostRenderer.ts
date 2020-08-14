import { defineComponent, h } from 'vue';
import { tokensToRenderFunction } from './util';

import DomPurify from 'dompurify';
import marked from 'marked';

const USERNAME_REGEX = /@(\w{1,15})\b/mgi;

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
            const lexed = marked.lexer(props.content, );
    
    
            const tokens = lexed.filter((content, key) => key !== 'links');
            const links = lexed.filter((content, key) => key === 'links');
            const output = tokens.map(token => tokensToRenderFunction(token));

            return h('div', [
                output
            ]);
        };
    }
});