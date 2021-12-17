import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { ReplacePipe } from './news-details/replace.pipe';
import { ReplaceWordPipe } from './news-details/ReplaceWord.pipe';

@NgModule({
  declarations: [NewsComponent, NewsDetailsComponent, FooterComponent,ReplacePipe,ReplaceWordPipe],
  imports: [CommonModule, NewsRoutingModule, MatIconModule ],
})
export class NewsModule {}
