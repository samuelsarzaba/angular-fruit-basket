import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Fruit {
  name: string;
  color: string;
  count: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fruits: Fruit[] = [
    { name: 'APPLE', color: 'red', count: 10 },
    { name: 'ORANGE', color: 'orange', count: 10 },
    { name: 'GRAPE', color: 'blue', count: 10 }
  ];

  basketStack: Fruit[] = [];
  error: string = '';
  isAdmin: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const state = window.history.state;
      if (state && state.user) {
        this.isAdmin = state.user.permission === 'admin';
      }
    });
  }

  addToBasket(fruit: Fruit): void {
    if (!this.isAdmin) {
      this.error = 'Only admins can add fruits';
      return;
    }

    if (fruit.count > 0) {
      fruit.count--;
      this.basketStack.push(fruit);
      this.error = '';
    } else {
      this.error = `No more ${fruit.name}s available`;
    }
  }

  removeFromBasket(fruit: Fruit): void {
    const lastFruit = this.basketStack[this.basketStack.length - 1];
    if (lastFruit && lastFruit.name === fruit.name) {
      this.basketStack.pop();
      fruit.count++;
      this.error = '';
    } else if (!lastFruit) {
      this.error = `Basket stack is empty`;
    } else {
      this.error = `Can only remove ${fruit.name} if it's at the top of the stack`;
    }
  }

  getStackHeight(): string {
    return `${this.basketStack.length * 30 + 60}px`;
  }
}