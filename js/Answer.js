const answer = (raw, correct, min, max) => {
  console.log(`answer(${raw}, ${correct}, ${min}, ${max})`)
  return answerFromTemplate(mathsTemplate(raw), correct, min, max)
}

const answerFromTemplate = (template, correct, min, max) => Object.freeze({
  template: template,
  correct: correct,
  min: min > 0 ? min : 0,
  max: max,

  instance(must, variableList) {
    console.log(`Answer.instance(${must}, ${variableList})`)
    if (must ? (min > 0) : (max - min) > 0) {
      const newVarList = variableList.newRandoms(false)
      const newInst = Object.freeze({
        variableList: newVarList,
        latex: template.substitute(newVarList.context()),
        hash: stringHash(this.latex),
        correct: correct,

        equals(other) {
          return other.latex === this.latex
        },

        hashCode() {
          return this.hash
        },

        toString() {
          return `${this.latex} (${this.correct ? '' : 'in'}correct)`
        }
      })
      return Immutable.List([newInst])
    } else {
      return Immutable.List()
    }
  },

  next(must) {
    if (must ? (min > 0) : (max - min) > 0) {
      const newMin = min > 0 ? min - 1 : 0
      return answerFromTemplate(template, correct, newMin, max - 1)
    } else {
      return this
    }
  },

  toString() {
    return `AnswerSet(${template}, ${correct}, ${min}, ${max}`
  }
})

const stringHash = (string, soFar=53) => {
  if (string) {
    const newSoFar = (37*soFar + string.charCodeAt(0)) | 0
    return stringHash(string.slice(1), newSoFar)
  } else {
    return soFar
  }
}
