#pragma once
#include <vector>
#include "OrderBookEntry.h"
#include "OrderBook.h"
#include "Wallet.h"

class MerkelMain
{
    public:
        MerkelMain();
        /** Call this to start the sim */
        void init();
    private: 
        void printMenu();
        void printHelp();
        void printMarketStats();
        void enterAsk();
        void enterBid();
        void printWallet();
        void gotoNextTimeframe();
        int getUserOption();
        void printCandlestickData();
        void plot(int userOption);
        void processUserOption(int userOption);

        std::string currentTime;


	OrderBook orderBook{"20200601.csv"};
        Wallet wallet;

};
