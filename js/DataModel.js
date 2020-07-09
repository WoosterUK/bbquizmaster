// Answer is the superclass for different kinds of answers

class Answer {
  constructor({
    name,
    description,
    variable_type,
    translator = function (x) { return x; }
  }) {
    this.name = name;
    this.desc = description;
    this.TypeClass = variable_type;
    this.translator = translator;
    console.log(`Created Answer of type ${name}.`);
  }
}

class StringAnswer extends Answer {
  constructor() {
    super({
      name: "Answer text",
      description: "Type the question text here. See [blah] for reference.",
      variable_type: String
    });
  }
}

class BooleanAnswer extends Answer {
  constructor() {
    super({
      name: "True/false answer",
      description: "Type the condition for the correct answer. See [blah] for reference.",
      variable_type: Boolean
    });
  }
}

class CorrectAnswer extends Answer {
  constructor() {
    super({
      name: "True/false answer",
      description: "Type the condition for the answer to be correct. See [blah] for reference.",
      variable_type: Boolean,
      translator: function (x) { if (x) { return 'correct'; } else { return 'incorrect'; } }
    });
  }
}

class NumberAnswer extends Answer {
  constructor() {
    super({
      name: "Numeric value",
      description: "Type the formula for the numeric value. See [blah] for reference.",
      variable_type: Number
    });
  }
}

// question_types is a register of QuestionType sub-classes

var question_types = [];

// QuestionType is the superclass for the different question construction objects

class QuestionType {
  constructor({
    name,
    abbreviation,
    answer_format,
    max_answers = 100,
    question_text = undefined
  }) {
    this.name = name;
    this.abbrev = abbreviation;
    this.answer_format = answer_format;
    this.multiple_answers = multiple_answers;
    this.question_text = question_text;
    this.answers = [];
    question_types.push(this);
    console.log(`Added QuestionType ${name}.`);
  }
  
  getName() { return this.name; }
  getAbbrev() { return this.abbrev; }

  addAnswerBlock() { for (let i of this.answer_format) {
    // the answer_format is a list of Answer subclasses
    // this code spins up new instances within that list, and adds the new, blank instances to the list of answers
    var answer_block = [];
    answer_block.push(new i());
    this.answers.push(answer_block);
    return true;
  }
}