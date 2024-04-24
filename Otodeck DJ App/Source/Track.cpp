#include "Track.h"
#include <filesystem>
using namespace juce;
// my own code
Track::Track(File _file) : // Constructor for the Track class, taking a File object as input
	file{ _file }, // Initialize the file member variable with the input file
	URL{ juce::URL{ _file } }, // Initialize the URL member variable with the URL constructed from the input file
	title{ _file.getFileNameWithoutExtension().trim() },  // Initialize the title member variable with the file name without extension
	fileExtension{_file.getFileExtension()} // Initialize the fileExtension member variable with the file extension

{
	DBG("Track::Track: Created new track: " << title << " from subpath: " << URL.getSubPath()); // Debug message indicating the creation of a new track
}

bool Track::operator==(const juce::String& track) const
{
	return title == track; // Overloaded equality operator for comparing Track objects by their titles
}
//end of my own code