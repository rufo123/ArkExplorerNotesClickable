import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-explorer-notes',
  templateUrl: './explorer-notes.component.html',
  styleUrls: ['./explorer-notes.component.css']
})
export class ExplorerNotesComponent implements OnInit, AfterViewChecked {

  public aExplorerNotesData: IExplorerNotesData[] = [];

  public aPickedExplorerNotes: IPickedExplorerNotes[] = [];
  
  public aIsHidden: boolean = true;
  public aNoteData: IExplorerNotesData | null;
  public aPointWrapperWidth: number;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.aPointWrapperWidth = 0;
    this.aNoteData = null;
    http.get<IExplorerNotesData[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.aExplorerNotesData = result;
      console.log(this.aExplorerNotesData);
    },
      error => console.error(error));

    this.returnNotesFromLocalStorage();
  }
 
  ngOnInit(): void {
    console.log(this.aExplorerNotesData);
    console.log(this.aPickedExplorerNotes);
  }

  ngAfterViewChecked() {
    if (this.aElementPointTooltipTextWrapper) {
      this.aPointWrapperWidth = this.aElementPointTooltipTextWrapper.nativeElement.offsetWidth;
    }
  }

  getXValue(parCoordinates: string): number {
    return (100 / (93 - 7)) * (parseFloat(parCoordinates.split(",")[0]) - 7);
  }

  getYValue(parCoordinates: string): number {
    return (100 / (93 - 7)) * (parseFloat(parCoordinates.split(",")[1]) - 7);
  }

  getCoordinatesFormatted(parCoordinates: string): string {
    return "Lat: " + parCoordinates.split(",")[0] + " Lon: " + parCoordinates.split(",")[1];
  }

  checkCoordinatesValid(parCoordinates: string): boolean {
    return parCoordinates.split(",")[0] === "0" && parCoordinates.split(",")[1] === "0";
  }

  filterOnlyValidCoordinatesNotes() {
    return this.aExplorerNotesData.filter((element) => {
      return !this.checkCoordinatesValid(element.coordinatesString);
    })
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
    })) {
      console.log("In Storage " + this.aExplorerNotesData[index].id)
      // If Note is in Local Storage - That means it is clicked - We needs to remove it
      this.removeNoteFromLocalStorage(this.aExplorerNotesData[index].id);
      console.log("removed " + this.aExplorerNotesData[index].id);

    } else {
      // If Note is not in Local Storage - That means it is not clicked - We needs to add it
      this.savePickedNoteToLocalStorage(this.aExplorerNotesData[index].id)
      console.log("added " + this.aExplorerNotesData[index].id);
    }


  }

  onClickNoteData(note: IExplorerNotesData) {
    this.returnNotesFromLocalStorage();

    if (this.aPickedExplorerNotes.find((element) => {
      return element.id === note.id;
    })) {
      console.log("In Storage " + note.id)
      // If Note is in Local Storage - That means it is clicked - We needs to remove it
      this.removeNoteFromLocalStorage(note.id);
      console.log("removed " + note.id);

    } else {
      // If Note is not in Local Storage - That means it is not clicked - We needs to add it
      this.savePickedNoteToLocalStorage(note.id)
      console.log("added " + note.id);
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

  onMouseEnter(parNoteData: IExplorerNotesData) {

    if (!this.checkCoordinatesValid(parNoteData.coordinatesString)) {
      this.aIsHidden = false;
      this.aNoteData = parNoteData;
    }
  }

  onMouseLeave() {
    this.aIsHidden = true;
  }

  filterNotesNotCollected(): IExplorerNotesData[] {

    return this.aExplorerNotesData.filter(object1 => {
      return !this.aPickedExplorerNotes.some(((object2: { id: number; }): boolean => {
        return object1.id === object2.id;
      }) as any);
    });

  }

  @ViewChild("pointTooltipElement", { static: false })
  aElementPointTooltipTextWrapper: ElementRef | undefined;
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
