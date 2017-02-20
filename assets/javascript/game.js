    $(document).ready(function() {
        // create array for letters (buttons and for validation)
        var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        //array for answer words
        var clubs = ["ORLANDO-CITY", "MANCHESTER-UNITED", "BARCELONA", "LIVERPOOL", "TOTTENHAM", "REAL-MADRID", "CHELSEA", "RIVER-PLATE", "MANCHESTER-CITY", "BAYERN-MUNICH", "BORUSSIA-DORTMUND", "ARSENAL", "JUVENTUS", "NEW-YORK-RED-BULLS", "LOS-ANGELES-GALAXY", "ATLANTA-UNITED", "BOCA-JUNIORS", "WEST-HAM-UNITED", "EVERTON", "ATLETICO-MADRID", "INTER-MILAN", "AC-MILAN", "PARIS-SAINT-GERMAIN", "LEICESTER-CITY", "STOKE-CITY"];
        //array for win/lose audio files to be able to select a random file
        var winAudio = ["win1.mp3", "win2.mp3", "win3.mp3", "win4.mp3", "win5.mp3"];
        var loseAudio = ["lose1.mp3", "lose2.mp3", "lose3.mp3", "lose4.mp3"];

        //for loop to create used letter squares
        //(borrowed from fridge game)
        for (var i = 0; i < letters.length; i++) {
            var letterBtn = $("<used>");
            letterBtn.addClass("letter-button letter letter-button-color");
            letterBtn.attr("data-letter", letters[i]);
            letterBtn.text(letters[i]);
            $("#buttons").append(letterBtn);

        }

        //initialize variables and link them to their elements
        var playerGuess;
        var remainingGuesses = 6;
        $("#guessesId").html(remainingGuesses);
        var wins = 0;
        $("#winsId").html(wins);
        var losses = 0;
        $("#lossesId").html(losses);
        var alreadyGuessed = [];
        $("#guessedId").html(alreadyGuessed);




        //start game on button press
        $(".btn-success").on("click", function() {
            var gameOver = false;
            reset();
            //get a random name from the clubs array and assign it to the secret word
            var secretWord = clubs[Math.floor(Math.random() * clubs.length)];

            //put each letter of the secret word into an array
            var secretWordArray = secretWord.split("");
            //create a loop to turn the secret word into dashes
            //if there's a dash, replace it with a dash instead of an underscore
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
            //make sure game isn't over when key is pressed, before allowing a guess
            document.onkeyup = function(event) {
                if (gameOver === false) {
                    var found = false;
                    playerGuess = event.key;
                    playerGuess = playerGuess.toUpperCase();

                    //make sure only A-Z keys are pressed, convert to uppercase
                    //and mark letter button as used regardless of if it's in the 
                    //secret word or not
                    if (validLetter(playerGuess, letters)) {
                        $('[data-letter="' + playerGuess + '"]').css("color", "#cc0000");
                        $('[data-letter="' + playerGuess + '"]').css("opacity", "0.2");

                        for (i = 0; i < secretWordArray.length; i++) {
                            if (playerGuess === secretWordArray[i]) {
                                $("." + playerGuess).html(playerGuess);
                                found = true;

                            }

                        }
                        checkWinner();
                        //if letter isn't found, check to see if it's already been
                        //guessed before deducting a guess. afterward, push to the 
                        //already guessed array.
                        if (found === false) {


                            console.log(isDupe(playerGuess, alreadyGuessed));
                            if (isDupe(playerGuess, alreadyGuessed) === false) {
                                remainingGuesses = (remainingGuesses - 1);

                            }
                            //warn the user that they have one life left,
                            //by turning the field red.
                            if (remainingGuesses === 1) {
                                $("#guessesId").css("color", "red")
                            }
                            if (remainingGuesses === 0) {
                                $("#guessesId").html(remainingGuesses);
                                loser();
                            } else {
                                $("#guessesId").html(remainingGuesses);
                            }
                        }
                        alreadyGuessed.push(playerGuess);
                    }
                }
            };




            //validates key press is in letters array
            //prevents weird keystroke entries
            function validLetter(playerGuess, letters) {
                var count = letters.length;
                for (i = 0; i < count; i++) {
                    if (letters[i] === playerGuess) {
                        return true;
                    }
                }
                return false;
            }
            //if letter isn't found, see if it has already
            //been entered
            function isDupe(playerGuess, alreadyGuessed) {
                var count = alreadyGuessed.length;
                for (i = 0; i < count; i++) {
                    if (alreadyGuessed[i] === playerGuess) {
                        return true;
                    }
                }
                return false;
            }

            //this will play a random losing audio file and reset.
            function loser() {
                gameOver = true;
                losses++;
                $("#secretWordId").css("color", "red");
                $("#lossesId").html(losses);
                var randomFile = "assets/audio/" + loseAudio[Math.floor(Math.random() * loseAudio.length)];
                var audio = new Audio(randomFile);
                audio.play();
            }
            //this will play a random winning audio file and reset.

            //this will reset everything
            //on a win or a loss.
            function reset() {
                $("#guessesId").css("color", "white");
                $(".btn-success").html("Restart!");
                $("#instructions").html("Press a key to play!");
                $("#guessesId").empty();
                $("#guessesId").empty();
                $("#secretWordId").empty();
                $("#secretWordId").css("color", "white");
                $('.letter').css("background-color", "#E4B92E");
                $('.letter').css("opacity", "1");
                $('.letter-button-color').css("color", "#ffffff");
                remainingGuesses = 6;
                $("#guessesId").html(remainingGuesses);
                alreadyGuessed = [];
            }
            //this will have to check for a winner
            //after every guess.
            function checkWinner() {
                if (secretWordId.textContent === secretWord) {
                    console.log(secretWordId.textContent);
                    console.log(secretWord);
                    wins++;
                    gameOver = true;
                    $("#secretWordId").css("color", "#00a800");
                    $("#secretWordId").css("letter-spacing", "2px");
                    $("#winsId").html(wins);
                    var randomFile = "assets/audio/" + winAudio[Math.floor(Math.random() * winAudio.length)];
                    var audio = new Audio(randomFile);
                    audio.play();
                }

            };

        });
    });
