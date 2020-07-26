import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
// yaml plugin
import meta from 'markdown-it-meta';
// emoji plugin
import emoji from 'markdown-it-emoji';
import twemoji from 'twemoji';
// mathjax plugin
// preprocess to prevent formula like `1 *2* 3` been parsed to markdown syntax
import mathjax from 'markdown-it-mathjax';
import plainText from 'markdown-it-plain-text';
// headers anchor plugin
import anchor from 'markdown-it-anchor';

// init markdown-it
// use highlight.js as code highlighter
const md = new MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str, true).value;
      } catch (__) {}
    }

    return '';
  }
});

// load plugins
md
  .use(meta)
  .use(emoji)
  .use(mathjax())
  .use(plainText)
  .use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  });

// must place it under "emoji-plugin use", or it won't execute
// use twemoji as emoji renderer
// when using twemoji you can make image height match the line height with this style:
// .emoji {
//   height: 1.2 em;
// }
// more doc https://github.com/twitter/twemoji#string-parsing
md.renderer.rules.emoji = function (token, idx) {
  return twemoji.parse(token[idx].content, {
    // replace maxcdn with jsdelivr
    // jsdelivr has better performance in china
    callback: (icon) => {
      return 'https://cdn.jsdelivr.net/gh/twitter/twemoji@13.0.0/assets/svg/' + icon + '.svg';
    }
  });
};

function parse(mdStr, filename) {
  const htmlResult = md.render(mdStr);

  return {
    html: htmlResult,
    plainText: md.plainText,
    meta: md.meta,
    filename
  }
}

export {
  parse
};
