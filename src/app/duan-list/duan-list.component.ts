import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IDuAn } from '../idu-an';
import { ActivatedRoute , Router  } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-duan-list',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './duan-list.component.html',
  styleUrl: './duan-list.component.css'
})
export class DuanListComponent {
  constructor( private route:ActivatedRoute , private router:Router ){}
  list_du_an:IDuAn[]=[];
  ngOnInit():void{
    fetch(`http://localhost:3000/du_an`)
    .then (res=>res.json())
    .then(data =>{
      this.list_du_an = data;
    })
  }
  xoaDuAn(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      fetch(`http://localhost:3000/du_an/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          alert('Xóa thành công');
          this.router.navigate(['/du_an']); 
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
