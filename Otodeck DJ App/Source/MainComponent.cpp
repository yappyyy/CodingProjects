#include "MainComponent.h"
using namespace juce;
//my own code
MainComponent::MainComponent()
{
    // Setting the size of the component
    setSize (900, 900);

    // Checking if audio recording permission is required and granted
    if (RuntimePermissions::isRequired (RuntimePermissions::recordAudio)
        && ! RuntimePermissions::isGranted (RuntimePermissions::recordAudio))
    {   
        // Requesting audio recording permission asynchronously
        RuntimePermissions::request (RuntimePermissions::recordAudio,
                                           [&] (bool granted) { setAudioChannels (granted ? 2 : 0, 2); });
    }
    else
    {
        // Setting audio channels directly
        setAudioChannels (2, 2);
    }

    // Adding and making visible GUI components for decks
    addAndMakeVisible(deckGUI1);
    addAndMakeVisible(deckGUI2);

    // Setting deck titles
    deckGUI1.deckTitle.setText("DJ DECK 1", dontSendNotification);
    deckGUI2.deckTitle.setText("DJ DECK 2", dontSendNotification);
    
    // Adding and making visible the playlist component
    addAndMakeVisible(playlistComponent);
    formatManager.registerBasicFormats();
    // Registering basic audio formats
}

// Destructor
MainComponent::~MainComponent()
{
    // Shutting down audio
    shutdownAudio();
}

// Prepare to play audio
void MainComponent::prepareToPlay (int samplesPerBlockExpected, double sampleRate)
{   
    // Preparing players for play
    player1.prepareToPlay(samplesPerBlockExpected, sampleRate);
    player2.prepareToPlay(samplesPerBlockExpected, sampleRate);

    // Preparing mixer source for play
    mixerSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
    mixerSource.addInputSource(&player1, false);
    mixerSource.addInputSource(&player2, false);
}

// Get the next audio block
void MainComponent::getNextAudioBlock (const AudioSourceChannelInfo& bufferToFill)
{
    mixerSource.getNextAudioBlock(bufferToFill);
}

// Release audio resources
void MainComponent::releaseResources()
{
    player1.releaseResources();
    player2.releaseResources();
    mixerSource.releaseResources();
}

// Paint method
void MainComponent::paint (Graphics& g)
{   
    // Fill the background with the window's background color
    g.fillAll (getLookAndFeel().findColour (ResizableWindow::backgroundColourId));
}

void MainComponent::resized()
{
    // Set bounds for deck GUIs and playlist component
    //                              x, y,          width,      height
    deckGUI1.setBounds(             0, 0, getWidth() / 2, getHeight() * 3/5);
    deckGUI2.setBounds(getWidth() / 2, 0, getWidth() / 2, getHeight() * 3/5);

    playlistComponent.setBounds(0, getHeight() * 3/5, getWidth(), getHeight() * 2/5);
    // Debug message
    DBG("MainComponent::resized");
}
//end of my own code
