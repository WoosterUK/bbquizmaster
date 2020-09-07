const question = (raw) => {
  console.log('question(${name})')
  const template = mathsTemplate(raw)
  return Object.freeze({
    template: template,
    instance(variableList) {
      const newVarList = variableList.newRandoms(true)
      return Object.freeze({
        variableList: newVarList,
        latex: template.substitute(newVarList.context())
      })
    }
  })
}
