<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core';
import { shallowRef } from 'vue';

const { scene: model } = await useGLTF('../../crazy_frog/scene.gltf')
const boxRef = shallowRef()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta/2
  }
})
</script>

<template>
  <primitive :object="model" :scale="300" ref="boxRef"/>
</template>