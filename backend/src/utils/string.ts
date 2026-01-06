export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // khoảng trắng → -
    .replace(/[^\w\-]+/g, '') // bỏ ký tự đặc biệt
    .replace(/\-\-+/g, '-'); // gộp nhiều -
}
