QuizmasterApp.ViewModel = new QuizmasterApp.pubSub();

QuizmasterApp.ViewModel.Screen = class {
	constructor	({
		heading = "",
	}) {
		this.content = document.implementation.createHTMLDocument(heading);
		console.log(this.content);
		this.content.head.title = heading;
		this.content.body.innerHTML = `<h1>${heading}</h1>`;

		return true;
	}

	addTable({id}) {
		this.content.body.innerHTML += `<div class="divTable" id="table:${id}"></div>`;
	}

	addTableRow({id, rowId}) {
		var element = this.content.getElementById(`table:${id}`);
		var row = this.content.createElement("div");
		row.classList.add("divRow");
		row.id = `table:${id} row:${rowId}`;
		element.appendChild(row);
	}

	addTableRowCell({id, rowId, cellId, content}) {
		var element = this.content.getElementById(`table:${id} row:${rowId}`);
		var cell = this.content.createElement("div");
		cell.classList.add("divCell");
		cell.id = `table:${id} row:${rowId} cell:${cellId}`;
		cell.innerHTML = content;
		element.appendChild(cell);
	}

	displayPage() {
		document.head.title = this.content.head.title;
		document.body = this.content.body;
	}
}