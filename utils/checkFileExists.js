export default function checkFileExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);
  http.send();
  return http.status === 200;
}
