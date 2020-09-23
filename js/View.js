var IntroScreen = new QuizmasterApp.ViewModel.Screen({heading: "Welcome to Blackboard Quizmaster"});
console.log(IntroScreen);
IntroScreen.addTable({id: "structure"});
IntroScreen.addTableRow({id: "structure", rowId: "header"});
IntroScreen.addTableRowCell({id: "structure", rowId: "header", cellID: "options", content: "Choose your question type."});
for (const item of QuizmasterApp.QuestionTypes) {
	var name = item.name;
	var abbrev = item.abbrev;
	IntroScreen.addTableRow({id: "structure", rowId: `q_${abbrev}`});
	var btn = `<button type="button">${name}</button>`
	IntroScreen.addTableRowCell({id: "structure", rowId: `q_${abbrev}`, cellId: "options", content: btn});
}
IntroScreen.displayPage();