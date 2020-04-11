import { Component, OnInit, Input } from '@angular/core';
import { ICourseItem } from '../../models/course-item.model';
import { Authors } from '../../models/authors.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @Input() model: ICourseItem;
  constructor() { }

  ngOnInit(): void {
  }

  getUsersNames() {
    const names = this.model.authors.map(user => user.name);
    return names.join(';');
  }

  updateAuthorsModel(authorsString: string) {
    this.model.authors =  authorsString.split(';').map(nm => {
      return {
        id: 0,
        name: nm,
        lastName: ''
      };
    });
  }

}
