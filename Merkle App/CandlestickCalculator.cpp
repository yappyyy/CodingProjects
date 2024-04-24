//start of my own code
#include "Candlestick.h"
#include "ScaledCandle.h"
#include "OrderBookEntry.h"
#include "CandlestickCalculator.h"
#include <vector>
#include <iostream>
#include <unordered_map>
#include <algorithm>
#include <numeric>
#include <limits>
#include <iomanip>
#include <sstream>
#include <cmath>
#include <string>
//task1
// function to convert the candlestick data to suitable integers
int CandlestickCalculator::scaleValue (const double value) {
    return round(((value * 100000) - 2450) / 3);
}

std::vector<ScaledCandle> CandlestickCalculator::scaleFunction (const std::vector<Candlestick>& candlesticks) {
    
    std::vector<ScaledCandle> candlestickData;
    for (const auto& candlestick : candlesticks) {
        ScaledCandle temp;
        temp.open = scaleValue(candlestick.open) + 5; // Open / totalPrice
        temp.close = scaleValue(candlestick.close) + 5; // Close / totalPrice
        temp.high = scaleValue(candlestick.high) + 5; // High
        temp.low = scaleValue(candlestick.low) + 5; // Low
        temp.timestamp = candlestick.timestamp + "0";

        candlestickData.push_back(temp);
    }
    return candlestickData;
}

std::vector<Candlestick> CandlestickCalculator::computeCandlestickData(const std::vector<OrderBookEntry>& exchangeData) {
    std::vector<Candlestick> candlesticks;

    // Group the exchange data by timestamp, only consider entries with product "ETH/BTC" and ordertype "bid"
    std::unordered_map<std::string, std::vector<OrderBookEntry>> groupedData;
    int userInput = 15; // 13 for hour, 15 for 10 minute, 16 for minute
    for (const OrderBookEntry& entry : exchangeData) {
        if (entry.product == "ETH/BTC" && entry.orderType == OrderBookType::bid) {
            std::string hourTimestamp = entry.timestamp.substr(0, userInput); // group by timeframe
            groupedData[hourTimestamp].push_back(entry);
        }
    }

    // Compute candlestick data for each time frame
    for (auto& [timestamp, entries] : groupedData) {
        Candlestick candlestick;
        double totalValue = 0.0;
        double totalPrice = 0.0;
        double totalAmount = 0.0;
        double high = std::numeric_limits<double>::lowest();
        double low = std::numeric_limits<double>::max();

        // Iterate over the entries within the current time frame
        for (const auto& entry : entries) {
            // Update high and low values if necessary
            high = std::max(high, entry.price);
            low = std::min(low, entry.price);

            // Accumulate total value and total price
            totalValue += entry.price * entry.amount;
            totalPrice += entry.price;
            totalAmount += entry.amount;
        }

        // Calculate open and close values
        candlestick.open = totalValue / totalAmount; // Open / totalPrice
        candlestick.close = totalValue / totalAmount; // Close / totalPrice
        candlestick.high = high; // High
        candlestick.low = low; // Low
        candlestick.timestamp = timestamp;

        candlesticks.push_back(candlestick);
    }

    // Sort by timestamp
    std::sort(candlesticks.begin(), candlesticks.end(), [](const Candlestick& a, const Candlestick& b) {
        return a.timestamp < b.timestamp;
    });

    // Compute open value for each candlestick based on the close value of the previous time frame
    for (size_t i = 1; i < candlesticks.size(); ++i) {
        candlesticks[i].open = candlesticks[i - 1].close;
    }

    candlesticks.erase(candlesticks.begin()); // Remove the first element because no open price
    return candlesticks;
}

//task2
// function to save all the candlestick data as 2d vector, then print it out 
void CandlestickCalculator::plotCandlestickData(const std::vector<ScaledCandle>& candlestickData, const std::vector<Candlestick> candlesticks, int numCandlesticks) {
    int maxInt = std::numeric_limits<int>::lowest();
    int lowInt = std::numeric_limits<int>::max();
    for (const ScaledCandle& candlestick : candlestickData) {
        maxInt = std::max(maxInt, candlestick.high);
        lowInt = std::min(lowInt, candlestick.low);
    }

    // Create 2D vector filled with spaces
    const int columnScale = 10;
    const int offset = 5;
    const int max_x = numCandlesticks * columnScale + offset;
    const int max_y = round(maxInt * 1.2);

    std::vector<std::vector<std::string>> plot(max_y, std::vector<std::string>(max_x, " "));

    // Label vertical axis on the left
    for (int i = 0; i < max_y; i++) {
    // Calculate mean price for the row
    double meanPrice = static_cast<double>(i) / 1.2;
    
    // Format mean price as a string and set it as the label
    std::stringstream ss;
    ss << std::fixed << std::setprecision(2) << meanPrice;
    std::string meanPriceLabel = ss.str();

    // Set the label on the left vertical axis
    plot[i][0] = meanPriceLabel;
}

    // Populate vector with candlestick data
    for (int i = 0; i < numCandlesticks; i++) {
        int col = i * columnScale + offset;  // Column that the candlestick takes up
        int open = candlestickData[i].open;
        int close = candlestickData[i].close;
        int low = candlestickData[i].low;
        int high = candlestickData[i].high;

        // Determine box boundaries
        int boxTop = std::max(open, close);
        int boxBottom = std::min(open, close);

        // Draw the box
        plot[boxBottom][col] = '-';
        plot[boxTop][col] = '-';
        for (int j = boxBottom + 1; j < boxTop; ++j) {
            plot[j][col] = '-';
        }

        // Draw the wicks
        for (int j = low; j < boxBottom; ++j) {
            plot[j][col] = '|';
        }
        for (int j = boxTop + 1; j <= high; ++j) {
            plot[j][col] = '|';
        }

        // Label horizontal axis
        auto temp = candlestickData[i].timestamp.substr(11, 12);
        plot[0][col - 2] = temp[0];
        plot[0][col - 1] = temp[1];
        plot[0][col] = temp[2];
        plot[0][col + 1] = temp[3];
        plot[0][col + 2] = temp[4];
    }

    // Print the plot, iterating from top to bottom
    for (int i = plot.size() - 1; i >= 0; --i) {
        for (std::string c : plot[i]) {
            std::cout << c;
        }
        std::cout << '\n';
    }
}
//end of my own code