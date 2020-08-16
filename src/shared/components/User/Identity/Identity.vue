<template>
    <div class="[ app-identity ] [ p-4 ] [ flex flex-row ]">
        <component 
            class="[] [ flex flex-row flex-1 ]"
            :is="to ? 'router-link' : 'div'"
            :to="to">
            <user-avatar v-if="avatar" :user="user" />
            <div class="[] [ ml-2 ] [ grid grid-flow-row ]">
                <span class="[] [] [ grid grid-flow-col gap-2 ]">
                    <user-nickname :user="user" />
                    <slot name="title" />
                </span>
                <span class="[] [ -mt-1 ] [ grid grid-flow-col gap-2 text-secondary text-xs font-medium ]">
                    @{{user.username}}
                    <slot name="subtitle" />
                </span>
            </div>
        </component>
        <div v-if="$slots.default" class="pl-4">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
    export default {
        name: 'AppIdentity',
        props: {
            user: Object,
            to: String,
            avatar: {
                type: Boolean,
                default: true,
            }
        },
    }
</script>

<style lang="scss">
    
</style>