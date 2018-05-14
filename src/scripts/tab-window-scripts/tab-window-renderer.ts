import { TabButton } from "../commons/interfaces";

export class TabWindowRenderer {

  private static windowElement = document.querySelector('#tab-window')

  static updateMenu(menuItems: MenuItem[]): void {
    //Select the tab's menu
    const menuElement = this.windowElement.querySelector('#tab-menu .menu')

    //Empty the tab's menu
    while (menuElement.firstChild)
      menuElement.removeChild(menuElement.firstChild)

    //Populate the tab's menu
    for (const menuItem of menuItems) {
      //create a new menu item to append to the menu
      const menuItemElement = document.createElement('li')
      menuItemElement.classList.add('button')
      menuItemElement.addEventListener('click', menuItem.action)
      menuItemElement.innerHTML = `<span>${menuItem.name}</span>`
      menuElement.appendChild(menuItemElement)
    }
  }

  static updateNav(tabs: TabButton[], activeTabIndex: number): void {
    //Select the tabs navigation
    const navElement = this.windowElement.querySelector('#tab-nav')

    //Empty the tabs navigation
    Array.from(navElement.children).forEach(tabElement => {
      if (tabElement.id.endsWith('tab-button'))
        tabElement.remove()
    })

    //Populate the tabs navigation
    for (const tab of tabs) {
      //create a tab button to append to the tabs navigation
      const tabElement = document.createElement('div')
      tabElement.id = `${tab.name}-tab-button`
      tabElement.classList.add('button')
      if(tab === tabs[activeTabIndex])
        tabElement.classList.add('active')
      else
        tabElement.addEventListener('click', tab.action)

      //Create the text for the tab button
      const tabElementText = document.createElement('div')
      tabElementText.innerHTML = `<span>${tab.name}</span>`
      tabElement.appendChild(tabElementText)

      //Create an icon for the tab button
      const tabElementIcon = document.createElement('span')
      tabElementIcon.classList.add('fas', tab.icon)
      tabElement.appendChild(tabElementIcon)

      //Append all to the tabs navigation
      navElement.appendChild(tabElement)
    }
  }

  static updatePropertiesPanel(properties: Property<string>[]): void {
    //Select the tabs navigation
    const propertiesPanelElement = this.windowElement.querySelector('#properties-panel .list')

    //Empty the tab's menu
    while (propertiesPanelElement.firstChild)
      propertiesPanelElement.removeChild(propertiesPanelElement.firstChild)

    for (const property of properties) {
      //create a tab button to append to the tabs navigation
      const propertyElement = document.createElement('div')
      propertyElement.classList.add('property')

      //Create the text for the tab button
      const propertyHeadElement = document.createElement('div')
      propertyHeadElement.classList.add('property-head')
      propertyHeadElement.innerHTML = `<span>${property.name}</span>`
      propertyElement.appendChild(propertyHeadElement)

      //Create the text for the tab button
      const propertyBodyElement = document.createElement('div')
      propertyBodyElement.classList.add('property-body')
      propertyBodyElement.innerHTML = `
        <span>${property.description}:</span>
        <input type="text" value="${property.value}">
      `
      propertyElement.appendChild(propertyBodyElement)

      //Append all to the tabs navigation
      propertiesPanelElement.appendChild(propertyElement)
    }
  }

  static updateView(view: Element): void {
    //Select the tab view
    const viewElement = this.windowElement.querySelector('#tab-view')

    //Empty the tab view
    while (viewElement.firstChild)
      viewElement.removeChild(viewElement.firstChild)

    //Append the new rendered view to the tab view
    viewElement.appendChild(view)
  }

}
