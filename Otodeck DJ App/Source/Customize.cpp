#include <JuceHeader.h>
#include "Customize.h"
using namespace juce;
//my own code
Customize::Customize(Component* _component) :
	component{ _component }
{
	// Setting various look and feel colors for UI elements
	getLookAndFeel().setColour(Slider::thumbColourId, Colours::blueviolet);
	getLookAndFeel().setColour(Slider::trackColourId, Colours::red);
	getLookAndFeel().setColour(Slider::rotarySliderFillColourId, Colours::blue);
	getLookAndFeel().setColour(Slider::rotarySliderOutlineColourId, Colours::blueviolet);
	getLookAndFeel().setColour(Slider::backgroundColourId, Colours::blueviolet);
	getLookAndFeel().setColour(Slider::textBoxOutlineColourId, Colours::black);
	getLookAndFeel().setColour(TextButton::buttonColourId, Colours::blueviolet);
	getLookAndFeel().setColour(TextButton::buttonOnColourId, Colours::red);
	getLookAndFeel().setColour(ScrollBar::thumbColourId, Colours::grey);

	// slider colour set 1
	sliderColourSet1.setColour(Slider::thumbColourId, Colours::blueviolet);
	sliderColourSet1.setColour(Slider::trackColourId, Colours::blueviolet);
	sliderColourSet1.setColour(Slider::backgroundColourId, Colours::red);

}
// Function to customize play button
void Customize::playButton(Button* button)
{
	const juce::String TEXT{ "Play" };

	button->setButtonText(TEXT);
	button->setClickingTogglesState(true);
	component->addAndMakeVisible(button);
}
// Function to customize loop button
void Customize::loopButton(Button* button)
{
	const juce::String TEXT{ "Loop: Off" };

	button->setButtonText(TEXT);
	button->setClickingTogglesState(true);
	component->addAndMakeVisible(button);
}
// Function to customize load button
void Customize::loadButton(Button* button)
{
	const juce::String TEXT{ "Load" };
	
	button->setButtonText(TEXT);
	component->addAndMakeVisible(button);
}

