import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { INhanVien } from '../inhan-vien';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nv-list',
  standalone: true,
  imports: [CommonModule , FormsModule ],
  templateUrl: './nv-list.component.html',
  styleUrl: './nv-list.component.css'
})
export class NvListComponent {
  list_nhan_vien:INhanVien[]=[]
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit():void{
    fetch(`http://localhost:3000/nhan_vien`)
    .then (res=>res.json())
    .then(data =>{
      this.list_nhan_vien = data;
    })
  }
  themNhanVien():void{
    this.router.navigate(['/nhan_vien/them'])
  }
  suaNhanVien(id:number):void{
    this.router.navigate([`/nhan_vien/sua/${id}`]);
  }
  xoaNhanVien(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      fetch(`http://localhost:3000/nhan_vien/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          alert('Xóa thành công');
          this.list_nhan_vien = this.list_nhan_vien.filter(da => da.id !== id);
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
