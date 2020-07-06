var question_data = [
	{
		name: 'Multiple Choice',
		abbreviation: 'MC',
		answer_format: [new StringAnswer(), new CorrectAnswer()]
	},
	{
		name: 'Multiple Answer',
		abbreviation: 'MA',
		answer_format: [new StringAnswer(), new CorrectAnswer()]
	},
	{
		name: 'True / False',
		abbreviation: 'TF',
		answer_format: [new StringAnswer(), new BooleanAnswer()],
		multiple_answers: false
	},
	{
		name: 'Ordering',
		abbreviation: 'ORD',
		answer_format: [new StringAnswer()]
	},
	{
		name: 'Matching',
		abbreviation: 'MAT',
		answer_format: [new StringAnswer(), new StringAnswer()]
	},
	{
		name: 'Fill in the Blank',
		abbreviation: 'FIB',
		answer_format: [new StringAnswer()]
	},
	{
		name: 'Numeric Response',
		abbreviation: 'NUM',
		answer_format: [new NumberAnswer(), new NumberAnswer()]
	}
];