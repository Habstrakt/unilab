import { MainPage } from '../pages/main.page';
import { Header } from "../pages/header.component";
import {test as baseTest} from "@playwright/test";

interface Fixtures {
    mainPageInitialize: MainPage;
    headerInitialize: Header
};

export const test = baseTest.extend<Fixtures>({
    mainPageInitialize: async({page}, use) => {
        const pageElement = new MainPage(page);
        await pageElement.goToUrl();
        await use(pageElement);
    },
    headerInitialize: async({page}, use) => {
        const headerComponent = new Header(page);
        await headerComponent.goToUrl();
        await use(headerComponent);
    }
});