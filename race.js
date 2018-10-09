// Rod Ornellas - JS Developer - www.rodster.website
// ============================================
// VARIABLE DECLARATION

var frontRUNNER;        // position of the most ADVANCED runner
var result;     		// var that controls if in that the each iteration the RACE has ended or not
var controle;   		// variable that controls the TIMER of the SETINTERVAL
var posT;       		// position of the TURTLE
var posR;       		// position of the RABBIT
var jT;         		// number of STEPS the turtle needs to take
var jR;         		// number of STEPS the rabbit needs to take
var count;       		// number of ROUNDS the RACE took to end

// length of the RACE
racelen = 70;


// HTML tags used to display INFORMATION to the USER
var imgname;
var finito;
var writePOS;
var writeCOUNT;
var runner1;
var runner2;
var drawTRACK;



function start()
{
    document.getElementById("goButton").addEventListener("click", main, false);
}  // end of START function



function main()
{

    // STEP 1: initilizing all variables
    cleanScreen();

    // STEP 2: enter the loop inside the SETINTERVAL
    controle = setInterval(looped, 1000);

}  // end of MAIN function



function cleanScreen()
{
    // This function allows the user to start a NEW race using the START BUTTON
    // the variables are RESET and INIALIZED at the beggining of each race.


    // clearing the HTML tags with information for the USER
    finito = document.getElementById("finale");
    finito.innerHTML = " BANG!! AND THEY'RE OFF!!! ";

    runner1 = document.getElementById("turtle");
    runner1.innerHTML = "<td>T</td>";

    runner2 = document.getElementById("hare");
    runner2.innerHTML = "<td>H</td>";

    writePOS = document.getElementById("position");
    writePOS.innerHTML = "Current Position of Front Runner: ";

    writeCOUNT = document.getElementById("counter");
    writeCOUNT.innerHTML = "Clock: ";


    imgname = document.getElementById("imageRES");
imgname.setAttribute( "src", "blank.jpg");


    // INITIALIZING the variables
    frontRUNNER = 0;
    result = 0;
    controle = 0;
    posT = 1;
    posR = 1;
    jT = 0;
    jR = 0;
    count =0;


    // create a the track of the RACE
    drawTRACK = document.getElementById("track");
    for (i=1; i <= racelen; i++)
    {
      drawTRACK.innerHTML = drawTRACK.innerHTML + "<td>" +  i + "</td>";
    }


}


  function jumpdisplay( pos, jump, id)
  {

        if (pos + jump <= 0)
        {
          pos = 1;
        }
        else
        {
          pos = pos + jump;
          if (pos > racelen)
          {
            pos = racelen;
          }
        }
        displayRunner(pos, id);

        return pos;

  }




function looped()
{


    // ===================================================================================
      // 1. Get the RANDOM number from the function JUMP for the TURTLE and then the RABBIT

      jT = parseInt(jumpT());
      jR = parseInt(jumpR());

      posT = jumpdisplay( posT, jT, "turtle");
      posR = jumpdisplay( posR, jR, "hare");


     // ===================================================================================
     // 2. identify and controls the position of the ANIMAL in front
      frontRUNNER = Math.max(posT, posR);
      writePOS = document.getElementById("position");
      writePOS.innerHTML = "Current Position of Front Runner: " + frontRUNNER;

      writeCOUNT = document.getElementById("counter");
      writeCOUNT.innerHTML = "Clock: " + count + " sec";


      // 3. Checks if there has been a WINNER in this ROUND and the RACE has ENDED or NOT
      result = checkWINNER(posR, posT);

      // 3. Counts the Number of ROUNDS the race took
      count = count + 1;


      // 4. Rabbit and Turtle are in the same position
      if ((posT == posR) && (count != 1))
      {
        finito.innerHTML = "OUCH !!!";
      }
      else
      {
        finito.innerHTML = "";
      }


      // 5. DISPLAYS the RESULT of the RACE
      // 	result variable comes from the "checkWINNER" function

      if ((frontRUNNER >= racelen) && (result != 100))
      {

          // breaks the LOOP
          clearInterval(controle);

          // PRINTS the RESULT to the screen
          finito = document.getElementById("finale");
          imgname = document.getElementById("imageRES");
          switch (result)
          {
            case 0:
                // window.alert("The RABBIT has won!");
                finito.innerHTML = "HARE WINS! YUCK!!!";
    imgname.setAttribute( "src", "rabbit.jpg");

                break;
            case 1:
                // window.alert("The TURTLE has won!");
                finito.innerHTML = "TORTOISE WINS!! YAY!";
    imgname.setAttribute( "src", "turtle.jpg");
                break;
            case -1:
                // window.alert("OOoohhh...the RACE has ended on a TIE!");
                finito.innerHTML = breakatie();
       }
     }


}  // END of LOOPED function


// Function to break a TIE between the HARE and TORTOISE
function breakatie()
{
  if ( (posT+jumpT()) > (posR + jumpR()))
  {
    return "OOoohhh...it's a TIE!<br>But if the race continued, the Tortoise would have WON!";
  }

  if ( (posT+jumpT()) < (posR + jumpR()))
  {
    return "OOoohhh...it's a TIE!<br>But if the race continued, the Hare would have WON!";
  }

  if ( (posT+jumpT()) == (posR + jumpR()))
  {
    return "OOoohhh...it's a TIE!<br>but if the race continued, the next round would be a tie again!";
  }
}


// DISPLAY runners on the HTML TABLE
function displayRunner( pos, id )
{
    var writeTABLE = document.getElementById(id);
    writeTABLE.innerHTML = " ";

    for(i = 1; i <= pos; i++)
    {
        writeTABLE.innerHTML = writeTABLE.innerHTML + "<td>" + id.charAt(0) + "</td>";
    }

}


// CHECKS whether the RACE has ENDED and identifies the WINNER
function checkWINNER( rab, tur )
{
  switch (true)
  {
    case (rab >= racelen && tur < racelen):
      return 0;  // rab is WINNER
      break;

    case (tur >= racelen && rab < racelen):
      return 1;   // tur is winner
      break;

    case (tur == rab && tur >= racelen):
      return -1; // it is a TIE
      break;

    default:
      return 100;  // STILL RACING
  }
}

// generates the RANDOM number that will define the JUMP of the TURTLE
function jumpT()
{
    var tur = Math.floor(Math.random() * 10 + 1);
  switch (tur)
  {
    case 1:
    case 2:
        case 3:
        case 4:
        case 5:
            return 3;
            break;
        case 6:
        case 7:
            return -6;
            break;
        case 8:
        case 9:
        case 10:
            return 1;
  }
}

// generates the RANDOM number that will define the JUMP of the RABBIT
function jumpR()
{
    var rab = Math.floor(Math.random() * 10 + 1);
    switch (rab)
    {
        case 1:
        case 2:
            return 0;
            break;
        case 3:
        case 4:
            return 9;
            break;
        case 5:
            return -12;
            break;
        case 6:
        case 7:
        case 8:
            return 1;
            break;
        case 9:
        case 10:
            return -2;
    }
}


// WAITS for the HTML page to LOAD before starting the javascript functions
window.addEventListener("load", start, false);
