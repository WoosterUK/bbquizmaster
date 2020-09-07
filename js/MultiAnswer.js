const multiAnswer = (variableList, question, answerSet) => {
  console.log(`multiAnswer(${variableList}, ${question}, ${answerSet})`)
  return Object.freeze({

    generateTsvString(numQuestions = 500) {
      const generateTsvLines = (toDo = 500, soFar = el) => {
        if (toDo <= 0) {
          return soFar
        } else {
          const qInst = question.instance(variableList)
          const qTxt = `MA\t${qInst.latex}`
          const insts = answerSet.instances(qInst.variableList)
          const check = (x) => x.correct ? 'correct' : 'incorrect'
          const aTxt = insts.map((x) => `${x.latex}\t${check(x)}`).join('\t')
          return generateTsvLines(toDo - 1, soFar.push(`${qTxt}\t${aTxt}`))
        }
      }
      return generateTsvLines(numQuestions).join('\n')
    }
  })
}
