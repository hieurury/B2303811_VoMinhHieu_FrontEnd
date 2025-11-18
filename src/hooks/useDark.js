import { ref, onMounted, watch } from "vue";

const isDark = ref(false);

const toggleDark = () => {
    isDark.value = !isDark.value;
};

watch(isDark, (newVal) => {
    if (newVal) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
});

onMounted(() => {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
});

export { isDark, toggleDark };