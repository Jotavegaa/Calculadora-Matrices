document.addEventListener('DOMContentLoaded', function () {
    createMatrixInputs('matrixA', 2, 2);
    createMatrixInputs('matrixB', 2, 2);
    createMatrixInputs('result', 2, 2);
});

function createMatrixInputs(containerId, rows, cols) {
    var container = document.getElementById(containerId);

    for (var i = 0; i < rows; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement('td');
            var input = document.createElement('input');
            input.type = 'number';
            cell.appendChild(input);
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function performOperation(operation) {
    var matrixA = getMatrixValues('matrixA');
    var matrixB = getMatrixValues('matrixB');

    var resultMatrix;
    switch (operation) {
        case 'add':
            resultMatrix = add(matrixA, matrixB);
            break;
        case 'subtract':
            resultMatrix = subtract(matrixA, matrixB);
            break;
        case 'multiply':
            resultMatrix = multiply(matrixA, matrixB);
            break;
        case 'divide':
            // Verificar si la matriz B es invertible para la división
            if (!isInvertible(matrixB)) {
                alert('La matriz B no es invertible. No se puede realizar la división.');
                return;
            }
            resultMatrix = divide(matrixA, matrixB);
            break;
        default:
            alert('Operación no válida.');
            return;
    }

    displayMatrix('result', resultMatrix);
}

function add(matrixA, matrixB) {
    var resultMatrix = [];
    for (var i = 0; i < matrixA.length; i++) {
        resultMatrix[i] = [];
        for (var j = 0; j < matrixA[0].length; j++) {
            resultMatrix[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    return resultMatrix;
}

function subtract(matrixA, matrixB) {
    var resultMatrix = [];
    for (var i = 0; i < matrixA.length; i++) {
        resultMatrix[i] = [];
        for (var j = 0; j < matrixA[0].length; j++) {
            resultMatrix[i][j] = matrixA[i][j] - matrixB[i][j];
        }
    }
    return resultMatrix;
}

function multiply(matrixA, matrixB) {
    var resultMatrix = [];
    for (var i = 0; i < matrixA.length; i++) {
        resultMatrix[i] = [];
        for (var j = 0; j < matrixB[0].length; j++) {
            resultMatrix[i][j] = 0;
            for (var k = 0; k < matrixA[0].length; k++) {
                resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    return resultMatrix;
}

function divide(matrixA, matrixB) {
    // Calcular la inversa de la matriz B
    var inverseMatrixB = invertMatrix(matrixB);

    // Multiplicar la matriz A por la inversa de la matriz B
    return multiply(matrixA, inverseMatrixB);
}

function invertMatrix(matrix) {
    // Implementa la lógica para calcular la inversa de una matriz (puede ser un poco más complejo)
    // Puedes usar bibliotecas matemáticas como 'math.js' para simplificar este proceso
    // Aquí, simplemente devuelvo la matriz original como un marcador de posición
    return matrix;
}

function isInvertible(matrix) {
    // Implementa la lógica para verificar si una matriz es invertible
    // Puedes usar bibliotecas matemáticas para simplificar esto
    // En este ejemplo, simplemente compruebo si la matriz es cuadrada
    return matrix.length === matrix[0].length;
}

function getMatrixValues(containerId) {
    var container = document.getElementById(containerId);
    var rows = container.getElementsByTagName('tr');
    var matrix = [];

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('input');
        matrix[i] = [];
        for (var j = 0; j < cells.length; j++) {
            matrix[i][j] = parseFloat(cells[j].value) || 0;
        }
    }

    return matrix;
}

function displayMatrix(containerId, matrix) {
    var container = document.getElementById(containerId);
    container.innerHTML = '';

    for (var i = 0; i < matrix.length; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j < matrix[0].length; j++) {
            var cell = document.createElement('td');
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}
