#pragma once
#include <JuceHeader.h>
#include "DJAudioPlayer.h"
#include "WaveformDisplay.h"
#include "Customize.h"

//my own code
class DeckGUI : public juce::Component,
	public juce::Button::Listener, 
	public juce::Slider::Listener,
	public juce::FileDragAndDropTarget,
	public juce::Timer
{
public:
	DeckGUI(DJAudioPlayer* player,      // listen to audio file
	juce::AudioFormatManager& formatManagerToUse,
	juce::AudioThumbnailCache& cacheToUse);
	~DeckGUI() override; // Destructor for DeckGUI
	// Override paint function for custom drawing
	void paint(juce::Graphics&) override; 
	void resized() override;  // Override resized function for layout adjustments
	// Button click event handler
	void buttonClicked(juce::Button* button) override;
	// Slider value change event handler
	void sliderValueChanged(juce::Slider* slider) override;
	// Check if interested in file drag event
	bool isInterestedInFileDrag(const juce::StringArray& files) override;
	void filesDropped(const juce::StringArray& files, int x, int y) override; // Handle files dropped onto the component

	// implement Timer
	void timerCallback() override;

	void togglePlayButton();  // Toggle play button
	void toggleLoopButton();  // Toggle loop button

	juce::Label deckTitle; // Declare a label for deck title
	DJAudioPlayer* player; // Pointer to DJAudioPlayer
	WaveformDisplay waveformDisplay; // WaveformDisplay object

private:
	Customize customize { this }; // Customize object
	// Buttons
	juce::TextButton playButton;
	juce::TextButton loopButton;
	juce::TextButton loadButton;
	
	juce::FileChooser fChooser{ "Select a file..." }; // File chooser dialog
	// Sliders and their corresponding labels
	juce::Slider volSlider;
	juce::Slider speedSlider;
	juce::Slider freqSlider;
	juce::Slider posSlider;
	juce::Label volLabel;
	juce::Label speedLabel;
	juce::Label freqLabel;
	juce::Label posLabel;
	// Equalizer sliders and their corresponding labels
	juce::Slider highSlider;
	juce::Slider midSlider;
	juce::Slider lowSlider;
	juce::Label highLabel;
	juce::Label midLabel;
	juce::Label lowLabel;
	// Leak detector macro for preventing memory leaks
	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(DeckGUI)
};
//end of my own code