<script setup>
import { 
    onMounted,
     ref, 
     watch
    }                           from 'vue';
import { 
    NInput,
    NIcon, 
    NSpace,
    NList,
    NListItem,
    NButton,
    NDrawer,
    NDrawerContent,
    NTabs,
    NTabPane,
    NPopconfirm,
    NResult,
    NRadioGroup,
    NRadioButton,
    useMessage,
    }                           from    'naive-ui';
import useSize                  from '../../hooks/useSize';
import { lang }                 from '../../hooks/useLang';
import {useRouter}              from 'vue-router';
import * as contactAPI          from '../../services/apiContact';
const contactData               =       ref([]);
const currentData               =       ref([]);
const router                    =       useRouter();

watch(contactData, (newVal) => {
    currentData.value           =       newVal;
    handleSearch(router.currentRoute.value.query.search || '');
});
const size                      =       useSize();
//search
const searchQuery               =       ref('');


const handleSearch              =       (value) => {
    if(value === '') {
        currentData.value       =       contactData.value;
    } else {
        currentData.value       =       contactData.value.filter(contact => 
            contact.name.toLowerCase().includes(value.toLowerCase()) ||
            contact.phone.toLowerCase().includes(value.toLowerCase()) ||
            (contact.email && contact.email.toLowerCase().includes(value.toLowerCase())) ||
            (contact.address && contact.address.toLowerCase().includes(value.toLowerCase()))
        );
    }
};
watch(searchQuery, (newVal) => {
    if(newVal === '') {
        currentData.value       =       contactData.value;
    } else {
        router.push({ query: { search: newVal } });
        handleSearch(newVal);
    }
})
//drawer
const drawerActive              =       ref(false);
const currentContact            =       ref(null);
const showDrawer                =       (data) => {
    currentContact.value        =       data;
    drawerActive.value          =       true;
}

const editData                  =       ref({});
const editActive                =       ref(false);
const showEdit                  =       (type) => {
    if(type) {
        editActive.value        =       true;
        editData.value          =       {...currentContact.value};
    } else {
        editActive.value        =       false;
        editData.value          =       {};
    }
}

//message log
const message                   =       useMessage();


//=================== LIFECYCLE =====================//
onMounted(async () => {
    try {
        await getAllContacts();
        currentData.value       =       contactData.value;
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
});


//==================== METHODS =====================//
const checkEditForm = () => {
    //check empty name
    if(editData.value.name === '') {
        message.error('Name is required');
        return false;
    }
    //check empty phone
    if(editData.value.phone === '') {
        message.error('Phone number is required');
        return false;
    }
    //regex phone
    const phoneRegex = /^[0-9+\-\s()]*$/;
    if(!phoneRegex.test(editData.value.phone)) {
        message.error('Phone number is invalid');
        return false;
    }
    //email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(editData.value.email !== '' && !emailRegex.test(editData.value.email)) {
        message.error('Email is invalid');
        return false;
    }

    return true;
}

