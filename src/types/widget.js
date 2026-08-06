import PropTypes from "prop-types";

export const widgetShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  specifications: PropTypes.shape({
    dimensions: PropTypes.shape({
      length: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    weight: PropTypes.shape({
      qty: PropTypes.string.isRequired,
    }).isRequired,
    capacity: PropTypes.shape({
      qty: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
});

export const cartItemShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  lineTotal: PropTypes.number.isRequired,
});
