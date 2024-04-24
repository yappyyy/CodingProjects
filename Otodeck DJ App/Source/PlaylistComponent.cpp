#include <JuceHeader.h>
#include "PlaylistComponent.h"
using namespace juce;
//my own code
PlaylistComponent::PlaylistComponent(DeckGUI* _deckGUI1,
									 DeckGUI* _deckGUI2) :
	deckGUI1{ _deckGUI1 },
	deckGUI2{ _deckGUI2 }
{
	// Initializing member variables and setting up UI components
	loadPlaylistButton.addListener(this);
	addAndMakeVisible(loadPlaylistButton);
	
	customize.searchBox(&searchBox);
	searchBox.addListener(this);
	searchBox.onTextChange = [this] { searchPlaylist(searchBox.getText()); };
	tableComponent.getHeader().addColumn("Deck 1", 1, 50);// Adding columns to table  
	tableComponent.getHeader().addColumn("Deck 2", 2, 50); 
	tableComponent.getHeader().addColumn("Track Title", 3, 300);
	tableComponent.getHeader().addColumn("Length", 4, 350);
	tableComponent.getHeader().addColumn("File", 5, 350);
	tableComponent.getHeader().addColumn("Delete Track", 6, 50); 

	tableComponent.setModel(this); // Setting the model for table
	tableComponent.getViewport()->setScrollBarsShown(true, false, false, false);
	addAndMakeVisible(tableComponent);
	loadLastSession(); // Loading last session data
}

PlaylistComponent::~PlaylistComponent()
{
	saveSession(); // Saving session data before destruction
}

void PlaylistComponent::paint(Graphics& g) // Painting background, borders, and text
{
	g.fillAll(getLookAndFeel().findColour(ResizableWindow::backgroundColourId));   

	g.setColour(Colours::grey);
	g.drawRect(getLocalBounds(), 1);  

	g.setColour(Colours::grey);
	g.setFont(14.0f);
	g.drawText("", getLocalBounds(), Justification::centred, true);   
}

void PlaylistComponent::resized() // Handling resizing of the component

{
	int toolbarHeight = 40;
	loadPlaylistButton.setBounds(0, 0, getWidth() / 2, toolbarHeight);
	searchBox.setBounds(getWidth() / 2, 0, getWidth() / 2, toolbarHeight);
	// Adjusting the positions and sizes of UI components based on the new size
	tableComponent.setBounds(0, toolbarHeight, getWidth(), getHeight() - toolbarHeight);
	DBG("Height of playlist: " << getHeight());
	int colBlock = getWidth() / 16;
	tableComponent.getHeader().setColumnWidth(1, colBlock); 
	tableComponent.getHeader().setColumnWidth(2, colBlock); 
	tableComponent.getHeader().setColumnWidth(3, colBlock * 6);
	tableComponent.getHeader().setColumnWidth(4, colBlock * 5);
	tableComponent.getHeader().setColumnWidth(5, colBlock * 2);
	tableComponent.getHeader().setColumnWidth(6, colBlock); 
}

int PlaylistComponent::getNumRows() // Getting the number of rows in the playlist
{
	if (!searchBox.isEmpty())
		return (int) searchHits.size(); // Returning the count of tracks based on search results or all tracks
	else
		return (int) tracks.size();
}

void PlaylistComponent::paintRowBackground(Graphics& g, int rowNumber, int width, int height, bool rowIsSelected)
{
	// Painting background color for rows
	if (rowIsSelected) {
		g.fillAll(Colours::darkorange);
	}
	else {
		if (fmod(rowNumber, 2) == 0)
		{
			g.fillAll(Colours::blue);
		}
		else {
			g.fillAll(Colours::grey);
		}
	}
}

void PlaylistComponent::paintCell(Graphics& g, int rowNumber, int columnId, int width, int height, bool rowIsSelected)
{
	// Painting content for each cell in the playlist table
		if (columnId == 3)
		{

			if (!searchBox.isEmpty())
			{
				if (rowNumber < getNumRows()) 
					g.drawText(searchHits[rowNumber].title, 2, 0, width - 4, height, Justification::centredLeft, true);
			}
			else
			{
				if (rowNumber < getNumRows())
					g.drawText(tracks[rowNumber].title, 2, 0, width - 4, height, Justification::centredLeft, true);
			}
		}
		if (columnId == 4)
		{
			
			if (!searchBox.isEmpty())
			{
				if (rowNumber < getNumRows())
					g.drawText(searchHits[rowNumber].length, 2, 0, width - 4, height, Justification::centredLeft, true);
			}
			else
			{
				if (rowNumber < getNumRows())
					g.drawText(tracks[rowNumber].length, 2, 0, width - 4, height, Justification::centredLeft, true);
			}
		}
		if (columnId == 5)
		{

			if (!searchBox.isEmpty())
			{
				if (rowNumber < getNumRows())
					g.drawText(searchHits[rowNumber].fileExtension, 2, 0, width - 4, height, Justification::centredLeft, true);
			}
			else
			{
				if (rowNumber < getNumRows())
					g.drawText(tracks[rowNumber].fileExtension, 2, 0, width - 4, height, Justification::centredLeft, true);
			}
		}
}

