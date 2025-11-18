import { ref, onMounted, onUnmounted } from 'vue';


export default function useSize() {
  const size = ref('medium');

  onMounted(() => {
    const updateSize = () => {
      if (window.innerWidth < 768) {
        size.value = 'small';
      } else if (window.innerWidth < 1024) {
        size.value = 'medium';
      } else {
        size.value = 'large';
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    onUnmounted(() => {
      window.removeEventListener('resize', updateSize);
    });
  });
    return size;
}