var imported = document.createElement('script');
imported.src = 'js/translate.js';
document.head.appendChild(imported);

const proxyurl = "https://cors-anywhere.herokuapp.com/";  // site that send Access-Control-*
const url = "https://api.kuroshiro.org/convert"; // site that doesn’t send Access-Control-*
const dictionary = [" ",
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
const textarray = [];
const promises = [];

// value-key pair set
var setProperty = function(propertyName, value){
	textarray[propertyName] = value;
};

// value-key pair get
var getProperty = function (propertyName) {
    return textarray[propertyName];
};

function createlist(value){
	var feteched;
	var jaspan = document.createElement("span");
	var chspan = document.createElement("span");
	var li1 = document.createElement("li");
	var li2 = document.createElement("li");
	var line = document.createElement("li");
	var speakbutton = document.createElement("button");
	var ul = document.querySelector("ul");
	
	// Put scripts that require the fetched value into here
	fetchvalue(value, function(output){
		feteched = output;
		jaspan.innerHTML = feteched;
		
		translate(getProperty(feteched),function(output){
			chspan.innerHTML = output;
		});
		
		speakbutton.addEventListener("click", function(){
			console.log("Speak value:"+getProperty(feteched));
			let speechInstance = new SpeechSynthesisUtterance(getProperty(feteched));
			speechInstance.lang = "ja";
			speechSynthesis.speak(speechInstance);
		})
	});
	
	jaspan.className += "Lyrics";
	line.className += "line";
	speakbutton.innerHTML = "朗读";
	
	li1.appendChild(jaspan);
	li1.appendChild(speakbutton);
	li2.appendChild(chspan);
	ul.appendChild(line);
	ul.appendChild(li1);
	ul.appendChild(li2);
}
	
// 异步阻塞
async function createtext(values){
	var ori ="";
	var i;
	for (i = 0; i < values.length; i++) { 
		if (dictionary.indexOf(values[i]) == -1){
			ori += values[i];
		}
		else
		{
			createlist(ori);
			ori = "";
		}
	}
}

function convert(){
        document.getElementById("convertBtn").textContent="converting...";
        document.getElementById("convertBtn").disabled=true;
        var values = document.getElementById("oritext").value;
	    createtext(values);
		document.getElementById("convertBtn").textContent="convert";
        document.getElementById("convertBtn").disabled=false;
    }

	
function fetchvalue(oritext, handleData){
	fetch(proxyurl + url,{
            method: 'POST',
            headers: {
				'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                str: oritext,
                to:"hiragana",
				mode:"furigana"   
			})
        })
            .then((resp)=>{
                if(resp.ok){
                    return resp.json();
                }else if(resp.status == 429){
                    console.log("Error: Too many request. Please try again later.");
                    throw new Error("Too many request");
                }else{
                    console.log("Error: Something wrong. Please try again later.");
                    throw new Error("Something wrong");
                }
            })
            .then((result)=>{
				console.log("result:"+result.result);
				setProperty(result.result, oritext);
				handleData(result.result); 
            })
            .catch((err)=>{
                console.error(err);
				console.log("Error: Something wrong. Please try again later.");
            })
}