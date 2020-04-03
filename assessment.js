"use strict";
const userNameInput = document.getElementById("user-name");
const assessmentButton = document.getElementById("assessment");
const resultDivided = document.getElementById("result-area");
const tweetDivided = document.getElementById("tweet-area");
const answers = [
  "{userName}は合格",
  "{username}は追加合格",
  "{userName}は不合格A",
  "{userName}は不合格B",
  "{userName}は不合格C",
  "{userName}は不合格D",
  "{userName}は不合格E"
];
/**
* 名前をもらって合否を返す関数
* @param {string} userName ユーザーの名前
* @return {string} 合否
*/
function assessment(userName){
    let sumOfCharCode = 0;
    for(let i=0;i<userName.length;i++){
        sumOfCharCode += userName.charCodeAt(i);
    }
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName);
    return result;
}

function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = ()=>{
    const userName = userNameInput.value;
    if(userName.length===0) return ;
    //合否表示
    removeAllChildren(resultDivided);
    const header = document.createElement("h3");
    header.innerText = "合否";
    resultDivided.appendChild(header);

    const paragraph = document.createElement("p");
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    removeAllChildren(tweetDivided);
    const anchor = document.createElement("a");
    const hrefValue ="https://twitter.com/intent/tweet?button_hashtag="
    +encodeURIComponent("飯田橋大開示祭り2020")
    +"&ref_src=twsrc%5Etfw";

    anchor.setAttribute("href",hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute("data-text",result);
    anchor.innerText = "合否をみんなに教えてあげよう！"
    tweetDivided.appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src","https://platform.twitter.com/widgets.js");
    tweetDivided.appendChild(script);
}
