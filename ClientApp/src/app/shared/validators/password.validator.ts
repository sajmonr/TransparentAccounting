import {FormControl} from "@angular/forms";

export class PasswordValidator{
  public static Complexity(control: FormControl): {[s: string]: boolean}{
    //First check the length - if 0 then it is valid
    if(control.value === null || control.value.length === 0)
      return null;

    const hasLetters = /[A-Za-z]/.test(control.value);
    const hasNumbers = /\d/.test(control.value);
    const startsWithLetter = /^[A-Za-z]/.test(control.value);
    const hasSpecialCharacter = /[!@#$%^&*)(+=._-]/.test(control.value);


    if (!(hasLetters && startsWithLetter && hasNumbers && hasSpecialCharacter)){
      return {'passwordComplexity': true};
    }
    return null;
  }

  public static Length(control: FormControl): {[s: string]: boolean} {
    //Allow empty password to not change the password otherwise require minimum of 8 characters
    if(control.value !== null && control.value.length > 0 && control.value.length < 8)
      return {'passwordLength': true};

    return null;
  }
}
