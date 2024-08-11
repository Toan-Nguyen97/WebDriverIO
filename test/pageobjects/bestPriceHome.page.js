import { $ } from '@wdio/globals'
import Page from './page.js';
import WebCustom from '../common/WebCustom.js';

class BestPriceHomePage extends Page{
    constructor(){
        super();
        this.WebCustom = new WebCustom();
    }
    //xpath flight from
    get flightFrom(){
        return $("input[data-id='flight_from'][name='From']");   
    }
    get inputDeparturePoint(){
        return $("input[placeholder='Mã sân bay, Tên sân bay, Tên thành phố...'][data-id='flight_from']");
    }

    get flightInfo(){
        return $("(//p[contains(@onclick,'update_flight')]//strong)[1]");
    }

    //xpath flight to
    get flightTo(){
        return $("//input[@data-id='flight_to' and @name = 'To']");
    }

    get inputDestinationPoint(){
        return $("input[placeholder='Mã sân bay, Tên sân bay, Tên thành phố...'][data-id='flight_to']");
    }

    //xpath flight date
    get departureDateFlight(){
        return $("input[id='departure_date_flight']")
    }

    getDateFlight(day, month, year) {
        return $(`//td[@data-month='${month}' and @data-year='${year}']//span[text()='${day}']`);
    }

    //xpath return date
    get returnDateFlight(){
        return $("input[id='returning_date_flight']")
    }

    //xpath passenger
    get flightPassenger(){
        return $("input[id='flight_passenger']")
    }

    get adultPlus(){
        return $("//div[contains(@class, 'pop-flight-passenger')]//div[@type='button' and contains(@class,'flight_adult_plus')]//i")
    }

    get childrenPlus(){
        return $("//div[contains(@class, 'pop-flight-passenger')]//div[@type='button' and contains(@class,'children_adult_plus')]//i")
    }

    get infantPlus(){
        return $("//div[contains(@class, 'pop-flight-passenger')]//div[@type='button' and contains(@class,'infant_plus')]//i")
    }

    //xpath search info
    get buttonSearchFlight(){
        return $("//button[@id='search_button' and contains(@class,'search_flight')]")
    }

    get loadingElement(){
        return $("div[id='flight_loading_data_depart']");
    }

    get showFlights(){
        return $("div[class='sort-flight-content sort-des-depart']")
    }

    //method
    async inputFlightFromInfo(departurePoint){
        await this.WebCustom.waitForElementVisibleAndClick(this.flightFrom);
        await this.WebCustom.waitForElementVisibleAndClick(this.inputDeparturePoint);
        await this.WebCustom.waitForElementVisibleAndAddValues(this.inputDeparturePoint, departurePoint);
        await this.WebCustom.waitForElementVisibleAndClick(this.flightInfo);

    }

    async inputFlightToInfo(destinationPoint){
        await this.WebCustom.waitForElementVisibleAndClick(this.flightTo);
        await this.WebCustom.waitForElementVisibleAndAddValues(this.inputDestinationPoint, destinationPoint);
        await this.WebCustom.waitForElementVisibleAndClick(this.flightInfo);
    }

    async chooseDateFlight(inputDate){
        await this.WebCustom.waitForElementVisibleAndClick(this.departureDateFlight);
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const dateElement = this.getDateFlight(inputDate, currentMonth, currentYear);
        await this.WebCustom.waitForElementVisibleAndClick(dateElement);
    }

    async chooseReturnDateFlight(inputReturnDate){
        await this.WebCustom.waitForElementVisibleAndClick(this.returnDateFlight);
        const today = new Date();
        const currentMonth = today.getMonth()+1;
        const currentYear = today.getFullYear();
        const dateElement = this.getDateFlight(inputReturnDate, currentMonth, currentYear);
        await this.WebCustom.waitForElementVisibleAndClick(dateElement);
    }

    async choosePassenger(numberAdults, numberChildren, numberInfant){
        await this.WebCustom.waitForElementVisibleAndClick(this.flightPassenger);
        await browser.pause(5000)
        // adault
        const adultPlusElement = await this.adultPlus;
        const numberAdultsPlus = numberAdults - 1;
        await this.WebCustom.plusPassenger(adultPlusElement, numberAdultsPlus);

        //children
        const plusChildren = await this.childrenPlus;
        await this.WebCustom.plusPassenger(plusChildren, numberChildren)

        //infant
        const plusInfant = await this.infantPlus;
        await this.WebCustom.plusPassenger(plusInfant, numberInfant)
    }

    async clickButtonSearchAndValidateShowFlights(){
        await this.WebCustom.waitForElementVisibleAndClick(this.buttonSearchFlight);
        expect(this.loadingElement).not.toBeDisabled(true);
        (await this.showFlights).waitForDisplayed({timeout:10000});
    }

    openBestPriceWebSite(){
        return super.openBestPriceWebSite();
    }

}
export default new BestPriceHomePage();