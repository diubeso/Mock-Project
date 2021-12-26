import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/service/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent implements OnInit {
  constructor(private service: NewsService, private route: ActivatedRoute) { }
  DataNews: any = {};
  @ViewChild('videoPlayer')
  videoplayer!: ElementRef;
  Video: any;
  theRecord: any = {};
  ngOnInit(): void {
    // let QuerryURl = this.route.snapshot.queryParamMap.get('id');
    // this.route.paramMap.subscribe((es) => {
    //   let que = Number(es.get('id'));
    //   this.service.GetNewsByid(que).subscribe((e) => {
    //     this.DataNews = e;
    //     this.Video = 'https://' + e.video;
    //     console.log(this.Video);
    //   });
    // });
    this.route.params.subscribe(params => {
      this.DataNews = params;
      console.log(this.DataNews);
    });

  }
  PLayveo() {
    this.videoplayer.nativeElement.play();
  }
}
