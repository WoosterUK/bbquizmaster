const randomVariable = ({name, float, min, max}) => {
  if (logging) { console.log(`randomVariable(${name}, ${float}, ${min}, ${max})`) }
  const parse = float ? parseFloat : parseInt
  const [a, b] = [min, max].map((x) => parse(x))
  return (b > a) ? checkedRandomVariable(name, float, a, b) : invalidVariable(name)

}

const checkedRandomVariable = (name, float, a, b) => {
  if (logging) { console.log(`checkedRandomVariable = (${name}, ${float}, ${a}, ${b})`) }
  const generate = float ? () =>  math.random(a, b) : () => math.randomInt(a, b + 1)
  return ({
    name: name,
    node: new math.ConstantNode(generate()),
    valid: true,
    next() { return checkedRandomVariable(name, float, a, b) },
    toString() { return `Random ${float ? 'float' : 'integer'} called ${name} between ${a} and ${b}`}
  })


}

const invalidVariable = (name) => {
  if (logging) { console.log(`invalidVariable(${name})`) }
  return {
    name: name,
    valid: false,
    next() { return this },
    toString() { return `Invalid variable called ${name}`}
  }
}

const expressionVariable = ({name, raw, simple, namespace = Immutable.List()}) => {
  if (logging) { console.log(`expressionVariable(${name}, ${raw}, ${simple}, ${namespace})`) }
  let node
  try {
    node = math.parse(raw)
  } catch (error) {
    console.log(error)
    node = null
  }
  if (node && node.toString() != 'undefined') {
    return expressionVariableFromNode({name, raw, node, simple}).substitute(namespace)
  } else {
    return invalidVariable(name)
  }
}

const expressionVariableFromNode = ({name, raw, simple, node}) => {
  if (logging) { console.log(`expressionVariableFromNode = (${name}, ${raw}, ${simple}, ${node})`) }
  return {
    name: name,
    raw: raw,
    simple: simple,
    node: simple ? math.simplify(node) : node,
    valid: true,

    substitute(toSubst) {
      if (logging) { console.log(`${this}.substitute(${toSubst})`) }
      if (toSubst.isEmpty()) {
        return this
      } else if (!toSubst.last().valid) {
        return this.substitute(toSubst.pop())
      } else {
        const { name: substName, node: substNode } = toSubst.last()
        const newNode = this.node.transform((nd, path, parent) => {
          if (nd.isSymbolNode && nd.name === substName) {
            return substNode
          }
          return nd
        })
        return expressionVariableFromNode(Object.assign({}, this, {node: newNode})).substitute(toSubst.pop())
      }
    },

    toString() { return `Expression variable called ${name} equal to ${this.node}${simple ? ' (simplified)' : ''}` }
  }
}
