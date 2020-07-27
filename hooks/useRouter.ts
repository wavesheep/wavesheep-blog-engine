
import { ref, watch } from '@vue/composition-api';
import Router, { Route } from 'vue-router';
import { getRuntimeVM } from '@/utils/runtime';

const useRouter = () => {
  const vm = getRuntimeVM()
  const route = ref<Route>(vm.$route)

  watch(
    () => vm.$route,
    (r) => {
      route.value = r
    }
  )

  return { route, router: vm.$router as Router };
}

export default useRouter;