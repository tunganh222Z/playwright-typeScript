import { test } from '@playwright/test';

function isPrimeNum(num: number) {
      let isPrime = true;
      if (num <= 1) isPrime = false;

      for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                  isPrime = false;
                  break;
            } 
      }
      console.log(isPrime ? 'Số này là số nguyên tố' : 'Số này không phải là số nguyên tố');
}

test('isPrime num', async () => {
      
      isPrimeNum(2);
})