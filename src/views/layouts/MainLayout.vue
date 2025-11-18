<script setup>
import { NSpace, NButton, NSwitch } from 'naive-ui';
import { isDark } from '../../hooks/useDark';
import { lang, toggleLang } from '../../hooks/useLang';
</script>


<template>
    <header>
        <NSpace 
        class="bg-gradient-to-r from-slate-200 to-white dark:from-slate-800 dark:to-slate-700 dark:text-gray-300 text-slate-700 p-4" 
        justify="space-between" 
        align="center">
            <router-link to="/">
                <h1 class="text-lg uppercase font-semibold">Phone Contact</h1>
            </router-link>
            <NSpace class="flex-1" align="center" justify="space-between">
                <router-link to="/add-contact">
                    <NButton type="primary">{{ lang === 'en' ? 'Add Contact' : 'Thêm Liên Hệ' }}</NButton>
                </router-link>
                <NSpace class="border-l-1 pl-2 border-gray-300" align="center">
                    <NButton @click="toggleLang">
                        <template #icon>
                            <img v-if="lang === 'en'" src="/en-flag.svg" alt="">
                            <img v-else src="/vi-flag.svg" alt="">
                        </template>
                        <span>{{ lang === 'en' ? 'En' : 'Vi' }}</span>
                    </NButton>
                    <n-switch v-model:value="isDark">
                        <template #icon>
                            <NIcon v-if="!isDark">
                                <i class="fa-solid fa-sun"></i>
                            </NIcon>
                            <NIcon v-else>
                                <i class="fa-solid fa-moon"></i>
                            </NIcon>
                        </template>
                    </n-switch>
                </NSpace>
            </NSpace>
        </NSpace>
    </header>
    <main>
        <router-view></router-view>
    </main>
    <footer></footer>
</template>

<style scoped>

</style>