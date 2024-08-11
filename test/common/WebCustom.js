import { $ } from '@wdio/globals'

export default class WebCustom{

    async waitForElementVisibleAndClick(xpath) {
        //wait for element display and clickable
        await xpath.waitForDisplayed({timeout:5000});
        await xpath.waitForClickable({timeout:5000});
        //click
        (await xpath).click();
    }

    async waitForElementVisibleAndAddValues(xpath, inputValues){
        //wait for element display and enable
        await xpath.waitForDisplayed({timeout:5000});
        await xpath.waitForEnabled({timeout:5000});
        //add values
        await xpath.addValue(inputValues);
    }

    async plusPassenger(xpath, numberOfPassenger){
        //increase the number of passengers
        for(let i = 0; i < numberOfPassenger; i++){
            console.log("Tăng số lượng người: lần " + (i + 1));
            await this.waitForElementVisibleAndClick(xpath);
            await browser.pause(2000);
        }
    }
}
