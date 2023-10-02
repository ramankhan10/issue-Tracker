import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
  type: FormControl<string>;
}

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  suggestions: Issue[] = [];

  @Output() formclose = new EventEmitter();

  constructor(private issueService: IssuesService) {}

  issueForm = new FormGroup<IssueForm>({
    title: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl('', { nonNullable: true }),
    priority: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  ngOnInit(): void {
    this.issueForm.controls.title.valueChanges.subscribe((title) => {
      this.suggestions = this.issueService.getSuggestions(title);
    });
  }

  addIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueForm.getRawValue() as Issue);
    this.formclose.emit();
  }
}
