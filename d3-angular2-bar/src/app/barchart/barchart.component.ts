import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import {BarService} from '../core/bar.service';
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor(private barService: BarService) { }

  ngOnInit() {
    this.barService.myData().subscribe(data => {
      console.log(data)
      this.createChart(data);
    })
  }

  createChart(data: any) {

    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg1 = d3.select(element).append('svg').attr('width', element.offsetWidth).attr('height', element.offsetHeight);
    // set the ranges
    var x = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);
    var y = d3.scaleLinear()
      .range([this.height, 0]);
    // chart plot area
    let svg = svg1.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    // format the data
    data.forEach(function(d) {
      d.sales = +d.sales;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.salesperson; }));
    y.domain([0, d3.max(data, function(d: any) { return +d.sales; })]);
    let me = this;
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d: any) { return x(d.salesperson); })
      .attr("width", x.bandwidth())
      .attr("y", function(d: any) { return y(d.sales); })
      .attr("height", function(d: any) { return (me.height - y(d.sales)); });

    // add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
  }
}
