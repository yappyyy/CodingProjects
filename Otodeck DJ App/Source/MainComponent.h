#pragma once
#include <JuceHeader.h>
#include "DJAudioPlayer.h"
#include "DeckGUI.h"
#include "PlaylistComponent.h"
// my own code
class MainComponent : public juce::AudioAppComponent
{
public:
	MainComponent(); // Constructor
	~MainComponent() override; // Destructor

	// AudioAppComponent overrides
	void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;
	void getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill) override;
	void releaseResources() override;

	// UI rendering
	void paint(juce::Graphics& g) override;
	void resized() override;

private:
	// Mixer for audio sources
	juce::MixerAudioSource mixerSource;

	// Audio players and GUIs for two decks
	DJAudioPlayer player1{ formatManager };
	DJAudioPlayer player2{ formatManager };
	DeckGUI deckGUI1{ &player1, formatManager, thumbCache };
	DeckGUI deckGUI2{ &player2, formatManager, thumbCache };

	// draw waveform
	// Audio format manager for decoding audio files
	juce::AudioFormatManager formatManager;
	// Thumbnail cache for storing audio file thumbnails
	juce::AudioThumbnailCache thumbCache{ 100 };
	// Playlist component that interacts with deck GUIs
	PlaylistComponent playlistComponent{ &deckGUI1, &deckGUI2 };
	// Leak detection macro to detect memory leaks
	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainComponent)
};
// end of my own code