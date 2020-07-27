type PostMeta = {
  title?: string,
  subtitle?: string,
  author?: string,
  background?: string
  date?: string,
  tags?: string[]
}

type Post = {
  html: string,
  plainText: string,
  meta: PostMeta,
  filename: string
}

type ColoredTagOption = {
  focus: boolean,
  label: string,
  baseColor?: string,
  highlightColor?: string,
  num: number,
  posts?: Map<number, Post[]>
}

export { Post, ColoredTagOption }