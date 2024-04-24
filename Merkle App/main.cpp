#include "Wallet.h"
#include <iostream>
#include "MerkelMain.h"

int main()
{   
    MerkelMain app{};
    app.init();
    
}
// g++ -std=c++17 main.cpp CSVReader.cpp OrderBookEntry.cpp CandlestickCalculator.cpp MerkelMain.cpp OrderBook.cpp Wallet.cpp VolumeDataCalculator.cpp -o program