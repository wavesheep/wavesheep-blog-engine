import { ref } from "@vue/composition-api";

export default function truncate(content: string, maxLength: number) {
  const truncatedContent = ref(content);
  if (content.length > maxLength) {
    truncatedContent.value = content.substring(0, maxLength) + "...";
  }

  return truncatedContent;
}