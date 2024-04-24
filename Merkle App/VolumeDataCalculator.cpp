//start of my own code
#include "VolumeDataCalculator.h"
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

// Task 3
std::unordered_map<std::string, double> VolumeDataCalculator::calculateVolumeData(const std::vector<OrderBookEntry>& exchangeData) {
    // Group the exchange data by timestamp and accumulate trading volume
    std::unordered_map<std::string, double> volumeData;
    int userInput = 15;
    for (const OrderBookEntry& entry : exchangeData) {
        if (entry.product == "ETH/BTC" && entry.orderType == OrderBookType::bid) {

            std::string hourTimestamp = entry.timestamp.substr(0, userInput);
            volumeData[hourTimestamp] += entry.amount;
        }
    }

    return volumeData;
}

void VolumeDataCalculator::plotVolumeData(const std::unordered_map<std::string, double>& volumeData, int terminalHeight) {
    // offsets
    const int y_offset = 5;
    const int x_offset = 5;

    // Conversion
    std::vector<std::pair<std::string, double>> volumeDataVec(volumeData.begin(), volumeData.end());
    std::sort(volumeDataVec.begin(), volumeDataVec.end());

    // Find the maximum volume to scale the graph correctly
    double maxVolume = 0;
    for (const auto& pair : volumeDataVec) {
        maxVolume = std::max(maxVolume, pair.second);
    }

    // Calculate the scale factor
    double scaleFactor = terminalHeight / maxVolume;

    // Create 2D vector filled with spaces
    std::vector<std::vector<std::string>> plot(terminalHeight + y_offset, std::vector<std::string>(volumeDataVec.size() * 10 + x_offset, " "));

    // Populate vector with volume data
    for (int i = 0; i < volumeDataVec.size(); i++) {
        int scaledVolume = static_cast<int>(volumeDataVec[i].second * scaleFactor);
        int col = i * 10 + x_offset;

        // Label horizontal axis
        auto temp = volumeDataVec[i].first.substr(11, 12) + "0";
        plot[0][col - 2] = temp[0];
        plot[0][col - 1] = temp[1];
        plot[0][col] = temp[2];
        plot[0][col + 1] = temp[3];
        plot[0][col + 2] = temp[4];

        // Populate vector with volume data
        for (int j = y_offset; j < scaledVolume + y_offset; j++) {
            plot[j][col] = "#";  // Use "#" to represent bars for each unit of volume
        }
    }

    // Print the volume labels on the left side of the plot
    for (int i = 0; i <= terminalHeight; ++i) {
        std::cout << std::setw(12) << std::right << std::fixed << std::setprecision(2) << (maxVolume - i * (maxVolume / terminalHeight)) << " | ";
        for (int j = 0; j < x_offset; ++j) {
            std::cout << " ";
        }

        // Print the plot for each timestamp
        for (int j = x_offset; j < volumeDataVec.size() * 10 + x_offset; ++j) {
            std::cout << plot[i][j];
        }
        std::cout << '\n';
    }
}
//end of my own code