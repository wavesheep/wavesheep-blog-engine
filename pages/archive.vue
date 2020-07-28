<template>
  <div>
    <div class="mx-auto w-full md:w-8/12 xl:w-1/2 md:mt-4 p-4">
      <NLink to="/archive/" class="shadow-none hover:shadow-none inline-block">
        <div
          :class="{'hint': optionAll.focus}"
          class="px-3 py-1 inline-block cursor-pointer rounded-full text-sm transition-all duration-300 ease-linear my-2 mr-2 show-all"
        >
          Show All
          <sup>{{ optionAll.num }}</sup>
        </div>
      </NLink>
      <ColoredTag v-for="option in coloredTags" :key="option.label" :options="option" />
      <div>
        <div v-for="v in hintedPosts.value" :key="v[0]" class="my-4">
          <span class="text-base md:text-lg font-semibold text-cus-blue">{{ v[0] }}</span>
          <SimplePostPreview
            v-for="post in v[1]"
            :key="post.meta.title"
            :title="post.meta.title"
            :subtitle="post.meta.subtitle"
            :url="'/post/' + post.meta.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import ColoredTag from "@/components/partials/tag/ColoredTag.vue";
import { Post, ColoredTagOption } from "@/types/post";

export default defineComponent({
  components: {
    ColoredTag,
  },
  data() {
    return {
      hintedPosts: {
        value: new Map<number, Post[]>(),
      },
      optionAll: {
        focus: false,
        label: "Show All",
        num: 0,
      },
    };
  },
  asyncData(ctx) {
    if (process.server) {
      const data = require("../utils/data");
      const posts: Post[] = data.getData();
      let tags = new Map<string, ColoredTagOption>();
      let yearedPosts = new Map<number, Post[]>();
      posts.forEach((post) => {
        if (post.filename !== "about.md" && post.filename !== "portfolid.md") {
          const year = new Date(post.meta?.date ?? Date.now()).getFullYear();

          // classify by year
          if (yearedPosts.has(year)) {
            yearedPosts.get(year)?.push(post);
          } else {
            yearedPosts.set(year, [post]);
          }

          // classify by tag
          post.meta?.tags?.forEach((tag) => {
            if (tags.has(tag)) {
              let option = tags.get(tag);
              option!.num += 1;
              if (option!.posts!.has(year)) {
                option!.posts!.get(year)!.push(post);
              } else {
                option!.posts!.set(year, [post]);
              }
            } else {
              let map = new Map<number, Post[]>();
              map.set(year, [post]);
              tags.set(tag, {
                focus: false,
                label: tag,
                num: 1,
                posts: map,
              });
            }
          });
        }
      });

      const sortedTags = Array.from(tags.values()).sort((a, b) => {
        return b.num - a.num;
      });
      const minNum = sortedTags[sortedTags.length - 1].num;
      const maxNum = sortedTags[0].num;
      const colorMap = getColorMap("#bbbbee", "#2f93b4", maxNum, minNum);

      const coloredTags = sortedTags.map((tag) => {
        tag.baseColor = colorMap[tag.num - minNum];
        tag.highlightColor = "#0085a1";

        return tag;
      });

      return {
        posts,
        coloredTags,
        yearedPosts,
      };
    }
  },
  created() {
    if (process.client) {
      const posts = ((this as any)._data.posts as Post[]).filter(
        (p) => p.filename !== "about.md" && p.filename !== "portfolid.md"
      );
      this.optionAll.num = posts.length;
      if (this.$route.query.tag) {
        highlight(this);
      } else {
        this.optionAll.focus = true;
        this.hintedPosts.value = (this as any)._data.yearedPosts;
      }
    }
  },
  watch: {
    $route: function (_, o: any) {
      highlight(this, o.query.tag);
    },
  },
});

function highlight(ctx: any, oldTag?: string) {
  const coloredTags = ctx._data.coloredTags as ColoredTagOption[];
  if (!ctx.$route.query.tag) {
    ctx.optionAll.focus = true;
    ctx.hintedPosts.value = ctx._data.yearedPosts;
    coloredTags.forEach((tag) => {
      if (tag.label === oldTag) {
        tag.focus = false;
      }
    });
  } else if (!oldTag) {
    ctx.optionAll.focus = false;
    coloredTags.forEach((tag) => {
      if (tag.label === ctx.$route.query.tag) {
        tag.focus = true;
        ctx.hintedPosts.value = tag.posts;
      }
    });
  } else {
    coloredTags.forEach((tag) => {
      if (tag.label === ctx.$route.query.tag) {
        tag.focus = true;
        ctx.hintedPosts.value = tag.posts;
      }
      if (tag.label === oldTag) {
        tag.focus = false;
      }
    });
  }
}

function toRGB(code: string) {
  const hex = /#(\w{2})(\w{2})(\w{2})/.exec(code) ?? [code, "ff", "ff", "ff"];
  return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
}

function toHex(ary: number[]) {
  return (
    "#" +
    ary
      .map((i) => {
        let hex = i.toString(16);
        hex = hex.length == 1 ? "0" + hex : hex;
        return hex;
      })
      .join("")
  );
}

function getColorMap(
  startColor: string,
  endColor: string,
  maxNum: number,
  minNum: number
) {
  let result = [];
  const range = maxNum - minNum;
  const startRgb = toRGB(startColor);
  const endRgb = toRGB(endColor);

  for (let i = 0; i <= range; i++) {
    result[i] = toHex(
      startRgb.map(
        (start, idx) => start + Math.floor((i / range) * (endRgb[idx] - start))
      )
    );
  }

  return result;
}
</script>
<style lang="postcss">
.show-all {
  color: #0085a1;
  background: #f3f5f5;
}
.show-all.hint {
  @apply shadow-box;
  background: #e4e4e4;
}
.show-all:hover {
  background: #e4e4e4;
}
</style>