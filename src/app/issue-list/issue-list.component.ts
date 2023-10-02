import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  showReportIssue = false;
  selectedIssue: Issue | null = null;

  constructor(private issuesService: IssuesService) {}

  private getIssue() {
    this.issues = this.issuesService.getPendingIssues();
  }

  ngOnInit(): void {
    this.getIssue();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getIssue();
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issuesService.completeIssue(this.selectedIssue);
      this.getIssue();
    }
    this.selectedIssue = null;
  }
  
}
