#include <JuceHeader.h>
#include "MainComponent.h"
//my own code
class NewProjectApplication  : public juce::JUCEApplication
{
public:
    // Constructor
    NewProjectApplication() {}

    // Overridden functions to provide application information
    const juce::String getApplicationName() override       { return ProjectInfo::projectName; }
    const juce::String getApplicationVersion() override    { return ProjectInfo::versionString; }
    bool moreThanOneInstanceAllowed() override             { return true; }

    // Initialize the application
    void initialise (const juce::String& commandLine) override
    {
        // Create the main window
        mainWindow.reset (new MainWindow (getApplicationName()));
    }

    void shutdown() override
    {
        // Shutdown the application
        mainWindow = nullptr;
    }

    // Handle system request to quit the application
    void systemRequestedQuit() override
    {
        // Quit the application
        quit();
    }

    // Handle another instance of the application being started
    void anotherInstanceStarted (const juce::String& commandLine) override
    {

    }

    // Define the main window class
    class MainWindow    : public juce::DocumentWindow
    {
    public:
        MainWindow (juce::String name)
            : DocumentWindow (name,
                              juce::Desktop::getInstance().getDefaultLookAndFeel()
                                                          .findColour (juce::ResizableWindow::backgroundColourId),
                              DocumentWindow::allButtons)
        {
            setUsingNativeTitleBar (true); // Use native title bar
            setContentOwned (new MainComponent(), true);  // Set the content component as MainComponent

           #if JUCE_IOS || JUCE_ANDROID
            setFullScreen (true);
           #else
            setResizable (true, true);
            centreWithSize (getWidth(), getHeight());
           #endif
            // Make the window visible
            setVisible (true);
        }

        void closeButtonPressed() override
        {
            JUCEApplication::getInstance()->systemRequestedQuit(); // Request system to quit the application
        }

    private:
        JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR (MainWindow)
    };

private:
    std::unique_ptr<MainWindow> mainWindow;
};

// Entry point of the application
START_JUCE_APPLICATION (NewProjectApplication)
//end of my own code