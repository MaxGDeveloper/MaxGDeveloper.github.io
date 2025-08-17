<script setup lang="ts">
    import { ref, toRaw } from 'vue'
    import type { MainMenu } from './game/scenes/MainMenuScene'
    import PhaserGame from './game/PhaserGame.vue'

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = ref()

    const changeScene = () => {
        const scene = toRaw(phaserRef.value.scene) as MainMenu

        if (scene) {
            // Вызывает метод changeScene объявленный в каждой конкретной сцене (MainMenu, GameOver)
            scene.changeScene()
        }
    }
</script>

<template>
    <div style="display: flex; flex-direction: column">
        <PhaserGame ref="phaserRef" />
        <button @click="changeScene">Сменить сцену</button>
    </div>
</template>

<style lang="css" scoped>
    button {
        height: 30px;
        background-color: lightgreen;
        margin: 10px;
    }
</style>
