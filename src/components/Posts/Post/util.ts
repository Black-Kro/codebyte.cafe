import { h, render } from 'vue';
import { RouterLink } from 'vue-router';
import AppPostCode from './AppPostCode.vue';

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}

const TAG_MAPPINGS = {

    'paragraph': (token) => {
        const tag = 'p';
        const props = { class: 'app-renderer__p' };
        let content = null;
        let children = token.tokens;

        if (children.length === 1 && children[0].type === 'text') {
            content = children[0].raw;
            children = [];
        }

        return { tag, props, content, children }
    },

    'heading': (token) => {
        const tag = 'span';
        const props = { class: 'app-renderer__p' };
        const content = token.raw;
        const children = [];

        return { tag, props, content, children }
    },

    'space': (token) => {
        const tag = 'br';
        const props = { class: 'app-renderer__br' };
        const content = null;
        const children = [];

        return { tag, props, content, children }
    },

    'link': (token) => {

        if (token.href === 'CODEBYTE_MENTION') {
            const tag = RouterLink;
            const props = {
                to: `/${token.text}`,
                class: 'app-renderer__a',
            };
            const content = token.text;
            const children = [];    

            return {
                render: h(RouterLink, props, () => token.text)
            }
        } else {
            const tag = 'a';
            const props = {
                href: token.href,
                class: 'app-renderer__a',
                target: '_blank',
                rel: 'noreferrer noopener',
            };
            const content = getHostName(token.href) || token.text;
            const children = [];
    
            return { tag, props, content, children, links: [ { href: token.href } ] }
        }

    },

    'text': (token) => {
        const tag = 'span';
        const props = null;
        const content = token.raw;
        const children = [];

        return { tag, props, content, children }
    },

    'html': (token) => {
        const tag = 'span';
        const props = null;
        const content = token.text;
        const children = [];

        return { tag, props, content, children  }
    },

    'list': (token) => {
        const tag = token.ordered ? 'ol' : 'ul';
        const props = {
            class: 'app-renderer__ul'
        };
        const content = null;
        const children = token.items;

        return { tag, props, content, children }
    },

    'list_item': (token) => {
        const tag = 'li';
        const props = {
            class: 'app-renderer__li'
        };
        let content = null;
        let children = token.tokens;

        if (children.length === 1 && children[0].type === 'text') {
            content = children[0].raw;
            children = [];
        }

        return { tag, props, content, children }
    },

    'blockquote': (token) => {
        const tag = 'blockquote';
        const props = {
            class: 'app-renderer__blockquote'
        };
        let content = null;
        let children = token.tokens;

        if (children.length === 1 && children[0].type === 'text') {
            content = children[0].raw;
            children = [];
        }

        return { tag, props, content, children }
    },

    'strong': (token) => {
        const tag = 'strong';
        const props = {
            class: 'app-renderer__strong'
        };
        let content = null;
        let children = token.tokens;

        if (children.length === 1 && children[0].type === 'text') {
            content = children[0].raw;
            children = [];
        }

        return { tag, props, content, children }
    },

    'em': (token) => {
        const tag = 'em';
        const props = {
            class: 'app-renderer__em'
        };
        let content = null;
        let children = token.tokens;

        if (children.length === 1 && children[0].type === 'text') {
            content = children[0].raw;
            children = [];
        }

        return { tag, props, content, children }
    },

    'code': (token) => {
        // console.log(token);
        
        // const tag = 'pre';
        // const props = null;
        // const content = token.text;
        // const children = [];

        return { render: h(PostCode, { code: token.text, lang: token.lang }) };
    },

    'codespan': (token) => {
        const tag = 'code';
        const props = null;
        const content = token.text;
        const children = [];

        return { tag, props, content, children }
    },

}

export const tokensToRenderFunction = (token) => {
    const { tag, props, content, children, render, links } = TAG_MAPPINGS[token.type](token);
    
    let l = links || [];


    if (render)
        return { 
            nodes: render,
            links: [...l],
        };

    const renderChildren = children.map(t => tokensToRenderFunction(t));
    const otherLinks = renderChildren.map(l => l.links).flat();
    
    return { 
        nodes: h(tag, props, [content, ...renderChildren.map(n => n.nodes)]),
        links: [...l, ...otherLinks] 
    };
};