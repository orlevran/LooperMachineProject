import { Component, OnInit } from '@angular/core';
import { PadComponent } from '../pad/pad.component';

@Component({
  selector: 'app-piano',
  templateUrl: './piano.component.html',
  styleUrls: ['./piano.component.css']
})
export class PianoComponent implements OnInit {
  isPlaying : boolean = true;
  isLooping : boolean = false;
  initialPlay : boolean = true;
  pads : Array<PadComponent>;
  duration : number;

  constructor()
  {
    this.pads = new Array<PadComponent>();
    /*this.pads = [new PadComponent(), new PadComponent(), new PadComponent(),
      new PadComponent(), new PadComponent(), new PadComponent(),
      new PadComponent(), new PadComponent(), new PadComponent()];*/
      
  }

  ngOnInit() {
    const keys = document.querySelectorAll('.key');
    let tmpPad : PadComponent;
    for(var i = 0 ; i < 9 ; i++)
    {
      tmpPad = new PadComponent();
      tmpPad.key = keys.item(i);
      this.pads.push(tmpPad);
      //this.pads[i].key = keys.item(i);
    }
    this.duration = (<HTMLVideoElement>document.getElementById(this.pads[0].key.dataset.note)).duration;
    
    // TS Functionality will be declare on those objects
    const playButtons = document.querySelectorAll('.playButton');
    const padActivators = document.querySelectorAll('.padActivator');
    const stopButton = document.querySelectorAll('.stopButton');

    keys.forEach(key => { // Declare piano activities
      key.addEventListener('click', () => {this.isPlaying = !this.isPlaying;
      this.playNote(key, this.isPlaying)});
    });

    playButtons.forEach( // Declare play button activities
      p => {p.addEventListener('click',() => {this.isPlaying=true; this.play()})}
    );

    padActivators.forEach(pad => { // Declare pads activities
      pad.addEventListener('click', ()=> {this.setActivePad(pad.id, Number.parseInt(pad.getAttribute('serialNum')))})
    });

    stopButton.forEach(s=>{ // Declare stop button activities
      s.addEventListener('click',()=>{this.stop()});
    })
  }

  async Update()
  { // this function is unused for now
    // I tried to Syncronized the audio playing with it
    // This function was planned to count the audio duration time between pads clicking by waiting
    // I haven't found how should I loop it in parallel to the rest of the program
    const result = <number>await this.getCurrentActiveTime();
    if(result == this.duration)
    {
      this.play();
    }
  }

  getCurrentActiveTime():number{// this function is unused for now
    // I tried to Syncronized the audio playing with it
    // This method was planned to calculate the audio playing duration
    for (var i=0;i<this.pads.length;i++){
      if(this.pads[i].isPlaying){
        const noteAudio = <HTMLVideoElement> document.getElementById(this.pads[i].key.dataset.note);
        return noteAudio.currentTime;
      }
    }
  }

  playNote(key, stop : boolean) { // Playing Audio by command
    const noteAudio = <HTMLVideoElement> document.getElementById(key.dataset.note);
    if(stop)
    { // Stops the audio
      noteAudio.currentTime = noteAudio.duration;
      noteAudio.pause();
      return;
    }
      noteAudio.loop = this.isLooping; // Declare if the audio should be looped
      noteAudio.play();
      key.classList.add('active');
      noteAudio.addEventListener('ended', () => {
        key.classList.remove('active');
      });
  }

  play()
  { // Activate when Play button is cicked
    this.isLooping = true;
    for(var i = 0 ; i < this.pads.length ; i++)
      if(this.pads[i].isPlaying) // check which of the pads should start playing
        this.playNote(this.pads[i].key, false);
  }
  
  stop()
  { // Activate when Stop button is clicked
      for(var i = 0 ; i < this.pads.length ; i++)
        if(this.pads[i].isPlaying) // check which of the pads should stop playing
          this.playNote(this.pads[i].key, true);
  }

  setActivePad(id : string, index : number)
  { // When a pad is clicked, changing it's status- active or inactive
    this.pads[index].changeStatus();
    if(!this.pads[index].isPlaying)
      this.stop(); // stop playing the audio that match the pad if the user gave the order
  }
}
