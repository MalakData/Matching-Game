/*
 * Create a list that holds all of your cards
 */
 const cards=document.querySelectorAll(".card");
 let ArrayImage=[];
 let opencard=[];
 let NumberMoves=0;
 let NumberStar=3;
 let minatues=0;
 let seconeds=0;
 let timers;

// the code is operat just one when open page is operat 
 function StartOpenPage(){
 cards.forEach(card =>{
     //add event listener cilck icone 
     card.addEventListener("click",cardsClick);


     //collect  all icone in cards
     let icone=card.children[0];
     ArrayImage.push(icone.className);
 });
 document.querySelector("#playagin").addEventListener("click",PlayAgin);
 document.querySelector("#cancel").addEventListener("click",CancelBox);
 document.querySelector(".restart").addEventListener("click",PlayAgin);
 }



 function closeCard(){
    cards.forEach(card => {
        card.className="card";
        
   
    });

 }

 
   
 



function CancelBox(){
    document.querySelector("#dalogBox").close();
}

function PlayAgin(){
    CancelBox();
    seconeds=0;
    minatues=0;
    NumberStar=3;
    NumberMoves=0;
    updataMove();
    shuffleCard();
    closeCard();
    startTime();
}

  //function is shufflecard all icon 
 function shuffleCard(){
    ArrayImage=shuffle(ArrayImage);

    let i=0;
    cards.forEach(card => {
        let  icone=card.children[0];
        icone.className=ArrayImage[i];
        i++;
        
    });

   
 }

 function cardsClick(){
     if(opencard.length<2){
        this.classList.toggle("open");
        this.classList.toggle("show");
     opencard.push(this);

 // check arra is 2 icon 
     if (opencard.length==2) {
        setTimeout(numberCard,1000);
     }
     }
 }
   
 function numberCard(){
     if (opencard.length==2){
         let frist=opencard[0];
         let seconed=opencard[1];

//comper card is match or not 
         let firstclass=frist.children[0].className;
         let secondclass=seconed.children[0].className;

         if (firstclass==secondclass){
             frist.classList.add("match");
             seconed.classList.add("match");


             opencard=[];
         }
         else{
// if card not match 
          frist.className="card";
          seconed.className="card";
          opencard=[];
          incrementMoves();

         }
         const DisplaymessageTouser=document.querySelectorAll(".card:not(.match)");
         if (DisplaymessageTouser.length==0)  {
             ShowDailog();
             
         }       
     }
     
 }

     function incrementMoves(){
// Count the number of moves 
         NumberMoves +=1;

// if compera between number of star and number of move 
         if(NumberMoves<11){
             NumberStar=3;
         }else if(NumberMoves<21){
             NumberStar=2;

         }else{
             NumberStar=1;
         }

         updataMove();
         }

// function show dailog to user is successfully game
    function ShowDailog(){
        let dailog=document.getElementById("dalogBox");
        document.querySelector("#spanofMov").innerText=NumberMoves;
        document.querySelector("#spanofStar").innerText=NumberStar;
        dailog.showModal();
        StopTime();
    }
     

   function updataMove()  {
//updata count number of moves 
       let MoveElemant=document.querySelector(".moves");
       MoveElemant.innerText=NumberMoves;
// updata number of star 
     const StarElemant=document.querySelector(".stars");
     StarElemant.innerHTML="";

     for (let i=0;i<NumberStar;i++){
         let StrainHtml="<li> <i class='fa fa-star'></i></li>";
         StarElemant.innerHTML+=StrainHtml;

     }
   }


 
 StartOpenPage();
 PlayAgin();

      function startTime(){
          if(!timers){
       timers= setInterval(function() {
        seconeds+=1;
    if (seconeds>59){
        seconeds=0;
        minatues+=1;
    }
// function format is time 
    let seconedString="";
    if(seconeds<10){
        seconedString="0"+seconeds;
    }else{
        seconedString=seconeds;
    }
    if (minatues<10){
        minatuesString="0"+minatues;
    }else{
        minatuesString=minatuesString;
    }
    document.querySelector("#time").innerText=`${minatuesString}:${seconedString}`;
},1000);

    }}
      function StopTime(){
     clearInterval(timers);
     timers=null;
      }
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
