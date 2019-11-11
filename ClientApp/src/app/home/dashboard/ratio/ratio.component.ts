import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from "@angular/core";
import {Ratio} from "../../../shared/ratio.model";
import * as GaugeChart from 'gauge-chart';

@Component({
  selector: 'ratio-component',
  templateUrl: './ratio.component.html',
  styleUrls: ['./ratio.component.less']
})

export class RatioComponent implements OnChanges{
  @ViewChild('gaugeArea') gaugeArea: ElementRef;
  @Input() ratio: Ratio;

  private canvasWidth = 300;

  ngOnChanges(changes: SimpleChanges): void {
    if(this.ratio)
      this.renderGauge();
  }

  private renderGauge(){
    // Drawing and updating the chart
    GaugeChart.gaugeChart(this.gaugeArea.nativeElement, this.canvasWidth, this.getGaugeOptions()).updateNeedle(this.getPercentValue())
  }

  private getGaugeOptions(){
    let arcColors, arcDelimiters, rangeLabel;

    if(this.isInverted()){
      arcColors = ['rgb(61,204,91)', 'rgb(239,214,19)', 'rgb(255,84,84)'];
      arcDelimiters = [this.getGreenPercentageInverted(), this.getYellowPercentageInverted()];
      rangeLabel = ['0', this.getRedMax()];
    }else{
      arcColors = ['rgb(255,84,84)', 'rgb(239,214,19)', 'rgb(61,204,91)'];
      arcDelimiters = [this.getRedPercentage(), this.getYellowPercentage()];
      rangeLabel = ['0', this.getGreenMax()];
    }

    return {
      hasNeedle: true,
      outerNeedle: false,
      needleColor: 'black',
      arcColors: arcColors,
      arcDelimiters: arcDelimiters,
      rangeLabel: rangeLabel,
      centralLabel: this.getCentralLabel()
    };
  }

  isInverted() {
    if (this.ratio && this.ratio.isInverted) {
      return this.ratio.isInverted
    }
    return false;
  }

  getPercentValue() {
    if (this.ratio && this.ratio.percentValue) {
      if (this.ratio.percentValue > 100) {
        return 100
      }
      return this.ratio.percentValue
    }
    return 0
  }

  getCentralLabel(): string {
    return this.ratio && this.ratio.value ? this.ratio.value.toFixed(2) : '';
  }

  getRedPercentage() {
    if (this.ratio && this.ratio.redMax && this.ratio.greenMax) {
      return this.ratio.redMax / this.ratio.greenMax * 100
    }
    return 1
  }

  getYellowPercentage() {
    if (this.ratio && this.ratio.yellowMax && this.ratio.greenMax) {
      return this.ratio.yellowMax / this.ratio.greenMax * 100
    }
    return 1
  }

  getYellowPercentageInverted() {
    if (this.ratio && this.ratio.yellowMax && this.ratio.redMax) {
      return this.ratio.yellowMax / this.ratio.redMax * 100
    }
    return 1
  }

  getGreenPercentageInverted() {
    if (this.ratio && this.ratio.greenMax && this.ratio.redMax) {
      return this.ratio.greenMax / this.ratio.redMax * 100
    }
    return 1
  }

  getGreenMax() {
    if (this.ratio && this.ratio.greenMax) {
      return "" + this.ratio.greenMax
    }
    return ""
  }

  getRedMax() {
    if (this.ratio && this.ratio.redMax) {
      return "" + this.ratio.redMax
    }
    return ""
  }

}
