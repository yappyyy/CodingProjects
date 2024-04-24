#include <JuceHeader.h>
#include "WaveformDisplay.h"
using namespace juce;
//my own code
WaveformDisplay::WaveformDisplay(AudioFormatManager& formatManagerToUse,
								 AudioThumbnailCache& cacheToUse) :
	audioThumb{ 1000, formatManagerToUse, cacheToUse }, // Initialize audioThumbnail with size 1000, format manager, and cache
	fileLoaded{ false }, // Initialize fileLoaded flag to false
	position{ 0 } // Initialize position to 0
{
	audioThumb.addChangeListener(this); // Add this object as a change listener to audioThumb
}

WaveformDisplay::~WaveformDisplay()
{

}

// Paint method for drawing the component
void WaveformDisplay::paint(Graphics& g)
{
	g.fillAll(Colours::blueviolet); // Fill the background with blueviolet color

	g.setColour(Colours::red); // Set drawing color to red
	g.drawRect(getLocalBounds(), 1);    // Draw a red rectangle around the component bounds with a width of 1 pixel

	if (fileLoaded)
	{
		g.setColour(Colours::red);  // Set drawing color to red
		audioThumb.drawChannel(g, getLocalBounds(), 0, audioThumb.getTotalLength(), 0, 1.0f);

		g.setColour(Colours::darkorange);
		
		// Set drawing color to red
		g.drawRect(position * getWidth(), 0, (int) std::max(3.0, ((getWidth() / 2) / audioThumb.getTotalLength()) + 2), getHeight());

	
		g.setColour(Colours::blue);
		g.setOpacity(0.5); // Set opacity to 50%
		g.fillRect(0, 0, position * getWidth(), getHeight());
	}
	else
	{
		g.setFont(20.0f); // Set font size to 20
		g.drawText("File not loaded...", getLocalBounds(), Justification::centred, true);   

	}
}
// Method called when the component is resized
void WaveformDisplay::resized()
{
}

// Method to load an audio file from a URL
void WaveformDisplay::loadURL(juce::URL audioURL)
{
	audioThumb.clear(); // Clear the audio thumbnail
	fileLoaded = audioThumb.setSource(new URLInputSource(audioURL)); // Set the audio file source from the URL
	if (fileLoaded)
	{
		DBG("WaveformDisplay::loadURL: loaded!"); // Output debug message indicating file loaded
		position = 0;
		repaint();
	}
	else {
		DBG("WaveformDisplay::loadURL: not loaded :(");
	}
}

// Callback method called when a change occurs in the audio thumbnail
void WaveformDisplay::changeListenerCallback(ChangeBroadcaster* source)
{
	repaint(); // Repaint the component
}

// Method to set the playback position relative to the total length
void WaveformDisplay::setPositionRelative(double pos)
{
	if (pos != position && pos > 0)  // If the new position is different and positive
	{
		position = pos; // Update the position
		repaint();
	}
}
//end of my own code