#include <JuceHeader.h>
#include "DeckGUI.h"

using namespace juce;
//my own code
DeckGUI::DeckGUI(DJAudioPlayer* _player,
	AudioFormatManager& formatManagerToUse,
	AudioThumbnailCache& cacheToUse) :
	player{ _player },
	waveformDisplay{ formatManagerToUse, cacheToUse }
{
	// Set timer to update GUI periodically
	startTimer(150);
	// Add listeners to GUI components
	playButton.addListener(this);
	customize.playButton(&playButton);


	// load button
	loadButton.addListener(this);
	customize.loadButton(&loadButton);

	// vol slider & label
	volSlider.addListener(this);
	volLabel.attachToComponent(&volSlider, true);
	customize.volSlider(&volSlider);
	customize.volLabel(&volLabel);


	speedSlider.addListener(this);
	speedLabel.attachToComponent(&speedSlider, true);
	customize.speedSlider(&speedSlider);
	customize.speedLabel(&speedLabel);

	posSlider.addListener(this);
	posLabel.attachToComponent(&posSlider, true);
	customize.posSlider(&posSlider);
	customize.posLabel(&posLabel);
	lowSlider.addListener(this);
	lowLabel.attachToComponent(&lowSlider, false);
	customize.lowSlider(&lowSlider);
	customize.lowLabel(&lowLabel);
	midSlider.addListener(this);
	midLabel.attachToComponent(&midSlider, false);


	// title display label
	customize.deckTitle(&deckTitle);
	addAndMakeVisible(waveformDisplay);
}

DeckGUI::~DeckGUI()
{
	stopTimer(); // Stop timer on destruction
}

void DeckGUI::paint(Graphics& g)
{
	g.fillAll(Colours::pink);   // clear the background}
}

void DeckGUI::resized()
{
	double rowH = getHeight() / 11; // Calculate row height
	// buttons, GUI components in format: x,  y,  width,  height
	loadButton.setBounds(0, 0, getWidth() / 3, rowH);
	playButton.setBounds(getWidth() / 3, 0, getWidth() / 3, rowH);
	loopButton.setBounds(getWidth() / 3 * 2, 0, getWidth() / 3, rowH);

	// sliders
	volSlider.setBounds(50, rowH * 2, getWidth() - 65, rowH);
	speedSlider.setBounds(50, rowH * 3 - 10, getWidth() - 65, rowH);
	highSlider.setBounds(getWidth() / 3 * 2, rowH * 4 - 5, getWidth() / 3, rowH * 3 - 5);
	midSlider.setBounds(getWidth() / 3, rowH * 4 - 5, getWidth() / 3, rowH * 3 - 5);
	lowSlider.setBounds(0, rowH * 4 - 5, getWidth() / 3, rowH * 3 - 5);
	freqSlider.setBounds(50, rowH * 7 - 10, getWidth() - 65, rowH);
	posSlider.setBounds(50, getHeight() - rowH, getWidth() - 65, rowH);

	// labels
	deckTitle.setBounds(0, rowH + 8, getWidth(), rowH);
	highLabel.setBounds(getWidth() / 3 * 2, rowH * 4, getWidth() / 3, rowH * 3 - 28);
	midLabel.setBounds(getWidth() / 3, rowH * 4, getWidth() / 3, rowH * 3 - 28);
	lowLabel.setBounds(0, rowH * 4, getWidth() / 3, rowH * 3 - 28);

	// waveform
	waveformDisplay.setBounds(0, getHeight() - rowH * 3, getWidth(), rowH * 2);
}

void DeckGUI::buttonClicked(Button* button)
{
	if (button == &playButton)
	{
		togglePlayButton();
	}
	if (button == &loopButton)
	{
		toggleLoopButton();
	}
	if (button == &loadButton)
	{
		// Launch file chooser asynchronously
		auto fileChooserFlags = FileBrowserComponent::canSelectFiles;
		fChooser.launchAsync(fileChooserFlags, [this](const FileChooser& chooser)
			{
				auto chosenFile = chooser.getResult();

				if (player->loadURL(URL{ chosenFile })) { // Load audio file and update UI
					playButton.setButtonText("Play");
				}
				waveformDisplay.loadURL(URL{ chosenFile });
				deckTitle.setText(chosenFile.getFileNameWithoutExtension(), dontSendNotification);
			});
	}
}

void DeckGUI::togglePlayButton()
{
	if (!player->isPlaying())
	{
		if (posSlider.getValue() >= posSlider.getMaximum() - 2) // Start playing if not already playing
		{
			posSlider.setValue(0.0);
		}
		player->start();
		DBG("Play Start");
	}
	else
	{
		player->stop();
		DBG("Play Stop"); // Stop playing if already playing
	}
}
void DeckGUI::toggleLoopButton()
{	
	// Toggle looping and update button text accordingly
	player->toggleLooping() ? loopButton.setButtonText("Loop: On") : loopButton.setButtonText("Loop: Off"); 
}

void DeckGUI::sliderValueChanged(Slider* slider)
{	
	// Handle slider value changes for various controls
	if (slider == &volSlider)
	{
		// set volume
		player->setGain(slider->getValue());
	}
	if (slider == &speedSlider)
	{
		// set playback speed
		player->setSpeed(slider->getValue());
	}
	if (slider == &posSlider)
	{
		// set time in seconds of the track
		player->setPosition(slider->getValue());
		if (player->isPlaying())
		{
			// set slider value to length of track
			posSlider.setRange(0.0, player->getLengthOfTrack());
			posSlider.setNumDecimalPlacesToDisplay(2);
		}
	}
	if (slider == &freqSlider)
	{
		// Set frequency
		player->setFrequency(slider->getValue());
	}
	if (slider == &highSlider)
	{	
		// Set high shelf
		player->setHighShelf(slider->getValue());
	}
	if (slider == &midSlider)
	{
		// Set peak filter
		player->setPeakFilter(slider->getValue());
	}
	if (slider == &lowSlider)
	{
		// Set low shelf
		player->setLowShelf(slider->getValue());
	}
}

bool DeckGUI::isInterestedInFileDrag(const StringArray& files)
{
	// Indicate interest in file drag
	DBG("DeckGUI::isInterestedInFileDrag");
	return true;
}

void DeckGUI::filesDropped(const StringArray& files, int x, int y)
{
	// list of selected items stored as str array "files"
	for (String filename : files)
	{
		DBG("DeckGUI::filesDropped " << filename);
	}
	if (files.size() >= 1)
	{	
		// Load dropped file and update UI
		player->loadURL(juce::URL{ File{files[0]} });
		waveformDisplay.loadURL(URL{ File{files[0]} });
		deckTitle.setText(File{ files[0] }.getFileNameWithoutExtension(), dontSendNotification);
	}
}

void DeckGUI::timerCallback()
{
	if (!isnan(player->getPositionRelative()) && player->isPlaying())
	{
		// move posSlider together according to track position 
		waveformDisplay.setPositionRelative(player->getPositionRelative());
		posSlider.setValue(player->getCurrentPosition());
		playButton.setButtonText("Stop");
	}
	else
		playButton.setButtonText("Play");
}
//end of my own code