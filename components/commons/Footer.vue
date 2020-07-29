<template>
  <footer
    class="grid grid-rows-2 text-sm mt-16"
    :class="{ 
      'text-cus-gray': mode === 'dark',
      'text-white-full': mode === 'light'
    }"
  >
    <div class="mb-4">
      <ul class="flex flex-wrap justify-center">
        <li class="mx-2" v-if="socialAccount.github">
          <LinkAccount :url="socialAccount.github">
            <Github :mode="mode" />
          </LinkAccount>
        </li>
        <li class="mx-2" v-if="socialAccount.linkedin">
          <LinkAccount :url="socialAccount.linkedin">
            <Linkedin :mode="mode" />
          </LinkAccount>
        </li>
        <li class="mx-2" v-if="socialAccount.mail">
          <LinkAccount :url="'mailto:'+socialAccount.mail">
            <Mail :mode="mode" />
          </LinkAccount>
        </li>
        <li class="mx-2" v-if="socialAccount.qq">
          <LinkAccount
            :url="'http://wpa.qq.com/msgrd?v=3&uin='+socialAccount.qq+'&site=qq&menu=yes'"
          >
            <QQ :mode="mode" />
          </LinkAccount>
        </li>
        <li class="mx-2" v-if="socialAccount.twitter">
          <LinkAccount :url="socialAccount.twitter">
            <Twitter :mode="mode" />
          </LinkAccount>
        </li>
        <li class="mx-2" v-if="socialAccount.wechat">
          <ImgAccount :url="socialAccount.wechat">
            <Wechat :mode="mode" />
          </ImgAccount>
        </li>
        <li class="mx-2" v-if="socialAccount.weibo">
          <LinkAccount :url="socialAccount.weibo">
            <Weibo :mode="mode" />
          </LinkAccount>
        </li>
        <li class="mx-2" v-if="socialAccount.zhihu">
          <LinkAccount :url="socialAccount.zhihu">
            <Zhihu :mode="mode" />
          </LinkAccount>
        </li>
      </ul>
    </div>
    <div class="text-center">
      <span>Copyright &copy; {{ owner }} {{ year }}</span>
      <br />
      <span v-if="$route.path === '/'">
        <a
          class="shadow-link"
          v-if="beian && beian.icp"
          href="http://www.beian.miit.gov.cn"
          target="_blank"
        >{{ beian.icp }}</a>
        <span v-if="beian && beian.gongan">|</span>
        <a
          class="shadow-link"
          v-if="beian && beian.gongan"
          :href="'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode='+beian.gongan.code"
          target="_blank"
        >{{ beian.gongan.name }}</a>
        <br />
      </span>
      <span>
        Powered By
        <a
          class="shadow-link"
          target="_blank"
          href="https://github.com/wavesheep/wavesheep-blog-engine"
        >Wavesheep Blog Engine</a>
      </span>
    </div>
  </footer>
</template>

<script>
import BLOGCONFIG from "@/data/blog.config";
import ImgAccount from "@/components/partials/socialAccount/ImgAccount";
import LinkAccount from "@/components/partials/socialAccount/LinkAccount";
import Github from "@/components/icons/Github";
import Linkedin from "@/components/icons/Linkedin";
import Mail from "@/components/icons/Mail";
import QQ from "@/components/icons/QQ";
import Twitter from "@/components/icons/Twitter";
import Wechat from "@/components/icons/Wechat";
import Weibo from "@/components/icons/Weibo";
import Zhihu from "@/components/icons/Zhihu";

export default {
  name: "Footer",
  props: {
    mode: {
      validator: (value) => {
        return ["light", "dark"].indexOf(value) !== -1;
      },
      default: "dark",
    },
  },
  components: {
    ImgAccount,
    LinkAccount,
    Github,
    Linkedin,
    Mail,
    QQ,
    Twitter,
    Wechat,
    Weibo,
    Zhihu,
  },
  data() {
    return {
      owner: "",
      year: "",
      socialAccount: {},
      beian: null,
    };
  },
  created() {
    this.owner = BLOGCONFIG.owner;
    this.year = new Date().getFullYear();
    this.socialAccount = BLOGCONFIG.socialAccount;
    this.beian = BLOGCONFIG.beian;
  },
};
</script>
<style lang="postcss" scoped>
.shadow-link {
  @apply shadow-hyperlinkNormal text-cus-blue transition-shadow duration-100 ease-hyperlink;

  &:hover {
    @apply shadow-hyperlinkHover;
  }

  &:focus {
    @apply outline-none;
  }
}
</style>