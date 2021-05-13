import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent implements OnInit {
/*
* This class built to represent the upper pads
* this class does not represent the piano keyboard
*/
isPlaying : boolean = false;
key : any;
status : string = "off";

  constructor() { }

  ngOnInit(): void {
  }

  getIsPlaying()
  {
    return this.isPlaying;
  }

  changeStatus()
  {
    this.isPlaying = !this.isPlaying;
    if(this.isPlaying)
    {
      this.status = "on";
    }
    else
    {
      this.status = "off";
    }
  }

}