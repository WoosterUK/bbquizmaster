const answer = (raw, correct, min, max) => {
  return answerFromTemplate(mathsTemplate(raw), correct, min, max)
}

const answerFromTemplate = (template, correct, min, max) => Object.freeze({
  template: template,
  correct: correct,
  min: min,
  max: max,

  latex(must, context) {
    if (must ? min : max > 0) {
      return Immutable.List([template.substitute(context)])
    }
    return Immutable.List()
  },
  
  next(must) {
    if (must ? min : max > 0) {
      return answerFromTemplate(template, correct, --min, --max)
    }
    return this
  }
})
