import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
interface hasId {
  Title: string;
  Poster: string;
  Year: string;
}
@Component({
  selector: 'api1-app',
  imports: [FormsModule],
  templateUrl: './api1.component.html',
  styleUrl: './api1.component.css'
})
export class Api1Component {
  constructor(private http: HttpClient) { }

  movies: hasId[] = [];
  searchTerm: string = 'red';
  page: number = 1;
  loading: boolean = false;
  showScrollToTop: boolean = false;
  ngOnInit() {
    this.searchMovie();
  }

  
  searchMovie() {
    if (this.loading) return;
    this.loading = true;
    this.page++;
    this.http.get(`https://www.omdbapi.com/?apikey=a2b07930&s=${this.searchTerm}&page=${this.page}`)
      .subscribe({
        next: (data: any) => {
          this.movies = [...this.movies, ...data.Search];
          this.loading = false;
        }
      })
  }
  @HostListener('window:scroll',[])
  onScroll(){
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;

    const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= documentHeight - 100) { 
      this.searchMovie();
  }
  this.showScrollToTop = window.pageYOffset > 300;
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
