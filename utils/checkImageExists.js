export default function checkImageExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();
  return http.status === 200;
}
