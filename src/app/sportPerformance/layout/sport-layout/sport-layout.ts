import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-sport-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './sport-layout.html',
  styleUrl: './sport-layout.css',
})
export class SportLayout {

}
