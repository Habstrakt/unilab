import { MainPage } from '../pages/home.page';
import { Header } from "../pages/header.page";
import {test as baseTest} from "@playwright/test";

interface Fixtures {
    mainPageInitialize: MainPage;
    headerInitialize: Header
};

// export const test = baseTest.extend<Fixtures>({
//     mainPageInitialize: async({page}, use) => {
//         const baseElement = new MainPage(page);
//         await baseElement.goToUrl();
//         await use(baseElement);
//     },
//     headerInitialize: async({page}, use) => {
//         const headerComponent = new Header(page);
//         await headerComponent.goToUrl();
//         await use(headerComponent);
//     },
// });