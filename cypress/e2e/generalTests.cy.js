describe('Catalog Page', () => {

  it('The product catalog page shows the correct items you entered', () => {
    cy.visit('https://realbeans-plzkdwtn.myshopify.com')
    cy.get('input[type="password"]').type('laicha')
    cy.get('button[type="submit"]').click()
    cy.visit('https://realbeans-plzkdwtn.myshopify.com/collections/all')
    cy.get('button[id="shopify-pc__banner__btn-accept"]').click()
    cy.get('a[href="/products/blended-coffee-5kg"]').should('be.visible')
    cy.get('a[href="/products/roasted-coffee-beans-5kg-1"]').should('be.visible')
  })

  it('Sorting products (e.g., by price) actually changes their order', () => {
    cy.visit('https://realbeans-plzkdwtn.myshopify.com')
    cy.get('input[type="password"]').type('laicha')
    cy.get('button[type="submit"]').click()
    cy.visit('https://realbeans-plzkdwtn.myshopify.com/collections/all')
    cy.get('button[id="shopify-pc__banner__btn-accept"]').click()
    cy.get('select[name="sort_by"]').first().select('price-ascending')

    cy.wait(5000)
    cy.get('.price').then((priceElements) => {
      const prices = [...priceElements].map((el) => {
        const text = el.textContent.trim()
        const match = text.match(/\$[\d.]+/)
        return match ? parseFloat(match[0].replace('$', '')) : 0
      })

      for (let i = 1; i < prices.length; i++) {
        expect(prices[i]).to.be.at.least(prices[i - 1])
      }
    })
  })

  it('Product detail pages display the right descriptions, prices, and image names', () => {
    cy.visit('https://realbeans-plzkdwtn.myshopify.com')
    cy.get('input[type="password"]').type('laicha')
    cy.get('button[type="submit"]').click()
    cy.visit('https://realbeans-plzkdwtn.myshopify.com/collections/all')
    cy.get('body').then((body) => {
      if (body.find('#shopify-pc__banner__btn-accept').length) {
        cy.get('#shopify-pc__banner__btn-accept').click()
      }
    })

    cy.visit('https://realbeans-plzkdwtn.myshopify.com/products/roasted-coffee-beans-5kg-1')
    cy.get('h1').should('contain', 'Roasted coffee beans 5kg')
    cy.get('.product__description').should('contain', 'Our best and sustainable real roasted beans.')
    cy.get('.price-item--regular').first().should('contain', '$40.00')
    cy.get('img[src*="RealBeansRoastedBag"]').should('exist')

    cy.visit('https://realbeans-plzkdwtn.myshopify.com/products/blended-coffee-5kg')
    cy.get('h1').should('contain', 'Blended coffee 5kg')
    cy.get('.product__description').should('contain', 'RealBeans coffee, ready to brew.')
    cy.get('.price-item--regular').first().should('contain', '$55.00')
    cy.get('img[src*="RealBeansBlendBag"]').should('exist')
  })

  it('The homepage intro text and product list appear correctly', () => {
    cy.visit('https://realbeans-plzkdwtn.myshopify.com')
    cy.get('input[type="password"]').type('laicha')
    cy.get('button[type="submit"]').click()
    cy.visit('https://realbeans-plzkdwtn.myshopify.com')

    cy.get('.rich-text__heading em').should('be.visible')
    cy.get('.rich-text__heading em').invoke('text').should('include', 'Since 1801')
    cy.get('.rich-text__heading em').invoke('text').should('include', 'Ethically sourced beans')

    cy.get('#Slider-template--25528457199917__featured-collection a[href="/products/blended-coffee-5kg"]').should('be.visible').should('contain', 'Blended coffee 5kg')
    cy.get('#Slider-template--25528457199917__featured-collection a[href="/products/roasted-coffee-beans-5kg-1"]').should('be.visible').should('contain', 'Roasted coffee beans 5kg')

    cy.get('#Slider-template--25528457199917__featured-collection').should('contain', '$55.00')
    cy.get('#Slider-template--25528457199917__featured-collection').should('contain', '$40.00')
  })

  it('The About page includes the history paragraph', () => {
    cy.visit('https://realbeans-plzkdwtn.myshopify.com')
    cy.get('input[type="password"]').type('laicha')
    cy.get('button[type="submit"]').click()
    cy.visit('https://realbeans-plzkdwtn.myshopify.com/pages/about')

    cy.get('.rte em').should('be.visible')
    cy.get('.rte em').invoke('text').should('include', 'From a small Antwerp grocery')
    cy.get('.rte em').invoke('text').should('include', 'roasted in-house')
    cy.get('.rte em').invoke('text').should('include', 'loved across the continent')
  })
})