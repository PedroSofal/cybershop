const breakpoints = {
  mobile: 440,
  tablet: 768,
  desktop: 1200,
};

function mq(media) {
  return `@media (max-width: ${breakpoints[media]}px)`;
}

export default mq;