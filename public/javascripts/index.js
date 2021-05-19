let dpstimer = document.querySelector("#timer");
let output = document.querySelector("#output");
let start  = new Date();
let btnstart = document.querySelector(".gamestart");
let btndspell = document.querySelectorAll(".dspell");
let btncopy = document.querySelector(".resultCopy");
let bstart = 0;
let dspell  = [0,0,0,0,0];
let f_dspell  = [0,0,0,0,0];
let position  = ["top","jg","mid","ad","sup"];
//dpstimer.innerHTML  = "12345678"

btnstart.onclick = function (){
    //console.log("clicked!");
    start = new Date();
    bstart = 1;
    for(var i = 0 ; i < 5 ; i++){
        f_dspell[i] = 0;
        btndspell[i].value = "D_spell";
    }
}


btncopy.onclick = function(){
    
    
    const element = document.createElement('textarea');
    element.value = output.innerHTML;
    console.log( element.value );
    element.setAttribute('readonly', '');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    element.select();
    var returnValue = document.execCommand('copy');
    document.body.removeChild(element);

    if (!returnValue) {
        throw new Error('copied nothing');
  }

}


function listener(index) {
    dspell[index] = parseInt((new Date().getTime() - start.getTime())/1000);
    if(f_dspell[index] == 0)
        f_dspell[index] = 1;
    else
       f_dspell[index] = 0;
}

for(var i = 0; i < btndspell.length ; i++)
{
    btndspell[i].addEventListener('click', listener.bind( null, i));
}

function spellTimer(gametime,btn,index,now){
    
    //console.log(parseInt((now.getTime() - dspell[index])/1000));
    var timer;
    timer = 300 + dspell[index] - gametime;
    //console.log("timer",timer,dspell[index],gametime);
    if(timer > 0)
        btn.value = timer;
    else {
        btn.value = "D_spell";
        f_dspell[index] = 0;
    }
    return btn.value;
}

var x = setInterval(function(){
   
    if(bstart ==0){
        dpstimer.innerHTML  = "00:00:00";
    }
    else{
        let now = new Date();
        let gameTime = parseInt((now.getTime()-start.getTime())/1000);
        let result = ""
        for(var i = 0; i < btndspell.length ; i++)
        {
            if(f_dspell[i] == 1){
                spellTimer(gameTime,btndspell[i],i,now);
                result += position[i];
                result += dateToString(dspell[i]+300, 11, "");
                result += "  "
            }
            //console.log(btndspell[i].parentNode.firstChild.textContent);
            
        }
        let string = dateToString(parseInt(gameTime));       
        dpstimer.innerHTML  = string;
        output.innerHTML = result;
    }
},1000);


function dateToString(timer,display = 111, interval = ':'){
    
    let string = "";
    
    if(display/100 >= 1){
        string += (parseInt(timer/3600)) >= 10 ? (parseInt(timer/3600)).toString(10): '0' +(parseInt(timer/3600)).toString(10);
        string += interval;
    }
    if((display/10)%10 >= 1){
        string += (parseInt(timer/60)%60) >= 10 ? (parseInt(timer/60)%60).toString(10) : '0'+(parseInt(timer/60)%60).toString(10);
        string += interval;
    }
    if(display%10 >= 1){
    string += (timer%60) >= 10 ? (timer%60).toString(10) :'0' +(timer%60).toString(10) ;
    }
    return string;
}


/////////////////////////////////////////////////////////

