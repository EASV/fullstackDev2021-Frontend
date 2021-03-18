import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CreateStockDto} from '../shared/create-stock.dto';
import {StockService} from '../shared/stock.service';
import {StockDto} from '../shared/stock.dto';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.scss']
})
export class StockCreateComponent implements OnInit {
  stockForm = this.fb.group({
    name: [''],
    description: [''],
    value: [''],
  });
  stockCreate: StockDto | undefined;
  error: string | undefined;

  constructor(private fb: FormBuilder,
              private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.listenForCreateSuccess()
      .subscribe(stockCreate => {
        this.stockForm.reset();
        this.stockCreate = stockCreate;
      });
    this.stockService.listenForCreateError()
      .subscribe(errorMessage => {
        this.error = errorMessage;
      });
  }

  createStock(): void {
    this.error = undefined;
    const stockDto: CreateStockDto = this.stockForm.value;
    this.stockService.create(stockDto);
  }
}
