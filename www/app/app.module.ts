import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { GameService } from "./game.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {}
