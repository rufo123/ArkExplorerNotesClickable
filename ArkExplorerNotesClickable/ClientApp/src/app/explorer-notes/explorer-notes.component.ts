import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-explorer-notes',
  templateUrl: './explorer-notes.component.html',
  styleUrls: ['./explorer-notes.component.css']
})
export class ExplorerNotesComponent implements OnInit {

  public aExplorerNotesData: IExplorerNotesData[] = [];

  public aPickedExplorerNotes: IPickedExplorerNotes[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<IExplorerNotesData[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.aExplorerNotesData = result;
      console.log(this.aExplorerNotesData);
    }, error => console.error(error));

    this.returnNotesFromLocalStorage();
  }

  ngOnInit(): void {
    console.log(this.aExplorerNotesData);
    console.log(this.aPickedExplorerNotes);
  }

  getXValue(parCoordinates: string): number {
    return (100 / (93 - 7)) * (parseFloat(parCoordinates.split(",")[0]) - 7);
  }

  getYValue(parCoordinates: string): number {
    return (100 / (93 - 7)) * (parseFloat(parCoordinates.split(",")[1]) - 7);
  }

  getColor(parType: string, index: number): string {

    this.returnNotesFromLocalStorage();

    if (this.aPickedExplorerNotes.find((element) => {
      return element.id === this.aExplorerNotesData[index].id
    })) {
      return "lime";
    }

    if (parType === "Dossier") {
      return "Fuchsia 	";
    }

    if (parType === "Note" || parType === "Record") {
      return "Yellow";
    }

    if (parType == "Discovery") {
      return "cyan"
    }

    if (parType == "Hologram") {
      return "black"
    }

    if (parType == "Genesis2Chronicles") {
      return "blue"
    }

    return "white";
  }

  onClickNote(index: number) {

    this.returnNotesFromLocalStorage();

    if (this.aPickedExplorerNotes.find((element) => {
        return element.id === this.aExplorerNotesData[index].id;
    }))
    {
      console.log("In Storage " + this.aExplorerNotesData[index].id)
      // If Note is in Local Storage - That means it is clicked - We needs to remove it
      this.removeNoteFromLocalStorage(this.aExplorerNotesData[index].id);
      console.log("removed " + this.aExplorerNotesData[index].id);
   
    }
    else {
      // If Note is not in Local Storage - That means it is not clicked - We needs to add it
      this.savePickedNoteToLocalStorage(this.aExplorerNotesData[index].id)
      console.log("added " + this.aExplorerNotesData[index].id);
    }

    

  }

  savePickedNoteToLocalStorage(parNodeId: number) {

    this.returnNotesFromLocalStorage();

    var tmpPickedEplorerNote: IPickedExplorerNotes = { id: parNodeId };
    this.aPickedExplorerNotes.push(tmpPickedEplorerNote);

    localStorage.setItem("picked_notes", JSON.stringify(this.aPickedExplorerNotes));
  }

  removeNoteFromLocalStorage(parNodeId: number) {

    this.returnNotesFromLocalStorage();

    this.aPickedExplorerNotes = this.aPickedExplorerNotes.filter((element) => {
      return element.id !== parNodeId;
    });

    localStorage.setItem("picked_notes", JSON.stringify(this.aPickedExplorerNotes));
  }

  returnNotesFromLocalStorage() {
    var tmpStringifiedLocalStorageNotes: string | null = localStorage.getItem('picked_notes');
    if (tmpStringifiedLocalStorageNotes) {
      this.aPickedExplorerNotes = JSON.parse(tmpStringifiedLocalStorageNotes);
    }
  }

}



interface IExplorerNotesData {
  type: string;
  topic: string;
  author: string;
  coordinates: Object;
  coordinatesString: string;
  location: string;
  id: number;
  clicked: boolean;
}

interface IPickedExplorerNotes {
  id: number;
}
