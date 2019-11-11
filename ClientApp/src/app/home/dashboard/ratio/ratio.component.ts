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

  getInvertedOptions() {
    return {
      hasNeedle: true,
      outerNeedle: false,
      needleColor: "black",
      needleStartValue: this.getPercentValue(),
      arcColors: ["rgb(61,204,91)", "rgb(239,214,19)", "rgb(255,84,84)"],
      arcDelimiters: [this.getGreenPercentageInverted(), this.getYellowPercentageInverted()],
      rangeLabel: ["0", this.getRedMax()]
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

  getRatioName() {
    if (this.ratio && this.ratio.name) {
      return this.ratio.name
    }
    return ""
  }

  getBottomLabel() {
    if (this.ratio && this.ratio.value) {
      return this.ratio.value.toFixed(2)
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
