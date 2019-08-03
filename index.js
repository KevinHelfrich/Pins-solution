function check(solution, letters) {
    var isSolution = true;
    for(var i = 0; i < letters.length; i++){
        isSolution = isSolution && checkLetter(solution, letters[i]);
    }
    return isSolution;
}

function checkLetter(solution, letter) {
    var newSln = [];
    for(var i = 0; i < solution.length; i++) {
        if(!(solution[i] === letter || solution[i] === "-"+letter)){
            newSln.push(solution[i]);
        }
    }
    var changed = true;
    while(changed){
        var temp = [];
        changed = false;
        for(var i = 0; i < newSln.length; i++) {
            if(("-"+newSln[i] === newSln[i+1])||(newSln[i] === "-"+newSln[i+1])){
                changed = true;
                i++;
            } else {
                temp.push(newSln[i]);
            }
        }
        newSln = temp;
    }
    return newSln.length === 0;
}

function genSolution(characters) {
    var sln = characters.pop();
    while(characters.length){
        var newSln = [];
        var charToReplace = pickLeastCommonChar(sln);
        var newChar = characters.pop();
        for (var i = 0; i < sln.length; i++){
            if(sln[i] === charToReplace){
                newSln.push(charToReplace);
                newSln.push(newChar);
                newSln.push("-"+charToReplace);
                newSln.push("-"+newChar);
            } else if (sln[i] === "-" + charToReplace) {
                newSln.push(newChar);
                newSln.push(charToReplace);
                newSln.push("-"+newChar);
                newSln.push("-"+charToReplace);
            } else {
                newSln.push(sln[i]);
            }
        }
        sln = newSln;
    }
    return sln;
}

function pickLeastCommonChar(solution){
    var counts = {};
    for (var i = 0; i < solution.length; i++) {
        var cahr = "";
        if(solution[i].startsWith("-")){
            char = solution[i].substring(1);
        } else {
            char = solution[i];
        }
        if(counts[char]){
            counts[char]++;
        } else {
            counts[char] = 1;
        }
    }

    var min = 1e9;
    var minChar = "";

    for (var count in counts) {
        if(counts[count] < min){
            min = counts[count];
            minChar = count;
        }
    }
    return minChar;
}

var chars = ["a","b","c","d","e","f","g","h","i","j"];
var solution = genSolution(chars);
console.log(solution.join(" "));
console.log("Length: " + solution.length);
console.log(check(solution,chars));
