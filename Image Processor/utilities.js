function calculateCellSize() {
    cellWidth = width / gridWidth;
    cellHeight = height / gridHeight;
}

function drawGrid(rows, cols, cellWidth, cellHeight) {
    // Draw horizontal grid lines
    for (var i = 1; i < rows; i++) {
        var y = i * cellHeight;
        line(0, y, width, y);
    }
    
    // Draw vertical grid lines
    for (var j = 1; j < cols; j++) {
        var x = j * cellWidth;
        line(x, 0, x, height);
    }
}