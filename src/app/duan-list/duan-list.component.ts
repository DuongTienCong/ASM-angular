import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDuAn } from '../idu-an';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-duan-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './duan-list.component.html',
  styleUrls: ['./duan-list.component.css']
})
export class DuanListComponent implements OnInit {
  list_du_an: IDuAn[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    fetch('http://localhost:3000/du_an')
      .then(res => res.json())
      .then(data => {
        this.list_du_an = data;
      });
  }

  themDuAn(): void {
    this.router.navigate(['/du_an/them']);
  }

  suaDuAn(id: number): void {
    this.router.navigate([`/du_an/sua/${id}`]);
  }

  xoaDuAn(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      fetch(`http://localhost:3000/du_an/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          alert('Xóa thành công');
          this.list_du_an = this.list_du_an.filter(da => da.id !== id);
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
