const el = Immutable.List()

const updateFrom = (oldList, index) => {
  if (logging) { console.log(`updateFrom(${oldList}, ${index}`) }
  if (index >= oldList.size) {
    return oldList
  } else {
    const oldVar = oldList.get(index)
    const newList = oldVar.valid ?
        oldList.set(index, expressionVariable(Object.assign({}, oldVar, {namespace: oldList.slice(0, index)}))) : oldList
    return updateFrom(newList, index + 1)
  }
}

const updateNext = (previousList, oldList, index) => {
  if (logging) { console.log(`updateNext(${previousList}, ${oldList}, ${index})`) }
  const n = previousList.size
  return updateFrom(previousList.concat(oldList), index + n).slice(n)
}

const variableLists = ({ qrv=el, qdv=el, arv=el, adv=el }) => {
  if (logging) { console.log(`variableLists({ qrv=${qrv}, qdv=${qdv}, arv=${arv}, adv=${adv} })`) }
  return Object.freeze({
    qrv: qrv,
    qdv: qdv,
    arv: arv,
    adv: adv,


    set(type, index, variable) {
      if (logging) { console.log(`set(${type}, ${index}, ${variable})`) }
      const added = this[type]
        .set(index, variable)
        .map((x) => typeof x == 'undefined' ? invalidVariable('') : x)
      const newVals = {}
      if (type == 'qdv') {
        newVals.qdv = updateFrom(added, index)
        newVals.adv = updateNext(newVals.qdv, this.adv, 0)
      } else if (type == 'adv') {
        newVals.adv = updateNext(this.qdv, added, index)
      } else {
        newVals[type] = added
      }
      return variableLists(Object.assign({}, this, newVals))
    },

    context () {
      const firstThree = qrv.concat(updateNext(qrv, qdv, 0)).concat(arv)
      const allFour = firstThree.concat(updateNext(firstThree, adv, 0))
      const cntxt = {}
      allFour.forEach((x, i) => { if (x.valid) cntxt[x.name] = x.node.toTex() })
      return Object.freeze(cntxt)
    },

    newRandoms(newQuestion) {
      if (logging) { console.log(`newRandoms(${newQuestion})`) }
      const newVals = {}
      if (newQuestion) {
        newVals.qrv = qrv.map((x) => x.next())
      }
      newVals.arv = arv.map((x) => x.next())
      return variableLists(Object.assign({}, this, newVals))
    },

    toString() {
      return `variableLists({ qrv=${qrv}, qdv=${qdv}, arv=${arv}, adv=${adv} })`
    }
  })
}

const emptyLists = variableLists({})

const objectString = (ob) => {
  return Object.getOwnPropertyNames(ob).map((item, i) => `${item}: ${ob[item]}`).join(", ")
}
