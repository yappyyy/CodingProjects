#include "DJAudioPlayer.h"
using namespace juce;
//my own code
// Constructor for DJAudioPlayer
DJAudioPlayer::DJAudioPlayer(AudioFormatManager& _formatManager) :
	formatManager{ _formatManager },	
	globalSampleRate{ 0 }
{

}
// Destructor for DJAudioPlayer
DJAudioPlayer::~DJAudioPlayer() 
{

}
// Prepare the audio player for playback
void DJAudioPlayer::prepareToPlay(int samplesPerBlockExpected, double sampleRate)
{
	globalSampleRate = sampleRate;
	transportSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
	resampleSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
	filterSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
	lowSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
	midSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
	highSource.prepareToPlay(samplesPerBlockExpected, sampleRate);
}
// Retrieve the next audio block from the audio source
void DJAudioPlayer::getNextAudioBlock(const AudioSourceChannelInfo& bufferToFill)
{
	highSource.getNextAudioBlock(bufferToFill);
}
// Release the resources used by the audio player
void DJAudioPlayer::releaseResources()
{
	highSource.releaseResources();
}
// Load an audio file from a URL
bool DJAudioPlayer::loadURL(URL audioURL)
{
	auto* reader = formatManager.createReaderFor(audioURL.createInputStream(false));

	if (reader != nullptr)
	{
		std::unique_ptr<AudioFormatReaderSource> newSource
		(new AudioFormatReaderSource(reader, true));
		transportSource.setSource(newSource.get(), 0, nullptr, reader->sampleRate);
		readerSource.reset(newSource.release());

		DBG("DJAudioPlayer::loadURL: file successfully loaded");
		return true;
	}
	else {
		DBG("DJAudioPlayer::loadURL: unable to load file");
	}
	return false;
}

// Start playback
void DJAudioPlayer::start()
{
	transportSource.start();
}

// Stop playback
void DJAudioPlayer::stop()
{
	transportSource.stop();
}

// Check if the audio player is currently playing
bool DJAudioPlayer::isPlaying()
{
	return transportSource.isPlaying();
}

// Get the length of the current track in seconds
double DJAudioPlayer::getLengthOfTrack()
{
	return transportSource.getLengthInSeconds();
}

// Get the length of an audio file from a URL in seconds
double DJAudioPlayer::getLengthAudioURL(URL audioURL)
{
	double lengthInSeconds{ 0 };
	auto* reader = formatManager.createReaderFor(audioURL.createInputStream(false));
	if (reader != nullptr)
	{
		std::unique_ptr<AudioFormatReaderSource> newSource(new AudioFormatReaderSource(reader, true));
		// length of track = lengthInSamples / sampleRate
		lengthInSeconds = reader->lengthInSamples / reader->sampleRate;
		newSource.reset();
	}
	return lengthInSeconds;
}

// Get the current playback position in seconds
double DJAudioPlayer::getCurrentPosition()
{
	return transportSource.getCurrentPosition();
}

// Get the current playback position relative to the total track length
double DJAudioPlayer::getPositionRelative()
{
	return transportSource.getCurrentPosition() / transportSource.getLengthInSeconds();
}

// Set the playback position in seconds
void DJAudioPlayer::setPosition(double posInSeconds)
{
	transportSource.setPosition(posInSeconds);
}

// Set the playback position relative to the total track length
void DJAudioPlayer::setPositionRelative(double pos)
{
	if (pos < 0 || pos > 1.0)
	{
		DBG("DJAudioPlayer::setPositionRelative: position is out of set range");
	}
	else
	{
		double posInSeconds = transportSource.getLengthInSeconds() * pos;
		setPosition(posInSeconds);
	}
}

// Set the gain (volume) of the audio player
void DJAudioPlayer::setGain(double gain)
{
	if (gain < 0 || gain > 2.0)
	{
		DBG("DJAudioPlayer::setGain: gain is out of set range");
	}
	else
	{
		transportSource.setGain(gain);
	}
}

// Set the playback speed ratio
void DJAudioPlayer::setSpeed(double ratio)
{
	if (ratio < 0 || ratio > 100.0)
	{
		DBG("DJAudioPlayer::setSpeed: speed is out of set range");
	}
	else
	{
		resampleSource.setResamplingRatio(ratio);
	}
}

// Toggle looping playback
bool DJAudioPlayer::toggleLooping()
{
	if (readerSource) // check audiosource exists
	{
		if (!readerSource->isLooping())
		{
			readerSource->setLooping(true);
			DBG("DJAudioPlayer::toggleLooping: looping toggled ON");
			return true;
		}
		else
		{
			readerSource->setLooping(false);
			DBG("DJAudioPlayer::toggleLooping: looping toggled OFF");
		}
	}
	return false;
}

// Set the frequency for a low-pass or high-pass filter
void DJAudioPlayer::setFrequency(double frequency = 0)
{
	if (frequency < 0) 
	{
		IIRCoefficients lowPassFilter = IIRCoefficients::makeLowPass(globalSampleRate, frequency * -1);
		filterSource.setCoefficients(lowPassFilter);
		DBG("DJAudioPlayer::setLowPass: frequency: " << frequency * -1);
	}
	else if (frequency > 0)
	{
		IIRCoefficients highPassFilter = IIRCoefficients::makeHighPass(globalSampleRate, frequency);
		filterSource.setCoefficients(highPassFilter);
		DBG("DJAudioPlayer::setHighPass: frequency: " << frequency);
	}
	else
	{
		filterSource.makeInactive();
	}
}

// Set the gain for a low shelf filter
void DJAudioPlayer::setLowShelf(double gainFactor = 1.0)
{
	IIRCoefficients lowShelf = IIRCoefficients::makeLowShelf(globalSampleRate, 300, 1.0 / juce::MathConstants<double>::sqrt2, gainFactor);
	lowSource.setCoefficients(lowShelf);
	DBG("DJAudioPlayer::setLowShelf: gainFactor: " << gainFactor);
}

// Set the gain for a peak filter
void DJAudioPlayer::setPeakFilter(double gainFactor = 1.0)
{
	IIRCoefficients peakFilter = IIRCoefficients::makePeakFilter(globalSampleRate, 3000, 1.0 / juce::MathConstants<double>::sqrt2, gainFactor);
	midSource.setCoefficients(peakFilter);
	DBG("DJAudioPlayer::setPeakFilter: gainFactor: " << gainFactor);
}

// Set the gain for a high shelf filter
void DJAudioPlayer::setHighShelf(double gainFactor = 1.0)
{
	IIRCoefficients highShelf = IIRCoefficients::makeHighShelf(globalSampleRate, 4500, 1.0 / juce::MathConstants<double>::sqrt2, gainFactor);
	highSource.setCoefficients(highShelf);
	DBG("DJAudioPlayer::setHighShelf: gainFactor: " << gainFactor);
}
//end of my own code