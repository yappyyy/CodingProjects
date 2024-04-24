#include "MerkelMain.h"
#include <iostream>
#include <vector>
#include <iomanip>
#include <ctime>
#include <chrono> 
#include "OrderBookEntry.h"
#include "CSVReader.h"
#include "Candlestick.h"
#include "ScaledCandle.h"
#include "CandlestickCalculator.h"
#include "VolumeDataCalculator.h"


MerkelMain::MerkelMain()
{

}

void MerkelMain::init()
{
    int input;
    currentTime = orderBook.getEarliestTime();

    wallet.insertCurrency("BTC", 10);

    while(true)
    {
        printMenu();
        input = getUserOption();
        processUserOption(input);
    }
}


void MerkelMain::printMenu()
{
    // 1 print help
    std::cout << "1: Print help " << std::endl;
    // 2 print exchange stats
    std::cout << "2: Print exchange stats" << std::endl;
    // 3 make an offer
    std::cout << "3: Make an offer " << std::endl;
    // 4 make a bid 
    std::cout << "4: Make a bid " << std::endl;
    // 5 print wallet
    std::cout << "5: Print wallet " << std::endl;
    // 6 continue   
    std::cout << "6: Continue " << std::endl;
    // 7 Print candlestick data   
    std::cout << "7: Print CandleStick data" << std::endl;
    // 8 print candlestick  
    std::cout << "8: Plot CandleStick Data " << std::endl;
    // 9 print line chart   
    std::cout << "9: Plot Bar Graph Data " << std::endl;

    std::cout << "============== " << std::endl;

    std::cout << "Current time is: " << currentTime << std::endl;
}

void MerkelMain::printHelp()
{
    std::cout << "Help - your aim is to make money. Analyse the market and make bids and offers. " << std::endl;
}

void MerkelMain::printMarketStats()
{
    for (std::string const& p : orderBook.getKnownProducts())
    {
        std::cout << "Product: " << p << std::endl;
        std::vector<OrderBookEntry> entries = orderBook.getOrders(OrderBookType::ask, 
                                                                p, currentTime);
        std::cout << "Asks seen: " << entries.size() << std::endl;
        std::cout << "Max ask: " << OrderBook::getHighPrice(entries) << std::endl;
        std::cout << "Min ask: " << OrderBook::getLowPrice(entries) << std::endl;



    }
}

void MerkelMain::enterAsk()
{
    std::cout << "Make an ask - enter the amount: product,price, amount, eg  ETH/BTC,200,0.5" << std::endl;
    std::string input;
    std::getline(std::cin, input);

    std::vector<std::string> tokens = CSVReader::tokenise(input, ',');
    if (tokens.size() != 3)
    {
        std::cout << "MerkelMain::enterAsk Bad input! " << input << std::endl;
    }
    else {
        try {
            OrderBookEntry obe = CSVReader::stringsToOBE(
                tokens[1],
                tokens[2], 
                currentTime, 
                tokens[0], 
                OrderBookType::ask 
            );
            obe.username = "simuser";
            if (wallet.canFulfillOrder(obe))
            {
                std::cout << "Wallet looks good. " << std::endl;
                orderBook.insertOrder(obe);
            }
            else {
                std::cout << "Wallet has insufficient funds . " << std::endl;
            }
        }catch (const std::exception& e)
        {
            std::cout << " MerkelMain::enterAsk Bad input " << std::endl;
        }   
    }
}

void MerkelMain::enterBid()
{
    std::cout << "Make an bid - enter the amount: product,price, amount, eg  ETH/BTC,200,0.5" << std::endl;
    std::string input;
    std::getline(std::cin, input);

    std::vector<std::string> tokens = CSVReader::tokenise(input, ',');
    if (tokens.size() != 3)
    {
        std::cout << "MerkelMain::enterBid Bad input! " << input << std::endl;
    }
    else {
        try {
            OrderBookEntry obe = CSVReader::stringsToOBE(
                tokens[1],
                tokens[2], 
                currentTime, 
                tokens[0], 
                OrderBookType::bid 
            );
            obe.username = "simuser";

            if (wallet.canFulfillOrder(obe))
            {
                std::cout << "Wallet looks good. " << std::endl;
                orderBook.insertOrder(obe);
            }
            else {
                std::cout << "Wallet has insufficient funds . " << std::endl;
            }
        }catch (const std::exception& e)
        {
            std::cout << " MerkelMain::enterBid Bad input " << std::endl;
        }   
    }
}

