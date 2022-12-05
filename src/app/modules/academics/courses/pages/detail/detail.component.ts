import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourse, IProject, IUserDto } from '@data/interfaces';
import { CoursesService } from '@modules/academics/courses/services/courses.service';
import { ProjectsService } from '@modules/projects/services/projects.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private idCourse!: number;
  public course: ICourse;
  public projects: IProject[];
  public students: IUserDto[];
  public showStudents: boolean;
  public showProjects: boolean;

  constructor(
    private coursesService: CoursesService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
  ) {
    this.course = {} as ICourse;
    this.projects = [] as IProject[];
    this.students = [] as IUserDto[];
    this.showStudents = false;
    this.showProjects = true;
  }

  ngOnInit(): void {
    this.idCourse = +this.route.snapshot.params['id'];
    this.getCurrenCourse();
  }

  private getCurrenCourse(): void {
    this.coursesService
      .getCourseById(this.idCourse)
      .subscribe((course: ICourse) => {
        this.course = course;
        this.getProjectsByCourse(this.idCourse);
        this.getStudentsEnrolledCourse(this.idCourse);
      });
  }

  public getProjectsByCourse(idCourse: number = this.idCourse): void {
    this.projectsService
      .getProjectsByCourse(this.idCourse)
      .subscribe((projects: IProject[]) => {
        this.projects = projects;
      });
  }

  public getStudentsEnrolledCourse(idCourse: number = this.idCourse): void {
    this.coursesService
      .getStudentsEnrolledCourse(this.idCourse)
      .subscribe((students: any[]) => {
        console.log(students);
      });
  }

  public isCourseEmpty(): boolean {
    return (this.course && (Object.keys(this.course).length === 0));
  }

  public manageShow(showStudents: boolean, showProjects: boolean): void {
    this.showStudents = showStudents;
    this.showProjects = showProjects;
  }

}
