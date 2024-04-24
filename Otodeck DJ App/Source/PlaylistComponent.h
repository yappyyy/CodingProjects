#pragma once
#include <JuceHeader.h>
#include "DeckGUI.h"
#include "Track.h"
#include "Customize.h"
#include <vector>
#include <string>
#include <string.h>
#include <cmath>
#include <algorithm>
#include <fstream>
//my own code
class PlaylistComponent : public juce::Component,
	   					  public juce::TableListBoxModel,
						  public juce::Button::Listener,
						  public juce::TextEditor::Listener,
						  public juce::FileDragAndDropTarget
{
public:
	// Constructor and Destructor
	PlaylistComponent(DeckGUI* _deckGUI1,
					  DeckGUI* _deckGUI2);
	~PlaylistComponent() override;
	// Component Callbacks
	void paint(juce::Graphics&) override;
	void resized() override;

	// implement TableListBoxModel
	int getNumRows() override;
	void paintRowBackground(juce::Graphics& g, int rowNumber, int width, int height, bool rowIsSelected) override;
	void paintCell(juce::Graphics& g, int rowNumber, int columnId, int width, int height, bool rowIsSelected) override;
	juce::Component* refreshComponentForCell(int rowNumber, int columnId, bool isRowSelected, juce::Component* existingComponentToUpdate) override;
	// Button Listener Callback
	void buttonClicked(juce::Button* button) override;
	// File Drag and Drop Callbacks
	bool isInterestedInFileDrag(const juce::StringArray& files) override;
	void filesDropped(const juce::StringArray& files, int x, int y) override;

private:
	std::vector<Track> tracks{};
	std::vector<Track> searchHits{};
	
	DeckGUI* deckGUI1;
	DeckGUI* deckGUI2;
	
	juce::FileChooser fChooser{ "Select a file..." };
	juce::TextButton loadPlaylistButton{ "Load Playlist" };
	juce::TextEditor searchBox;
	juce::TableListBox tableComponent;

	Customize customize { this };

	void searchPlaylist(juce::String searchText);
	int highlightTrack(juce::String searchText);
	void loadPlaylist();
	void handlePlaylistButtons(int buttonID);
	std::string secondsToMinutes(double seconds);
	juce::String getLengthMinutes(juce::URL audioURL);
	bool checkDupeTracks(juce::String fileName);

	void saveSession();
	void loadLastSession();
	
	JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(PlaylistComponent)
};
//end of my own code