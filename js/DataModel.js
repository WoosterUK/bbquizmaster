var question_types = {};

class QuestionType {
  constructor({
    name,
    abbreviation,
    answer_format,
    multiple_answers = true
  }) {
    this.name = name;
    this.abbrev = abbreviation;
    this.answer_format = answer_format;
    this.multiple_answers = multiple_answers;
  }
  
  getName() { return this.name; }
  getAbbrev() { return this.abbrev; }
}

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
      translator: function(x) { if x { return 'correct'; } else { return 'incorrect'; } }
    });
  }
}

question_types.push(
  new QuestionType(
    {
      name: 'Multiple Choice',
      abbreviation: 'MC',
      answer_format: [new StringAnswer(), new CorrectAnswer()]
    }
  )
);
