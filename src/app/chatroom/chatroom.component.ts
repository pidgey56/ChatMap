import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
})
export class ChatroomComponent implements OnInit {
  @ViewChild('scroller') private feedContainer: ElementRef;
  constructor() {}
  private scrollContainer: any;
  previousScrollHeight = 0;

  ngOnInit(): void {

  }

  ngAfterViewChecked() {
    this.scrollContainer = this.feedContainer.nativeElement;
    if(this.previousScrollHeight < this.scrollContainer.scrollHeight){
      this.scrollToBottom();
      this.previousScrollHeight = this.scrollContainer.scrollHeight;
    }
  }

  scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      behavior: "smooth",
    });
  }
}
