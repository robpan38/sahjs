let piese = {
    'aK' : 9812,
    'aQ' : 9813,
    'aR' : 9814,
    'aB' : 9815,
    'aKn' : 9816,
    'aP' : 9817,
    'nK' : 9818,
    'nQ' : 9819,
    'nR' : 9820,
    'nB' : 9821,
    'nKn' : 9822,
    'nP' : 9823
}

let piese_unicode = {
    'aK' : '\u2654',
    'aQ' : '\u2655',
    'aR' : '\u2656',
    'aB' : '\u2657',
    'aKn' : '\u2658',
    'aP' : '\u2659',
    'nK' : '\u265A',
    'nQ' : '\u265B',
    'nR' : '\u265C',
    'nB' : '\u265D',
    'nKn' : '\u265E',
    'nP' : '\u265F',
    'gol' : '  '
}

let litere = {
    'a' : 0, 'b' : 1, 'c' : 2, 'd' : 3, 'e' : 4, 'f' : 5, 'g' : 6, 'h' : 7
}

let board = [
    'nR', 'nKn', 'nB', 'nQ', 'nK', 'nB', 'nKn', 'nR',
    'nP', 'nP', 'nP', 'nP', 'nP', 'nP', 'nP', 'nP',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'aP', 'aP', 'aP', 'aP', 'aP', 'aP', 'aP', 'aP',
    'aR', 'aKn', 'aB', 'aQ', 'aK', 'aB', 'aKn', 'aR',
];
// m linii n coloane
// a[i][j] = a[i * n + j]

let turaAlb = 1;
let sfarsitJoc = 0;
let castigaAlb = 0;
let castigaNegru = 0;

// stabilim directia de unde o culoare isi ia sah
// pentru implementarea functiei care verifica daca avem sah mat
let white_threat = {i: 0, j: 0, x: 0, y: 0};
let black_threat = {i: 0, j: 0, x: 0, y: 0};

// ex: i : 1, j : 2, x = 1, y = 0; <=> de la rege pana la (1,2) pe orizontala, in sens crescator
// ex: i : 1, j : 2, x = 0, y = -1 <=> de la rege pana la (1, 2) pe verticala in jos