Component* PlaylistComponent::refreshComponentForCell(int rowNumber, int columnId, bool isRowSelected, Component* existingComponentToUpdate)
{
	// Refreshing components for cells (buttons)
	if (columnId == 1 || columnId == 2)
	{
	
		if (existingComponentToUpdate == nullptr)
		{
			TextButton* btn = new TextButton{ "Load" };
			String id{ std::to_string(rowNumber) + std::to_string(columnId) };
			btn->setComponentID(id);

			btn->addListener(this);
			existingComponentToUpdate = btn;
		}
	}
	if (columnId == 6)
	{
	
		if (existingComponentToUpdate == nullptr)
		{
			TextButton* btn = new TextButton{ "x" };
			String id{ std::to_string(rowNumber) + std::to_string(columnId) };
			btn->setComponentID(id);

			btn->addListener(this);
			existingComponentToUpdate = btn;
		}
	}
	return existingComponentToUpdate;
}

void PlaylistComponent::buttonClicked(Button* button) // Handling button clicks
{	
	// Handling different button clicks such as load playlist button or track loading buttons
	if (button == &loadPlaylistButton)
	{
		DBG("Load Playlist Button was clicked");
		loadPlaylist();
	}
	else 
	{
		int buttonID = std::stoi(button->getComponentID().toStdString());
		DBG("PlaylistComponent::buttonClicked: " << button->getComponentID());
		handlePlaylistButtons(buttonID);
	}
}

bool PlaylistComponent::isInterestedInFileDrag(const StringArray& files)
{
	// Determining if the component is interested in file drag events
	DBG("PlaylistComponent::isInterestedInFileDrag");
	return true;
}


void PlaylistComponent::filesDropped(const StringArray& files, int x, int y)
{
	// Handling dropped files, adding them to the playlist
	if (files.size() >= 1)
	{
		for (const File& file : files)
		{
			juce::String fileName{ file.getFileNameWithoutExtension() };
			if (!checkDupeTracks(fileName)) 
			{
				Track createTrack{ file };
				juce::URL audioURL{ file };
				createTrack.length = getLengthMinutes(audioURL);
				tracks.push_back(createTrack);
				DBG("PlaylistComponent::filesDropped: dropped files loaded: " << createTrack.title);
			}
			else
			{
				
				DBG("PlaylistComponent::filesDropped: Duplicate file already loaded: " << fileName);
			}
		}
		tableComponent.updateContent();
	}
}


void PlaylistComponent::searchPlaylist(juce::String searchText)
{
	// Searching for tracks based on search text
	DBG("PlaylistComponent::searchPlaylist: Searching for: " << searchText);
	if (searchText != "")
	{
		searchHits.clear();
		for (Track& track : tracks)
		{
			if (track.title.toLowerCase().contains(searchText.toLowerCase().trim()))
			{
				searchHits.push_back(track);
			}
		}
		int row = highlightTrack(searchText);
		tableComponent.selectRow(row);
		
		DBG("searchHits.size() results: " << std::to_string(searchHits.size()));
	}
	else
	{
		tableComponent.deselectAllRows();
	}
	tableComponent.updateContent();
	repaint();
}

int PlaylistComponent::highlightTrack(juce::String searchText)
{
	// Highlighting search results within the playlist
	auto it = find_if(searchHits.begin(), searchHits.end(), [&searchText](const Track& obj) 
		{return obj.title.toLowerCase().contains(searchText.toLowerCase().trim()); });
	int i = -1;

	if (it != searchHits.end())
	{
		i = (int) std::distance(searchHits.begin(), it);
	}

	return i;
}

void PlaylistComponent::loadPlaylist()
{
	// Loading a playlist from selected files
	FileChooser chooser{ "Select files..." };
	if (chooser.browseForMultipleFilesToOpen())
	{
		for (const File& file : chooser.getResults())
		{
			juce::String fileName{ file.getFileNameWithoutExtension() };
			if (!checkDupeTracks(fileName)) 
			{
		
				Track createTrack{ file };
				juce::URL audioURL{ file };
				createTrack.length = getLengthMinutes(audioURL);
				tracks.push_back(createTrack);
				DBG("PlaylistComponent::buttonClicked: file loaded: " << createTrack.title);
			}
			else 
			{
				
				DBG("PlaylistComponent::buttonClicked: Duplicate file already loaded: " << fileName);
			}
		}
	
		tableComponent.updateContent();
	}
}

