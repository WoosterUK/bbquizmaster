const downloadTsv = (generator, filename = 'questionPool.tsv') => {
  const uriComp = encodeURIComponent(generator.generateTsvString())
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + uriComp);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
