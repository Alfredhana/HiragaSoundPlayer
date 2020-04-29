// wiktionary is great japanese kanji web
var dictinonaryUrl = "https://ja.wiktionary.org/wiki/";

function search_dictionray(word){
	var url = dictinonaryUrl + word;
	window.open(url,word)
}

function getKanji(word){
	var nonCharIndex = word.indexOf("<");
	return word.slice(0, nonCharIndex);
}

function createButtonsByTagNameInElement(htmlElement, tag){
	var tags = htmlElement.getElementsByTagName(tag);
	var buttons = [];
	var tagInnerHtml = [];
	for (var i = 0; i < tags.length; i++){
		var newButton = document.createElement("button");
		tagInnerHtml[i] = getKanji(tags[i].innerHTML);
		newButton.innerHTML = "查一查\”" + tagInnerHtml[i] + "\"";
		(function(x){
			newButton.addEventListener("click", function(){
				search_dictionray(x);
				console.log(x);
			})
		})(tagInnerHtml[i])
		buttons.unshift(newButton);
	}
	return buttons;
}