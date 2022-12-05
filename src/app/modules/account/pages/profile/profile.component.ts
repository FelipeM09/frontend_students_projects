import { Component, OnInit } from '@angular/core';

import { AuthService } from '@app/core/authentication/auth.service';
import { CoursesService } from '@modules/academics/courses/services/courses.service';
import { CourseStudentService } from '@modules/projects/services/course-student.service';
import { User } from '@data/models';
import { ICourse, ICourseStudent } from '@data/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
      .img-perfil {
        height: 100%;
        width: 100%;
        max-height: 500px;
        max-width: 500px;
        object-fit: cover;
        }`
  ]
})
export class ProfileComponent implements OnInit {

  public currentUser: User = {} as User;
  public coursesStudent: ICourseStudent[] = [];
  public coursesTeacher: ICourse[] = [];

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService,
    private courseStudentService: CourseStudentService
  ) { }

  ngOnInit(): void {
    this.getCurrrentUser();
  }

  private getCurrrentUser(): void {
    this.currentUser = this.authService.getCurrentUserSubject();
    this.getShowCourses();
  }

  private getShowCourses(): void {
    if (this.authService.isStudent()) {
      this.getCoursesStudent();
    } else if (this.authService.isTeacher()) {
      this.getCourses();
    }
  }

  private getCoursesStudent(): void {
    this.courseStudentService
      .getCoursesStudent(this.currentUser.id)
      .subscribe((coursesStudent: ICourseStudent[]) => {
        this.coursesStudent = coursesStudent;
      });
  }

  private getCourses(): void {
    this.coursesService
      .getCourses(this.currentUser.id)
      .subscribe((courses: ICourse[]) => {
        this.coursesTeacher = courses;
      });
  }

}
