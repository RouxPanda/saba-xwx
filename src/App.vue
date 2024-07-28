<script setup>
import { TresCanvas, useLoop } from '@tresjs/core'
import { ScrollControls, Stars } from '@tresjs/cientos';
import UgglyBunny from './components/UgglyBunny.vue';

</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <!-- <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh> -->
    <Suspense>
      <UgglyBunny />
    </Suspense>
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />
    <ScrollControls />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>