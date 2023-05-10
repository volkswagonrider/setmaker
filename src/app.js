var body = document.getElementById("body");
var table;
var headerNames = ["", "", "Stars", "Nature", "", "", "", "Moves"];
var subHeaderNames = ["Kinalite", "Set Name", "HP", "Energy", "Attack", "Defense", "Attack R", "Defense R", "Speed", "1st", "2nd", "Ability", "Item", "Relic", "Level", "Move 1", "Move 2", "Move 3", "Move 4"]
let allElements = [];

function createTable() {
    table = document.createElement("table");
    table.className = "gridtable";

    let thead = document.createElement("thead");
    let tSubHead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let headerRow = document.createElement("tr");
    let subHeaderRow = document.createElement("tr");

    headerNames.forEach(function (k) {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(k));
        if (k == "Stars") {
            th.colSpan = 7;
        }
        if (k == "Nature") {
            th.colSpan = 2;
        }
        if (k == "Moves") {
            th.colSpan = 4;
        }

        headerRow.appendChild(th);
    });

    subHeaderNames.forEach(function (k) {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(k));
        subHeaderRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    tSubHead.appendChild(subHeaderRow);
    
    tbody = createTenRows(tbody);

    table.appendChild(thead);
    table.appendChild(tSubHead);
    table.appendChild(tbody);

    body.appendChild(table);

}

function saveSets() {
    let sets = {};

    for (let row in allElements) {
        if (allElements[row][1].value == "" || allElements[row][1].value == undefined) {
            break;
        }
        let set = createSet(allElements[row]);
        sets[set.setName] = set;
        console.log(set.ability);
    } 

    if (Object.keys(sets).length != 0) {
        let json = JSON.stringify(sets);
        let pakoStuff = pako.deflate(json, {to: "string"});
        let encoded = btoa(pakoStuff);
        document.getElementById("export").value = encoded;
        document.getElementById("export").select();
        document.execCommand("copy");
        alert("Copied to clipbord");
    }
}
function createSet(row) {
    let set = {};

    set.name = row[0].value;
    set.setName = row[1].value;


    set.evs = {};
    set.evs.hp = row[2].value;
    set.evs.energy = row[3].value;
    set.evs.attack = row[4].value;
    set.evs.defense = row[5].value;
    set.evs.attackR = row[6].value;
    set.evs.defenseR = row[7].value;
    set.evs.speed = row[8].value;
    
    set.posNature = row[9].value;
    set.negNature = row[10].value;


    set.ability = row[11].value;
    set.item = row[12].value;
    set.relic = row[13].value;
    set.level = row[14].value;

    set.moves = {};
    set.moves.move1 = row[15].value;
    set.moves.move2 = row[16].value;
    set.moves.move3 = row[17].value;
    set.moves.move4 = row[18].value;

    return set;
}
function createHeader(text) {
    let hr = document.createElement("th");
    hr.innerHTML = text;
    return hr;
}

function createRow() {
    let row = document.createElement("tr");
    let elements = [];

    let pokeDropdown = createPokeDropdown();
    let setNameInput = createTextInput();
    
    let hpEV = createInput(0, 5);
    let energyEV = createInput(0, 5);
    let atkEV = createInput(0, 5);
    let defEV = createInput(0, 5);
    let atkREV = createInput(0, 5);
    let defREV = createInput(0, 5);
    let spdEV = createInput(0, 5);


    let posNat = createPosNatureDropdown();
    let negNat = createNegNatureDropdown();
    //let veryNat = createVeryNatureDropdown();

    let abilityDropdown = createAbilityDropdown();
    let itemDropdown = createItemyDropdown();
    let relicDropdown = createRelicDropdown();
    
    let level = createInput(1, 100);
    level.value = 50;

    let moveOne = createMoveDropdown();
    let moveTwo = createMoveDropdown();
    let moveThree = createMoveDropdown();
    let moveFour = createMoveDropdown();

    elements.push(pokeDropdown, setNameInput, hpEV, energyEV, atkEV, defEV, atkREV, defREV, spdEV);
    elements.push(posNat, negNat, abilityDropdown, itemDropdown, relicDropdown, level, moveOne, moveTwo, moveThree, moveFour);

    allElements.push(elements);

    for (let element in elements) {
        let td = document.createElement("td");
        td.appendChild(elements[element]);
        row.appendChild(td);
    }
    return row;
}

function createTenRows(tbody) {
    for (let i = 0; i < 10; i++) {
        let newRow = createRow();
        tbody.appendChild(newRow);
    }
    return tbody;
}

