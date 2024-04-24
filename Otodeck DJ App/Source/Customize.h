#pragma once
#include <JuceHeader.h>
//my own code
class Customize : public juce::Component
{
public:
	Customize(juce::Component* component);
	// Button customization functions
	void playButton(juce::Button* button);
	void loopButton(juce::Button* button);
	void loadButton(juce::Button* button);
	// Slider customization functions
	void volSlider(juce::Slider* slider);
	void speedSlider(juce::Slider* slider);
	void posSlider(juce::Slider* slider);
	void freqSlider(juce::Slider* slider);
	void lowSlider(juce::Slider* slider);
	void midSlider(juce::Slider* slider);
	void highSlider(juce::Slider* slider);
	// Label customization functions
	void deckTitle(juce::Label* label);
	void volLabel(juce::Label* label);
	void speedLabel(juce::Label* label);
	void freqLabel(juce::Label* label);
	void posLabel(juce::Label* label);
	void lowLabel(juce::Label* label);
	void midLabel(juce::Label* label);
	void highLabel(juce::Label* label);
	// TextEditor customization function
	void searchBox(juce::TextEditor* editor);
	Component* component;

private:
	LookAndFeel_V4 sliderColourSet1; // Custom LookAndFeel object

	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(Customize)
};
//end of my own code