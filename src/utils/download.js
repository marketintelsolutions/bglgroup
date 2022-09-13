function download(url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop();
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default download;
