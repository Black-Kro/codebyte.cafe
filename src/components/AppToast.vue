<template>
    <div class="[ app-toast ] rounded-md bg-secondary flex flex-row items-center mt-4">
        <div class="p-4">
            <kro-icon :icon="icon" />
        </div>
        <div class="flex flex-1 flex-col py-2">
            <span>{{title}}</span>
            <span class="text-secondary font-medium text-sm">{{message}}</span>
        </div>
        <div class="pl-4 pr-2">
            <kro-button @click="destroy" class="text-secondary" icon="close" />
        </div>
    </div>
</template>

<script lang="ts" setup="props">
    export default {
        name: 'AppToast',
    }

    declare const props: {
        title: string;
        message: string;
        icon: string;
        duration?: number;
        destroy: any;
    }
</script>

<style lang="scss">
    
    .app-toast {
        border: 1px solid var(--kro-divider);
    }

</style>