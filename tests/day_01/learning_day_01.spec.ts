import { expect, test } from '@playwright/test'

interface bmiResult {
      bmi: number;
      result: string;
}

function calculateBMI(height: number, weight: number) : bmiResult {
      const bmiValue = weight / (height * height);
      let result = "Gầy"
      if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            result = "Bình thường"
      } else if (bmiValue > 24.9 && bmiValue < 29.9) {
            result = "Thừa cân"
      } else if (bmiValue >= 30) {
            result = "Béo phì"
      }


      return {
            bmi: Number(bmiValue.toFixed(1)),
            result : result
      }
}

const resultArrowFunc = (height: number, weight: number) => {
      const bmiValue = weight / (height * height);
      let result = "Gầy"
      if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            result = "Bình thường"
      } else if (bmiValue > 24.9 && bmiValue < 29.9) {
            result = "Thừa cân"
      } else if (bmiValue >= 30) {
            result = "Béo phì"
      }


      return {
            bmi: bmiValue,
            result : result
      }
}



test('Day_01 challegen', async () => {
      const result = calculateBMI(1.75, 68);
      console.log(`Kết quả BMI: ${result.bmi}\nPhân loại: ${result.result}`);
})

interface registerInformation {
      stt: number,
      userName: string,
      email: string,
      information : string
}

test('Day_01 automation', async ({ page }) => {
      await test.step('Đi tới trang: https://material.playwrightvn.com/', async () => {
            await page.goto('https://material.playwrightvn.com/');
      });

      await test.step('Click vào: Bài học 1: Register Page (có đủ các element)', async () => {
            await page.getByRole('link', { name: 'Bài học 1: Register Page (có đủ các element)' }).click();
      });

      await test.step('Điền vào username, email. Click button register.', async () => {
            await page.getByLabel('Username', { exact: false }).fill("tunganh");
            await page.getByLabel('Email', { exact: false }).fill("tunganh@gmail.com");
            await page.getByRole('button', { name: "Register" }).click();
      });

      await test.step('- Kiểm tra kết quả có chứa username và email tương ứng', async () => {
            const allRows = await page.locator("//table[@id='userTable']").all();
            let user: registerInformation = {
                  stt: 0,
                  userName: "",
                  email: "",
                  information : ""
            };

            const headers = await page.locator("//table/thead/tr/th").allInnerTexts();
            const collumMap: Record<string, number> = {};

            headers.forEach((text, index) => {
                  collumMap[text.trim().toUpperCase()] = index;
            })

            for (const row of allRows) {
                  const cells = await row.locator("//tbody/tr/td").allInnerTexts();
                  user = {
                        stt: Number(cells[collumMap["STT"]]),
                        userName: cells[collumMap["USERNAME"]],
                        email: cells[collumMap["EMAIL"]],
                        information: cells[collumMap["INFORMATION"]]
                  };
            }

            await expect(page.locator("//tbody//td").nth(collumMap["STT"])).toHaveText(user.stt.toString());
            await expect(page.locator("//tbody//td").nth(collumMap["USERNAME"])).toHaveText(user.userName);
            await expect(page.locator("//tbody//td").nth(collumMap["EMAIL"])).toHaveText(user.email);
      })
})
