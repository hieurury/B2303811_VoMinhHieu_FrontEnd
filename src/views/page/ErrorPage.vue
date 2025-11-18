<script setup>
import { 
    NResult,
    NButton,
    NSpace,
    NIcon
}                           from    'naive-ui';
import { 
    useRouter 
}                           from    'vue-router';
import { 
    lang 
}                           from    '../../hooks/useLang';

const router                =       useRouter();

const goHome                =       () => {
    router.push('/');
};

const goBack                =       () => {
    router.go(-1);
};
</script>


<template>
    <div class="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-50 p-6">
        <div class="max-w-2xl w-full">
            <n-result
                status="404"
                :title="lang === 'en' ? '404 Not Found' : '404 Không Tìm Thấy'"
                :description="lang === 'en' ? 'The page you are looking for does not exist or has been moved.' : 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.'"
            >
                <template #icon>
                    <div class="text-8xl">
                        <NIcon>
                            <i class="fa-solid fa-triangle-exclamation text-orange-500"></i>
                        </NIcon>
                    </div>
                </template>
                <template #footer>
                    <NSpace justify="center" class="mt-6">
                        <NButton @click="goBack" type="default" size="large">
                            <template #icon>
                                <NIcon>
                                    <i class="fa-solid fa-arrow-left"></i>
                                </NIcon>
                            </template>
                            <span>{{ lang === 'en' ? 'Go Back' : 'Quay Lại' }}</span>
                        </NButton>
                        <NButton @click="goHome" type="primary" size="large">
                            <template #icon>
                                <NIcon>
                                    <i class="fa-solid fa-house"></i>
                                </NIcon>
                            </template>
                            <span>{{ lang === 'en' ? 'Go Home' : 'Về Trang Chủ' }}</span>
                        </NButton>
                    </NSpace>
                </template>
            </n-result>
        </div>
    </div>
</template>


<style scoped>

</style>