<template>
    <div class="[ app-code-block relative rounded-md ]">
        <div class="text-sm font-bold text-secondary absolute right-0 top-0 py-2 px-4 select-none">{{lang}}</div>
        <pre><code v-html="output"></code></pre>
    </div>
</template>

<script lang="ts" setup="props">
    import { ref } from 'vue';
    import Prisim from 'prismjs';
    import * as P from 'prismjs/components/prism-markdown';

    export const output = ref('');

    const getLanguage = (lang) => {
        const map = {
            'js': 'javascript',
            'javascript': 'javascript',
            'ts': 'javascript',
            'typescript': 'javascript',
            'css': 'css',
            'html': 'html',
            'cs': 'clike',
            'svg': 'svg',
        }

        if (map.hasOwnProperty(lang))
            return Prisim.languages[map[lang]];
        
        return null;
    }

    if (getLanguage(props.lang)) {
        output.value = Prisim.highlight(props.code, getLanguage(props.lang));
    } else {
        output.value = props.code;
    }

    export default {
        name: 'PostCodeRenderer',
    }

    declare const props: {
        code: string;
        lang: string;
    }
</script>

<style lang="scss">
    
    .app-code-block {
        background: rgba(0, 0, 0, .12);
        display: block;
        border: 1px solid var(--kro-divider);

        pre {
            overflow: auto;
            overflow-wrap: normal;
            padding: 1rem;
        }
    }

</style>