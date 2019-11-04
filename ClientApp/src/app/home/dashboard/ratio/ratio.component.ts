import {Component, Input, OnInit} from "@angular/core";
import {Ratio} from "../../../shared/ratio.model";

@Component({
  selector: 'ratio-component',
  templateUrl: './ratio.component.html'
})

export class RatioComponent{

  @Input() ratio: Ratio;

  public canvasWidth = 300;
  public centralLabel = '';
  getOptions() {
    return {
      hasNeedle: true,
      outerNeedle: false,
      needleColor: "black",
      needleStartValue: this.getPercentValue(),
      arcColors: ["rgb(255,84,84)", "rgb(239,214,19)", "rgb(61,204,91)"],
      arcDelimiters: [this.getRedPercentage(), this.getYellowPercentage()],
      rangeLabel: ["0", this.getGreenMax()]
    };
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

  getRatioName() {
    if (this.ratio && this.ratio.name) {
      return this.ratio.name
    }
    return ""
  }

  getBottomLabel() {
    if (this.ratio && this.ratio.value) {
      return '' + this.ratio.value
    }
    return ''
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

  getGreenMax() {
    if (this.ratio && this.ratio.greenMax) {
      return "" + this.ratio.greenMax
    }
    return ""
  }

}
