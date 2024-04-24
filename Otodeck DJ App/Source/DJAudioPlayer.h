#pragma once
#include <JuceHeader.h>
#include <string>
//my own code
class DJAudioPlayer : public juce::AudioSource
{
    public:
        DJAudioPlayer(juce::AudioFormatManager& _formatManager); // Constructor
        ~DJAudioPlayer(); // Destructor

        // AudioSource overrides
        void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;
        void getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill) override;
        void releaseResources() override;
        bool loadURL(juce::URL audioURL); // Load audio from a URL

        // Playback control methods
        void start();
        void stop();
        bool isPlaying();
        double getLengthOfTrack();
        double getLengthAudioURL(juce::URL audioURL);
        double getCurrentPosition();
        double getPositionRelative();
        
        void setPosition(double posInSeconds);
        void setPositionRelative(double pos);
        void setGain(double gain);
        void setSpeed(double ratio);
        bool toggleLooping();

        // Filter settings
        void setFrequency(double frequency);
        void setLowShelf(double frequency);
        void setPeakFilter(double frequency);
        void setHighShelf(double frequency);

private:
   
    juce::AudioFormatManager& formatManager; // Reference to AudioFormatManager
    std::unique_ptr<AudioFormatReaderSource> readerSource; // Unique pointer to AudioFormatReaderSource
    juce::AudioTransportSource transportSource; // AudioTransportSource for playback control
    juce::ResamplingAudioSource resampleSource{ &transportSource, false, 2 }; // ResamplingAudioSource for sample rate conversion
    juce::IIRFilterAudioSource filterSource {&resampleSource, false}; // IIRFilterAudioSource for filtering
    juce::IIRFilterAudioSource lowSource{ &filterSource , false }; // Low frequency filter source
    juce::IIRFilterAudioSource midSource{ &lowSource , false }; // Mid frequency filter source
    juce::IIRFilterAudioSource highSource{ &midSource , false }; // High frequency filter source
    double globalSampleRate; // Global sample rate
};
//end of my own code