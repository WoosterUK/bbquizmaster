var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src','https://unpkg.com/mathjs@7.0.2/dist/math.min.js');
document.head.appendChild(jQueryScript);

QuizmasterApp.QuestionTypes = [];
for (const item of question_data) {
	console.log(item.name);
	QuizmasterApp.QuestionTypes.push(new QuizmasterApp.QuestionType(item));
}

QuizmasterApp.pubSub = class {
	constructor () {
		const subscribers = {};

		function publish(eventName, data) {
			if (!Array.isArray(subscribers[eventName])) {
				return;
			}
			subscribers[eventName].foreach((callback) => {callback(data)});
		}

		function subscribe(eventName, callback) {
			if(!Array.isArray(subscribers[eventName])) {
				subscribers[eventName] = [];
			}
			subscribers[eventName].push(callback);
			const index = subscribers[eventName].length - 1;

			return {
				unsubscribe() {
					subscribers[eventName].splice(index,1);
				}
			}
		}
	}
}