void MerkelMain::printWallet()
{
    std::cout << wallet.toString() << std::endl;
}
        
void MerkelMain::gotoNextTimeframe()
{
    std::cout << "Going to next time frame. " << std::endl;
    for (std::string p : orderBook.getKnownProducts())
    {
        std::cout << "matching " << p << std::endl;
        std::vector<OrderBookEntry> sales =  orderBook.matchAsksToBids(p, currentTime);
        std::cout << "Sales: " << sales.size() << std::endl;
        for (OrderBookEntry& sale : sales)
        {
            std::cout << "Sale price: " << sale.price << " amount " << sale.amount << std::endl; 
            if (sale.username == "simuser")
            {
                // update the wallet
                wallet.processSale(sale);
            }
        }
        
    }

    currentTime = orderBook.getNextTime(currentTime);
}
 
int MerkelMain::getUserOption()
{
    int userOption = 0;
    std::string line;
    std::cout << "Type in 1-9" << std::endl;
    std::getline(std::cin, line);
    try{
        userOption = std::stoi(line);
    }catch(const std::exception& e)
    {
        // 
    }
    std::cout << "You chose: " << userOption << std::endl;
    return userOption;
}
//start of my own code
//task1
void MerkelMain::printCandlestickData()
{
    std::vector<OrderBookEntry> exchangeData = CSVReader::readCSV("20200601.csv");

    CandlestickCalculator candleCalc;
    std::vector<Candlestick> candlesticks = candleCalc.computeCandlestickData(exchangeData);

    // Print header
    std::cout << std::setw(19) << "Date" << std::setw(15) << "Open" << std::setw(15) << "High"
              << std::setw(15) << "Low" << std::setw(15) << "Close" << std::setw(25) << "Bid on ETH/BTC" << std::endl;

    // Display candlestick data
    for (const Candlestick& candle : candlesticks)
    {
        // Convert string timestamp to time_t
        std::tm timeinfo = {};
        std::istringstream ss(candle.timestamp);
        ss >> std::get_time(&timeinfo, "%Y/%m/%d %H:%M");

        std::time_t timestamp = std::chrono::system_clock::to_time_t(std::chrono::system_clock::from_time_t(std::mktime(&timeinfo)));

        // Format date
        char buffer[80];
        std::strftime(buffer, 80, "%Y-%m-%d %H:%M", &timeinfo);

        // Print values in a table format
        std::cout << std::setw(19) << buffer << std::setw(15) << candle.open
                  << std::setw(15) << candle.high << std::setw(15) << candle.low
                  << std::setw(15) << candle.close << std::setw(25) << "Bid on ETH/BTC" << std::endl;
    }
}
//task2 & 3
void MerkelMain::plot(int userOption)
{
    std::vector<OrderBookEntry> exchangeData = CSVReader::readCSV("20200601.csv");
    
    if (userOption == 8) {
        CandlestickCalculator candleCalc;
        // Use candlestick calculator
        std::vector<Candlestick> candlesticks = candleCalc.computeCandlestickData(exchangeData);
        std::vector<ScaledCandle> candlestickData = candleCalc.scaleFunction(candlesticks);
        candleCalc.plotCandlestickData(candlestickData, candlesticks, candlesticks.size());
    }
    if (userOption == 9) {
        std::cout << std::setw(100) << "Bar graph for ETH/BTC bid volume" << std::endl;
        VolumeDataCalculator volumeCalc;
        // Use volume calculator
        std::unordered_map<std::string, double> volumeData = volumeCalc.calculateVolumeData(exchangeData);
        const int terminalHeight = 50;
        volumeCalc.plotVolumeData(volumeData, terminalHeight);
    }
}
//end of my own code
void MerkelMain::processUserOption(int userOption)
{
    if (userOption == 0) // bad input
    {
        std::cout << "Invalid choice. Choose 1-9" << std::endl;
    }
    if (userOption == 1) 
    {
        printHelp();
    }
    if (userOption == 2) 
    {
        printMarketStats();
    }
    if (userOption == 3) 
    {
        enterAsk();
    }
    if (userOption == 4) 
    {
        enterBid();
    }
    if (userOption == 5) 
    {
        printWallet();
    }
    if (userOption == 6) 
    {
        gotoNextTimeframe();
    }
    if (userOption == 7)
    {
        printCandlestickData();
    }
    if (userOption == 8) 
    {
        plot(userOption);
    }       
    if (userOption == 9) 
    {
        plot(userOption);
    }              
}