//get all contacts
const getAllContacts            =       async () => {
    try {
        const data              =       await contactAPI.getAllContacts();
        contactData.value       =       data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
};

//delete all contacts
const handleDeleteAll           =       async () => {
    try {
        const response          =       await contactAPI.deleteAllContacts();
        message[response.status](response.message);
        getAllContacts();
    } catch (error) {
        console.error("Error deleting contacts:", error);
    }
};

//delete one contact
const handleDeleteContact       =       async (id) => {
    try {
        const response          =       await contactAPI.deleteContact(id);
        message[response.status](response.message);
        getAllContacts();
        drawerActive.value      =       false;
    } catch (error) {
        console.error("Error deleting contact:", error);
    }
};

//edit contact
const handleEditContact         =       async (id) => {
    if(!checkEditForm()) return false;
    try {
        const response          =       await contactAPI.editContact(id, editData.value);
        message[response.status](response.message);
        if(response.status === 'success') {
            getAllContacts();
            showEdit(false);
            drawerActive.value  =       false;
        }
    } catch (error) {
        console.error("Error editing contact:", error);
    }
};

//toggle favorite
const handleToggleFavorite      =       async (id, value) => {
    try {
        const response          =       await contactAPI.toggleFavorite(id, value);
        message[response.status](response.message);
        if(response.status === 'success') {
            getAllContacts();
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
    }
};
</script>


<template>
<div class="lg:px-[20%] dark:bg-gray-900 p-8 lg:py-8 min-h-screen">
    <n-input v-model:value="searchQuery" size="large" :placeholder="lang === 'en' ? 'Search for your contact...' : 'Tìm kiếm liên hệ của bạn...'">
      <template #prefix>
        <NIcon>
          <i class="fa-solid fa-magnifying-glass"></i>
        </NIcon>
      </template>
    </n-input>
    <h1 class="text-2xl font-semibold dark:text-gray-300 text-gray-700 lg:my-6 my-4 uppercase">{{ lang === 'en' ? 'List contact saved' : 'Danh sách liên hệ đã lưu'}}</h1>
    <div class="flex flex-col">
        <!-- Contact list -->
        <div v-if="currentData.length > 0" class="w-full">
            <!-- tabs -->
            <NTabs type="line" class="w-full">
                <NTabPane class="text-xl font-semibold my-2" name="all" :tab="lang === 'en' ? 'All' : 'Tất cả'">
                    <NList bordered class="my-4 max-h-[600px] overflow-y-auto">
                        <NListItem v-for="contact in currentData" :key="contact.id">
                            <NSpace justify="space-between" align="center" class="w-full">
                                <NSpace>
                                    <NIcon>
                                        <i class="fa-solid fa-user text-orange-500"></i>
                                    </NIcon>
                                    <span class="font-medium">{{ contact.name }}</span>
                                </NSpace>
                                <NSpace align="center">
                                    <NIcon @click="handleToggleFavorite(contact._id, !contact.favorite)" class="text-lg mr-2 cursor-pointer">
                                        <i v-if="contact.favorite" class="fa-solid fa-star text-yellow-400"></i>
                                        <i v-else class="fa-regular fa-star text-gray-400"></i>
                                    </NIcon>
                                    <NButton @click="showDrawer(contact)" type="primary" size="small">
                                        <template #icon>
                                            <NIcon>
                                                <i class="fa-solid fa-eye"></i>
                                            </NIcon>
                                        </template>
                                        <span>{{ lang === 'en' ? 'View' : 'Xem' }}</span>
                                    </NButton>
                                </NSpace>
                            </NSpace>
                        </NListItem>
                    </NList>
                    
                    <!-- action button -->
                    <NSpace v-if="currentData.length > 0" justify="start" class="my-4">
                        <NPopconfirm
                        :positive-text="lang === 'en' ? 'Accept' : 'Chấp Nhận'"
                        :negative-text="lang === 'en' ? 'Cancel' : 'Hủy'"
                        @positive-click="handleDeleteAll"
                        @negative-click="message.info('Cancelled deletion')"
                        >
                            <template #trigger>
                                <NButton type="error">
                                    <template #icon>
                                        <NIcon>
                                            <i class="fa-solid fa-trash"></i>
                                        </NIcon>
                                    </template>
                                    {{ lang === 'en' ? 'Delete all' : 'Xóa tất cả' }}
                                </NButton>
                            </template>
                            ❗{{ lang === 'en' ? 'This action will delete all contacts. Are you sure?' : 'Hành động này sẽ xóa tất cả các liên hệ. Bạn có chắc chắn không?' }}
                        </NPopconfirm>
                    </NSpace>

                </NTabPane>
                <!-- favorites -->
                <NTabPane class="text-xl font-semibold my-2" name="favorites" :tab="lang === 'en' ? 'Favorites' : 'Yêu Thích'">
                    <NSpace v-if="!currentData.filter(contact => contact.favorite).length" justify="center" class="text-gray-500 space-x-1 text-2xl">
                        <n-result
                            status="info"
                            :title="lang === 'en' ? 'No favorite contacts found' : 'Không tìm thấy liên hệ yêu thích'"
                            :description="lang === 'en' ? 'You have no favorite contacts yet. Mark contacts as favorite to see them here.' : 'Bạn chưa có liên hệ yêu thích nào. Đánh dấu liên hệ là yêu thích để xem chúng ở đây.'"
                        >
                        </n-result>
                    </NSpace>
                    <NList v-else bordered class="my-4 max-h-[600px] overflow-y-auto">
                        <NListItem v-for="contact in currentData.filter(contact => contact.favorite)" :key="contact.id">
                            <NSpace justify="space-between" align="center" class="w-full">
                                <NSpace>
                                    <NIcon>
                                        <i class="fa-solid fa-user text-orange-500"></i>
                                    </NIcon>
                                    <span class="font-medium">{{ contact.name }}</span>
                                </NSpace>
                                <NSpace align="center">
                                    <NIcon @click="handleToggleFavorite(contact._id, !contact.favorite)" class="text-lg mr-2 cursor-pointer">
                                        <i v-if="contact.favorite" class="fa-solid fa-star text-yellow-400"></i>
                                        <i v-else class="fa-regular fa-star text-gray-400"></i>
                                    </NIcon>
                                    <NButton @click="showDrawer(contact)" type="primary" size="small">
                                        <template #icon>
                                            <NIcon>
                                                <i class="fa-solid fa-eye"></i>
                                            </NIcon>
                                        </template>
                                        <span>{{ lang === 'en' ? 'View' : 'Xem' }}</span>
                                    </NButton>
                                </NSpace>
                            </NSpace>
                        </NListItem>
                    </NList>
                    
                    <!-- action button -->
                    <NSpace v-if="currentData.filter(contact => contact.favorite).length" justify="start" class="my-4">
                        <NPopconfirm
                        :positive-text="lang === 'en' ? 'Accept' : 'Chấp Nhận'"
                        :negative-text="lang === 'en' ? 'Cancel' : 'Hủy'"
                        @positive-click="handleDeleteAll"
                        @negative-click="message.info('Cancelled deletion')"
                        >
                            <template #trigger>
                                <NButton type="error">
                                    <template #icon>
                                        <NIcon>
                                            <i class="fa-solid fa-trash"></i>
                                        </NIcon>
                                    </template>
                                    {{ lang === 'en' ? 'Delete all' : 'Xóa tất cả' }}
                                </NButton>
                            </template>
                            ❗{{ lang === 'en' ? 'This action will delete all contacts. Are you sure?' : 'Hành động này sẽ xóa tất cả các liên hệ. Bạn có chắc chắn không?' }}
                        </NPopconfirm>
                    </NSpace>

                </NTabPane>
            </NTabs>
        </div>
        <!-- No contact found -->
        <NSpace vertical v-else class="flex items-center space-y-2 my-4">
            <n-result
                status="info"
                :title="lang === 'en' ? 'No contact found' : 'Không tìm thấy liên hệ'"
                :description="lang === 'en' ? 'You have no contacts saved yet. Add new contacts to see them here.' : 'Bạn chưa có liên hệ nào được lưu. Thêm liên hệ mới để xem chúng ở đây.'"
            >
                <template #footer>
                <router-link to="/add-contact">
                    <n-button>{{ lang === 'en' ? 'Add first contact' : 'Thêm liên hệ đầu tiên' }}</n-button>
                </router-link>
                </template>
            </n-result>
        </NSpace>
        <NDrawer v-on:after-leave="editActive = false" v-model:show="drawerActive" placement="right" :width="size === 'small' ? 300 : 500">
            <!-- view contact info -->
            <NDrawerContent v-if="!editActive":title="currentContact.name || ''">
                <NSpace vertical class="my-4">
                    <NSpace>
                        <NIcon>
                            <i class="fa-solid fa-phone text-green-500"></i>
                        </NIcon>
                        <span class="font-medium">{{currentContact.phone || '' }}</span>
                    </NSpace>
                    <NSpace>
                        <NIcon>
                            <i class="fa-solid fa-envelope text-blue-500"></i>
                        </NIcon>
                        <span class="font-medium">{{currentContact.email || 'No email provided' }}</span>
                    </NSpace>
                    <NSpace>
                        <NIcon>
                            <i class="fa-solid fa-address-card text-purple-500"></i>
                        </NIcon>
                        <span class="font-medium">{{currentContact.address || 'No address provided' }}</span>
                    </NSpace>
                </NSpace>
                <NSpace justify="start" class="my-4 border-t pt-4 space-x-2 border-gray-200">
                    <NButton @click="showEdit(true)" type="warning">
                        <template #icon>
                            <NIcon>
                                <i class="fa-solid fa-pen-to-square"></i>
                            </NIcon>
                        </template>
                        Edit
                    </NButton>
                    <NPopconfirm
                    @positive-click="handleDeleteContact(currentContact._id)"
                    @negative-click="message.info('Cancelled deletion')"
                    >
                        <template #trigger>
                            <NButton type="error">
                                <template #icon>
                                    <NIcon>
                                        <i class="fa-solid fa-trash"></i>
                                    </NIcon>
                                </template>
                                Delete
                            </NButton>
                        </template>
                        Are you sure to delete this contact?
                    </NPopconfirm>
                </NSpace>
            </NDrawerContent>
            <!-- edit contact info -->
            <NDrawerContent v-if="editActive" :title="`Change ${currentContact.name}'s info`">
                <NSpace vertical class="my-4">
                    <NSpace vertical>
                        <label>Name</label>
                        <NInput v-model:value="editData.name">
                            <template #prefix>
                                <NIcon>
                                    <i class="fa-solid fa-user text-green-500"></i>
                                </NIcon>
                            </template>
                        </NInput>
                    </NSpace>
                    <NSpace vertical>
                        <label>Phone</label>
                        <NInput v-model:value="editData.phone">
                            <template #prefix>
                                <NIcon>
                                    <i class="fa-solid fa-phone text-green-500"></i>
                                </NIcon>
                            </template>
                        </NInput>
                    </NSpace>
                    <NSpace vertical>
                        <label>Email</label>
                        <NInput v-model:value="editData.email">
                            <template #prefix>
                                <NIcon>
                                    <i class="fa-solid fa-envelope text-green-500"></i>
                                </NIcon>
                            </template>
                        </NInput>
                    </NSpace>
                    <NSpace vertical>
                        <label>Address</label>
                        <NInput v-model:value="editData.address">
                            <template #prefix>
                                <NIcon>
                                    <i class="fa-solid fa-address-card text-green-500"></i>
                                </NIcon>
                            </template>
                        </NInput>
                    </NSpace>
                    <NSpace vertical>
                        <label>Type</label>
                        <NRadioGroup v-model:value="editData.favorite">
                            <NRadioButton :checked="editData.favorite" :value="false">Normal</NRadioButton>
                            <NRadioButton :value="true">Favorite</NRadioButton>
                        </NRadioGroup>
                    </NSpace>
                </NSpace>
                <NSpace justify="start" class="my-4 border-t pt-4 space-x-2 border-gray-200">
                    <NButton @click="showEdit(false)" type="error">
                        <template #icon>
                            <NIcon>
                                <i class="fa-solid fa-trash"></i>
                            </NIcon>
                        </template>
                        Cancel
                    </NButton>
                    <NButton @click="handleEditContact(currentContact._id)" type="success">
                        <template #icon>
                            <NIcon>
                                <i class="fa-solid fa-floppy-disk"></i>
                            </NIcon>
                        </template>
                        Save
                    </NButton>
                </NSpace>
            </NDrawerContent>
        </NDrawer>
    </div>
</div>
</template>

<style scoped>

</style>