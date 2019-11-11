
export class Ratio {
  public value: number = 0;
  public percentValue: number = 0;
  public name: string = "";
  public redMax: number = 0;
  public yellowMax: number = 0;
  public greenMax: number = 0;
  public isInverted = false;

  constructor(value: number, percentValue: number, name: string, redMax: number, yellowMax: number, greenMax: number) {
    this.value = value;
    this.percentValue = percentValue;
    this.name = name;
    this.redMax = redMax;
    this.yellowMax = yellowMax;
    this.greenMax = greenMax;
    this.isInverted = false;
  }
}
