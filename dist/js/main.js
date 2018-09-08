//Init SpeachSynth API
const synth = window.speechSynthesis;

//Dom Element
const textForm = document.querySelector('form')
const textInput= document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate  = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')

//Init Voices array
let voices = []

const getVoices =  () => {
    voices = synth.getVoices()
    console.log(voices)
    voices.forEach( voice => {
        // Create option element
        const option = document.createElement('option')
        //Fill Option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')'; 
        //Set needed option attributes
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)
        voiceSelect.appendChild(option)
    })
}
getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak 
const Speak = () => {
    // Check if already speaking
    if(synth.speaking){
        console.log('Already speacking...');
        return;
    }
    // Check if text input is empty
    if(textInput.value){
        const speaktext = new SpeechSynthesisUtterance(textInput.value);
        speaktext.onend = e => {
            console.log('Done speakking...')
        }
        //Speak error
        speaktext.onerror = e => {
            console.error('something went wrong')
        }

        // Selected voice
        const SelectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

        voices.forEach(voice => {
            if(voice.name === SelectedVoice){
                speaktext.voice = voice
            }
        })

        speaktext.rate = rate.value;
        speaktext.pitch = pitch.value;
        synth.speak(speaktext);
    }
}

//Event listener 

//Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    Speak()
    textInput.blur()
    
})

// Rate value change 
rate.addEventListener('change', e => rateValue.textContent = rate.value )

//Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value )

//voice select change
voiceSelect.addEventListener('change', e => Speak())