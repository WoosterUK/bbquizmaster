var question_data = [
	{
		name: 'Multiple Choice',
		abbreviation: 'MC',
		answer_format: [StringAnswer, CorrectAnswer]
	},
	{
		name: 'Multiple Answer',
		abbreviation: 'MA',
		answer_format: [StringAnswer, CorrectAnswer]
	},
	{
		name: 'True / False',
		abbreviation: 'TF',
		answer_format: [StringAnswer, BooleanAnswer],
		max_answers: 1
	},
	{
		name: 'Ordering',
		abbreviation: 'ORD',
		answer_format: [StringAnswer]
	},
	{
		name: 'Matching',
		abbreviation: 'MAT',
		answer_format: [StringAnswer, StringAnswer]
	},
	{
		name: 'Fill in the Blank',
		abbreviation: 'FIB',
		answer_format: [StringAnswer]
	},
	{
		name: 'Numeric Response',
		abbreviation: 'NUM',
		answer_format: [NumberAnswer, NumberAnswer],
		max_answers: 1
	}
];