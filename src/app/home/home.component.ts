import {Component, ViewChild, ElementRef} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLarge } from './x-large';

declare var headtrackr :any;
import '../../assets/plugins/headtrackr/headtrackr.js'


@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.style.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.template.html',

  // Check here! This is important!
  queries : {
    myCanvas : new ViewChild('inputCanvas'),
    myVideo : new ViewChild('inputVideo')
  }
})


export class Home {
  // Set our default values
  localState = { value: '' };
  canvas1;
  video1;
  // TypeScript public modifiers
  constructor(private elementRef: ElementRef, public appState: AppState, public title: Title) {

  }

  @ViewChild("inputCanvas") inputCanvas;
  @ViewChild("inputVideo") inputVideo;

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  ngAfterViewInit() {

    // let canvas = this.inputCanvas.nativeElement;
    // let video = this.inputVideo.nativeElement;
    // var video2 = this.elementRef.nativeElement.;

    var htracker = new headtrackr.Tracker();
    htracker.init(this.inputVideo, this.inputCanvas);
    htracker.start();

  }
  submitState(value) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

}
