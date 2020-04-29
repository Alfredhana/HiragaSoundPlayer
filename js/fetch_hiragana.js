
// 异步阻塞回传hiragana语句
function fetchHiragana(oritext, handleData){
	var proxyUrl = "https://cors-anywhere.herokuapp.com/";  // site that send Access-Control-*
	var url = "https://api.kuroshiro.org/convert"; // site that doesn’t send Access-Control-*
	fetch(proxyUrl + url,{
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
			setProperty(result.result, oritext);
			handleData(result.result); 
		})
		.catch((err)=>{
			console.error(err);
			console.log("Error: Something wrong. Please try again later.");
		})
}