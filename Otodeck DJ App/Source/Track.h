#pragma once
#include <JuceHeader.h>
//my own code
class Track
{
public:
	// Constructor taking a juce::File as parameter
	Track(juce::File _file);
	juce::File file; // The file object representing the track
	juce::URL URL; // URL associated with the track (if applicable)
	juce::String title; // Title of the track
	juce::String length; // Length of the track
	juce::String fileExtension; // File extension of the track

	// enable comparison search operations
	bool operator==(const juce::String& other) const;
};
//end of my own code