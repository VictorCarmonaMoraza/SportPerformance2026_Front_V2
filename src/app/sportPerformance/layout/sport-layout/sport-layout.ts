import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../../shared/components/footer/footer";

@Component({
  selector: 'app-sport-layout',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './sport-layout.html',
  styleUrl: './sport-layout.css',
})
export class SportLayout {

}
