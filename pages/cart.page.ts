import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { ProductPage } from "./product.page";
import { HeaderPage } from "./header.page";

export class CartPage extends BasePage {
  readonly deleteItemBtn: Locator;
  readonly title: Locator;
  readonly subTitle: Locator;
  readonly clearCartBtn: Locator;
  readonly cartItemTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.deleteItemBtn = page.locator(".cart__item-delete");
    this.title = page.locator("#cartDetail > div > div").nth(0);
    this.subTitle = page.locator("#cartDetail > div > div").nth(1);
    this.clearCartBtn = page.getByRole("button", {name: "Очистить корзину"});
    this.cartItemTitle = page.locator(".cart-item__title");
  }

  async addToCart(): Promise<void> {
    const productPage = new ProductPage(this.page);
    const headerPage = new HeaderPage(this.page);

    await productPage.clickRandomMedicalServices();
    await this.addToCartBtn.click();
    await headerPage.cartLink.click();
  }
}

