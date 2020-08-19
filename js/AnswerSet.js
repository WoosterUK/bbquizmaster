const na = Immutable.List()

const answerSet = ({ ca=na, ia=na }) => {
  console.log(`answerList({ ca=${ca}, ia=${ia} })`)
  return Object.freeze({
    ca: ca,
    ia: ia,
