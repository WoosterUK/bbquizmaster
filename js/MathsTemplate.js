const mathsTemplate = (raw) => {
  if (logging) { `mathsTemplate(${raw})` }
  const thisTemplate = raw.split('${').join('${this.').split('\\').join('\\\\')
  const fun = new Function(`return \`${thisTemplate}\``)
  return {
    raw: raw,
    substitute(context) { return fun.call(context) }
  }
}
