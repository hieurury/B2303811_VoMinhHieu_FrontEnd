import { ref, onMounted } from 'vue'

const lang = ref('vi');

const toggleLang = () => {
    if(lang.value === 'en') lang.value = 'vi';
    else lang.value = 'en';
}



export {lang, toggleLang};