# Hexagon Nav

Style and script to decorate an HTML navigation list as a hexagonal user interface. Inspired by the navigation menu used on the [Big Hero 6 pre-release website](http://watsondg.com/dev_public/big-hero-6/).

## Usage

The main decorator is the `hexagon-nav` class which should be added to the navigation `nav` element. Then the `nav` class should be added to the inner `ol` or `ul` list element.

Text within a list item should be wrapped in a tag with the class `text`. Generally this would be the `a` tag used for navigation links.

For each list item, include an `img` with the `bg` class to specify the background image for that item. Otherwise, mark the list item with the `no-image` class.

## Example

[See it in action!](https://soandrew.github.io/hexagon-nav)
