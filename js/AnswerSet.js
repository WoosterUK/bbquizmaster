const es = Immutable.Set()

const noAnswers = (total) => {
  if (logging) { console.log(`noAnswers(${total})`) }
  return answerSet(es, total)
}

const answerSet = (answers, total, soFar = es) => {
  if (logging) { console.log(`answerSet(${answers}, ${total}, ${soFar})`) }
  return Object.freeze({
    answers: Immutable.Set(answers),
    total: total,
    soFar: soFar,

    generateInstances(variableList, must, tries = 100) {
      if (logging) { console.log(`generateInstances(${variableList}, ${must}, ${tries})`) }
      const newInstances = answers.flatMap((x) => x.instance(must, variableList))
      if (newInstances.isEmpty()) {
        return this
      } else if (soFar.intersect(newInstances).isEmpty()) {
        return answerSet(answers.map((x) => x.next(must)), total - newInstances.size, soFar.union(newInstances)).generateInstances(variableList, must)
      } else if (tries > 1) {
        return this.generateInstances(variableList, must, tries - 1)
      } else {
        throw 'insufficient probability space'
      }
    },

    instances(variableList) {
      if (logging) { console.log(`instances(${variableList})`) }
      const mustsAnswerSet = this.generateInstances(variableList, true)
      const musts = mustsAnswerSet.soFar
      const extras = mustsAnswerSet.generateInstances(variableList, false).soFar
      const extrasNeeded = total - musts.size
      const finalSet = select(extrasNeeded, extras.subtract(musts)).union(musts)
      return select(finalSet.size, finalSet)
    },

    addAnswer(raw, correct, min, max) {
      if (logging) { console.log(`addAnswer(${raw}, ${correct}, ${min}, ${max})`) }
      return answerSet(answers.add(answer(raw, correct, min, max)), total)
    },

    toString() { return `(AnswerSet with ${answers.size} answers)`}
  })
}

const select = (n, from, soFar = es) => {
  if (logging) { console.log(`select(${n}, ${from}, ${soFar})`) }
  if (n < 1 || from.isEmpty()) {
    return soFar
  } else {
    const picked = math.pickRandom(from.toArray())
    return select(n - 1, from.remove(picked), soFar.add(picked))
  }
}
