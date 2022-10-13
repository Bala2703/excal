import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular material

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import {MatDatepickerModule} from '@angular/material/datepicker'; 

import { FirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { FireService } from './service/fire.service';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FirestoreModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule
  ],
  providers: [AuthService,FireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