void PlaylistComponent::handlePlaylistButtons(int buttonID) // Handling actions when buttons in the playlist are clicked
{
	int row = floor(buttonID / 10);
	int col = fmod(buttonID, 10);   

	if (col == 1)
	{
		if (!searchBox.isEmpty()) 
		{
			if (deckGUI1->player->loadURL(searchHits[row].URL)) {
				deckGUI1->togglePlayButton();
			}
			deckGUI1->waveformDisplay.loadURL(searchHits[row].URL);
			deckGUI1->deckTitle.setText(searchHits[row].title, dontSendNotification);
		}
		else
		{
			if (deckGUI1->player->loadURL(tracks[row].URL)) {
				deckGUI1->togglePlayButton();
			}
			deckGUI1->waveformDisplay.loadURL(tracks[row].URL);
			deckGUI1->deckTitle.setText(tracks[row].title, dontSendNotification);
		}
	}

	// load deck 2
	if (col == 2)
	{
		if (!searchBox.isEmpty())
		{
			if (deckGUI2->player->loadURL(searchHits[row].URL)) {
				deckGUI2->togglePlayButton();
			}
			deckGUI2->waveformDisplay.loadURL(searchHits[row].URL);
			deckGUI2->deckTitle.setText(searchHits[row].title, dontSendNotification);
		}
		else
		{
			if (deckGUI2->player->loadURL(tracks[row].URL)) {
				deckGUI2->togglePlayButton();
			}
			deckGUI2->waveformDisplay.loadURL(tracks[row].URL);
			deckGUI2->deckTitle.setText(tracks[row].title, dontSendNotification);
		}
	}

	if (col == 6)
	{
		if (!searchBox.isEmpty())
		{
			DBG("PlaylistComponent::buttonClicked: searching for track, delete disabled");
		}
		else
		{
			tracks.erase(tracks.begin() + row);
			DBG("PlaylistComponent::buttonClicked: track " << row << " deleted");
		}
		tableComponent.updateContent();
	}
}


std::string PlaylistComponent::secondsToMinutes(double seconds)
{
	seconds = std::round(seconds);

	std::string minString{ "" };
	std::string secString{ "" };

	int min{ int(seconds / 60) };
	int sec{ int(std::fmod(seconds, 60)) };

	std::cout << "min: " << min << ", sec: " << sec << std::endl;

	if (min < 10)
	{
		minString = "0" + std::to_string(min);
	}
	else
	{
		minString = std::to_string(min);
	}
	if (sec < 10)
	{
		secString = "0" + std::to_string(sec);
	}
	else
	{
		secString = std::to_string(sec);
	}

	std::cout << "minString: " << minString << ", secString: " << secString << std::endl;

	return std::string(minString + ":" + secString);
}

String PlaylistComponent::getLengthMinutes(juce::URL audioURL)
{	
	// Getting the length of audio file in minutes
	double lengthInSeconds = deckGUI1->player->getLengthAudioURL(audioURL);
	std::string lengthInMinutes = secondsToMinutes(lengthInSeconds);

	DBG("PlaylistComponent::getLengthMinutes: track length: " << lengthInMinutes);
	return juce::String(lengthInMinutes);
}

bool PlaylistComponent::checkDupeTracks(juce::String fileName)
{	
	// Checking if a track with the same file name already exists in the playlist
	return (std::find(tracks.begin(), tracks.end(), fileName) != tracks.end());
}



void PlaylistComponent::saveSession()
{
	// Saving the playlist data to a file
	std::ofstream savedPlaylist("saved-playlist.csv");
	for (Track& track : tracks)
	{
		savedPlaylist << track.file.getFullPathName() << "," << track.length << "\n";
	}
}


void PlaylistComponent::loadLastSession()
{
	// Loading the playlist data from the last session
	std::ifstream savedPlaylist("saved-playlist.csv");
	std::string filePath;
	std::string length;

	if (savedPlaylist.is_open())
	{
		while (getline(savedPlaylist, filePath, ',')) {
			File file{ filePath };
			Track newTrack{ file };

			getline(savedPlaylist, length);
			newTrack.length = length;
			tracks.push_back(newTrack);
		}
	}
	savedPlaylist.close();
}
//end of my own code