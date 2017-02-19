    $(document).ready(function() {
        //create an array for the letters and a for loop to create buttons	
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var clubs = ["ORLANDO-CITY", "MANCHESTER-UNITED", "BARCELONA", "LIVERPOOL", "TOTTENHAM", "REAL-MADRID", "CHELSEA", "RIVER-PLATE", "MANCHESTER-CITY", "BAYERN-MUNICH", "BORUSSIA-DORTMUND", "ARSENAL", "JUVENTUS"];
        var winAudio = ["win1.mp3", "win2.mp3", "win3.mp3", "win4.mp3", "win5.mp3"];
        var loseAudio = ["lose1.mp3", "lose2.mp3", "lose4.mp3"];
        var playerGuess;
        //for loop to create used letter squares
        for (var i = 0; i < letters.length; i++) {
            var letterBtn = $("<used>");
            letterBtn.addClass("letter-button letter letter-button-color");
            letterBtn.attr("data-letter", letters[i]);
            letterBtn.text(letters[i]);
            $("#buttons").append(letterBtn);

        }

        //initialize variables and link them to their elements.
        var remainingGuesses = 5;
        $("#guessesId").html(remainingGuesses);
        var wins = 0;
        $("#winsId").html(wins);
        var losses = 0;
        $("#lossesId").html(losses);
        var alreadyGuessed = [];
        $("#guessedId").html(alreadyGuessed);


        //get a random name from the clubs array and assign it to the secret word
        var secretWord = clubs[Math.floor(Math.random() * clubs.length)];

        //put each letter of the secret word into an array
        var secretWordArray = secretWord.split("");


        //create a loop to turn the secret word into dashes
        //if there's a space, replace it with a dash
        for (i = 0; i < secretWordArray.length; i++) {
            var hiddenWord = $("<div>");
            hiddenWord.addClass(secretWordArray[i]);
            hiddenWord.addClass("hiddenLetter");
            if (secretWordArray[i] === "-") {
                hiddenWord.html("-");
            } else {
                hiddenWord.html("_ ");
            }
            $("#secretWordId").append(hiddenWord);
        }

        document.onkeyup = function(event) {
            var found = false;
            playerGuess = event.key;
            playerGuess = playerGuess.toUpperCase();
            if (validLetter(playerGuess, letters)) {
                $('[data-letter="' + playerGuess + '"]').css("background-color", "#000000");
                for (i = 0; i < secretWordArray.length; i++) {
                    if (playerGuess === secretWordArray[i]) {
                        $("." + playerGuess).html(playerGuess);
                        found = true;
                        checkWinner();
                    }
                }
                if (found === false) {
                    alreadyGuessed.push(playerGuess);
                    $("#guessedId").html(alreadyGuessed);
                    remainingGuesses = (remainingGuesses - 1);
                    $("#guessesId").html(remainingGuesses);
                    if (remainingGuesses === 0) {
                        loser();
                    }
                }

            }
        };

        function validLetter(playerGuess, letters) {
            var count = letters.length;
            for (i = 0; i < count; i++) {
                if (letters[i] === playerGuess) {
                    return true;
                }
            }
            return false;
        }

        function myFunction() {
            var str = "Hello World!";
            var res = str.toUpperCase();
            document.getElementById("demo").innerHTML = res;
        }

        //this will play a random losing audio file and reset.
        function loser() {
            losses++;
            $("#lossesId").html(losses);
            var randomFile = "assets/audio/" + loseAudio[Math.floor(Math.random() * loseAudio.length)];
            var audio = new Audio(randomFile);
            audio.play();
            audio.onended = function() {
                reset();
            }
        }
        //this will play a random winning audio file and reset.
        function winner() {
        	wins++;
        	$("#winsId").html(wins);
            var randomFile = "assets/audio/" + winAudio[Math.floor(Math.random() * winAudio.length)];
            var audio = new Audio(randomFile);
            audio.play();
            audio.onended = function() {
                reset();
            }
        }

        //this will have to reset everything
        //on a win or a loss.
        function reset() {

        }
        //this will have to check for a winner
        //after every guess.
        function checkWinner() {
            console.log("secrewordid is " + secretWordId.textContent);
            console.log("hiddenWord is " + secretWord);
            if (secretWordId.textContent === secretWord) {
                winner();

            };
        }

    });
