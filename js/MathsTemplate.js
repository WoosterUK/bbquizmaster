const mathsTemplate = (raw) => {
  const thisTemplate = raw.split('${').join('${this.')
  const fun = new Function(`return \`${thisTemplate}\``)
  return {
    raw: raw,
    substitute(context) { return fun.call(context) }
  }
}
