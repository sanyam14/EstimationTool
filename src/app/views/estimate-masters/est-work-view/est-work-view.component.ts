import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-est-work-view',
  templateUrl: './est-work-view.component.html',
  styleUrls: ['./est-work-view.component.scss']
})
export class EstWorkViewComponent implements OnInit {

  public estimationCost_rout_Link : any = "/estimate-item/EstimationCostAddEdit";

  public data: any[] = [
    {
      text: "Furniture",
      items: [
        { text: "Tables & Chairs" },
        { text: "Sofas" },
        { text: "Occasional Furniture" },
      ],
    },
    {
      text: "Decor",
      items: [
        { text: "Bed Linen" },
        { text: "Curtains & Blinds" },
        { text: "Carpets" },
      ],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
