import { test } from '@playwright/test';

const reverseString = (str: string): string => {
      const strArr = str.split("");
      let res = "";
      for (let i = strArr.length - 1; i >= 0; i--) {
            res += strArr[i];
      }

      return res;
}

function reverseString2(str: string): string {
      let res = "";

      for (const char of str) {
            res = char + res;
      }

      return res;
}


test('ReverserString', async () => {
      console.log(reverseString("TungAnh"));

      console.log(reverseString2("TungAnh"));
})