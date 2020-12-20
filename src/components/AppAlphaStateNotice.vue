<template>
  <kro-surface>
    <span class="font-bold text-sm text-center text-foregroundSecondary block">{{ $t('common.Notice') }}</span>
    <p class="text-xs text-center text-foregroundSecondary font-medium">
      {{ $t('statements.AlphaNotice') }}
    </p>
  </kro-surface>
</template>

<script lang="ts" setup>
export default {
  name: 'AppAlphaStateNotice',
}
</script>
