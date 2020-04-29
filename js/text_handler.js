var imported1 = document.createElement('script');
imported1.src = 'js/translate_jap_to_chi.js';  // translateJapToChi(query, handleData)
var imported2 = document.createElement('script');
imported2.src = 'js/fetch_hiragana.js'; // fetchHiragana(text, handleData)
var imported3 = document.createElement('script');
imported3.src = 'js/search_dictionary.js'; // createButtonsByTagNameInElement(htmlElement, tag)
document.head.appendChild(imported1);
document.head.appendChild(imported2);
document.head.appendChild(imported3);



const dictionary = ['、',
					'，',
					" ",
					",",
					"，", 
					"、",
					"·",
					".",
					"。",
					"!",
					"！",
					"?",
					"？"]
var textArray = [];
var rubyText = [];

// value-key pair set
var setProperty = function(propertyName, value){
	textArray[propertyName] = value;
};

// value-key pair get
var getProperty = function (propertyName) {
    return textArray[propertyName];
};

// 根据断句创建html列表
function createlist(value){
	var feteched;
	var jaSpan = document.createElement("span");
	var chSpan = document.createElement("span");
	var li1 = document.createElement("li");
	var li2 = document.createElement("li");
	var line = document.createElement("li");
	var speakButton = document.createElement("button");
	var redirectButton = [];
	var ul = document.querySelector("ul");
	var searchButtons = [];
	
	// Put scripts that require the fetched value into here
	// Use Output after the fectching finish
	fetchHiragana(value, function(output){
		feteched = output;
		jaSpan.innerHTML = feteched;
		
		// 添加汉字按钮
		searchButtons = createButtonsByTagNameInElement(jaSpan, "ruby")
						.forEach(child => {
							if (Array.isArray(child)) {
							  child.forEach(child => li1.appendChild(child))
							} else {
							  li1.appendChild(child);
							}
						});
		
		
		// 翻译句子
		// Set translated value after the translation finish
		translateJapToChi(getProperty(feteched),function(output){
			chSpan.innerHTML = output;
		});
		
		// 设定朗读功能
		speakButton.addEventListener("click", function(){
			console.log("Speak value:"+getProperty(feteched));
			let speechInstance = new SpeechSynthesisUtterance(getProperty(feteched));
			speechInstance.lang = "ja";
			speechSynthesis.speak(speechInstance);
		})
	});
	
	jaSpan.className += "Lyrics";
	line.className += "line";
	speakButton.innerHTML = "朗读";
	li1.appendChild(jaSpan);
	li1.appendChild(speakButton);
	
	li2.appendChild(chSpan);
	ul.appendChild(line);
	ul.appendChild(li1);
	ul.appendChild(li2);
}
	
// 异步阻塞创建断句
async function createtext(values){
	var ori ="";
	var i;
	for(var i = 0;i < values.length;i++){
		if (dictionary.hasOwnProperty(values[i])){
			createlist(ori);
			ori = "";
		}
		else
		{
			ori += values[i];
		}
		
		if((i+1) == values.length){
			createlist(ori);
			ori = "";
		}
	}
}

// 入口
function convert(){
	document.getElementById("convertBtn").textContent="converting...";
	document.getElementById("convertBtn").disabled=true;
	var values = document.getElementById("oritext").value;
	createtext(values);
	document.getElementById("convertBtn").textContent="convert";
	document.getElementById("convertBtn").disabled=false;
}
	
function clear(){
	console.log("I am clearing");
	var ul = document.querySelector("ul");
	while(ul.firstChild){
		ul.removeChild(ul.firstChild);
	}
}