// Function to customize volume slider
void Customize::volSlider(Slider* slider)
{
	const double MIN{ 0.0 };
	const double MAX{ 2.0 };
	const double DEFAULT_VAL{ 0.5 };

	slider->setRange(MIN, MAX);
	slider->setValue(DEFAULT_VAL);
	slider->setDoubleClickReturnValue(true, DEFAULT_VAL);
	slider->setTextValueSuffix("dB");
	slider->setNumDecimalPlacesToDisplay(1);
	slider->setTextBoxStyle(Slider::TextBoxRight, false, 50, 15);
	component->addAndMakeVisible(slider);
}
// Function to customize speed slider
void Customize::speedSlider(Slider* slider)
{
	const double MIN{ 0.1 };
	const double MAX{ 3.0 };
	const double DEFAULT_VAL{ 1.0 };

	slider->setRange(MIN, MAX);
	slider->setValue(DEFAULT_VAL);
	slider->setDoubleClickReturnValue(true, DEFAULT_VAL);
	slider->setTextValueSuffix("x");
	slider->setNumDecimalPlacesToDisplay(2);
	slider->setTextBoxStyle(Slider::TextBoxRight, false, 50, 15);
	component->addAndMakeVisible(slider);
}
// Function to customize frequency slider
void Customize::freqSlider(Slider* slider)
{
	const double MIN{ -4999.9 };
	const double MAX{ 5000.0 };
	const double DEFAULT_VAL{ 0.0 };

	slider->setRange(MIN, MAX);
	slider->setValue(DEFAULT_VAL);
	slider->setDoubleClickReturnValue(true, DEFAULT_VAL);
	slider->setTextValueSuffix("Hz");
	slider->setNumDecimalPlacesToDisplay(0);
	slider->setTextBoxStyle(Slider::TextBoxRight, false, 50, 15);
	component->addAndMakeVisible(slider);
}
// Function to customize position slider
void Customize::posSlider(Slider* slider)
{
	const double MIN{ 0.0 };
	const double MAX{ 1.0 };
	const double DEFAULT_VAL{0.0};

	slider->setRange(MIN, MAX);
	slider->setValue(DEFAULT_VAL);
	slider->setTextValueSuffix("s");
	slider->setNumDecimalPlacesToDisplay(2);
	slider->setTextBoxStyle(Slider::TextBoxRight, false, 50, 15);
	// Applying customized look and feel
	slider->setLookAndFeel(&sliderColourSet1);
	component->addAndMakeVisible(slider);
}
// Function to customize low frequency slider
void Customize::lowSlider(Slider* slider)
{
	const double MIN{ 0.01 };
	const double MAX{ 2.0 };
	const double DEFAULT_VAL{ 1.0 };

	slider->setRange(MIN, MAX);
	slider->setValue(DEFAULT_VAL);
	slider->setDoubleClickReturnValue(true, DEFAULT_VAL);
	slider->setNumDecimalPlacesToDisplay(1);
	slider->setTextBoxStyle(Slider::TextBoxBelow, false, 50, 15);
	slider->setSliderStyle(Slider::SliderStyle::Rotary);
	component->addAndMakeVisible(slider);
}
// Function to customize mid frequency slider
void Customize::midSlider(Slider* slider)
{
	const double MIN{ 0.01 };
	const double MAX{ 2.0 };
	const double DEFAULT_VAL{ 1.0 };

	slider->setRange(MIN, MAX);
	slider->setValue(DEFAULT_VAL);
	slider->setDoubleClickReturnValue(true, DEFAULT_VAL);
	slider->setNumDecimalPlacesToDisplay(1);
	slider->setTextBoxStyle(Slider::TextBoxBelow, false, 50, 15);
	slider->setSliderStyle(Slider::SliderStyle::Rotary);
	component->addAndMakeVisible(slider);
}
// Function to customize high frequency slider
void Customize::highSlider(Slider* slider)
{
	const double MIN{ 0.01 };
	const double MAX{ 2.0 };
	const double DEFAULT_VAL{ 1.0 };

	slider->setRange(MIN, MAX);
	slider->setValue(DEFAULT_VAL);
	slider->setDoubleClickReturnValue(true, DEFAULT_VAL);
	slider->setNumDecimalPlacesToDisplay(1);
	slider->setTextBoxStyle(Slider::TextBoxBelow, false, 50, 15);
	slider->setSliderStyle(Slider::SliderStyle::Rotary);
	component->addAndMakeVisible(slider);
}
// Function to customize deck title label
void Customize::deckTitle(Label* label)
{
	label->setJustificationType(Justification::centred);
	label->setFont(20.0f);
	label->toBack();
	component->addAndMakeVisible(label);
}
// Function to customize volume label
void Customize::volLabel(Label* label)
{
	const juce::String TEXT{ "Volume" };

	label->setText(TEXT, dontSendNotification);
	label->setJustificationType(Justification::centred);
	label->toBack();

}
// Function to customize speed label
void Customize::speedLabel(Label* label)
{
	const juce::String TEXT{ "Speed" };

	label->setText(TEXT, dontSendNotification);
	label->setJustificationType(Justification::centred);
	label->toBack();


}
// Function to customize frequency label
void Customize::freqLabel(Label* label)
{
	const juce::String TEXT{ "Freq" };

	label->setText(TEXT, dontSendNotification);
	label->setJustificationType(Justification::centred);
	label->toBack();

}
// Function to customize position label
void Customize::posLabel(Label* label)
{
	const juce::String TEXT{ "Time" };

	label->setText(TEXT, dontSendNotification);
	label->setJustificationType(Justification::centred);
	label->toBack();

}
// Function to customize low frequency label
void Customize::lowLabel(Label* label)
{
	const juce::String TEXT{ "Bass" };

	label->setText(TEXT, dontSendNotification);
	label->setJustificationType(Justification::centred);
	label->toBack();
	
}
// Function to customize mid frequency label
void Customize::midLabel(Label* label)
{
	const juce::String TEXT{ "Mid" };

	label->setText(TEXT, dontSendNotification);
	label->setJustificationType(Justification::centred);
	label->toBack();

}
// Function to customize high frequency label
void Customize::highLabel(Label* label)
{
	const juce::String TEXT{ "Treble" };

	label->setText(TEXT, dontSendNotification);
	label->setJustificationType(Justification::centred);
	label->toBack();

}
// Function to customize search box
void Customize::searchBox(juce::TextEditor* editor)
{
	editor->setTextToShowWhenEmpty("Search", Colours::purple);
	editor->setJustification(Justification::centred);
	editor->setFont(16.0f);
	component->addAndMakeVisible(editor);
}
//end of my own code