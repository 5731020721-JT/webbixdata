import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule,MatExpansionModule,MatDividerModule, MatListModule,MatTabsModule, MatRadioModule, MatCheckboxModule , MatButtonModule, MatCardModule, MatGridListModule, MatInputModule,MatOptionModule, MatSelectModule, MatIconModule} from '@angular/material'
import { MatFormFieldModule} from '@angular/material/form-field';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { AppRoutingModule } from './/app-routing.module';
//import { ChartsModule } from 'ng2-charts';
// import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    PageOneComponent,
    PageTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    MatExpansionModule,MatDividerModule, MatListModule,MatTabsModule, MatRadioModule, MatCheckboxModule , MatButtonModule, MatCardModule, MatGridListModule, MatInputModule,MatOptionModule, MatSelectModule, MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    // ChartsModule
    // ChartModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
