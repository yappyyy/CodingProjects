//start of my own code
#ifndef CANDLESTICKCALCULATOR_H
#define CANDLESTICKCALCULATOR_H

#include "Candlestick.h"
#include "ScaledCandle.h"
#include "OrderBookEntry.h"
#include <vector>

class CandlestickCalculator {
public:
    std::vector<Candlestick> computeCandlestickData(const std::vector<OrderBookEntry>& exchangeData);
    std::vector<ScaledCandle> scaleFunction(const std::vector<Candlestick>& candlesticks);
    void plotCandlestickData(const std::vector<ScaledCandle>& candlestickData, const std::vector<Candlestick> candlesticks, int numCandlesticks);
private:
    int scaleValue (const double value);
};
#endif 
//end of my own code


