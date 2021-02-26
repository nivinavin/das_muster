import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeachService {

  constructor() { }

  textToAudio(data: string) {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = data;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
  }
}
