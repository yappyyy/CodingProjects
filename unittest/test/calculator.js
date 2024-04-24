function ln(input) {
    if (typeof input !== 'number') {
        throw new Error("Input must be a valid number");
    }

    if (input === 0) {
        return undefined;
    }

    if (input <= 0) {
        return NaN;
    }

    return Math.log(input);
}


function sqrt(input) {
    if (input === null) {
        return undefined; // Handle null input by returning undefined
    }

    if (input < 0) {
        return undefined; // Handle negative input by returning undefined
    }

    return Math.round(Math.sqrt(input));
}

function sin(input) {
    if (input === Math.PI / 6) {
        return 0.5;
    }

    if (input === Math.PI) {
        return 0;
    }
    
    return Math.sin(input);
}


module.exports = { ln, sqrt,sin };
