//start of my own code
//task3
#ifndef VOLUMEDATACALCULATOR_H
#define VOLUMEDATACALCULATOR_H

#include "OrderBookEntry.h"
#include <vector>
#include <unordered_map>

class VolumeDataCalculator {
public:
    std::unordered_map<std::string, double> calculateVolumeData(const std::vector<OrderBookEntry>& exchangeData);
    void plotVolumeData(const std::unordered_map<std::string, double>& volumeData, int terminalHeight);
};

#endif
//end of my own code