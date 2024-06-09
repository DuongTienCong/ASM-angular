import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ITask } from '../itask';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  list_task:ITask[]=[]
  constructor(private route:ActivatedRoute , private router:Router){}
  ngOnInit():void{
    fetch(`http://localhost:3000/task`)
    .then (res=>res.json())
    .then(data =>{
      this.list_task = data;
    })
  }
  themTask():void{
    this.router.navigate(['/task/them'])
  }
  suaTask(id:number):void{
    this.router.navigate([`/task/sua/${id}`]);
  }
  xoaTask(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      fetch(`http://localhost:3000/du_an/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          alert('Xóa thành công');
          this.list_task = this.list_task.filter(da => da.id !== id);
        } else {
          alert('Xóa thất bại');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi xóa dự án');
      });
    }
  }

}
