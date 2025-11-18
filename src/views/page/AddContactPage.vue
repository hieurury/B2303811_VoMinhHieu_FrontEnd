<script setup>
import { 
    NInput,
    NButton,
    NSpace,
    NIcon,
    NRadioGroup,
    NRadioButton,
    useMessage
}                           from    'naive-ui';
import { 
    ref 
}                           from    'vue';
import { 
    useRouter 
}                           from    'vue-router';
import { 
    lang 
}                           from    '../../hooks/useLang';
import * as contactAPI      from    '../../services/apiContact';

const router                =       useRouter();

const name                  =       ref('');
const phone                 =       ref('');
const address               =       ref('');
const email                 =       ref('');
const favorite              =       ref(false);
//messgae log
const message               =       useMessage();

const checkForm             =       () => {
    console.log({
        name: name.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
        favorite: favorite.value
    });
    //check empty name
    if(name.value === '') {
        message.error('Name is required');
        return false;
    }
    //check empty phone
    if(phone.value === '') {
        message.error('Phone number is required');
        return;
    }
    //regex phone
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if(!phoneRegex.test(phone.value)) {
        message.error('Phone number is invalid');
        return false;
    }
    //email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.value !== '' && !emailRegex.test(email.value)) {
        message.error('Email is invalid');
        return false;
    }

    return true;
}

async function handleAddContact() {
    if(!checkForm()) return false;
    //add contact api
    try {
        const response      =       await contactAPI.addContact({
            name: name.value,
            phone: phone.value,
            address: address.value,
            email: email.value,
            favorite: favorite.value
        });
        message[response.status](response.message);
        if(response.status === 'success') {
            //redirect to home page
            router.push('/');
        }
    } catch (error) {
        message.error('Error adding contact');
    }
}


</script>


<template>
    <div class="lg:px-[30%] dark:bg-slate-800 lg:py-8 p-6 min-h-screen">
        <h1 class="text-2xl font-bold bg-orange-500 text-slate-100 p-4 rounded-t-lg uppercase tracking-wider">
            {{ lang === 'en' ? 'Add New Contact' : 'Thêm Liên Hệ Mới' }}
        </h1>
        <form id="form-contact" class="bg-white dark:bg-slate-700 p-6 rounded-b-lg shadow-md">
            <NSpace vertical class="my-4">
                <label for="name">
                    <span>{{ lang === 'en' ? 'Name' : 'Tên' }}</span>
                    <span class="text-red-500">*</span>
                </label>
                <NInput v-model:value="name" type="text" id="name" name="name" required >
                    <template #prefix>
                        <NIcon>
                            <i class="fa-solid fa-user"></i>
                        </NIcon>
                    </template>
                </NInput>
            </NSpace>
            <NSpace vertical class="my-4">
                <label for="phone">
                    <span>{{ lang === 'en' ? 'Phone Number' : 'Số Điện Thoại' }}</span>
                    <span class="text-red-500">*</span>
                </label>
                <NInput v-model:value="phone" type="text" id="phone" name="phone" required >
                    <template #prefix>
                        <NIcon>
                            <i class="fa-solid fa-phone"></i>
                        </NIcon>
                    </template>
                </NInput>
            </NSpace>
            <NSpace vertical class="my-4">
                <label for="address">{{ lang === 'en' ? 'Address' : 'Địa Chỉ' }}:</label>
                <NInput v-model:value="address" type="text" id="address" name="address" required >
                    <template #prefix>
                        <NIcon>
                            <i class="fa-solid fa-address-card"></i>
                        </NIcon>
                    </template>
                </NInput>
            </NSpace>
            <NSpace vertical class="my-4">
                <label for="email">{{ lang === 'en' ? 'Email' : 'Email' }}:</label>
                <NInput v-model:value="email" type="email" id="email" name="email" required >
                    <template #prefix>
                        <NIcon>
                            <i class="fa-solid fa-envelope"></i>
                        </NIcon>
                    </template>
                </NInput>
            </NSpace>
            <NSpace vertical class="my-4">
                <label>{{ lang === 'en' ? 'Type:' : 'Loại:' }}</label>
                <NRadioGroup v-model:value="favorite" name="favorite" id="favorite">
                    <NRadioButton :checked="true" :value="false">{{ lang === 'en' ? 'Normal' : 'Bình Thường' }}</NRadioButton>
                    <NRadioButton :value="true">{{ lang === 'en' ? 'Favorite' : 'Yêu Thích' }}</NRadioButton>
                </NRadioGroup>
            </NSpace>
            <NSpace class="border-t pt-4 mt-4 justify-end border-gray-200">
                <NButton @click="handleAddContact" type="primary">
                    <template #icon>
                        <NIcon>
                            <i class="fa-solid fa-plus"></i>
                        </NIcon>
                    </template>
                    <span>{{ lang === 'en' ? 'Add Contact' : 'Thêm Liên Hệ' }}</span>
                </NButton>
            </NSpace>
        </form>
    </div>
</template>

<style scoped>

</style>