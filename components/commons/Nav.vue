<template>
  <nav
    class="w-full absolute top-0 z-10 h-12"
    :class="{ 
      'text-cus-gray': mode === 'dark',
      'text-white-400': mode === 'light',
      'visible': isVisiable,
      'fixed': isFixed
    }"
  >
    <NLink
      to="/"
      class="text-lg float-left p-3"
      :class="{ 'text-white-full': mode === 'dark', 'text-cus-gray': mode === 'light', 'lg:text-cus-black': isFixed, 'lg:hover:text-cus-blue': isFixed }"
    >{{ title }}</NLink>
    <div class="float-right w-12">
      <button
        class="float-right md:hidden bg-transparent active:bg-white-200 rounded-full"
        @click="handleMenuShow"
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="w-4 h-4 m-4"
          :class="{'fill-white-full': mode == 'dark', 'fill-cus-black': mode == 'light'}"
        >
          <path
            d="M970.112 448H53.888C27.392 448 0 476.672 0 512c0 35.392 27.392 64 53.888 64h916.224c26.496 0 53.888-28.608 53.888-64 0-35.328-27.392-64-53.888-64zM970.112 896H53.888C27.392 896 0 924.672 0 960c0 35.392 27.392 64 53.888 64h916.224c26.496 0 53.888-28.608 53.888-64 0-35.328-27.392-64-53.888-64zM970.112 0H53.888C27.392 0 0 28.672 0 64c0 35.392 27.392 64 53.888 64h916.224c26.496 0 53.888-28.608 53.888-64 0-35.328-27.392-64-53.888-64z"
          />
        </svg>
      </button>
      <div
        class="w-40 md:w-auto float-right mr-4 text-xs tracking-wider opacity-0 md:opacity-100 transform scale-0 md:scale-100 origin-top-right transition-all ease-out duration-200 md:transition-none"
        :class="{ show: isMenuShow }"
      >
        <ul
          class="py-2 md:py-0 shadow md:shadow-none md:flex md:flex-row md:justify-bwtween bg-white-full md:bg-transparent rounded-sm"
          :class="{ show: isMenuShow }"
        >
          <li v-show="!($route.path === '/') && !($route.path.startsWith('/page'))">
            <NLink
              to="/"
              :class="{ 'md:text-white-full': mode === 'dark', 'text-cus-gray': mode === 'light', 'lg:text-cus-black': isFixed, 'lg:hover:text-cus-blue': isFixed }"
            >HOME</NLink>
          </li>
          <li v-show="!($route.path.startsWith('/about'))">
            <NLink
              to="/about"
              :class="{ 'md:text-white-full': mode === 'dark', 'text-cus-gray': mode === 'light', 'lg:text-cus-black': isFixed, 'lg:hover:text-cus-blue': isFixed }"
            >ABOUT</NLink>
          </li>
          <li v-show="!($route.path.startsWith('/archive'))">
            <NLink
              to="/archive"
              :class="{ 'md:text-white-full': mode === 'dark', 'text-cus-gray': mode === 'light', 'lg:text-cus-black': isFixed, 'lg:hover:text-cus-blue': isFixed }"
            >ARCHIVE</NLink>
          </li>
          <li v-show="!($route.path === '/portfolid')">
            <NLink
              to="/portfolid"
              :class="{ 'md:text-white-full': mode === 'dark', 'text-cus-gray': mode === 'light', 'lg:text-cus-black': isFixed, 'lg:hover:text-cus-blue': isFixed }"
            >PORTFOLID</NLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  watchEffect,
  SetupContext,
  getCurrentInstance,
  Ref,
  onMounted,
} from "@vue/composition-api";
import useRouter from "@/hooks/useRouter";
import BLOGCONFIG from "@/data/blog.config";
import { Route } from "vue-router";

export default defineComponent({
  name: "Nav",
  props: {
    mode: {
      validator: (value: string) => {
        return ["light", "dark"].indexOf(value) !== -1;
      },
      default: "dark",
    },
  },
  setup(props, ctx) {
    const { route, router } = useRouter();

    const { title } = useTitle();
    const { isFixed, isVisiable } = useNavLg(route);
    const { isMenuShow, handleMenuShow } = useNavSm(ctx);

    return {
      title,
      isFixed,
      isVisiable,
      isMenuShow,
      handleMenuShow,
    };
  },
});

function useTitle() {
  return {
    title: BLOGCONFIG.index.title,
  };
}

function useNavLg(route: Ref<Route>) {
  let previousTop = 0;
  // fix the navigation bar above the viewport
  const isFixed = ref(false);
  const isVisiable = ref(false);

  // set nav unfix when the path changes
  watch(
    () => route.value.path,
    () => {
      isFixed.value = false;
    }
  );

  onMounted(() => {
    watchEffect((onInvalidate) => {
      if (document.body.clientWidth > 1024) {
        window.addEventListener("scroll", handleScroll);
        onInvalidate(() => {
          window.removeEventListener("scroll", handleScroll);
        });
      }
    });
  });

  return {
    isFixed,
    isVisiable,
  };

  function handleScroll(ev: Event) {
    const navHeight = document.querySelector("nav")?.offsetHeight ?? 0;
    const currentTop =
      document.documentElement.scrollTop ??
      window.pageYOffset ??
      document.body.scrollTop;
    // if scroll up
    if (currentTop < previousTop) {
      if (currentTop > 0 && isFixed.value) {
        isVisiable.value = true;
      } else {
        isVisiable.value = false;
        isFixed.value = false;
      }
    } else {
      // if scroll down
      isVisiable.value = false;
      if (currentTop > navHeight && !isFixed.value) {
        isFixed.value = true;
      }
    }
    previousTop = currentTop;
  }
}

function useNavSm(ctx: SetupContext) {
  const isMenuShow = ref(false);

  // collapse menu when click other region
  onMounted(() => {
    const width = document.body.clientWidth;
    watchEffect((onInvalidate) => {
      if (width < 768) {
        document
          .querySelector("body")
          ?.addEventListener("click", handleBodyClick);
        onInvalidate(() => {
          document
            .querySelector("body")
            ?.removeEventListener("click", handleBodyClick);
        });
      }
    });
  });

  return {
    isMenuShow,
    handleMenuShow,
  };

  function handleMenuShow() {
    isMenuShow.value = !isMenuShow.value;
  }

  function handleBodyClick(ev: MouseEvent) {
    const button = document.querySelector("nav button");
    if (!button?.contains(ev.target as Node)) {
      isMenuShow.value = false;
    }
  }
}
</script>

<style lang="postcss">
nav a {
  @apply block font-extrabold shadow-none;
  &:hover {
    @apply shadow-none;
  }
}

nav ul > li > a {
  @apply text-cus-gray py-3 px-5;
  &:active {
    @apply bg-black-100;
  }
  &:hover {
    @apply text-cus-black;
  }
}

@screen md {
  nav ul > li > a {
    @apply text-white-800 p-5;
    &:hover {
      @apply text-white-800;
    }
  }
}

nav button {
  &:active {
    @apply bg-white-200;
  }
}
nav .show {
  @apply opacity-100 scale-100;
}

@screen lg {
  nav {
    transition: background-color 0.3s;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  }

  nav.fixed {
    @apply fixed bg-white-900 border-b border-gray-100;
    transition: transform 0.3s;
    top: -48px;
  }

  nav.visible {
    transform: translate3d(0, 100%, 0);
  }
}
</style>