export function formatLink(url) {
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  console.log(url);
  return url;
}
