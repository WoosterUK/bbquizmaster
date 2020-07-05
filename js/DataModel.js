var question_types = {};

class QuestionType {
  constructor({
    name,
    abbreviation,
    answer_format,
    answer_translator = undefined,
    multiple_answers = true
  }) {
    this.name = name;
    this.abbrev = abbreviation;
    this.answer_format = answer_format;
    this.answer_translator = answer_translator;
    this.multiple_answers = multiple_answers;
  }
  
  getName() { return this.name; }
  getAbbrev() { return this.abbrev; }
}

question_types.push(
  new QuestionType(
    {
      name: 'Multiple Choice',
      abbreviation: 'MC',
      answer_format: [String, Boolean],
      answer_translator: function(a) { if a[1] { return [a[0], 'correct']; } else { return [a[0], 'incorrect']; } }
    }
  )
);
