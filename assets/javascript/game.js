    $(document).ready(function() {
        //create an array for the letters and a for loop to create buttons	
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        var clubs = ["ORLANDO_CITY", "MANCHESTER_UNITED", "BARCELONA", "LIVERPOOL", "TOTTENHAM", "REAL_MADRID", "CHELSEA", "RIVER_PLATE", "MANCHESTER_CITY", "BAYERN_MUNICH", "BORUSSIA_DORTMUND", "ARSENAL", "JUVENTUS"];
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
        $("#secretWordId").html(secretWord);

        //put each letter of the secret word into an array
        var secretWordArray = secretWord.split("");
        console.log(secretWordArray);

        //create a loop to turn the secret word into dashes
        //if there's a space, replace it with a dash
        for (i = 0; i < secretWordArray.length; i++) {
            var hiddenWord = $("<div>");
            hiddenWord.addClass(secretWordArray[i]);
            hiddenWord.addClass("hiddenLetter");
            if (secretWordArray[i] === "_") {
                hiddenWord.html(" - ");
            } else {
                hiddenWord.html("_ ");
            }
            $("#secretWordId2").append(hiddenWord);
        }

        document.onkeyup = function(event) {
            var found = false;
            playerGuess = event.key;
            if (validLetter(playerGuess, letters)) {
                alert("You guessed " + playerGuess);
                for (i = 0; i < secretWordArray.length; i++) {
                    if (playerGuess === secretWordArray[i]) {
                        $("." + playerGuess).html(playerGuess);
                        found = true;
                    }
                }
                if (found === false) {
                    alert(playerGuess + " IS NOT IN THE PUZZLE!");
                    alreadyGuessed.push(playerGuess);
                    $("#guessedId").html(alreadyGuessed);
                    $('[data-letter="' + playerGuess + '"]').css("background-color", "#000000");
                    remainingGuesses = (remainingGuesses - 1);
                    alert("you have " + remainingGuesses + " guesses remaining!");
                    $("#guessesId").html(remainingGuesses);
                    if (remainingGuesses === 0) {
                        alert("YOU LOSE!");
                        losses++;
                        $("#lossesId").html(losses);

                    }
                } else if (found === true) {
                    alert(playerGuess + " IS IN THE PUZZLE!");
                    console.log($("#secretWordId"));
                }

            }
        };

        function validLetter(playerGuess, letters) {
            var count = letters.length;
            for (i = 0; i < count; i++) {
                if (letters[i] === playerGuess) {
                    return true; }
            }
            return false;
        }



    });
