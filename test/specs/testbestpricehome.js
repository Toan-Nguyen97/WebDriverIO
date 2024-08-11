// import { expect } from '@wdio/globals'
import BestPriceHomePage from '../pageobjects/bestPriceHome.page.js'
// import SecurePage from '../pageobjects/secure.page.js'

describe("Test the bestprice.vn page",() => {
    it("Search Flights By Conditions", async() => {
        BestPriceHomePage.openBestPriceWebSite()
        await BestPriceHomePage.inputFlightFromInfo('Hà Nội')
        await BestPriceHomePage.chooseDateFlight(30)
        await BestPriceHomePage.inputFlightToInfo('Hồ Chí Minh')
        await BestPriceHomePage.chooseReturnDateFlight(1)
        await BestPriceHomePage.choosePassenger(3,3,3)
        await BestPriceHomePage.clickButtonSearchAndValidateShowFlights()
        await browser.pause(10000)

    })
})