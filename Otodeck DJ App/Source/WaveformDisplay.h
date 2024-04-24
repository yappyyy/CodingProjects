#pragma once
#include <JuceHeader.h>
//my own code
class WaveformDisplay : public juce::Component,
	public juce::ChangeListener
{
public:
	// Constructor taking AudioFormatManager and AudioThumbnailCache as parameters
	WaveformDisplay(juce::AudioFormatManager& formatManagerToUse,
					juce::AudioThumbnailCache& cacheToUse);
	~WaveformDisplay() override; // Destructor
	// Override paint method for drawing the component
	void paint(juce::Graphics&) override;
	void resized() override;  // Override resized method for handling component resize
	// Method to load an audio file from a URL
	void loadURL(juce::URL audioURL);
	// Callback method called when a change occurs in the audio thumbnail
	void changeListenerCallback(juce::ChangeBroadcaster* source) override;
	// Method to set the playback position relative to the total length
	void setPositionRelative(double pos);

private:
	juce::AudioThumbnail audioThumb; // Audio thumbnail object
	bool fileLoaded;  // Flag indicating whether a file is loaded
	double position; // Current playback position

	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(WaveformDisplay) // Macro to declare class as non-copyable with leak detection
};
//end of my own code