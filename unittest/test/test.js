var assert = require('assert');
var ln = require('./calculator').ln;
var sqrt = require('./calculator').sqrt;
var sin = require('./calculator').sin;
describe("Set of ln functional test", function(){
    describe("test 1", function(){
        it("should return undefined for ln(0)", function(){
            // Arrange
            var inputValue = 0;
    
            // Act
            var result = ln(inputValue);
    
            // Assert (Intentional failure)
            assert.strictEqual(result, undefined);
        });
    });

    describe("test 2", function(){
        it("should return NaN for ln(-1)", function(){
            // Arrange
            var inputValue = -1;
    
            // Act
            var result = ln(inputValue);
    
            
            // Assert
            assert.strictEqual(isNaN(result), true);
        });
    });
    describe("test 3", function(){
        it("should throw an error for ln(null)", function(){
            // Arrange
            var inputValue = null;
        
            // Act and Assert
            assert.throws(() => ln(inputValue), Error, "Input must be a valid number");
        });
    });
    

});

describe("Set of sqrt functional test", function(){
    describe("test 1", function(){
        it("should return 3 for sqrt(9) ", function(){
            // Arrange
            var inputValue = 9;
    
            // Act
            var result = sqrt(inputValue);
    
            // Assert 
            assert.strictEqual(result, 4);
        });
    });

    describe("test 2", function(){
        it("should return undefined for sqrt(-1) ", function(){
            // Arrange
            var inputValue =-1;
    
            // Act
            var result = sqrt(inputValue);
    
            // Assert (Intentional failure)
            assert.strictEqual(result, undefined);
        });
    });

    describe("test 3", function(){
        it("should return undefined for sqrt(null)", function(){
            // Arrange
            var inputValue = null;
    
            // Act
            var result = sqrt(inputValue);
    
            // Assert
            assert.strictEqual(result, undefined);
        });
    });

});

describe("Set of sin functional test", function(){
    describe("test 1", function(){
        it("should return a 1/2 for sin(pi/6)", function(){
            // Arrange
            var inputValue = Math.PI / 6;

            // Act
            var result = sin(inputValue);

            // Assert 
            assert.strictEqual(result, 1/2,);
        });
    });

    describe("test 2", function(){
        it("should return a 0 for sin(2pi)", function(){
            // Arrange
            var inputValue = 2 * Math.PI ;

            // Act
            var result = sin(inputValue);

            // Assert 
            assert.strictEqualequal(result, 0);
        });
    });

    describe("test 3", function(){
        it("should return a 0 for sin(pi)", function(){
            // Arrange
            var inputValue = Math.PI ;

            // Act
            var result = sin(inputValue);

            // Assert 
            assert.equal(result, 0);
        });
    });

});