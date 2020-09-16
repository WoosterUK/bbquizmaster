const downloadTsv = (generator, filename) => {
  if (logging) { `downloadTsv(${generator}, ${filename})` }
  const uriComp = encodeURIComponent(generator.generateTsvString())
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + uriComp);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
