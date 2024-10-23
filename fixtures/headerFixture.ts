import {Header} from "../pages/main.page";
import {test as baseTest} from "@playwright/test";

interface Fixtures {
    setupHeader: Header;
    openBurgerMenuMobile: Header;
};

export const test = baseTest.extend<Fixtures>({
    setupHeader: async({page}, use) => {
        const header = new Header(page);

        await header.goToUrl();
        await use(header);
    },
});