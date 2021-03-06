import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { iEvent } from "../models/event";

@Injectable({
  providedIn: "root",
})
export class EventService {
  readonly endpoint = environment.urlEvent + "event";
  readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  getAllEvent(): Observable<iEvent[]> {
    return this.http.get<iEvent[]>(`${this.endpoint}`);
  }

  getEventById(id: number): Observable<iEvent> {
    return this.http.get<iEvent>(`${this.endpoint}/${id}`);
  }

  getEventByTheme(theme: string): Observable<iEvent> {
    return this.http.get<iEvent>(`${this.endpoint}/getByTheme/${theme}`);
  }

  postEvent(event: iEvent): Observable<iEvent> {
    return this.http.post<iEvent>(this.endpoint, event);
  }

  putEvent(event: iEvent): Observable<iEvent> {
    return this.http.put<iEvent>(
      `${this.endpoint}/${event.id}`,
      event,
      this.httpOptions
    );
  }

  deleteEvent(id: number) {
    return this.http.delete<boolean>(`${this.endpoint}/${id}`);
  }

  postFile(file: File, fileName: string) {
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append("file", fileToUpload, fileName);
    return this.http.post(`${this.endpoint}/upload`, formData);
  }
}