function createPokeDropdown() {
    let dropdown = document.createElement("select");
    dropdown.className = "pokeSelect";

    for (let loom in loomians) {
        dropdown.options[dropdown.options.length] = new Option(loomians[loom].name); 
        
    }
    return dropdown;
}

function createMoveDropdown() {
    let dropdown = document.createElement("select");
    let moveNames = [];
    dropdown.className = "moveSelect";

    for (let move in moves) {
        moveNames.push(moves[move].name);
    }

    moveNames.sort();

    for (let move in moveNames) {
        dropdown.options[dropdown.options.length] = new Option(moveNames[move]);
    }

    return dropdown;
}

function createPosNatureDropdown() {
    let dropdown = document.createElement("select");
    
    dropdown.options[0] = new Option("None", "none");
    dropdown.options[1] = new Option("Vivid", "brawny");
    dropdown.options[2] = new Option("Burly", "robust");
    dropdown.options[3] = new Option("Wise", "smart");
    dropdown.options[4] = new Option("Vigilant", "clever");
    dropdown.options[5] = new Option("Agile", "nimble");
    dropdown.options[6] = new Option("Lax", "frail");
    dropdown.options[7] = new Option("Puny", "tender");
    dropdown.options[8] = new Option("Naive", "clumsy");
    dropdown.options[9] = new Option("Ignorant", "foolish");
    dropdown.options[10] = new Option("Tardy", "sluggish");
    //dropdown.options[11] = new Option("Indifferent", "indifferent");

    return dropdown;
}

function createNegNatureDropdown() {
    let dropdown = document.createElement("select");
    
    dropdown.options[0] = new Option("None", "none");
    dropdown.options[1] = new Option("Lax", "frail");
    dropdown.options[2] = new Option("Puny", "tender");
    dropdown.options[3] = new Option("Naive", "clumsy");
    dropdown.options[4] = new Option("Ignorant", "foolish");
    dropdown.options[5] = new Option("Tardy", "sluggish");
    dropdown.options[6] = new Option("Vivid", "brawny");
    dropdown.options[7] = new Option("Burly", "robust");
    dropdown.options[8] = new Option("Wise", "smart");
    dropdown.options[9] = new Option("Vigilant", "clever");
    dropdown.options[10] = new Option("Agile", "nimble");
    //dropdown.options[11] = new Option("Indifferent", "indifferent");

    return dropdown;
}

function createVeryNatureDropdown() {
    let dropdown = document.createElement("select");
    dropdown.options[0] = new Option("None", "none");
    dropdown.options[1] = new Option("Very Brawny", "vBrawny");
    dropdown.options[2] = new Option("Very Robust", "vRobust");
    dropdown.options[3] = new Option("Very Smart", "vSmart");
    dropdown.options[4] = new Option("Very Clever", "vClever");
    dropdown.options[5] = new Option("Very Nimble", "vNimble");
    dropdown.options[6] = new Option("Very Frail", "vFrail");
    dropdown.options[7] = new Option("Very Tender", "vTender");
    dropdown.options[8] = new Option("Very Clumsy", "vClumsy");
    dropdown.options[9] = new Option("Very Foolish", "vFoolish");
    dropdown.options[10] = new Option("Very Sluggish", "vSluggish");  
    
    return dropdown;
}
function createAbilityDropdown() {
    let dropdown = document.createElement("select");

    dropdown.options[0] = new Option("None");
    abilities.sort();

    for (let ability in abilities) {
        dropdown.options[dropdown.options.length] = new Option(abilities[ability]);
    }

    return dropdown;
}

function createItemyDropdown() {
    let dropdown = document.createElement("select");
    
    dropdown.options[0] = new Option("None");
    items.sort();

    for (let item in items) {
        dropdown.options[dropdown.options.length] = new Option(items[item]);
    }

    return dropdown;
}

function createRelicDropdown() {
    let dropdown = document.createElement("select");
    
    dropdown.options[0] = new Option("None");
    relics.sort();

    for (let relic in relics) {
        dropdown.options[dropdown.options.length] = new Option(relics[relic]);
    }

    return dropdown;
}

function createInput(min, max) {
    let input = document.createElement("input");
    input.type = "number";
    input.min = min;
    input.max = max;

    input.addEventListener("keyup", function() {
        input.value = restrict(input.value, input.min, input.max);
    });

    input.value = 0;
    return input;
}

function createTextInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.className = "textInput";
    
    return input;
}

function restrict(value, min, max) {
    if (parseInt(value) < min) {
        return min;
    }
    else if (parseInt(value) > max) {
        return max;
    }

    return value;
}
