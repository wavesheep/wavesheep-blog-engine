<template>
  <div
    class="border-t p-2 pt-8"
    id="catalog"
    :style="{
    position: isFixed ? 'fixed' : 'static',
    left: isFixed ? left + 'px' : 'unset',
    top: isFixed ? '48px' : 'unset'
  }"
  >
    <span class="text-lg font-semibold">CATALOG</span>
    <ul class="text-sm font-medium">
      <li v-for="h in catalog" :key="h.name" class="truncate leading-loose">
        <nuxt-link
          :to="'#'+h.url"
          :class="{ [h.tag + '-anchor']: true, hint: h.url === hintUrl }"
        >{{ h.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  nextTick,
  watchEffect,
  onBeforeUnmount,
} from "@vue/composition-api";

type Anchor = {
  tag: string;
  name: string;
  url: string;
  top: number;
};

export default defineComponent({
  name: "Catalog",
  setup() {
    // generate catalog
    const catalog = ref<Anchor[]>([]);
    onMounted(() => {
      const headerDoms = document.querySelectorAll("article h2, article h3");
      catalog.value = Array.from(headerDoms).map((dom) => {
        return {
          tag: dom.tagName.toLowerCase(),
          name: decodeURI(dom.id),
          url: dom.id,
          top:
            dom.getBoundingClientRect().top +
              document.documentElement.scrollTop ??
            window.pageYOffset ??
            document.body.scrollTop,
        };
      });
    });

    // highlight catalog item
    const hintUrl = ref("");
    onMounted(() => {
      if (document.body.clientWidth >= 1024) {
        hint();
        document.addEventListener("scroll", hint);
        onBeforeUnmount(() => {
          document.removeEventListener("scroll", hint);
        });

        function hint() {
          let tempHintUrl = catalog.value[0].url;
          const currentTop =
            document.documentElement.scrollTop ??
            window.pageYOffset ??
            document.body.scrollTop;

          let tempOffset = Math.abs(catalog.value[0].top - currentTop);

          catalog.value.forEach((v) => {
            let offset = Math.abs(v.top - currentTop);
            if (offset < tempOffset) {
              tempHintUrl = v.url;
              tempOffset = offset;
            }
          });

          hintUrl.value = tempHintUrl;
        }
      }
    });

    // get catalog offset left
    let left = ref(0);
    const isFixed = ref(false);
    onMounted(() => {
      if (document.body.clientWidth >= 1024) {
        const catalog = document.querySelector("#catalog");
        left.value = catalog?.getBoundingClientRect().left ?? 0;

        fixed();
        document.addEventListener("scroll", fixed);
        onBeforeUnmount(() => {
          document.removeEventListener("scroll", fixed);
        });
      }
    });
    function fixed() {
      const currentTop =
        document.documentElement.scrollTop ??
        window.pageYOffset ??
        document.body.scrollTop;

      if (currentTop >= 368) {
        isFixed.value = true;
      } else {
        isFixed.value = false;
      }
    }

    onMounted(() => {
      window.addEventListener("resize", resize);
      onBeforeUnmount(() => {
        window.removeEventListener("resize", resize);
      });

      function resize() {
        const article = document.querySelector("article");
        const right = article?.getBoundingClientRect().right ?? 0;
        left.value = right + 32;
      }
    });

    return {
      catalog,
      hintUrl,
      isFixed,
      left,
    };
  },
});
</script>
<style lang="postcss" scoped>
li:hover > .h2-anchor,
li:hover > .h3-anchor {
  background-color: #f8f8f8;
  color: #e96900;
  padding: 0.125em 0.25em;
}

.h2-anchor.hint,
.h3-anchor.hint {
  background-color: #f8f8f8;
  color: #e96900;
  padding: 0.125em 0.25em;
}

.h2-anchor {
  margin-left: 1em;
}

.h3-anchor {
  margin-left: 2em;
}
</style>