<template>
    <kro-surface :padded="false" class="[ the-navigation ] [ relative lg:sticky lg:py-2 ]">
        <router-link class="[ the-navigation__link ] [] []" exact to="/">
            <kro-icon icon="home" />
            <span>Home</span>
        </router-link>
        <router-link class="[ the-navigation__link ] [] []"  to="/explore">
            <kro-icon icon="explore" />
            <span>Explore</span>
        </router-link>
        <router-link class="[ the-navigation__link ] [ hidden lg:flex ] []"  to="/notifications">
            <kro-icon icon="notifications" />
            <span>Notificatons</span>
        </router-link>
        <router-link class="[ the-navigation__link ] [] []"  to="/people">
            <kro-icon icon="account-multiple" />
            <span>People</span>
        </router-link>
        <kro-divider class="[] [ hidden lg:block ] []" />
        <user-me #me="{ me }">
            <router-link class="[ the-navigation__link ] [] []" :to="`/@${me.username}`">
                <kro-icon icon="account" />
                <span>Profile</span>
            </router-link>
        </user-me>
        <router-link class="[ the-navigation__link ] [] []"  to="/settings">
            <kro-icon icon="settings" />
            <span>Settings</span>
        </router-link>
    </kro-surface>
</template>

<script lang="ts" setup>
    export default {
        name: 'TheNavigation',
    }
</script>

<style lang="scss">
    
    .the-navigation {
        @apply grid grid-flow-col h-12;
    }
    
    .the-navigation__link {
        @apply flex px-4 text-current justify-center items-center;

        &.router-link-active {
            color: var(--kro-primary);

            .kro-icon {
                color: var(--kro-primary);
            }
        }
        
        .kro-icon {
            color: var(--kro-foreground-secondary);
        }

        span {
            @apply hidden;
        }
    }

    @screen lg {
        .the-navigation {
            @apply grid grid-flow-row h-auto;

            top: calc(var(--kro-toolbar-height, 4rem) + 1rem);
        }

        .the-navigation__link {
            @apply flex p-4 flex-row items-center justify-start;

            span {
                @apply block ml-4;
            }
        }
    }

</style>