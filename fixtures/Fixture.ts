import {PageElement} from "../pages/main.page";
import {test as baseTest} from "@playwright/test";

interface Fixtures {
    navigateAndInitialize: PageElement;
};

export const test = baseTest.extend<Fixtures>({
    navigateAndInitialize: async({page}, use) => {
        const pageElement = new PageElement(page);

        await pageElement.goToUrl();
        await use(pageElement);
    },
});