function checkSah(board, color, i_k, j_k) {
    if(color == 'n'){
        black_threat.i = 0; black_threat.j = 0; black_threat.x = 0; black_threat.y = 0;
        // check pe linie tura / regina
        for(let j = j_k-1; j >= 0; j--){
            if(board[i_k * 8 + j] == 'aR' || board[i_k * 8 + j] == 'aQ'){
                black_threat.i = i_k; black_threat.j = j;
                black_threat.x = -1;
                return 1;
            }
            else if(board[i_k * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let j = j_k + 1; j < 8; j++){
            if(board[i_k * 8 + j] == 'aR' || board[i_k * 8 + j] == 'aQ'){
                black_threat.i = i_k; black_threat.j = j;
                black_threat.x = 1;
                return 1;
            }
            else if(board[i_k * 8 + j] == null){
                continue;
            }
            else break;
        }

        // check pe coloana tura / regina
        for(let i = i_k-1; i >= 0; i--){
            if(board[i * 8 + j_k] == 'aR' || board[i * 8 + j_k] == 'aQ'){
                black_threat.i = i; black_threat.j = j_k;
                black_threat.y = -1;
                return 1;
            }
            else if(board[i * 8 + j_k] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k+1; i < 8; i++){
            if(board[i * 8 + j_k] == 'aR' || board[i * 8 + j_k] == 'aQ'){
                black_threat.i = i; black_threat.j = j_k;
                black_threat.y = 1;
                return 1;
            }
            else if(board[i * 8 + j_k] == null){
                continue;
            }
            else break;
        }
        
        // check diagonala
        for(let i = i_k - 1, j = j_k - 1; i >= 0, j >= 0; i--, j--){
            if(board[i * 8 + j] == 'aB' || board[i * 8 + j] == 'aQ'){
                black_threat.i = i; black_threat.j = j;
                black_threat.x = -1; black_threat.y = -1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k - 1, j = j_k + 1; i >= 0, j < 8; i--, j++){
            if(board[i * 8 + j] == 'aB' || board[i * 8 + j] == 'aQ'){
                black_threat.i = i; black_threat.j = j;
                black_threat.x = 1; black_threat.y = -1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k + 1, j = j_k - 1; i < 8, j >= 0; i++, j--){
            if(board[i * 8 + j] == 'aB' || board[i * 8 + j] == 'aQ'){
                black_threat.i = i; black_threat.j = j;
                black_threat.x = -1; black_threat.y = 1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k + 1, j = j_k + 1; i < 8, j < 8; i++, j++){
            if(board[i * 8 + j] == 'aB' || board[i * 8 + j] == 'aQ'){
                black_threat.i = i; black_threat.j = j;
                black_threat.x = 1; black_threat.y = 1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }

        // check cal
        if(i_k - 1 >= 0 && j_k - 2 >= 0 && board[(i_k - 1) * 8 + (j_k - 2)] == 'aKn'){
            return 1;
        }
        if(i_k + 1 < 8 && j_k - 2 >= 0 && board[(i_k + 1) * 8 + (j_k - 2)] == 'aKn'){
            return 1;
        }
        if(i_k - 1 >= 0 && j_k + 2 < 8 && board[(i_k - 1) * 8 + (j_k + 2)] == 'aKn'){
            return 1;
        }
        if(i_k + 1 < 8 && j_k + 2 < 8 && board[(i_k + 1) * 8 + (j_k + 2)] == 'aKn'){
            return 1;
        }

        // check pion
        if(i_k + 1 < 8 && j_k - 1 >= 0 && board[(i_k + 1) * 8 + (j_k - 1)] == 'aP'){
            return 1;
        }
        if(i_k + 1 < 8 && j_k + 1 < 8 && board[(i_k + 1) * 8 + (j_k + 1)] == 'aP'){
            return 1;
        }
    }
    else {
        white_threat.i = 0; white_threat.j = 0; white_threat.x = 0; white_threat.y = 0;
        // check pe linie tura / regina
        for(let j = j_k-1; j >= 0; j--){
            if(board[i_k * 8 + j] == 'nR' || board[i_k * 8 + j] == 'nQ'){
                white_threat.i = i_k; white_threat.j = j;
                white_threat.x = -1;
                return 1;
            }
            else if(board[i_k * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let j = j_k + 1; j < 8; j++){
            if(board[i_k * 8 + j] == 'nR' || board[i_k * 8 + j] == 'nQ'){
                white_threat.i = i_k; white_threat.j = j;
                white_threat.x = 1;
                return 1;
            }
            else if(board[i_k * 8 + j] == null){
                continue;
            }
            else break;
        }

        // check pe coloana tura / regina
        for(let i = i_k-1; i >= 0; i--){
            if(board[i * 8 + j_k] == 'nR' || board[i * 8 + j_k] == 'nQ'){
                white_threat.i = i; white_threat.j = j_k;
                white_threat.y = -1;
                return 1;
            }
            else if(board[i * 8 + j_k] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k+1; i < 8; i++){
            if(board[i * 8 + j_k] == 'nR' || board[i * 8 + j_k] == 'nQ'){
                white_threat.i = i; white_threat.j = j_k;
                white_threat.y = 1;
                return 1;
            }
            else if(board[i * 8 + j_k] == null){
                continue;
            }
            else break;
        }
        
        // check diagonala
        for(let i = i_k - 1, j = j_k - 1; i >= 0, j >= 0; i--, j--){
            if(board[i * 8 + j] == 'nB' || board[i * 8 + j] == 'nQ'){
                white_threat.i = i; white_threat.j = j;
                white_threat.x = -1; white_threat.y = -1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k - 1, j = j_k + 1; i >= 0, j < 8; i--, j++){
            if(board[i * 8 + j] == 'nB' || board[i * 8 + j] == 'nQ'){
                white_threat.i = i; white_threat.j = j;
                white_threat.x = 1; white_threat.y = -1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k + 1, j = j_k - 1; i < 8, j >= 0; i++, j--){
            if(board[i * 8 + j] == 'nB' || board[i * 8 + j] == 'nQ'){
                white_threat.i = i; white_threat.j = j;
                white_threat.x = -1; white_threat.y = 1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }
        for(let i = i_k + 1, j = j_k + 1; i < 8, j < 8; i++, j++){
            if(board[i * 8 + j] == 'nB' || board[i * 8 + j] == 'nQ'){
                white_threat.i = i; white_threat.j = j;
                white_threat.x = 1; white_threat.y = 1;
                return 1;
            }
            else if(board[i * 8 + j] == null){
                continue;
            }
            else break;
        }

        // check cal
        if(i_k - 1 >= 0 && j_k - 2 >= 0 && board[(i_k - 1) * 8 + (j_k - 2)] == 'nKn'){
            return 1;
        }
        if(i_k + 1 < 8 && j_k - 2 >= 0 && board[(i_k + 1) * 8 + (j_k - 2)] == 'nKn'){
            return 1;
        }
        if(i_k - 1 >= 0 && j_k + 2 < 8 && board[(i_k - 1) * 8 + (j_k + 2)] == 'nKn'){
            return 1;
        }
        if(i_k + 1 < 8 && j_k + 2 < 8 && board[(i_k + 1) * 8 + (j_k + 2)] == 'nKn'){
            return 1;
        }

        // check pion
        if(i_k - 1 >= 0 && j_k - 1 >= 0 && board[(i_k - 1) * 8 + (j_k - 1)] == 'nP'){
            return 1;
        }
        if(i_k - 1 >= 0 && j_k + 1 < 8 && board[(i_k - 1) * 8 + (j_k + 1)] == 'nP'){
            return 1;
        }
    }
    return 0;
}

function printTabla(board){
    let culoare = 0; // 0 for white, 1 for black
    let litera = 'a';
    let numar = 8;

    // print litere
    for(let i = 0; i <= 8; i++){
        if(i == 0){
            process.stdout.write("  ");
        }
        else {
            let litera_curenta = litera.charCodeAt(0) + i - 1;
            process.stdout.write(String.fromCharCode(litera_curenta) + " ");
            if(i == 8){
                process.stdout.write("\n");
            }
        }
    }
    for(let i = 0; i < 8; i++){
        process.stdout.write(numar + " ");
        numar -= 1;
        for(let j = 0; j < 8; j++){
            let piesa = findPiece(board, i, j);
            if(board[i * 8 + j] != null){
                if(culoare == 0) {
                    if(j % 2 == 0) {
                        process.stdout.write('\u001b[47m\u001b[30m' + piese_unicode[piesa] + ' ' + '\u001b[0m');
                    }
                    else {
                        process.stdout.write('\u001b[45m\u001b[30m' + piese_unicode[piesa] + ' ' + '\u001b[0m');
                    }
                }
                else {
                    if(j % 2 == 0) {
                        process.stdout.write('\u001b[45m\u001b[30m' + piese_unicode[piesa] + ' ' + '\u001b[0m');
                    }
                    else {
                        process.stdout.write('\u001b[47m\u001b[30m' + piese_unicode[piesa] + ' ' + '\u001b[0m');
                    }
                }
            }
            else {
                if(j % 2 == 0){
                    if(culoare == 0) {
                        process.stdout.write('\u001b[47m\u001b[30m' + piese_unicode['gol'] + '\u001b[0m');
                    }
                    else process.stdout.write('\u001b[45m\u001b[30m' + piese_unicode['gol'] + '\u001b[0m');
                }
                else {
                    if(culoare == 0) {
                        process.stdout.write('\u001b[45m\u001b[30m' + piese_unicode['gol'] + '\u001b[0m');
                    }
                    else process.stdout.write('\u001b[47m\u001b[30m' + piese_unicode['gol'] + '\u001b[0m');
                }
            }
        }
        process.stdout.write("\n");
        if(culoare == 0){
            culoare = 1;
        }
        else culoare = 0;
    }
}

function findPiece(board, i, j) {
    return board[i * 8 + j];
}

function findPieceColor(board, i, j) {
    if(board[i * 8 + j] != null){
        return board[i * 8 + j][0];
    }
    return null;
}

function findKing(board, culoare){
    let obj = {i : 0, j : 0};
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(culoare == 'a' && board[i * 8 + j] == 'aK') {
                obj.i = i;
            }
            if(culoare == 'n' && board[i * 8 + j] == 'nK') {
                obj.j = j;
            }
        }
    }
    return obj;
}

function checkPionMove(board, i_c, j_c, i_d, j_d) {
    if(Math.abs(j_c - j_d) > 1 || Math.abs(i_c - i_d) > 2) {
        return 0;
    }
    if(j_d >= 8 || j_d < 0 || i_d >= 8 || i_d < 0) {
        return 0;
    }
    let culoare = findPieceColor(board, i_c, j_c);

    if(culoare == 'a'){
        if(i_d >= i_c) {
            return 0;
        }
        if((i_d == i_c - 2 && i_c != 6) || (i_d == i_c - 2 && i_c == 6 && findPiece(board, i_c - 1, j_c) != null)) {
            return 0;
        }
        if((j_d == j_c - 1 && i_d == i_c - 1 && (findPieceColor(board, i_d, j_d) == 'a' || findPieceColor(board, i_d, j_d) == null))
        || (j_d == j_c + 1 && i_d == i_c - 1 && (findPieceColor(board, i_d, j_d) == 'a' || findPieceColor(board, i_d, j_d) == null))) {
            return 0;
        }
        if(i_d > i_c) {
            return 0;
        }

        let board_copy = [...board];
        board_copy[i_d * 8 + j_d] = 'aP';
        board_copy[i_c * 8 + j_c] = null;

        let pozitie = findKing(board, 'a');
        if(checkSah(board_copy, 'a', pozitie.i, pozitie.j)){
            return 0;
        }
        return 1;
    }
    else {
        if(i_d <= i_c) {
            return 0;
        }
        if((i_d == i_c + 2 && i_c != 1) || (i_d == i_c + 2 && i_c == 1 && findPiece(board, i_c + 1, j_c) != null)) {
            return 0;
        }
        if((j_d == j_c - 1 && i_d == i_c + 1 && (findPieceColor(board, i_d, j_d) == 'n' || findPieceColor(board, i_d, j_d) == null))
        || (j_d == j_c + 1 && i_d == i_c + 1 && (findPieceColor(board, i_d, j_d) == 'n' || findPieceColor(board, i_d, j_d) == null))) {
            return 0;
        }
        if(i_d < i_c) {
            return 0;
        }

        let board_copy = [...board];
        board_copy[i_d * 8 + j_d] = 'nP';
        board_copy[i_c * 8 + j_c] = null;

        let pozitie = findKing(board, 'n');
        if(checkSah(board_copy, 'n', pozitie.i, pozitie.j)){
            return 0;
        }
        return 1;
    }
}

function checkTuraMove(board, i_c, j_c, i_d, j_d) {
    if(j_d > 8 || j_d < 0 || i_d > 8 || i_d < 0) {
        return 0;
    }

    if(j_d != j_c && i_d != i_c) {
        return 0;
    }

    let board_copy = [...board];
    let culoare = findPieceColor(board, i_c, j_c);
    
    // pe coloana
    // verificam daca poate merge in sus
    if(j_d == j_c) {
        if(i_d <= i_c) {
            for(let i = i_c - 1; i > i_d; i--) {
                if(board[i * 8 + j_c] != null) {
                    return 0;
                }
            }
        } // verificam daca poate merge in jos
        else {
            for(let i = i_c + 1; i < i_d; i++) {
                if(board[i * 8 + j_c] != null) {
                    return 0;
                }
            }
        }
    }

    // pe linie
    // verificam daca poate merge la stanga
    if(i_d == i_c) {
        if(j_d <= j_c) {
            for(let j = j_c - 1; j > j_d; j--) {
                if(board[i_c * 8 + j] != null) {
                    return 0;
                }
            }
        } // verificam daca poate merge la dreapta
        else {
            for(let j = j_c + 1; j < j_d; j++) {
                if(board[i_c * 8 + j] != null) {
                    return 0;
                }
            }
        }
    }

    if(culoare == 'a') {
        board_copy[i_d * 8 + j_d] = 'aR';
        board_copy[i_c * 8 + j_c] = null;

        let pozitie = findKing(board_copy, 'a');
        if(checkSah(board_copy, 'a', pozitie.i, pozitie.j)) {
            return 0;
        }
    }
    else {
        board_copy[i_d * 8 + j_d] = 'nR';
        board_copy[i_c * 8 + j_c] = null;

        let pozitie = findKing(board_copy, 'n');
        if(checkSah(board_copy, 'n', pozitie.i, pozitie.j)) {
            return 0;
        }
    }

    return 1;
}

function checkCalMove(board, i_c, j_c, i_d, j_d) {
    if(j_d >= 8 || j_d < 0 || i_d >= 8 || i_d < 0) {
        return 0;
    }

    let board_copy = [...board];
    let culoare = findPieceColor(board, i_c, j_c);

    if(Math.abs(j_d - j_c) + Math.abs(i_d - i_c) != 3) {
        return 0;
    }

    if(j_d != j_c + 1 
    && j_d != j_c - 1
    && j_d != j_c + 2 
    && j_d != j_c - 2) {
        return 0;
    }

    if(i_d != i_c + 1
    && i_d != i_c - 1
    && i_d != i_c + 2
    && i_d != i_c - 2) {
        return 0;
    }

    if(culoare == 'a') {
        if(findPieceColor(board, i_d, j_d) == 'a') {
            return 0;
        }
        else {
            board_copy[i_d * 8 + j_d] = 'aKn';
            board_copy[i_c * 8 + j_c] = null;
            
            let pozitie = findKing(board_copy, 'a');
            if(checkSah(board_copy, 'a', pozitie.i, pozitie.j)) {
                return 0;
            }

            return 1;
        }
    }
    else {
        if(findPieceColor(board, i_d, j_d) == 'n') {
            return 0;
        }
        else {
            board_copy[i_d * 8 + j_d] = 'nKn';
            board_copy[i_c * 8 + j_c] = null;
            
            let pozitie = findKing(board_copy, 'n');
            if(checkSah(board_copy, 'n', pozitie.i, pozitie.j)) {
                return 0;
            }

            return 1;
        }
    }
}

function checkNebunMove(board, i_c, j_c, i_d, j_d) {
    if(j_d >= 8 || j_d < 0 || i_d >= 8 || i_d < 0) {
        return 0;
    }

    let board_copy = [...board];
    let culoare = findPieceColor(board, i_c, j_c);

    if(i_c == i_d || j_c == j_d) {
        return 0;
    }

    if(i_d <= i_c) {
        if(j_d <= j_c) {
            for(let i = i_c - 1, j = j_c - 1; i > i_d, j > j_d; i--, j--) {
                if(board[i * 8 + j] != null) {
                    return 0;
                }
            }
        }
        else {
            for(let i = i_c - 1, j = j_c + 1; i > i_d, j < j_d; i--, j++) {
                if(board[i * 8 + j] != null) {
                    return 0;
                }
            }
        }
    }
    else {
        if(j_d <= j_c) {
            for(let i = i_c + 1, j = j_c - 1; i < i_d, j > j_d; i++, j--) {
                if(board[i * 8 + j] != null) {
                    return 0;
                }
            }
        }
        else {
            for(let i = i_c + 1, j = j_c + 1; i < i_d, j < j_d; i++, j++) {
                if(board[i * 8 + j] != null) {
                    return 0;
                }
            }
        }
    }

    if(culoare == 'a') {
        board_copy[i_d * 8 + j_d] = 'aB';
        board_copy[i_c * 8 + j_c] = null;

        let pozitie = findKing(board_copy, 'a');

        if(checkSah(board_copy, 'a', pozitie.i, pozitie.j)) {
            return 0;
        }
        return 1;
    }
    else {
        board_copy[i_d * 8 + j_d] = 'nB';
        board_copy[i_c * 8 + j_c] = null;

        let pozitie = findKing(board_copy, 'n');

        if(checkSah(board_copy, 'n', pozitie.i, pozitie.j)) {
            return 0;
        }
        return 1;
    }
}

function checkReginaMove(board, i_c, j_c, i_d, j_d) {
    if(checkTuraMove(board, i_c, j_c, i_d, j_d) || checkNebunMove(board, i_c, j_c, i_d, j_d)) {
        return 1;
    }
    return 0;
}

function checkRegeMove(board, i_c, j_c, i_d, j_d) {
    if(j_d >= 8 || j_d < 0 || i_d >= 8 || i_d < 0) {
        return 0;
    }

    let culoare = findPieceColor(board, i_c, j_c);
    let board_copy = [...board];
    
    // check rocada
    if(culoare == 'a') {
        if(i_c == 7 && j_c == 4
        && board[i_c * 8 + j_c + 1] == null
        && board[i_c * 8 + j_c + 2] == null
        && board[i_c * 8 + j_c + 3] == 'aR'
        && i_d == 7 && j_d == 6) {
            board_copy[i_d * 8 + j_d] = 'aK';
            board_copy[i_d * 8 + j_d - 1] = 'aR';
            board_copy[i_c * 8 + j_c] = null;
            board_copy[i_d * 8 + j_d + 1] = null;

            if(checkSah(board_copy, 'a', i_d, j_d)) {
                return 0;
            }

            return 1;
        }

        if(i_c == 7 && j_c == 4
        && board[i_c * 8 + j_c - 1] == null
        && board[i_c * 8 + j_c - 2] == null
        && board[i_c * 8 + j_c - 3] == null
        && board[i_c * 8 + j_c - 4] == 'aR'
        && i_d == 7 && j_d == 2) {
            board_copy[i_d * 8 + j_d] = 'aK';
            board_copy[i_d * 8 + j_d + 1] = 'aR';
            board_copy[i_c * 8 + j_c] = null;
            board_copy[i_c * 8 + j_c - 4] = null;

            if(checkSah(board_copy, 'a', i_d, j_d)) {
                return 0;
            }

            return 1;
        }
    }
    else {
        if(i_c == 0 && j_c == 4
            && board[i_c * 8 + j_c + 1] == null
            && board[i_c * 8 + j_c + 2] == null
            && board[i_c * 8 + j_c + 3] == 'nR'
            && i_d == 0 && j_d == 6) {
                board_copy[i_d * 8 + j_d] = 'nK';
                board_copy[i_d * 8 + j_d - 1] = 'nR';
                board_copy[i_c * 8 + j_c] = null;
                board_copy[i_d * 8 + j_d + 1] = null;
    
                if(checkSah(board_copy, 'n', i_d, j_d)) {
                    return 0;
                }
    
                return 1;
            }
    
            if(i_c == 0 && j_c == 4
            && board[i_c * 8 + j_c - 1] == null
            && board[i_c * 8 + j_c - 2] == null
            && board[i_c * 8 + j_c - 3] == null
            && board[i_c * 8 + j_c - 4] == 'nR'
            && i_d == 0 && j_d == 2) {
                board_copy[i_d * 8 + j_d] = 'nK';
                board_copy[i_d * 8 + j_d + 1] = 'nR';
                board_copy[i_c * 8 + j_c] = null;
                board_copy[i_c * 8 + j_c - 4] = null;
    
                if(checkSah(board_copy, 'n', i_d, j_d)) {
                    return 0;
                }
    
                return 1;
            }
    }

    if(Math.abs(j_d - j_c) > 1 || Math.abs(i_d - i_c) > 1) {
        return 0;
    }

    let destinatie = findPieceColor(board, i_d, j_d);
    if(culoare == 'a') {
        if(destinatie == 'a') {
            return 0;
        }

        board_copy[i_d * 8 + j_d] = 'aK';
        board_copy[i_c * 8 + j_c] = null;

        if(checkSah(board_copy, 'a', i_d, j_d)) {
            return 0;
        }
        return 1;
    }
    else {
        if(destinatie == 'n') {
            return 0;
        }

        board_copy[i_d * 8 + j_d] = 'nK';
        board_copy[i_c * 8 + j_c] = null;

        if(checkSah(board_copy, 'n', i_d, j_d)) {
            return 0;
        }
        return 1;
    }
}

function makeMove(board, i_c, j_c, i_d, j_d) {
    let piesa = findPiece(board, i_c, j_c);

    if(piesa[1] == 'P' && checkPionMove(board, i_c, j_c, i_d, j_d)) {
        board[i_d * 8 + j_d] = piesa;
        board[i_c * 8 + j_c] = null;
        return 1;
    }
    if(piesa[1] == 'R' && checkTuraMove(board, i_c, j_c, i_d, j_d)) {
        board[i_d * 8 + j_d] = piesa;
        board[i_c * 8 + j_c] = null;
        return 1;
    }
    if(piesa[1] == 'K' && piesa[2] == 'n' && checkCalMove(board, i_c, j_c, i_d, j_d)) {
        board[i_d * 8 + j_d] = piesa;
        board[i_c * 8 + j_c] = null;
        return 1;
    }
    if(piesa[1] == 'K' && piesa[2] == undefined && checkRegeMove(board, i_c, j_c, i_d, j_d)) {
        board[i_d * 8 + j_d] = piesa;
        board[i_c * 8 + j_c] = null;
        return 1;
    }
    if(piesa[1] == 'B' && checkNebunMove(board, i_c, j_c, i_d, j_d)) {
        board[i_d * 8 + j_d] = piesa;
        board[i_c * 8 + j_c] = null;
        return 1;
    }
    if(piesa[1] == 'Q' && checkReginaMove(board, i_c, j_c, i_d, j_d)) {
        board[i_d * 8 + j_d] = piesa;
        board[i_c * 8 + j_c] = null;
        return 1;
    }
    return 0;
}

function checkMoveWrapper(board, i, j, i_d, j_d) {
    let piesa = findPiece(board, i, j);
    if(piesa != null) {
        if(piesa[1] == 'P') {
            return checkPionMove(board, i, j, i_d, j_d);
        }
        if(piesa[1] == 'R') {
            return checkTuraMove(board, i, j, i_d, j_d);;
        }
        if(piesa[1] == 'K' && piesa[2] == 'n') {
            return checkCalMove(board, i, j, i_d, j_d);
        }
        if(piesa[1] == 'K' && piesa[2] == undefined) {
            return checkRegeMove(board, i, j, i_d, j_d);
        }
        if(piesa[1] == 'B') {
            return checkNebunMove(board, i, j, i_d, j_d);
        }
        if(piesa[1] == 'Q') {
            return checkReginaMove(board, i, j, i_d, j_d);
        }
    }
    return 0;
}

function checkSahMat(board, losing_color, piece_i, piece_j) {
    // unde piece_i, piece_j coordonatele piesei care a dat sah culorii 
    // losing color :)

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let piesa = findPiece(board, i, j); 
            if(piesa != null) {
                if(piesa[0] == losing_color) {
                    if(piesa[1] == 'P' && checkPionMove(board, i, j, piece_i, piece_j)) {
                        return 0;
                    }
                    if(piesa[1] == 'R' && checkTuraMove(board, i, j, piece_i, piece_j)) {
                        return 0;
                    }
                    if(piesa[1] == 'K' && piesa[2] == 'n' && checkCalMove(board, i, j, piece_i, piece_j)) {
                        return 0;
                    }
                    if(piesa[1] == 'K' && piesa[2] == undefined && checkRegeMove(board, i, j, piece_i, piece_j)) {
                        return 0;
                    }
                    if(piesa[1] == 'B' && checkNebunMove(board, i, j, piece_i, piece_j)) {
                        return 0;
                    }
                    if(piesa[1] == 'Q' && checkReginaMove(board, i, j, piece_i, piece_j)) {
                        return 0;
                    }
                }
            }
        }
    }

    // verificam daca poate sa se bage o piesa in calea sahului

    let pozitie_rege = findKing(board, losing_color);
    let i_k = pozitie_rege.i, j_k = pozitie_rege.j;

    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let piesa = findPiece(board, i, j);
            if(piesa != null) {
                if(piesa[0] == losing_color && losing_color == 'n') {
                    if(black_threat.x == 1 && black_threat.y == 0) {
                        for(let r = j_k; r < black_threat.j; r++) {
                            if(checkMoveWrapper(board, i, j, i_k, r)) {
                                return 0;
                            }
                        }
                    }
                    if(black_threat.x == -1 && black_threat.y == 0) {
                        for(let r = j_k - 1; r > black_threat.j; r++) {
                            if(checkMoveWrapper(board, i, j, i_k, r)) {
                                return 0;
                            }
                        }
                    }
                    if(black_threat.x == 0 && black_threat.y == 1) {
                        for(let r = i_k + 1; r < black_threat.i; r++) {
                            if(checkMoveWrapper(board, i, j, r, j_k)) {
                                return 0;
                            }
                        }
                    }
                    if(black_threat.x == 0 && black_threat.y == -1) {
                        for(let r = i_k - 1; r > black_threat.i; r++) {
                            if(checkMoveWrapper(board, i, j, r, j_k)) {
                                return 0;
                            }
                        }
                    }
                    if(black_threat.x == -1 && black_threat.y == -1) {
                        for(let r = i_k - 1, q = j_k - 1; r > black_threat.i, q > black_threat.j; r--,q--) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                    if(black_threat.x == -1 && black_threat.y == 1) {
                        for(let r = i_k + 1, q = j_k - 1; r < black_threat.i, q > black_threat.j; r++,q--) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                    if(black_threat.x == 1 && black_threat.y == -1) {
                        for(let r = i_k - 1, q = j_k + 1; r > black_threat.i, q < black_threat.j; r--,q++) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                    if(black_threat.x == 1 && black_threat.y == 1) {
                        for(let r = i_k + 1, q = j_k + 1; r < black_threat.i, q < black_threat.j; r++,q++) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                }
                else if(piesa[0] == losing_color && losing_color == 'a') {
                    if(white_threat.x == 1 && white_threat.y == 0) {
                        for(let r = j_k; r < white_threat.j; r++) {
                            if(checkMoveWrapper(board, i, j, i_k, r)) {
                                return 0;
                            }
                        }
                    }
                    if(white_threat.x == -1 && white_threat.y == 0) {
                        for(let r = j_k - 1; r > white_threat.j; r++) {
                            if(checkMoveWrapper(board, i, j, i_k, r)) {
                                return 0;
                            }
                        }
                    }
                    if(white_threat.x == 0 && white_threat.y == 1) {
                        for(let r = i_k + 1; r < white_threat.i; r++) {
                            if(checkMoveWrapper(board, i, j, r, j_k)) {
                                return 0;
                            }
                        }
                    }
                    if(white_threat.x == 0 && white_threat.y == -1) {
                        for(let r = i_k - 1; r > white_threat.i; r++) {
                            if(checkMoveWrapper(board, i, j, r, j_k)) {
                                return 0;
                            }
                        }
                    }
                    if(white_threat.x == -1 && white_threat.y == -1) {
                        for(let r = i_k - 1, q = j_k - 1; r > white_threat.i, q > white_threat.j; r--,q--) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                    if(white_threat.x == -1 && white_threat.y == 1) {
                        for(let r = i_k + 1, q = j_k - 1; r < white_threat.i, q > white_threat.j; r++,q--) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                    if(white_threat.x == 1 && white_threat.y == -1) {
                        for(let r = i_k - 1, q = j_k + 1; r > white_threat.i, q < white_threat.j; r--,q++) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                    if(white_threat.x == 1 && white_threat.y == 1) {
                        for(let r = i_k + 1, q = j_k + 1; r < white_threat.i, q < white_threat.j; r++,q++) {
                            if(checkMoveWrapper(board, i, j, r, q)) {
                                return 0;
                            }
                        }
                    }
                }
            }
        }
    }

    // verifica daca regele se poate scoate singur din sah
    
    if(checkRegeMove(board, i_k, j_k, i_k - 1, j_k - 1)) {
        return 0;
    }
    if(checkRegeMove(board, i_k, j_k, i_k - 1, j_k)) {
        return 0;
    }
    if(checkRegeMove(board, i_k, j_k, i_k - 1, j_k + 1)) {
        return 0;
    }
    if(checkRegeMove(board, i_k, j_k, i_k, j_k - 1)) {
        return 0;
    }
    if(checkRegeMove(board, i_k, j_k, i_k, j_k + 1)) {
        return 0;
    }
    if(checkRegeMove(board, i_k, j_k, i_k + 1, j_k - 1)) {
        return 0;
    }
    if(checkRegeMove(board, i_k, j_k, i_k + 1, j_k)) {
        return 0;
    }
    if(checkRegeMove(board, i_k, j_k, i_k + 1, j_k + 1)) {
        return 0;
    }

    return 1;
}

printTabla(board);

console.log("=============");

const prompt = require('prompt-sync')({sigint:true})

while(sfarsitJoc != 1) {
    while(turaAlb) {
        let mutare = prompt('[Alb]Introdu o mutare valida (format: litera nr litera nr): ');
        // j_c, i_c, j_d, i_d

        let cuvinte = mutare.split(" ");

        let i_c, j_c, i_d, j_d;

        j_c = litere[cuvinte[0]];
        i_c = Math.abs(parseInt(cuvinte[1]) - 8);
        j_d = litere[cuvinte[2]];
        i_d = Math.abs(parseInt(cuvinte[3]) - 8);

        if(makeMove(board, i_c, j_c, i_d, j_d)) {
            let pozitie_rege = findKing(board, 'n');

            if(checkSah(board, 'n', pozitie_rege.i, pozitie_rege.j)
            && checkSahMat(board, 'n', i_d, j_d)) {
                sfarsitJoc = 1;
                castigaAlb = 1;
            }
            
            turaAlb = 0;
            console.clear();
            printTabla(board);
        }
        else {
            console.log('Miscare invalida !')
        }
    }

    if(sfarsitJoc == 1) {
        break;
    }

    while(!turaAlb) {
        let mutare = prompt('[Negru]Introdu o mutare valida (format: litera nr litera nr): ');
        // j_c, i_c, j_d, i_d

        let cuvinte = mutare.split(" ");

        let i_c, j_c, i_d, j_d;

        j_c = litere[cuvinte[0]];
        i_c = Math.abs(parseInt(cuvinte[1]) - 8);
        j_d = litere[cuvinte[2]];
        i_d = Math.abs(parseInt(cuvinte[3]) - 8);

        if(makeMove(board, i_c, j_c, i_d, j_d)) {
            let pozitie_rege = findKing(board, 'a');

            if(checkSah(board, 'a', pozitie_rege.i, pozitie_rege.j)
            && checkSahMat(board, 'a', i_d, j_d)) {
                sfarsitJoc = 1;
                castigaNegru = 1;
            }

            turaAlb = 1;
            console.clear();
            printTabla(board);
        }
        else {
            console.log('Miscare invalida !');
        }
    }
}

if(castigaAlb == 1 && castigaNegru == 0) {
    console.log("Alb a castigat!");
}
else if(castigaAlb == 0 && castigaNegru == 1) {
    console.log("Negru a castigat");
}